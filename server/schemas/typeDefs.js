// const { gql } = require("@apollo/server");

const typeDefs = `#graphql
  type Book {
    bookId: ID!
    title: String!
    description: String
    authors: [String]
    link: String
    image: String
  }
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }
  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    bookId: String!
    title: String!
    description: String
    authors: [String]
    link: String
    image: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
