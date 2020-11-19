"use strict";

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36';
const safeHeaders = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'user-agent': userAgent
};

const request = require('request-promise').defaults({
    simple: false,
    gzip: true,
    resolveWithFullResponse: true,
    maxRedirects: 0,
    followRedirect: false,
    headers: safeHeaders
});
const _ = require('underscore');
const { URL: parse } = require('url');
const events = require('events');
require('console-stamp')(console, 'HH:MM:ss.l');

const {
    sleep,
    formatProxy,
    getRandomArbitrary
} = require('../../utils/tools.js');
const config = require('../../config/config.json');

class Monitor extends events {
    constructor(props) {
        super();

        Object.keys(props).forEach((key) => this[key] = props[key]);

        this.previousProducts = [];
        this.currentProducts = [];

        this.site = new URL(this.site).origin;

        this.initMonitor();
    }

    randomProxy = () => {
        return formatProxy(this.proxies[Math.floor(Math.random() * this.proxies.length)]);
    }

    initMonitor = async () => {
        let response;

        try {
            response = await request.get({
                url: this.site + '/products.json',
                json: true,
                proxy: this.randomProxy(),
                qs: {
                    limit: getRandomArbitrary(250, 9999)
                }
            })

            this.previousProducts = response.body.products;
        } catch (initError) {
            console.error(`INIT ERR: ${initError.message}`);
            await sleep(5000);
            return this.initMonitor();
        }

        this.monitorLoop(1);
    }

    monitorLoop = async (m) => {
        console.log('Monitor Loop ' + m);

        let response;

        try {
            response = await request.get({
                url: this.site + '/products.json',
                json: true,
                proxy: this.randomProxy(),
                qs: {
                    limit: getRandomArbitrary(250, 9999)
                }
            })

            this.currentProducts = response.body.products;
            let _currentProducts = [ ...this.currentProducts ];

            let matchedProductIndex, matchedProduct;

            this.previousProducts.forEach(product => {
                // 1: 1, 2: 1, 3: 1
                // 1: 1, 2: 1
                matchedProductIndex = _currentProducts.findIndex((_product) => _product.id == product.id);
                matchedProduct = _currentProducts[matchedProductIndex];

                if (matchedProduct && product.updated_at != matchedProduct.updated_at) {
                    this.checkRestocks(this.currentProducts[matchedProductIndex]);
                }

                if (matchedProduct) _currentProducts.splice(matchedProductIndex, 1);
            });

            if (_currentProducts.length) {
                _currentProducts.forEach((product) => {
                    let productDetails = {
                        product: product,
                        restockedVariants: product.variants
                    }
                    // @DEBUG: console.log(productDetails);
                    this.emit('newProduct', productDetails);
                })
            }

            this.previousProducts = [ ...this.currentProducts ];
        } catch (monitorError) {
            console.error(monitorError)
            console.error(`MON ERR: ${monitorError.message}`);
            await sleep(5000);
            return this.monitorLoop();
        }

        await sleep(config.delay);
        return this.monitorLoop(++m);
    }

    checkRestocks = async (product) => {
        let restockDetails = {
            product,
            restockedVariants: []
        }

        product.variants.forEach((variant) => {
            if (variant.updated_at == product.updated_at && variant.available) {
                restockDetails.restockedVariants.push(variant);
            }
        })

        if (restockDetails.restockedVariants.length) {
            // @DEBUG: console.log(restockDetails);
            this.emit('restockedProduct', restockDetails);
        }
    }
}

module.exports = Monitor;