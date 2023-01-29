const { authenticatToken } = require('../utils/JWT');

const authToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization;
    const user = await authenticatToken(token);
    if (!user) {
        throw new Error(JSON.stringify({
            status: 401,
            message: 'jwt malformed',
        }));
    }
    res.locals.user = user;

    next();
} catch (error) {
    res.status(error.status).json({ message: error.message });
}
};

module.exports = authToken;