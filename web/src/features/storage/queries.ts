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

export const UPLOAD_FILES = gql`
  mutation UploadFiles($path: String!, $files: [Upload!]!) {
    uploadFiles(path: $path, files: $files) {
      name
    }
  }
`;
