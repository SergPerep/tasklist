const { ForbiddenError, MissingCredentialsError, AuthenticationError } = require("../utils/customErrors");

module.exports = (err, req, res, next) => {
    console.log("--> handleErrors");
    if (!err) return;
    if(err instanceof ForbiddenError || MissingCredentialsError || AuthenticationError) res.status(err.statusCode).json(err.message);
    console.log(err.stack);
}