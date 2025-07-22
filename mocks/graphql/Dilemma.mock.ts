import { randomNumber } from "@/mocks/graphql/helpers/numberHelper";
import type { MockedResponse } from "@apollo/client/testing";
import type { DilemmaQuery } from "@/graphql/__generated__/types";
import { GET_DILEMMA } from "@/components/dilemma/DilemmaContainer";
import type { ApolloMockType } from "@/mocks/graphql/constants";
import type { GraphQlMock } from "@/mocks/graphql/GraphqlMock";
import { calculateDurationSince } from "@/helpers/duration";
import { DateTime, Duration } from "luxon";
import { LoremIpsum } from "lorem-ipsum";
import {
  type AssetData,
  extractDressAssetsData,
} from "@/mocks/graphql/helpers/unsplashHelpers";

const lorem = new LoremIpsum({ wordsPerSentence: { min: 2, max: 6 } });

export class DilemmaMock implements GraphQlMock {
  constructor(private readonly mockType: ApolloMockType) {}

  async toArray() {
    return [
      this.createDilemmaMock({
        title: lorem.generateSentences(1),
        assets: await extractDressAssetsData(),
        votes: randomNumber(1000),
        postedBefore: DateTime.now()
          .minus(Duration.fromObject({ minutes: randomNumber(1000) }))
          .toISO(),
        fromDateTime: DateTime.now(),
      }),
    ];
  }

  createDilemmaMock({
    title,
    assets,
    votes,
    postedBefore,
    fromDateTime,
  }: {
    title: string;
    assets: AssetData[];
    votes: number;
    postedBefore: string;
    fromDateTime: DateTime<true>;
  }): MockedResponse<DilemmaQuery> {
    return {
      request: {
        query: GET_DILEMMA,
      },
      result: {
        data: {
          dilemma: {
            __typename: "Dilemma",
            title,
            assets: assets.map(({ url, accessibilityLabel, blurhash }) => {
              return {
                __typename: "DilemmaAsset",
                id: "1",
                url,
                accessibilityLabel,
                blurhash,
              };
            }),
            votes,
            postedBefore: {
              __typename: "PostedBeforePayload",
              timestamp: postedBefore,
              duration: {
                __typename: "DurationPayload",
                ...calculateDurationSince(postedBefore, fromDateTime),
              },
            },
          },
        },
      },
      delay: this.mockType,
      maxUsageCount: Number.POSITIVE_INFINITY,
    };
  }
}
