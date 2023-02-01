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

const getUSerById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUSerById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;
  await userService.deleteUser(userId);
  res.status(204).json();
};

module.exports = { createUser, getAll, getUSerById, deleteUser };
