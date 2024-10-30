import date from "date-and-time";
export let today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
export const tomorrow = date.addDays(today, 1);