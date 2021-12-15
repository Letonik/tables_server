const Router = require('express');
const router = new Router();
const tableController = require('../controllers/tableController');

router.post('/table', tableController.fillTable);
router.get('/table', tableController.getTable);



module.exports = router;