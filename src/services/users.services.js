const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const createUser = async (body) => {
  const { email, password, displayName, image } = body;
  const newUser = await User.create({ email, password, displayName, image });
  const token = generateToken({ email, id: newUser.id });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  }); 
  console.log(users);
  return users;
};

const getUSerById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  }) || undefined;
  console.log(user);
  return user;
};

const deleteUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = { createUser, getAll, getUSerById, deleteUser };