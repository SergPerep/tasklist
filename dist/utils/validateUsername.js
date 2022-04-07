module.exports = (username) => {
    const regex = /^[^\W\s][\w\-\.]+$/gi;
    return regex.test(username);
}