const elastic = require('./index');

const search = (params) => {
    return elastic.getClient().search(params);
};

/**
 *
 * @param channel
 * @param q
 * @param from
 * @param size
 * @returns {Promise<T | void>}
 */
module.exports = ({channel, q, from = 0, size = 10}) => {
    const params = {
        index: 'bitbag_shop_products_dev',
        body: {
            from,
            size,
            query: {
                bool : {
                    must : {
                        term : { enabled: true }
                    },
                    filter: {
                        term : { name_en_us: q.trim().toLowerCase() }
                    },
                    should : [
                        { term : { channels : channel } },
                    ],
                    boost : 1.0
                }
            }
        }
    };

    return search(params)
        .then(results => {
            console.log(`found ${results.hits.total.value} items in ${results.took}ms`);
            return results.hits;
        })
        .catch(console.error);
};