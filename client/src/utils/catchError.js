// Put it insude catch statementc
const catchError = (error) => {
    console.error(error.name + ":", error.message, error.source);
}

export default catchError;