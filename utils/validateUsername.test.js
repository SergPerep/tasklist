const validateUsername = require("./validateUsername");

test("No whitespaces", () => {
    expect(validateUsername("nikname76")).toBe(true);
    expect(validateUsername(" nikname76")).toBe(false);
    expect(validateUsername("nikname76 ")).toBe(false);
    expect(validateUsername("nik name76")).toBe(false);
});

test("Only letters and digits", () => {
    expect(validateUsername("nikname76&#")).toBe(false);
});

test("At least one letter", () => {
    expect(validateUsername("nikname-76")).toBe(true);
});

test("Dashes allowed", () => {
    expect(validateUsername("nikname-76")).toBe(true);
});

test("No cyrillic symbols", () => {
    expect(validateUsername("русскиеслова")).toBe(false);
});