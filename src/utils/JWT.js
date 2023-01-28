require("dotenv").config();

const jwt = require("jsonwebtoken");

const jwtConfig = {
  expiresIn: "7d",
  algorithm: "HS256",
};

const secret = process.env.JWT_SECRET || 'secretCode'

const generateToken = ({ email, password }) =>
  jwt.sign({ email, password }, secret, jwtConfig);

const authenticatToken = async (token) => {
  if (!token) {
    const error = new Error("missing auth token");
    error.status = 401;
    throw error;
  }
  try {
    const decryptedData = await jwt.verify(token, JWT_SECRET);
    return decryptedData;
  } catch (err) {
    const error = new Error("jwt error");
    error.status = 401;
    throw error;
  }
};

module.exports = { generateToken, authenticatToken };
