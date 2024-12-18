/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type BookInput = {
  title: string,
  description?: string | null,
  imageUrl?: string | null,
  author: string,
  price: number,
};

export type Book = {
  __typename: "Book",
  bookId: string,
  title: string,
  description?: string | null,
  imageUrl?: string | null,
  author: string,
  price: number,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OrderInput = {
  bookId: string,
  quantity: number,
  userId: string,
};

export type OrderItem = {
  __typename: "OrderItem",
  userId: string,
  orderId: string,
  book?: Book | null,
  quantity: number,
  bookId: string,
};

export type BooksPage = {
  __typename: "BooksPage",
  books?:  Array<Book | null > | null,
  nextToken?: string | null,
};

export type orderItemsPage = {
  __typename: "orderItemsPage",
  orderItems?:  Array<OrderItem | null > | null,
  nextToken?: string | null,
};

export type CreateBookMutationVariables = {
  newBook?: BookInput | null,
};

export type CreateBookMutation = {
  createBook:  {
    __typename: "Book",
    bookId: string,
    title: string,
    description?: string | null,
    imageUrl?: string | null,
    author: string,
    price: number,
    createdAt?: string | null,
    updatedAt?: string | null,
  },
};

export type CreateOrderMutationVariables = {
  newOrder?: OrderInput | null,
};

export type CreateOrderMutation = {
  createOrder:  {
    __typename: "OrderItem",
    userId: string,
    orderId: string,
    book?:  {
      __typename: "Book",
      bookId: string,
      title: string,
      description?: string | null,
      imageUrl?: string | null,
      author: string,
      price: number,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null,
    quantity: number,
    bookId: string,
  },
};

export type GetBookByIdQueryVariables = {
  bookId: string,
};

export type GetBookByIdQuery = {
  getBookById:  {
    __typename: "Book",
    bookId: string,
    title: string,
    description?: string | null,
    imageUrl?: string | null,
    author: string,
    price: number,
    createdAt?: string | null,
    updatedAt?: string | null,
  },
};

export type ListBooksQueryVariables = {
  limit: number,
  nextToken?: string | null,
};

export type ListBooksQuery = {
  listBooks:  {
    __typename: "BooksPage",
    books?:  Array< {
      __typename: "Book",
      bookId: string,
      title: string,
      description?: string | null,
      imageUrl?: string | null,
      author: string,
      price: number,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  },
};

export type MyOrdersQueryVariables = {
  limit: number,
  nextToken?: string | null,
};

export type MyOrdersQuery = {
  myOrders:  {
    __typename: "orderItemsPage",
    orderItems?:  Array< {
      __typename: "OrderItem",
      userId: string,
      orderId: string,
      quantity: number,
      bookId: string,
    } | null > | null,
    nextToken?: string | null,
  },
};

export type GetOrderByUserIdQueryVariables = {
  userId: string,
};

export type GetOrderByUserIdQuery = {
  getOrderByUserId:  {
    __typename: "orderItemsPage",
    orderItems?:  Array< {
      __typename: "OrderItem",
      userId: string,
      orderId: string,
      quantity: number,
      bookId: string,
    } | null > | null,
    nextToken?: string | null,
  },
};

export type OnCreateBookSubscriptionVariables = {
};

export type OnCreateBookSubscription = {
  onCreateBook?:  {
    __typename: "Book",
    bookId: string,
    title: string,
    description?: string | null,
    imageUrl?: string | null,
    author: string,
    price: number,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
