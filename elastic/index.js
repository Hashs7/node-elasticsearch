let esClient;

module.exports = {
    init: () => {
        const es = require('elasticsearch');
        const { ELASTIC_HOST, ELASTIC_PORT} = process.env;
        const host = ELASTIC_HOST + ':' + ELASTIC_PORT;

        esClient = new es.Client({
            host,
            log: 'error'
        });

        return esClient;
    },
    getClient: () => {
        if(!esClient) {
            throw new Error('Elastic client not initialized');
        }

        return esClient
    },
    bulkIndex: (index, type, data) => {
        let bulkBody = [];

        data.forEach(item => {
            bulkBody.push({
                index: {
                    _index: index,
                    _type: type,
                    _id: item.id
                }
            });

            bulkBody.push(item);
        });

        esClient.bulk({body: bulkBody})
            .then(response => {
                let errorCount = 0;
                response.items.forEach(item => {
                    if (item.index && item.index.error) {
                        console.log(++errorCount, item.index.error);
                    }
                });
                return `Successfully indexed ${data.length - errorCount} out of ${data.length} items`;
            })
            .catch(console.err);
    }
};

