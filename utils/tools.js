module.exports = {
    /**
     * Sleep
     * @param {Number} ms 
     * 
     * @returns timeout
     */
    sleep: (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    },

    /**
     * randomString
     * 
     * @param { String } Len
     * @param { String } An
     * 
     * @returns random string of desired length
     */
    randomString: (len, an) => {
        an = an && an.toLowerCase();
        var str = "",
            i = 0,
            min = an == "a" ? 10 : 0,
            max = an == "n" ? 10 : 62;
        while (len--) {
            var r = Math.random() * (max - min) + min << 0;
            str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
        }
        return str;
    },

    /**
     * getRandom
     * 
     * @param {Array}
     * 
     * @returns random value from array
     */
    getRandomArray: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * formatProxy
     * 
     * @param {String} Proxy
     * 
     * @returns proxy in node format
     */
    formatProxy: (proxy) => {
        if (!proxy || proxy.replace(/\s/g, '') == "")
            return;

        let proxySplit = proxy.split(":");
        
        if (proxySplit.length > 2) {
            return 'http://' + proxySplit[2] + ':' + proxySplit[3] + '@' + proxySplit[0] + ':' + proxySplit[1];
        } else {
            return 'http://' + proxySplit[0] + ':' + proxySplit[1];
        };
    },

    /**
     * getRandomArbitrary
     * 
     * @param {Number}
     * @param {Number}
     * 
     * @returns random arbitrary number
     */
    getRandomArbitrary: (min, max) => {
        /**
         * Returns a random arbitrary number between min (inclusive) and max (exclusive).
         */

        return Math.round(Math.random() * (max - min) + min);
    },

    formatKeywords: (keywords) => {
        if (keywords === null)
            return [];
        const lowerCaseKeywords = [];
        const array = keywords.split(",");
        array.forEach(async keyword => {
            if (keyword !== "" && keyword !== " " && keyword !== undefined) {
                lowerCaseKeywords.push(keyword.toLowerCase().trim());
            };
        });
        return lowerCaseKeywords;
    },

    searchKeywords: async (string, positive, negative) => {
        if (positive === undefined || string === undefined || negative === undefined) return false;
        const productName = string.toLowerCase().replace(/["'™®]/g, "").replace(/[/]/g, " ");
        for (let x = 0; x < negative.length; x++) {
            if (productName.indexOf(negative[x]) !== -1) return false;
        };

        for (let x = 0; x < positive.length; x++) {
            if (productName.indexOf(positive[x]) === -1) return false;

        };

        return true;
    }
};