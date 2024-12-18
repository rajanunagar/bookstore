/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBook = /* GraphQL */ `mutation CreateBook($newBook: BookInput) {
  createBook(newBook: $newBook) {
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
` as GeneratedMutation<
  APITypes.CreateBookMutationVariables,
  APITypes.CreateBookMutation
>;
export const createOrder = /* GraphQL */ `mutation CreateOrder($newOrder: OrderInput) {
  createOrder(newOrder: $newOrder) {
    userId
    orderId
    book {
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
    quantity
    bookId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
