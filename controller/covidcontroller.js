//Import Bio Model
Bio = require('../model/covidmodel');


//Para index
exports.index = function (req, res) {
    Bio.get(function (err, bio) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "OK",
            message: "Obtidas Bios com Sucesso",
            data: bio       
        });
    });
};

//Criar nova BIO
exports.add = function (req, res) {
    var bio = new Bio();
    bio.data = req.body.data? req.body.data: bio.data;
    bio.confirmados_novos = req.body.confirmados_novos;
    bio.internados_uci = req.body.internados_uci;

    //Guardar e verificar erros
    bio.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "Nova Bio Adicionada!",
            data: bio
        });
    });
};

// Ver Bio
exports.view = function (req, res) {
    Bio.findById(req.params._id, function (err, bio) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "OK",
            message: "Sucesso",
            data: bio
        });
    });
};
	
// maximo 
exports.max = function (req,res) {
	    Bio.aggregate([
		{
			$group: {
					_id: null,
					maximo: {$max: "$confirmados_novos"}
					}
			}
			],function (err, bio) {
        if (err)
            res.send(err);
			res.json({
            message: 'Mais casos',
            data:  bio
        });
    });
};

// minimo
exports.min = function (req,res) {
	    Bio.aggregate([
		{
			$group: {
				_id: null,
				minimo: {$min: "$confirmados_novos"}
					}
				}
		],function (err, bio) {
        if (err)
            res.send(err);
			res.json({
            message: 'Menos casos',
            data:  bio
        });
    });
};



//media
exports.media = function (req,res) {
	    Bio.aggregate([
		{
			$group: {
				_id: null,
				media: {$avg: "$confirmados_novos"}
					}
				}
		],function (err, bio) {
        if (err)
            res.send(err);
			res.json({
            message: 'Média a 7 dias',
            data:  bio
        });
    });
};

//sumatório
exports.sum = function (req,res) {
	    Bio.aggregate([
		{
			$group: {
				_id: null,
				sum: {$sum: "$confirmados_novos"}
					}
				}
		],function (err, bio) {
        if (err)
            res.send(err);
			res.json({
            message: 'Número total de novos casos na semana',
            data:  bio
        });
    });
};

