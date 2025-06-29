import type { MockedResponse } from "@apollo/client/testing";

export interface GraphQlMock {
  toArray(): MockedResponse[] | Promise<MockedResponse[]>;
}
