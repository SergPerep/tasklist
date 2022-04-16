const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateUsername = (usernameStr: string) => {
    // console.log({ usernameStr })
    if (!usernameStr) return { state: false, message: null };
    if (typeof usernameStr !== "string") {
        console.error("Expected string instead of " + typeof usernameStr, { usernameStr });
        return { state: false, message: null };
    }

    if (/\s/g.test(usernameStr)) return { state: false, message: "No spaces, please" };
    if (emailRegEx.test(usernameStr)) return { state: false, message: "Don't use email, please" };
    if (usernameStr.length < 3) return { state: false, message: "Should be longer than 3 characters" };
    if (!/\D/g.test(usernameStr)) return { state: false, message: "Add at least one letter" };

    return { state: true, message: null };
}

export default validateUsername;