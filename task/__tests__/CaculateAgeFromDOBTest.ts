import { calculateAgeFromDOB } from "@/utils/dateUtils";

describe("calculateAgeFromDOB", () => {
  it("calculates correct age for a person born on a given date", () => {
    const dob = "15/06/1990";
    const expectedAge =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 5 ||
      (new Date().getMonth() === 5 && new Date().getDate() < 15)
        ? 1
        : 0);
    expect(calculateAgeFromDOB(dob)).toBe(expectedAge);
  });

  it("handles edge case where today is the birthday", () => {
    const today = new Date();
    const dob = `${today.getDate()}/${today.getMonth() + 1}/${
      today.getFullYear() - 30
    }`;
    expect(calculateAgeFromDOB(dob)).toBe(30);
  });

  it("handles dates at the end of the year", () => {
    const dob = "31/12/1990";
    const expectedAge =
      new Date().getFullYear() -
      1990 -
      (new Date().getMonth() < 11 ||
      (new Date().getMonth() === 11 && new Date().getDate() < 31)
        ? 1
        : 0);
    expect(calculateAgeFromDOB(dob)).toBe(expectedAge);
  });

  it("correctly adjusts for leap year births", () => {
    const dob = "29/02/1992";
    const expectedAge =
      new Date().getFullYear() -
      1992 -
      (new Date().getMonth() < 1 ||
      (new Date().getMonth() === 1 && new Date().getDate() < 29)
        ? 1
        : 0);
    expect(calculateAgeFromDOB(dob)).toBe(expectedAge);
  });
});
