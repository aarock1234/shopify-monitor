const Monitor = require('./class/monitor.js');
const { sendWebhook } = require('../utils/tools.js');

const fs = require('fs');

let proxies = [],
    sites = [],
    webhooks = [];

fs.readFileSync(__dirname + '/../config/proxies.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => proxies.push(line));
fs.readFileSync(__dirname + '/../config/sites.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => sites.push(line));
fs.readFileSync(__dirname + '/../config/webhooks.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => webhooks.push(line));

sites.forEach(site => {
    const currentMonitor = new Monitor({
        site,
        proxies
    });

    currentMonitor.on('newProduct', productDetails => {
        for (let i = 0; i < webhooks.length; i++) {
            //sendWebhook(webhooks[i], 1305395, 'New Product', productDetails);
        }
        console.log('NEW PRODUCT: ' + productDetails.product.title)
    });
    
    currentMonitor.on('restockedProduct', restockDetails => {
        for (let i = 0; i < webhooks.length; i++) {
            //sendWebhook(webhooks[i], 242172, 'Product Restock', restockDetails);
        }
        console.log('PRODUCT RESTOCK: ' + restockDetails.product.title)
    });
})