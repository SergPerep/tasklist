import bcrypt from "bcryptjs";

export default (password: string) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}