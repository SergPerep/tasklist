import formatTimeStringForTaskState from "./formatTimeStringForTaskState";

test("Null", () => {
    expect(formatTimeStringForTaskState(null)).toBe(null);
});
test("04:00", () => {
    expect(formatTimeStringForTaskState("04:00")).toBe("4:00");
});
test("04:00+01:00", () => {
    expect(formatTimeStringForTaskState("04:00+01:00")).toBe("4:00");
});