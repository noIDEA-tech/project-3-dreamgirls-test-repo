// client/src/utils/queries.ts
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        title
        description
        createdAt
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query getReviews {
    reviews {
      _id
      title
      description
      reviewType
      location {
        type
        coordinates
        address
      }
      severity
      verified
      reviewedBy {
        username
      }
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      reviews {
        _id
        title
        description
        createdAt
      }
    }
  }
`;