const express = require('express');

const clientEligibleController = require('./controller/clientEligibleController');
const error = require('./middleware/errorMiddleware');

const api = express();

api.use(express.json());

api.post('/', clientEligibleController);

api.use(error);

module.exports = api;
