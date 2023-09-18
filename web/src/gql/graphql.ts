import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Download = {
  __typename?: 'Download';
  data: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type File = {
  __typename?: 'File';
  isDir: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['Time']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: Scalars['String']['output'];
  copyFile: Array<Scalars['String']['output']>;
  downloadFiles: Download;
  makeDir: Scalars['String']['output'];
  moveFile: Array<Scalars['String']['output']>;
  removeFiles: Array<Scalars['String']['output']>;
  runCommand: Scalars['String']['output'];
};


export type MutationAuthArgs = {
  password: Scalars['String']['input'];
};


export type MutationCopyFileArgs = {
  input: Array<UpdateFileInput>;
};


export type MutationDownloadFilesArgs = {
  keys: Array<Scalars['String']['input']>;
};


export type MutationMakeDirArgs = {
  key: Scalars['String']['input'];
};


export type MutationMoveFileArgs = {
  input: Array<UpdateFileInput>;
};


export type MutationRemoveFilesArgs = {
  keys: Array<Scalars['String']['input']>;
};


export type MutationRunCommandArgs = {
  command: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  files: Array<File>;
};


export type QueryFilesArgs = {
  isDir?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  path: Scalars['String']['input'];
};

export type UpdateFileInput = {
  destination: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type GetFilesQueryVariables = Exact<{
  path: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', name: string, key: string, type: string, isDir: boolean, size?: number | null, updated_at?: any | null }> };

export type GetDirsQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetDirsQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', name: string, key: string }> };

export type DownloadFilesMutationVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type DownloadFilesMutation = { __typename?: 'Mutation', downloadFiles: { __typename?: 'Download', name: string, data: string } };

export type MoveFileMutationVariables = Exact<{
  input: Array<UpdateFileInput> | UpdateFileInput;
}>;


export type MoveFileMutation = { __typename?: 'Mutation', moveFile: Array<string> };

export type CopyFileMutationVariables = Exact<{
  input: Array<UpdateFileInput> | UpdateFileInput;
}>;


export type CopyFileMutation = { __typename?: 'Mutation', copyFile: Array<string> };

export type MakeDirMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type MakeDirMutation = { __typename?: 'Mutation', makeDir: string };

export type RemoveFilesMutationVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveFilesMutation = { __typename?: 'Mutation', removeFiles: Array<string> };

export type AuthMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: string };

export type RunCommandMutationVariables = Exact<{
  command: Scalars['String']['input'];
}>;


export type RunCommandMutation = { __typename?: 'Mutation', runCommand: string };


export const GetFilesDocument = gql`
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

/**
 * __useGetFilesQuery__
 *
 * To run a query within a React component, call `useGetFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesQuery({
 *   variables: {
 *      path: // value for 'path'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetFilesQuery(baseOptions: Apollo.QueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
      }
export function useGetFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
        }
export type GetFilesQueryHookResult = ReturnType<typeof useGetFilesQuery>;
export type GetFilesLazyQueryHookResult = ReturnType<typeof useGetFilesLazyQuery>;
export type GetFilesQueryResult = Apollo.QueryResult<GetFilesQuery, GetFilesQueryVariables>;
export const GetDirsDocument = gql`
    query GetDirs($path: String!) {
  files(path: $path, isDir: true) {
    name
    key
  }
}
    `;

/**
 * __useGetDirsQuery__
 *
 * To run a query within a React component, call `useGetDirsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDirsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDirsQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetDirsQuery(baseOptions: Apollo.QueryHookOptions<GetDirsQuery, GetDirsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDirsQuery, GetDirsQueryVariables>(GetDirsDocument, options);
      }
export function useGetDirsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDirsQuery, GetDirsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDirsQuery, GetDirsQueryVariables>(GetDirsDocument, options);
        }
export type GetDirsQueryHookResult = ReturnType<typeof useGetDirsQuery>;
export type GetDirsLazyQueryHookResult = ReturnType<typeof useGetDirsLazyQuery>;
export type GetDirsQueryResult = Apollo.QueryResult<GetDirsQuery, GetDirsQueryVariables>;
export const DownloadFilesDocument = gql`
    mutation DownloadFiles($keys: [String!]!) {
  downloadFiles(keys: $keys) {
    name
    data
  }
}
    `;
export type DownloadFilesMutationFn = Apollo.MutationFunction<DownloadFilesMutation, DownloadFilesMutationVariables>;

/**
 * __useDownloadFilesMutation__
 *
 * To run a mutation, you first call `useDownloadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadFilesMutation, { data, loading, error }] = useDownloadFilesMutation({
 *   variables: {
 *      keys: // value for 'keys'
 *   },
 * });
 */
export function useDownloadFilesMutation(baseOptions?: Apollo.MutationHookOptions<DownloadFilesMutation, DownloadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DownloadFilesMutation, DownloadFilesMutationVariables>(DownloadFilesDocument, options);
      }
export type DownloadFilesMutationHookResult = ReturnType<typeof useDownloadFilesMutation>;
export type DownloadFilesMutationResult = Apollo.MutationResult<DownloadFilesMutation>;
export type DownloadFilesMutationOptions = Apollo.BaseMutationOptions<DownloadFilesMutation, DownloadFilesMutationVariables>;
export const MoveFileDocument = gql`
    mutation MoveFile($input: [UpdateFileInput!]!) {
  moveFile(input: $input)
}
    `;
export type MoveFileMutationFn = Apollo.MutationFunction<MoveFileMutation, MoveFileMutationVariables>;

/**
 * __useMoveFileMutation__
 *
 * To run a mutation, you first call `useMoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveFileMutation, { data, loading, error }] = useMoveFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveFileMutation(baseOptions?: Apollo.MutationHookOptions<MoveFileMutation, MoveFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveFileMutation, MoveFileMutationVariables>(MoveFileDocument, options);
      }
export type MoveFileMutationHookResult = ReturnType<typeof useMoveFileMutation>;
export type MoveFileMutationResult = Apollo.MutationResult<MoveFileMutation>;
export type MoveFileMutationOptions = Apollo.BaseMutationOptions<MoveFileMutation, MoveFileMutationVariables>;
export const CopyFileDocument = gql`
    mutation CopyFile($input: [UpdateFileInput!]!) {
  copyFile(input: $input)
}
    `;
export type CopyFileMutationFn = Apollo.MutationFunction<CopyFileMutation, CopyFileMutationVariables>;

/**
 * __useCopyFileMutation__
 *
 * To run a mutation, you first call `useCopyFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyFileMutation, { data, loading, error }] = useCopyFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCopyFileMutation(baseOptions?: Apollo.MutationHookOptions<CopyFileMutation, CopyFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyFileMutation, CopyFileMutationVariables>(CopyFileDocument, options);
      }
export type CopyFileMutationHookResult = ReturnType<typeof useCopyFileMutation>;
export type CopyFileMutationResult = Apollo.MutationResult<CopyFileMutation>;
export type CopyFileMutationOptions = Apollo.BaseMutationOptions<CopyFileMutation, CopyFileMutationVariables>;
export const MakeDirDocument = gql`
    mutation MakeDir($key: String!) {
  makeDir(key: $key)
}
    `;
export type MakeDirMutationFn = Apollo.MutationFunction<MakeDirMutation, MakeDirMutationVariables>;

/**
 * __useMakeDirMutation__
 *
 * To run a mutation, you first call `useMakeDirMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeDirMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeDirMutation, { data, loading, error }] = useMakeDirMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useMakeDirMutation(baseOptions?: Apollo.MutationHookOptions<MakeDirMutation, MakeDirMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeDirMutation, MakeDirMutationVariables>(MakeDirDocument, options);
      }
export type MakeDirMutationHookResult = ReturnType<typeof useMakeDirMutation>;
export type MakeDirMutationResult = Apollo.MutationResult<MakeDirMutation>;
export type MakeDirMutationOptions = Apollo.BaseMutationOptions<MakeDirMutation, MakeDirMutationVariables>;
export const RemoveFilesDocument = gql`
    mutation RemoveFiles($keys: [String!]!) {
  removeFiles(keys: $keys)
}
    `;
export type RemoveFilesMutationFn = Apollo.MutationFunction<RemoveFilesMutation, RemoveFilesMutationVariables>;

/**
 * __useRemoveFilesMutation__
 *
 * To run a mutation, you first call `useRemoveFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFilesMutation, { data, loading, error }] = useRemoveFilesMutation({
 *   variables: {
 *      keys: // value for 'keys'
 *   },
 * });
 */
export function useRemoveFilesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFilesMutation, RemoveFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFilesMutation, RemoveFilesMutationVariables>(RemoveFilesDocument, options);
      }
export type RemoveFilesMutationHookResult = ReturnType<typeof useRemoveFilesMutation>;
export type RemoveFilesMutationResult = Apollo.MutationResult<RemoveFilesMutation>;
export type RemoveFilesMutationOptions = Apollo.BaseMutationOptions<RemoveFilesMutation, RemoveFilesMutationVariables>;
export const AuthDocument = gql`
    mutation Auth($password: String!) {
  auth(password: $password)
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const RunCommandDocument = gql`
    mutation RunCommand($command: String!) {
  runCommand(command: $command)
}
    `;
export type RunCommandMutationFn = Apollo.MutationFunction<RunCommandMutation, RunCommandMutationVariables>;

/**
 * __useRunCommandMutation__
 *
 * To run a mutation, you first call `useRunCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runCommandMutation, { data, loading, error }] = useRunCommandMutation({
 *   variables: {
 *      command: // value for 'command'
 *   },
 * });
 */
export function useRunCommandMutation(baseOptions?: Apollo.MutationHookOptions<RunCommandMutation, RunCommandMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunCommandMutation, RunCommandMutationVariables>(RunCommandDocument, options);
      }
export type RunCommandMutationHookResult = ReturnType<typeof useRunCommandMutation>;
export type RunCommandMutationResult = Apollo.MutationResult<RunCommandMutation>;
export type RunCommandMutationOptions = Apollo.BaseMutationOptions<RunCommandMutation, RunCommandMutationVariables>;