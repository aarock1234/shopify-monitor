const Monitor = require('./class/monitor.js');
const { sendWebhook } = require('../utils/webhook.js');

const fs = require('fs');

let proxies = [],
    sites = [],
    webhooks = [];
    keywords = [];

fs.readFileSync(__dirname + '/../config/proxies.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => proxies.push(line));
fs.readFileSync(__dirname + '/../config/sites.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => {
        line = line.replace(/\s/g, '');
        if (line != '') sites.push(line);
    });
fs.readFileSync(__dirname + '/../config/webhooks.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => {
        line = line.replace(/\s/g, '');
        if (line != '') webhooks.push(line);
    });
fs.readFileSync(__dirname + '/../config/keywords.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => {
        if (line != '') keywords.push(line);
    });
sites.forEach(site => {
    const currentMonitor = new Monitor({
        site,
        proxies
    });

    console.log('Monitor Started for ' + site);

    currentMonitor.on('newProduct', productDetails => {
        let keywordLength = keywords.length;
        for (let i = 0; i < webhooks.length; i++) {
            while(keywordLength--) {
                if (productDetails.product.title.toLowerCase().indexOf(keywords[keywordLength])!=-1) {
                    sendWebhook(webhooks[i], 1305395, 'New Product', productDetails);
                }
            }
        }
        console.log('New Product @ ' + productDetails.site + ': ' + productDetails.product.title)
         keywordLength = keywords.length;
    });
    
    currentMonitor.on('restockedProduct', restockDetails => {
        let keywordLength = keywords.length;
        for (let i = 0; i < webhooks.length; i++) {
            while(keywordLength--) {
                if (restockDetails.product.title.toLowerCase().indexOf(keywords[keywordLength])!=-1) {
                    sendWebhook(webhooks[i], 242172, 'Product Restock', restockDetails);
                }
            }
        }
        console.log('Restock @ ' + restockDetails.site + ': ' + restockDetails.product.title)
        keywordLength = keywords.length;
    });
})