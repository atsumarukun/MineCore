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

export const COPY_FILE = gql`
  mutation CopyFile($key: String!, $destination: String!) {
    copyFile(key: $key, destination: $destination)
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
