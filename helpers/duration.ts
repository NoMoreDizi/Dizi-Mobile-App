import { DateTime } from "luxon";
import { type DurationPayload, Period } from "@/graphql/__generated__/types";

/**
 * Calculates the duration from a given ISO date string to the current date.
 * Returns the most significant period (Year, Month, Week, Day, Hour, Minute).
 *
 * @param sinceIsoDateString The ISO 8601 date string (e.g., "2023-01-15T10:00:00Z").
 * @param fromDateTime The {@link DateTime} from which the Duration is to be calculated from.
 * @returns An object containing the amount and type of the duration, or null if the date string is invalid.
 */
export function calculateDurationSince(
  sinceIsoDateString: string,
  fromDateTime: DateTime<true>,
): DurationPayload {
  const sinceDate = DateTime.fromISO(sinceIsoDateString);

  // Check for invalid dates
  if (!sinceDate.isValid) {
    throw Error(
      `Invalid ISO date string: ${sinceIsoDateString} - Luxon error: ${sinceDate.invalidExplanation ?? "Not Available"}`,
    );
  } else if (sinceDate > fromDateTime) {
    throw Error(
      `Date "${sinceIsoDateString}" is in the future of ${fromDateTime.toISO()}.`,
    );
  }

  // Calculate the difference using diff()
  // Luxon can calculate differences in multiple units at once.
  // We prioritize larger units for the most significant period.
  const diff = fromDateTime.diff(sinceDate, [
    "years",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
  ]);

  if (diff.years >= 1) {
    return { amount: diff.years, type: Period.Year };
  } else if (diff.months >= 1) {
    return { amount: diff.months, type: Period.Month };
  } else if (diff.weeks >= 1) {
    return { amount: diff.weeks, type: Period.Week };
  } else if (diff.days >= 1) {
    return { amount: diff.days, type: Period.Day };
  } else if (diff.hours >= 1) {
    return { amount: diff.hours, type: Period.Hour };
  } else if (diff.minutes >= 1) {
    return { amount: diff.minutes, type: Period.Minute };
  } else {
    return { amount: 0, type: Period.Now };
  }
}
