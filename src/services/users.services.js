const { User } = require("../models");
const { generateToken } = require("../utils/JWT");

const createUser =  async (body) => {
  const { email, password, displayName, image } = body
  const creatingUser = User.create({email, password, displayName, image})
  const token = generateToken({email, password})
  return token;
}
module.exports = {createUser}