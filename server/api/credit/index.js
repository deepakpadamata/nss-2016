'use strict';

var express = require('express');
var controller = require('./credit.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('pr'), controller.create);
router.put('/:id', auth.hasRole('pr'), controller.update);
router.patch('/:id', auth.hasRole('pr'), controller.update);
router.delete('/:id', auth.hasRole('pr'), controller.destroy);

module.exports = router;