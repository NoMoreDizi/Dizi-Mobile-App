import { DurationTypePolicy } from "@/constants/graphql/typePolicy/duration";
import type { StrictTypedTypePolicies } from "@/graphql/__generated__/apollo-helpers";

const TypePolicies: StrictTypedTypePolicies = { ...DurationTypePolicy };
export default TypePolicies;
