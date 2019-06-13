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
    }
}

