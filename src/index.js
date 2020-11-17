const Monitor = require('./monitor.js');
const { sendWebhook } = require('../utils/tools.js');
const config = require('../config/config.json'),
      proxies = require('../config/proxies.json'),
      sites = require('../config/sites.json'),
      webhooks = require('../config/webhooks.json');

const fs = require('fs');

let proxies = [],
    sites = [],
    webhooks = [];

fs.readFileSync(__dirname + '/../config/proxies.json', 'utf-8')
    .split(/\r?\n/).forEach(line => proxies.push(line));
fs.readFileSync(__dirname + '/../config/sites.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => sites.push(line));
fs.readFileSync(__dirname + '/../config/webhooks.txt', 'utf-8')
    .split(/\r?\n/).forEach(line => webhooks.push(line));

sites.forEach(site => {
    for (let i = 0; i < config.processPerSite; i++) {
        const currentMonitor = new Monitor(site);

        currentMonitor.on('addedProduct', script => {
            sendWebhook(1305395, 'New Product', script);
            console.log('New Script')
        });
        
        currentMonitor.on('restockedProduct', script => {
            sendWebhook(242172, 'Product Restock', script);
            console.log('Script Removed')
        });
    }
})