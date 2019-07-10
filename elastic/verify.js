const elastic = require('./index');

function indices() {
    return elastic.getClient().cat.indices({v: true})
        .then(console.log)
        .catch(err => console.error(`Error connecting to the es client: ${err}`));
}

module.exports = () => {
    console.log('elasticsearch indices information:');
    indices();
};