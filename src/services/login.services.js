const { generateToken } = require('../utils/JWT');
const { User } = require('../models');

const authLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });
  const token = generateToken({ email, id: user.id });
  return token;
};

module.exports = { authLogin };
