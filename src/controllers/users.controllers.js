const userService = require('../services/users.services');

const createUser = async (req, res) => {
  const { body } = req;
  const token = await userService.createUser(body);
  return res.status(201).json({ token });
};
const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

module.exports = { createUser, getAll };
