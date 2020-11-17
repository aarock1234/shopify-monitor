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
const { parse: URL } = require('url');
const events = require('events');

const {
    sleep,
    formatProxy
} = require('../../utils/tools.js');

class Monitor extends events {
    constructor(site) {
        super();

        this.site = new URL(site).origin;
    }

    initMonitor = async () => {
        let response;

        try {
            
        } catch (initError) {
            
        }
    }

    monitorLoop = async () => {

    }
}

module.exports = Monitor;