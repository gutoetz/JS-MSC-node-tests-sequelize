const { User } = require("../models");
const { generateToken } = require("../utils/JWT");

const authLogin = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error(JSON.stringify({
      status: 400,
      message: "Some required fields are missing",
    })); 
  }

  const findUser = await User.findOne({
    where: { email, password },
  });

  if (!findUser) {
    throw new Error(JSON.stringify({
      status: 400,
      message: "Invalid fields",
    })); 
  }

  const token = generateToken({email, password});
  console.log(findUser)
  return {token};
};

module.exports = { authLogin };
