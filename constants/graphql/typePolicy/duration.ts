import type { StrictTypedTypePolicies } from "@/graphql/__generated__/apollo-helpers";
import { calculateDurationSince } from "@/helpers/duration";
import { DateTime } from "luxon";

export const DurationTypePolicy: StrictTypedTypePolicies = {
  PostedBeforePayload: {
    fields: {
      duration: {
        read(_, { readField }) {
          const fieldName = "timestamp";
          const timestamp = readField<string>(fieldName);
          if (timestamp === undefined)
            throw Error(`Field: ${fieldName} was not found`);
          else {
            return calculateDurationSince(timestamp, DateTime.now());
          }
        },
      },
    },
  },
};
