var express = require('express');
var geographies = express.Router();
var all = require('./all');

geographies.get('/', all);
geographies.get('/select', function(req, res){
    res.status(200);
    res.render('index', {
        page:'inventory',
        data:[{"amount":2000}]
    });
});


module.exports = geographies;
