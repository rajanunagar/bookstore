/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateBook = /* GraphQL */ `subscription OnCreateBook {
  onCreateBook {
    bookId
    title
    description
    imageUrl
    author
    price
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBookSubscriptionVariables,
  APITypes.OnCreateBookSubscription
>;
