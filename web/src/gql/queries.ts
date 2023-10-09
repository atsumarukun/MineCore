import { gql } from "@apollo/client";

export const AUTH = gql`
  mutation Auth($password: String!) {
    auth(password: $password)
  }
`;

export const RUN_COMMAND = gql`
  mutation RunCommand($command: String!) {
    runCommand(command: $command)
  }
`;
