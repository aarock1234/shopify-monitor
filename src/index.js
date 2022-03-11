const Monitor = require('./class/monitor.js');
const { sendWebhook } = require('../utils/webhook.js');
const fs = require('fs');
const { formatKeywords } = require('../utils/tools.js');

function readFiles(filePath) {
    fileList = []
    if (filePath.includes('webhooks')) {
        fs.readFileSync(__dirname + filePath, 'utf-8').split(/\r?\n/).forEach(line => {
            line = line.replace(/\s/g, '');
            if (line != '') fileList.push(line);
        });    
    } else {
        fs.readFileSync(__dirname + filePath, 'utf-8')
        .split(/\r?\n/).forEach(line => fileList.push(line));
    }
    return fileList
}

let proxies = readFiles('/../config/proxies.txt'),
    sites = readFiles('/../config/sites.txt'),
    webhooks = readFiles('/../config/webhooks.txt'),
    keywords = formatKeywords(readFiles('/../config/keywords.txt'));

sites.forEach(site => {
    const currentMonitor = new Monitor({
        site,
        proxies,
        keywords
    });

    console.log('Monitor Started for ' + site);

    currentMonitor.on('newProduct', productDetails => {
        for (let i = 0; i < webhooks.length; i++) {
            sendWebhook(webhooks[i], 1305395, 'New Product', productDetails);
        }
        console.log('New Product @ ' + productDetails.site + ': ' + productDetails.product.title)
    });
    
    currentMonitor.on('restockedProduct', restockDetails => {
        for (let i = 0; i < webhooks.length; i++) {
            sendWebhook(webhooks[i], 242172, 'Product Restock', restockDetails);
        }
        console.log('Restock @ ' + restockDetails.site + ': ' + restockDetails.product.title)
    });
})