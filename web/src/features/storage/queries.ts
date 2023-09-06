import { gql } from "@apollo/client";

export const GET_FILES = gql`
  query GetFiles($path: String!) {
    files(path: $path) {
      name
      key
      isDir
    }
  }
`;
