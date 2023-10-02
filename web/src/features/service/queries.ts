import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query GetServices {
    services {
      name
      path
      status
    }
  }
`;
