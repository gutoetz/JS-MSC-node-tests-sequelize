const userService = require("../services/users.services");

const createUser = async (req, res) => {
  const { body } = req;
  const token = await userService.createUser(body);
  return res.status(201).json({token})
};

module.exports = { createUser };
