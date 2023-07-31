const { gql } = require("@apollo/server");

const typeDefs = gql`
  type Book {
    bookId: ID
    title: String
    description: String
    authors: [String]
    link: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }
  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
