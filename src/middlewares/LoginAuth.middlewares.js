const { User } = require('../models');

const authLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const findUser = await User.findOne({
    where: { email, password },
  });

  if (!findUser) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};

module.exports = authLogin;
