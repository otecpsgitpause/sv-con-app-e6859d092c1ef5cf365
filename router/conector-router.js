'use strict'

var express = require('express');
var conector = require('../controller/conector-controller');
var api = express.Router();

//urls

//8001a1
api.post('/4lkWRXB9rSceWnW4AU2IJ2VqrFJHrD5ok8FrPNbwTBEls8WMTk1NzeMvEfwkxWpyrInS',conector.authenticate);
api.post('/GK6MfOQIu5egThpy4MvdYh7iOFiEbRjpxAtnl5TyQ91PgWiYXB9RitmUCKPMlqvizPru',conector.peticion)
module.exports=api;