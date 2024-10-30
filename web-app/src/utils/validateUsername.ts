export default (username: string) => {
    const regex = /^[^\W\s][\w\-\.]+$/gi;
    return regex.test(username);
}

