const clientEligibleService = require('../service/clientEligibleService');
const { success } = require('../utils/statusCode');

module.exports = async (req, res, next) => {
  try {
    const clientInfo = req.body;

    const response = clientEligibleService(clientInfo);

    return res.status(success).json(response);
  } catch (error) {
    return next(error);
  }
};
