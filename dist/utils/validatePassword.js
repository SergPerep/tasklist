const passwordValidator = require("password-validator");

module.exports = (password) => {

    const shema = new passwordValidator();
    shema
        .is().min(6) // Minimum lingth 8
        .is().max(20) // Maximum length 20
        .has().not().spaces() // Should not have spaces
        .has().not(/[а-я]/gi) // Has no cyrillic symbols

    const isValid = shema.validate(password)
    // if (!isValid) console.log(shema.validate(password));
    return isValid;
}