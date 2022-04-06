const { serverError } = require('../utils/statusCode');

// eslint-disable-next-line
module.exports = (err, _req, res, _next) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }

  return res.status(serverError).json({ message: 'Internal Error' });
};
