var express = require('express');
var geographies = require('./geographies');
var filters = express.Router();

filters.get('/', function(req, res){
    res.status(200);
    res.render('filters/modal');
});

filters.use('/geographies', geographies);

module.exports = filters;
