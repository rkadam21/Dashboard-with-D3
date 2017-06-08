var express = require('express');
var geographies = require('./geographies');
var filters = express.Router();

filters.use('/geographies', geographies);

module.exports = filters;
