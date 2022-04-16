const checkTimeFormat = (timeString: string) => {
    const regEx = /\d{1,2}:\d{1,2}(\s+)?([pP][mM]|[aA][mM])?/g;
    const isTimeString = regEx.test(timeString);
    return isTimeString;
}

export default checkTimeFormat;