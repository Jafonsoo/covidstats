//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API funcional !',
        message: 'Bem-vindo ao FirstRest API !'
    });
});

//Import Bio Controller
var registoController = require('../controller/covidcontroller');

// Bio routes
router.route('/bio')
    .get(registoController.index);

router.route('/bio/:bio_id')
    .get(registoController.view);
   
router.route('/max')
	.get(registoController.max);
	
router.route('/min')
	.get(registoController.min);
	
router.route('/media')
	.get(registoController.media);
	
router.route('/sum')
	.get(registoController.sum);


//Export API routes
module.exports = router;