const { AuthenticationError } = require("../utils/customErrors")

module.exports = (req, res, next) => {
    if(!req.session?.user?.userId) return next(new AuthenticationError());
    next();
}