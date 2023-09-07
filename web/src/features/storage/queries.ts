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

export const MOVE_FILE = gql`
  mutation MoveFile($key: String!, $destination: String!) {
    moveFile(key: $key, destination: $destination)
  }
`;

export const REMOVE_FILES = gql`
  mutation RemoveFiles($keys: [String!]!) {
    removeFiles(keys: $keys)
  }
`;
