/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBookById = /* GraphQL */ `query GetBookById($bookId: ID!) {
  getBookById(bookId: $bookId) {
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
` as GeneratedQuery<
  APITypes.GetBookByIdQueryVariables,
  APITypes.GetBookByIdQuery
>;
export const listBooks = /* GraphQL */ `query ListBooks($limit: Int!, $nextToken: String) {
  listBooks(limit: $limit, nextToken: $nextToken) {
    books {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListBooksQueryVariables, APITypes.ListBooksQuery>;
export const myOrders = /* GraphQL */ `query MyOrders($limit: Int!, $nextToken: String) {
  myOrders(limit: $limit, nextToken: $nextToken) {
    orderItems {
      userId
      orderId
      quantity
      bookId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.MyOrdersQueryVariables, APITypes.MyOrdersQuery>;
export const getOrderByUserId = /* GraphQL */ `query GetOrderByUserId($userId: ID!) {
  getOrderByUserId(userId: $userId) {
    orderItems {
      userId
      orderId
      quantity
      bookId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetOrderByUserIdQueryVariables,
  APITypes.GetOrderByUserIdQuery
>;
