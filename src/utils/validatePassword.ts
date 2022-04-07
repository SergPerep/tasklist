import passwordValidator from "password-validator";

export default (password: string) => {

    const schema = new passwordValidator();
    schema
        .is().min(6) // Minimum length 8
        .is().max(20) // Maximum length 20
        .has().not().spaces() // Should not have spaces
        .has().not(/[а-я]/gi) // Has no cyrillic symbols

    const isValid = schema.validate(password)
    // if (!isValid) console.log(schema.validate(password));
    return isValid;
}