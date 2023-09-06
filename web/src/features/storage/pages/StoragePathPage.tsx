import { useGetFilesQuery, useUploadFilesMutation } from "@/gql/graphql";
import { StoragePathPageProps } from "@/pages/storage/[[...path]]";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ApolloError } from "@apollo/client";

export function StoragePathPage({ path }: StoragePathPageProps) {
  const { loading, error, data, refetch } = useGetFilesQuery({
    variables: { path: path },
  });
  const [upload] = useUploadFilesMutation({
    onCompleted() {
      refetch();
    },
  });
  const toast = useToast();

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        await upload({ variables: { path: path, files: files } });
        toast({
          title: "アップロードしました.",
          status: "success",
          duration: 5000,
        });
      } catch (e) {
        if (e instanceof ApolloError) {
          toast({
            title: "エラーが発生しました.",
            description: e.message,
            status: "error",
            duration: 5000,
          });
        }
      }
    },
    [path]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
  });

  if (loading) return <Spinner />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.files) return <Error statusCode={404} />;

  return (
    <Box h="100%" {...getRootProps()}>
      <input {...getInputProps()} />
      <FileTileViews path={path} refetch={refetch} files={data?.files} />
    </Box>
  );
}
