const formatUserInputTimeString = (timeString: string) => {
    if (typeof timeString !== "string") return console.log(`Expected string instead of ${typeof timeString}`);
    timeString = timeString.replace(/[^\d:amp]/gi, '');
    timeString = timeString.toLowerCase();
    if (!timeString) return null;

    let hoursStr, hoursNum, minutesStr, minutesNum;

    const hasSeparator = /:/g.test(timeString);
    if (hasSeparator) {
        const [beginningOfString, endingOfString] = timeString.replace(/[^\d:]/gi, '').split(":");

        const hoursStrArr = beginningOfString.match(/\d{1,2}/);
        if (!hoursStrArr) return null;
        hoursStr = hoursStrArr[0];
        hoursNum = parseInt(hoursStr);

        const minutesStrArr = endingOfString.match(/\d{1,2}/);
        minutesStr = minutesStrArr ? minutesStrArr[0] : "00";
        if (minutesStr.length !== 2) minutesStr = minutesStr + "0";
        minutesNum = parseInt(minutesStr);
    } else {
        const numStrArr = timeString.match(/\d{1,4}/) || {};
        const numStr = numStrArr[0];

        switch (numStr.length) {
            case 1:
            case 2:
                hoursNum = parseInt(numStr);
                minutesNum = 0;
                break;
            case 3:
                hoursNum = parseInt(numStr.slice(0, 1));
                minutesNum = parseInt(numStr.slice(1, 3));
                break;
            case 4:
                hoursNum = parseInt(numStr.slice(0, 2));
                minutesNum = parseInt(numStr.slice(2, 4));
                break;
            default:
                return null;
        }
    }

    const timePeriodArr = timeString.match(/[ap]m/i) || [];
    const timePeriod = timePeriodArr[0];
    if (timePeriod === "pm") {
        if (hoursNum > 12) return null;
        hoursNum = hoursNum + 12;
    }

    if (hoursNum > 24) return null;
    if (hoursNum === 24) hoursNum = 0;
    hoursStr = hoursNum.toString();
    if (minutesNum > 59) return null;

    minutesStr = minutesNum <= 10 ? "0" + minutesNum : minutesNum.toString();
    return `${hoursStr}:${minutesStr}`;
}

export default formatUserInputTimeString;