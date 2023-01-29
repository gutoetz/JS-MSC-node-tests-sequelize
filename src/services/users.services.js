const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const createUser = async (body) => {
  const { email, password, displayName, image } = body;
  await User.create({ email, password, displayName, image });
  const token = generateToken({ email });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  }); 
  console.log(users);
  return users;
};

module.exports = { createUser, getAll };