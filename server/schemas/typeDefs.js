const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
  me: User 
  }
  
  type Book {
    _id: ID
    bookID: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
  _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }


  input saveBooks {
  authors: [String]
  title: String
  description: String
  bookId: String
  BookId: String
  image: String
  link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: saveBooks): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
