const _ = require('underscore');

(async () => {
    const b = [
        {
            "id": 2069567864960,
            "title": "Kith Winter Footwear",
            "handle": "kith-winter-footwear",
            "body_html": "",
            "published_at": "2020-11-17T18:16:06-05:00",
            "created_at": "2020-11-17T18:16:06-05:00",
            "updated_at": "2020-11-17T18:16:07-05:00",
            "vendor": "Kith",
            "product_type": "Nameplate",
            "tags": [
                "112020"
            ],
            "variants": [
                {
                    "id": 19438940651648,
                    "title": "Default Title",
                    "option1": "Default Title",
                    "option2": null,
                    "option3": null,
                    "sku": "",
                    "requires_shipping": true,
                    "taxable": true,
                    "featured_image": null,
                    "available": true,
                    "price": "0.00",
                    "grams": 0,
                    "compare_at_price": null,
                    "position": 1,
                    "product_id": 2069567864960,
                    "created_at": "2020-11-17T18:16:06-05:00",
                    "updated_at": "2020-11-17T18:16:06-05:00"
                }
            ],
            "images": [],
            "options": [
                {
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Default Title"
                    ]
                }
            ]
        }
    ];
    const a = [
        {
            "id": 2069567864960,
            "title": "Kith Winter Footwear",
            "handle": "kith-winter-footwear",
            "body_html": "",
            "published_at": "2020-11-17T18:16:06-05:00",
            "created_at": "2020-11-17T18:16:06-05:00",
            "updated_at": "2020-11-17T18:16:07-05:00",
            "vendor": "Kith",
            "product_type": "Nameplate",
            "tags": [
                "112020"
            ],
            "variants": [
                {
                    "id": 19438940651648,
                    "title": "Default Title",
                    "option1": "Default Title",
                    "option2": null,
                    "option3": null,
                    "sku": "",
                    "requires_shipping": true,
                    "taxable": true,
                    "featured_image": null,
                    "available": false,
                    "price": "0.00",
                    "grams": 0,
                    "compare_at_price": null,
                    "position": 1,
                    "product_id": 2069567864960,
                    "created_at": "2020-11-17T18:16:06-05:00",
                    "updated_at": "2020-11-17T18:16:06-05:00"
                }
            ],
            "images": [],
            "options": [
                {
                    "name": "Title",
                    "position": 1,
                    "values": [
                        "Default Title"
                    ]
                }
            ]
        }
    ];
    console.log(JSON.stringify(_.reject(a, _.partial(_.findWhere, b, _))));
})();
