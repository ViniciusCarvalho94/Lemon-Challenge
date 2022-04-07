const express = require('express');

const clientEligibleController = require('./controller/clientEligibleController');
const initialRequestController = require('./controller/initialRequestController');
const error = require('./middleware/errorMiddleware');

const api = express();

api.use(express.json());

api.get('/', initialRequestController);
api.post('/', clientEligibleController);

api.use(error);

module.exports = api;
