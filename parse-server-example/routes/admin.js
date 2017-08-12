const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const VerifyIfAdmin = require('../controllers/VerifyIfAdmin');

router.post('/user', VerifyIfAdmin.verify, AdminController.updateUser);

module.exports = router;