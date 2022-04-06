const express = require('express');

const clientEligibleController = require('./controller/clientEligibleController');
const error = require('./middleware/errorMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/', clientEligibleController);

app.use(error);

// eslint-disable-next-line
app.listen(port, () => console.log(`Server is running on port ${port}!`));
