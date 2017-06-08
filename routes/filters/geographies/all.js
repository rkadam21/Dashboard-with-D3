var data = require('../../../public/data/region.json');

module.exports = function(req, res){
    res.json(data);
};
