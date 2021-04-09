var mongoose = require('mongoose');

//schema
var bioSchema = mongoose.Schema({
    data: {
        type: String
    },
    confirmados_novos: {
        type: Number
    },
    internados_uci: {
        type: Number
}
});

// Export Bio Model
var Bio = module.exports = mongoose.model('covid', bioSchema);

module.exports.get = function (callback, limit) {
   Bio.find(callback).limit(limit); 
}