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
  id: Scalars['ID']['output'];
  /** Information about when the dilemma was posted. */
  postedBefore: PostedBeforePayload;
  /** The title of the Dilemma */
  title: Scalars['String']['output'];
  /** The number of votes for this dilemma. */
  votes: Scalars['Int']['output'];
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

export type DilemmaQueryVariables = Exact<{ [key: string]: never; }>;


export type DilemmaQuery = { __typename?: 'Query', dilemma: { __typename?: 'Dilemma', title: string, votes: number, postedBefore: { __typename?: 'PostedBeforePayload', timestamp: string, duration: { __typename?: 'DurationPayload', type: Period, amount: number } } } };

export type UserDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserDetailsQuery = { __typename?: 'Query', userDetails: { __typename?: 'UserDetails', inAppCurrency: number } };
