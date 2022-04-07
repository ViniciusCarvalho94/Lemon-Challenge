const initialRequestService = require('../service/initialRequestService');
const { success } = require('../utils/statusCode');

module.exports = async (_req, res) => {
  const response = initialRequestService();

  return res.status(success).json(response);
};
