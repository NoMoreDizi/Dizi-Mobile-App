import { createApi } from "unsplash-js";
import { ENVIRONMENT } from "@/helpers/environment";
import type { ApiResponse } from "unsplash-js/src/helpers/response";
import type { Photos } from "unsplash-js/src/methods/search/types/response";
import { randomNumber } from "@/mocks/graphql/helpers/numberHelper";

export const unsplash = createApi({ accessKey: ENVIRONMENT.unsplashKey });

export interface AssetData {
  url: string;
  blurhash: string;
  accessibilityLabel: string;
}

export async function extractDressAssetsData() {
  return extractAssetData(
    await unsplash.search.getPhotos({
      query: "dress",
      perPage: randomNumber(2),
      page: randomNumber(5),
    }),
  );
}

function extractAssetData(assetsData: ApiResponse<Photos>): AssetData[] {
  if (assetsData.type === "error") throw Error(assetsData.errors.join());

  return assetsData.response.results.map(
    ({ blur_hash, alt_description, urls: { regular } }) => {
      return {
        url: regular,
        blurhash: blur_hash ?? "",
        accessibilityLabel: alt_description ?? "",
      };
    },
  );
}
