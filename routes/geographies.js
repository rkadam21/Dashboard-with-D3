var express = require('express');
var regdata = require('../public/data/region.json');
var geographies = express.Router();

geographies.get('/', function(req, res){

    res.json(regdata);
});

geographies.get('/select', function(req, res){
    res.status(200);
    res.render('index', {
        page:'inventory',
        data:[{"amount":2000}]
    });
});

module.exports = geographies;
