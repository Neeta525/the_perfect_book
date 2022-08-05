import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        title
        bookId
        authors
        description
        image
        link
      }
    }
  }
`;
