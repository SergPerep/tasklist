import formatTimeStringForTaskState from "./formatTimeStringForTaskState";
import { WrongTypeError } from "./customErrors";

test("Without time zone offset", () => {
    expect(formatTimeStringForTaskState("04:00:00+00:00")).toBe("5:00");
});

test("With time zone offset", () => {
    expect(formatTimeStringForTaskState("04:00:00+01:00")).toBe("4:00");
    expect(formatTimeStringForTaskState("05:00:00+02:00")).toBe("4:00");
    expect(formatTimeStringForTaskState("05:00:00-03:30")).toBe("9:30");
});

test("Empty string", () => {
    expect(formatTimeStringForTaskState("")).toBe(null);
});

test("NaN", () => {
    expect(formatTimeStringForTaskState(NaN)).toBe(null);
});

test("Empty object", () => {
    expect(() => formatTimeStringForTaskState({})).toThrowError(WrongTypeError);
});

test("Null", () => {
    expect(formatTimeStringForTaskState(null)).toBe(null);
});