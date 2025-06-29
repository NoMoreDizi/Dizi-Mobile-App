/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Represents a dilemma with voting options. */
export type Dilemma = {
  __typename?: 'Dilemma';
  /** Optional list of assets to display with the Dilemma. */
  assets?: Maybe<Array<DilemmaAsset>>;
  id: Scalars['ID']['output'];
  /** Information about when the dilemma was posted. */
  postedBefore: PostedBeforePayload;
  /** The title of the Dilemma */
  title: Scalars['String']['output'];
  /** The number of votes for this dilemma. */
  votes: Scalars['Int']['output'];
};

/** Assets related to a Dilemma. */
export type DilemmaAsset = {
  __typename?: 'DilemmaAsset';
  /** Label to read aloud for Screen Reader. */
  accessibilityLabel: Scalars['String']['output'];
  /** Blurred Image Hash to display while loading the real asset. */
  blurhash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The URL to fetch this asset. */
  url: Scalars['String']['output'];
};

/** The Duration since when a Dilemma was posted. */
export type DurationPayload = {
  __typename?: 'DurationPayload';
  /** The amount in Periods, e.g. "2" weeks */
  amount: Scalars['Int']['output'];
  /** The Period in a human-friendly format, e.g one "month". */
  type: Period;
};

/** Represents a period type for time-related data. */
export enum Period {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Month = 'MONTH',
  Now = 'NOW',
  Week = 'WEEK',
  Year = 'YEAR'
}

/** Information about when an entity was posted. */
export type PostedBeforePayload = {
  __typename?: 'PostedBeforePayload';
  duration: DurationPayload;
  timestamp: Scalars['String']['output'];
};

/** All Entry Points. */
export type Query = {
  __typename?: 'Query';
  /**
   * Fetches a dilemma with its votes and posting time information
   *
   * This is to be enriched by a local only Field of type `PostedBefore` on the client.
   *
   * # Example
   *
   * ```gql
   * query dilemma {
   *   votes
   *   postedBeforeInfo: {
   *     timestamp
   *     postedBefore @client #<==
   *   }
   * }
   * ```
   */
  dilemma: Dilemma;
  /** Fetches the current User's general data */
  userDetails: UserDetails;
};

/** General Data specific to a User. */
export type UserDetails = {
  __typename?: 'UserDetails';
  id: Scalars['ID']['output'];
  /** How much in App Currency (i.e. Karma) the User currently has. */
  inAppCurrency: Scalars['Int']['output'];
};

export type DilemmaAssetsFragment = { __typename?: 'Dilemma', assets?: Array<{ __typename?: 'DilemmaAsset', id: string, url: string, blurhash: string, accessibilityLabel: string }> | null } & { ' $fragmentName'?: 'DilemmaAssetsFragment' };

export type DilemmaQueryVariables = Exact<{ [key: string]: never; }>;


export type DilemmaQuery = { __typename?: 'Query', dilemma: (
    { __typename?: 'Dilemma', title: string, votes: number, postedBefore: { __typename?: 'PostedBeforePayload', timestamp: string, duration: { __typename?: 'DurationPayload', type: Period, amount: number } } }
    & { ' $fragmentRefs'?: { 'DilemmaAssetsFragment': DilemmaAssetsFragment } }
  ) };

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = { __typename?: 'Query', userDetails: { __typename?: 'UserDetails', inAppCurrency: number } };

export const DilemmaAssetsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DilemmaAssets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dilemma"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityLabel"}}]}}]}}]} as unknown as DocumentNode<DilemmaAssetsFragment, unknown>;
export const DilemmaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dilemma"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dilemma"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"DilemmaAssets"}},{"kind":"Field","name":{"kind":"Name","value":"votes"}},{"kind":"Field","name":{"kind":"Name","value":"postedBefore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DilemmaAssets"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Dilemma"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"accessibilityLabel"}}]}}]}}]} as unknown as DocumentNode<DilemmaQuery, DilemmaQueryVariables>;
export const UserDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inAppCurrency"}}]}}]}}]} as unknown as DocumentNode<UserDetailsQuery, UserDetailsQueryVariables>;