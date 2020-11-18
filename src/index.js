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
    const currentMonitor = new Monitor(site);

    currentMonitor.on('addedProduct', script => {
        for (let i = 0; i < webhooks.length; i++) {
            sendWebhook(webhooks[i], 1305395, 'New Product', script);
        }
        console.log('New Script')
    });
    
    currentMonitor.on('restockedProduct', script => {
        for (let i = 0; i < webhooks.length; i++) {
            sendWebhook(webhooks[i], 242172, 'Product Restock', script);
        }
        console.log('Script Removed')
    });
})