var express = require('express');
var routes = express.Router();
var url = require('url');
var filter = require('./filter');
var fdata = require('../public/data/factdata.json');

routes.get('/', function(req, res){

    res.status(200);
    res.render('index', {
        page:'inventory'
    });
});

routes.get('/movement', function(req, res){

    res.status(200);
    res.render('index', {
        page:'movement',
        data:fdata
    });
});

routes.get('/fact', function(req, res){
    res.status(200);
    res.json(fdata);
});

routes.use('/filters', filter);

module.exports = routes;
