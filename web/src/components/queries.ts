import { gql } from "@apollo/client";

export const AUTH = gql`
  mutation Auth($password: String!) {
    auth(password: $password)
  }
`;
