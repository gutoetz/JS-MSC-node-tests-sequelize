const authService = require("../services/login.services");

const auth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
  const authLogin = await authService.authLogin({email, password});
  return res.status(200).json(authLogin)
  } catch(error) {
    next(error)
  }
};

module.exports = { auth };
