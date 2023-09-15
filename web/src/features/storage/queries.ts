import { gql } from "@apollo/client";

export const GET_FILES = gql`
  query GetFiles($path: String!, $name: String) {
    files(path: $path, name: $name) {
      name
      key
      type
      isDir
      size
      updated_at
    }
  }
`;

export const GET_DIRS = gql`
  query GetDirs($path: String!) {
    files(path: $path, isDir: true) {
      name
      key
    }
  }
`;

export const DOWNLOAD_FILES = gql`
  mutation DownloadFiles($keys: [String!]!) {
    downloadFiles(keys: $keys) {
      name
      data
    }
  }
`;

export const MOVE_FILE = gql`
  mutation MoveFile($input: [UpdateFileInput!]!) {
    moveFile(input: $input)
  }
`;

export const COPY_FILE = gql`
  mutation CopyFile($input: [UpdateFileInput!]!) {
    copyFile(input: $input)
  }
`;

export const MAKE_DIR = gql`
  mutation MakeDir($key: String!) {
    makeDir(key: $key)
  }
`;

export const REMOVE_FILES = gql`
  mutation RemoveFiles($keys: [String!]!) {
    removeFiles(keys: $keys)
  }
`;
