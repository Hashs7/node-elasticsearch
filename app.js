const createError = require('http-errors');
const fs          = require('fs');
const path        = require('path');
const express     = require('express');
const logger      = require('morgan');
const cors        = require('cors');
const elastic     = require('./elastic');
const verify      = require('./elastic/verify');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(logger('dev', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

elastic.init();

async function indexData() {
    const articlesRaw = await fs.readFileSync('./data.json');
    const articles    = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    elastic.bulkIndex('library', 'article', articles);
}

indexData();
verify();


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    const error      = new Error(err.message);
    error.statusCode = err.status || 500;
    throw error;
});

module.exports = app;
