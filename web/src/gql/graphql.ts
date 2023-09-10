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
  Upload: { input: any; output: any; }
};

export type File = {
  __typename?: 'File';
  isDir: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  copyFile: Scalars['String']['output'];
  makeDir: Scalars['String']['output'];
  moveFile: Scalars['String']['output'];
  removeFiles: Array<Scalars['String']['output']>;
  uploadFiles: Array<File>;
};


export type MutationCopyFileArgs = {
  destination: Scalars['String']['input'];
  key: Scalars['String']['input'];
};


export type MutationMakeDirArgs = {
  key: Scalars['String']['input'];
};


export type MutationMoveFileArgs = {
  destination: Scalars['String']['input'];
  key: Scalars['String']['input'];
};


export type MutationRemoveFilesArgs = {
  keys: Array<Scalars['String']['input']>;
};


export type MutationUploadFilesArgs = {
  files: Array<Scalars['Upload']['input']>;
  path: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  files: Array<File>;
};


export type QueryFilesArgs = {
  isDir?: InputMaybe<Scalars['Boolean']['input']>;
  path: Scalars['String']['input'];
};

export type GetFilesQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', name: string, key: string, type: string, isDir: boolean }> };

export type GetDirsQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetDirsQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', name: string, key: string }> };

export type UploadFilesMutationVariables = Exact<{
  path: Scalars['String']['input'];
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type UploadFilesMutation = { __typename?: 'Mutation', uploadFiles: Array<{ __typename?: 'File', name: string }> };

export type MoveFileMutationVariables = Exact<{
  key: Scalars['String']['input'];
  destination: Scalars['String']['input'];
}>;


export type MoveFileMutation = { __typename?: 'Mutation', moveFile: string };

export type CopyFileMutationVariables = Exact<{
  key: Scalars['String']['input'];
  destination: Scalars['String']['input'];
}>;


export type CopyFileMutation = { __typename?: 'Mutation', copyFile: string };

export type MakeDirMutationVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type MakeDirMutation = { __typename?: 'Mutation', makeDir: string };

export type RemoveFilesMutationVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveFilesMutation = { __typename?: 'Mutation', removeFiles: Array<string> };


export const GetFilesDocument = gql`
    query GetFiles($path: String!) {
  files(path: $path) {
    name
    key
    type
    isDir
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
export const UploadFilesDocument = gql`
    mutation UploadFiles($path: String!, $files: [Upload!]!) {
  uploadFiles(path: $path, files: $files) {
    name
  }
}
    `;
export type UploadFilesMutationFn = Apollo.MutationFunction<UploadFilesMutation, UploadFilesMutationVariables>;

/**
 * __useUploadFilesMutation__
 *
 * To run a mutation, you first call `useUploadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFilesMutation, { data, loading, error }] = useUploadFilesMutation({
 *   variables: {
 *      path: // value for 'path'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUploadFilesMutation(baseOptions?: Apollo.MutationHookOptions<UploadFilesMutation, UploadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFilesMutation, UploadFilesMutationVariables>(UploadFilesDocument, options);
      }
export type UploadFilesMutationHookResult = ReturnType<typeof useUploadFilesMutation>;
export type UploadFilesMutationResult = Apollo.MutationResult<UploadFilesMutation>;
export type UploadFilesMutationOptions = Apollo.BaseMutationOptions<UploadFilesMutation, UploadFilesMutationVariables>;
export const MoveFileDocument = gql`
    mutation MoveFile($key: String!, $destination: String!) {
  moveFile(key: $key, destination: $destination)
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
 *      key: // value for 'key'
 *      destination: // value for 'destination'
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
    mutation CopyFile($key: String!, $destination: String!) {
  copyFile(key: $key, destination: $destination)
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
 *      key: // value for 'key'
 *      destination: // value for 'destination'
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