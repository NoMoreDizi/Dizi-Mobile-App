import { DateTime } from "luxon";
import { calculateDurationSince } from "@/helpers/duration";
import { Period } from "@/graphql/__generated__/types";

describe("calculateDurationSince", () => {
  // Fixed reference date for consistent testing
  const fixedDateTime = DateTime.fromISO("2023-06-15T12:00:00Z", {
    zone: "utc",
  }) as DateTime<true>;

  describe("valid date calculations", () => {
    it.each([
      {
        description:
          "should return years when the difference is more than a year",
        pastDate: "2022-01-15T12:00:00Z", // 1 year and 5 months before fixedDateTime
        expected: { amount: 1, type: Period.Year },
      },
      {
        description:
          "should return months when the difference is more than a month but less than a year",
        pastDate: "2023-04-15T12:00:00Z", // 2 months before fixedDateTime
        expected: { amount: 2, type: Period.Month },
      },
      {
        description:
          "should return weeks when the difference is more than a week but less than a month",
        pastDate: "2023-06-01T12:00:00Z", // 2 weeks before fixedDateTime
        expected: { amount: 2, type: Period.Week },
      },
      {
        description:
          "should return days when the difference is more than a day but less than a week",
        pastDate: "2023-06-13T12:00:00Z", // 2 days before fixedDateTime
        expected: { amount: 2, type: Period.Day },
      },
      {
        description:
          "should return hours when the difference is more than an hour but less than a day",
        pastDate: "2023-06-15T08:00:00Z", // 4 hours before fixedDateTime
        expected: { amount: 4, type: Period.Hour },
      },
      {
        description:
          "should return minutes when the difference is more than a minute but less than an hour",
        pastDate: "2023-06-15T11:30:00Z", // 30 minutes before fixedDateTime
        expected: { amount: 30, type: Period.Minute },
      },
      {
        description:
          "should return NOW when the difference is less than a minute",
        pastDate: "2023-06-15T11:59:30Z", // 30 seconds before fixedDateTime
        expected: { amount: 0, type: Period.Now },
      },
    ])("$description", ({ pastDate, expected }) => {
      // WHEN
      const result = calculateDurationSince(pastDate, fixedDateTime);

      // THEN
      expect(result).toEqual(expected);
    });
  });

  describe("error handling", () => {
    it.each([
      {
        description: "should throw an error for invalid date strings",
        invalidInput: "not-a-date",
        errorPattern: /Invalid ISO date string/,
      },
      {
        description: "should throw an error for future dates",
        invalidInput: "2023-07-15T12:00:00Z", // 1 month after fixedDateTime
        errorPattern: /is in the future of/,
      },
    ])("$description", ({ invalidInput, errorPattern }) => {
      // WHEN & THEN
      expect(() => calculateDurationSince(invalidInput, fixedDateTime)).toThrow(
        errorPattern,
      );
    });
  });

  describe("edge cases", () => {
    it.each([
      {
        description: "should handle dates at the boundary of different periods",
        pastDate: "2022-06-15T12:00:00Z", // Exactly 1 year difference
        expected: { amount: 1, type: Period.Year },
      },
      {
        description: "should handle dates with fractional differences",
        pastDate: "2021-12-15T12:00:00Z", // 1.5 years difference
        expected: { amount: 1, type: Period.Year },
      },
    ])("$description", ({ pastDate, expected }) => {
      // WHEN
      const result = calculateDurationSince(pastDate, fixedDateTime);

      // THEN
      expect(result).toEqual(expected);
    });
  });
});
