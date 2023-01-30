const { generateToken } = require('../utils/JWT');

const authLogin = async ({ email, password }) => {
  const token = generateToken({ email, password });
  return token;
};

module.exports = { authLogin };
