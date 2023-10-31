const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');



router.get('/email', emailController.sendEmail);
router.post('/validation',emailController.validateAccount)

module.exports = router;
