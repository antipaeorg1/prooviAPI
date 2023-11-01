const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const jwtMiddleware = require('../utils/jwt/jwtMiddleware')

router.get('/', jwtMiddleware.authenticateToken, userController.getUserList);
router.delete('/delete/:id/', jwtMiddleware.authenticateToken, userController.deleteUser);

module.exports = router;
