const authService = require('../services/login.services');

const auth = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.authLogin({ email, password });
  return res.status(200).json({ token });
};

module.exports = { auth };
