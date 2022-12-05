const validatePassword = require("./validatePassword");

test("No white spaces", () => {
    expect(validatePassword("   ")).toBe(false);
    expect(validatePassword("sciUBqw7823")).toBe(true);
    expect(validatePassword("sciUB qw7823")).toBe(false);
    expect(validatePassword(" sciUBqw7823")).toBe(false);
    expect(validatePassword("sciUBqw7823 ")).toBe(false);
    expect(validatePassword(" sciUBqw7823 ")).toBe(false);
})


test("No cyrillic symbols", () => {
    expect(validatePassword("русскиеслова")).toBe(false);
});


test("More then 6 symbols", () => {
    expect(validatePassword("less")).toBe(false);
    expect(validatePassword("moreThen6")).toBe(true);
});

test("Unconventional symbols $%#@", ()=>{
    expect(validatePassword("$%#@(@*_+=!")).toBe(true);
});

test("Is a string", () => {
    expect(validatePassword(3)).toBe(false);
});