import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type DilemmaKeySpecifier = ('id' | 'postedBefore' | 'title' | 'votes' | DilemmaKeySpecifier)[];
export type DilemmaFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	postedBefore?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DurationPayloadKeySpecifier = ('amount' | 'type' | DurationPayloadKeySpecifier)[];
export type DurationPayloadFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostedBeforePayloadKeySpecifier = ('duration' | 'timestamp' | PostedBeforePayloadKeySpecifier)[];
export type PostedBeforePayloadFieldPolicy = {
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('dilemma' | 'userDetails' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	dilemma?: FieldPolicy<any> | FieldReadFunction<any>,
	userDetails?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserDetailsKeySpecifier = ('id' | 'inAppCurrency' | UserDetailsKeySpecifier)[];
export type UserDetailsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	inAppCurrency?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Dilemma?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DilemmaKeySpecifier | (() => undefined | DilemmaKeySpecifier),
		fields?: DilemmaFieldPolicy,
	},
	DurationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DurationPayloadKeySpecifier | (() => undefined | DurationPayloadKeySpecifier),
		fields?: DurationPayloadFieldPolicy,
	},
	PostedBeforePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostedBeforePayloadKeySpecifier | (() => undefined | PostedBeforePayloadKeySpecifier),
		fields?: PostedBeforePayloadFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	UserDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserDetailsKeySpecifier | (() => undefined | UserDetailsKeySpecifier),
		fields?: UserDetailsFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;