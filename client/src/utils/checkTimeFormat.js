const checkTimeFormat = (timeString) => {
    const regEx = /\d{1,2}:\d{1,2}(\s+)?([pP][mM]|[aA][mM])?/g;
    const isTimeString = regEx.test(timeString);
    return isTimeString;
}

module.exports = checkTimeFormat;