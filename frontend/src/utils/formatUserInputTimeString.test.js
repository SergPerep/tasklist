import formatUserInputTimeString from "./formatUserInputTimeString";

test("24-hour clock with separator", () => {
    expect(formatUserInputTimeString("14:00")).toBe("14:00");
})

test("24-hour clock without separator", () => {
    expect(formatUserInputTimeString("1400")).toBe("14:00");
    expect(formatUserInputTimeString("616")).toBe("6:16");
    expect(formatUserInputTimeString("13")).toBe("13:00");
    expect(formatUserInputTimeString("25")).toBe(null);
})

test("12-hour clock with separator", () => {
    // am
    expect(formatUserInputTimeString("2:00am")).toBe("2:00");
    expect(formatUserInputTimeString("2:04am")).toBe("2:04");
    expect(formatUserInputTimeString("2:04AM")).toBe("2:04");
    expect(formatUserInputTimeString("2:40am")).toBe("2:40");
    expect(formatUserInputTimeString("2:4am")).toBe("2:40");
    expect(formatUserInputTimeString("am2:4")).toBe("2:40");
    expect(formatUserInputTimeString("2:9am")).toBe(null);
    expect(formatUserInputTimeString("2:6am")).toBe(null);
    expect(formatUserInputTimeString("02:4am")).toBe("2:40");
    expect(formatUserInputTimeString("24:4am")).toBe("0:40");
    expect(formatUserInputTimeString("25:4am")).toBe(null);
    expect(formatUserInputTimeString("0:00am")).toBe("0:00");
    expect(formatUserInputTimeString(":01am")).toBe(null);
    expect(formatUserInputTimeString("1:am")).toBe("1:00");
    // pm
    expect(formatUserInputTimeString("1:13pm")).toBe("13:13");
    expect(formatUserInputTimeString("01:13pm")).toBe("13:13");
    expect(formatUserInputTimeString("pm1:13")).toBe("13:13");
    expect(formatUserInputTimeString("0:00pm")).toBe("12:00");
    // other
    expect(formatUserInputTimeString("5:4ma")).toBe("5:40");

})

test("12-hour clock without separator", () => {
    // am
    expect(formatUserInputTimeString("200am")).toBe("2:00");
    expect(formatUserInputTimeString("1am")).toBe("1:00");

    // pm
    expect(formatUserInputTimeString("4pm")).toBe("16:00");
})

