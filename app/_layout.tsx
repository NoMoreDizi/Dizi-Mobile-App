import GraphQlMocks from "@/mocks/graphql/index";
import { ApolloMockProvider } from "@/components/provider/ApolloProvider/ApolloMockProvider";
import RootStack from "@/components/stacks/RootStack";
import { UserDetailsMock } from "../mocks/graphql/UserDetails.mock";
import { ApolloMockType } from "../mocks/graphql/constants";
import { DILEMMA_QUERY } from "../components/DilemmaContainer/DilemmaContainer";
import { Blurhash } from 'react-native-blurhash';
import { Asset } from 'expo-asset';

const getBlurHash = async () => {
  try {
    const asset = Asset.fromModule(require('../assets/images/Dilemma/Switzerland.jpg'));
    await asset.downloadAsync();
    const imagePath = asset.localUri || asset.uri;
    const blurhash = await Blurhash.encode(imagePath, 4, 3);
    console.log('Generated BlurHash:', blurhash);
    return blurhash;
  } catch (error) {
    console.error('Error generating BlurHash:', error);
    return 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'; 
  }
};

let BLURHASH: string;
(async () => {
  BLURHASH = await getBlurHash();
})();

const createDilemmaMock = () => ({
  request: {
    query: DILEMMA_QUERY,
  },
  result: {
    data: {
      dilemma: {
        title: "Should I visit this place?",
        votes: Math.floor(Math.random() * 200),
        postedBefore: {
          timestamp: new Date().toISOString(),
        },
        assets: [
          {
            id: `asset-${Math.random().toString(36).substring(2, 9)}`,
            url: require('../assets/images/Dilemma/Switzerland.jpg'),
            accessibilityLabel: "Dizi",
            blurhash: BLURHASH,
          },
        ],
      },
    },
  },
});

const userDetailsMockInstance = new UserDetailsMock(ApolloMockType.TEST);

const mocks = [
  ...Array.from({ length: 10 }, () => createDilemmaMock()),
  ...userDetailsMockInstance.toArray(),
];

export default function RootLayout() {
  return (
    <ApolloMockProvider mocks={GraphQlMocks}>
      <RootStack />
    </ApolloMockProvider>
  );
}