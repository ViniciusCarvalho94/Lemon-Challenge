/* istanbul ignore file */

const port = process.env.PORT || 3000;
const api = require('./api');

api.listen(port);

// eslint-disable-next-line
console.log(`Api rodando na porta ${port}`);