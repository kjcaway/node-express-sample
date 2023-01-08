const express = require('express');
const router = express.Router();
const hellController = require('../controller/HelloController')

router.get('/', hellController.getHello);
router.post('/', hellController.postHello);

router.get('/error', hellController.customError)
router.get('/errorPromise', hellController.customErrorPromise)
router.get('/errorJs', hellController.jsError)

module.exports = router;