/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment DilemmaAssets on Dilemma {\n    assets {\n      id\n      url\n      blurhash\n      accessibilityLabel\n    }\n  }\n": typeof types.DilemmaAssetsFragmentDoc,
    "\n  query Dilemma {\n    dilemma {\n      title\n      ...DilemmaAssets\n      votes\n      postedBefore {\n        timestamp\n        duration @client {\n            type\n            amount\n        }\n      }\n    }\n  }\n": typeof types.DilemmaDocument,
    "\n  query UserDetails {\n    userDetails {\n      inAppCurrency\n    }\n  }\n": typeof types.UserDetailsDocument,
};
const documents: Documents = {
    "\n  fragment DilemmaAssets on Dilemma {\n    assets {\n      id\n      url\n      blurhash\n      accessibilityLabel\n    }\n  }\n": types.DilemmaAssetsFragmentDoc,
    "\n  query Dilemma {\n    dilemma {\n      title\n      ...DilemmaAssets\n      votes\n      postedBefore {\n        timestamp\n        duration @client {\n            type\n            amount\n        }\n      }\n    }\n  }\n": types.DilemmaDocument,
    "\n  query UserDetails {\n    userDetails {\n      inAppCurrency\n    }\n  }\n": types.UserDetailsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DilemmaAssets on Dilemma {\n    assets {\n      id\n      url\n      blurhash\n      accessibilityLabel\n    }\n  }\n"): (typeof documents)["\n  fragment DilemmaAssets on Dilemma {\n    assets {\n      id\n      url\n      blurhash\n      accessibilityLabel\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Dilemma {\n    dilemma {\n      title\n      ...DilemmaAssets\n      votes\n      postedBefore {\n        timestamp\n        duration @client {\n            type\n            amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Dilemma {\n    dilemma {\n      title\n      ...DilemmaAssets\n      votes\n      postedBefore {\n        timestamp\n        duration @client {\n            type\n            amount\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserDetails {\n    userDetails {\n      inAppCurrency\n    }\n  }\n"): (typeof documents)["\n  query UserDetails {\n    userDetails {\n      inAppCurrency\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;