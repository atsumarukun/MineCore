import { useGetFilesQuery, useUploadFilesMutation } from "@/gql/graphql";
import { Box, useToast } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ApolloError } from "@apollo/client";
import { Loading } from "@/components/parts/Loading";
import { ManagementFileBar } from "../templates/ManagementFileBar";
import { useGetPath, useGetQueryParam } from "../hooks";

export function StoragePathPage() {
  const path = useGetPath();
  console.log(path);
  const name = useGetQueryParam("name");
  const toast = useToast();

  const { loading, error, data, refetch } = useGetFilesQuery({
    variables: {
      path: path,
      name: name,
    },
  });
  const [upload] = useUploadFilesMutation({
    onCompleted() {
      refetch();
    },
  });

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        await upload({
          variables: {
            path: path,
            files: files,
          },
        });
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

  if (loading) return <Loading />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.files) return <Error statusCode={404} />;

  return (
    <Box h="100%" {...getRootProps()}>
      <input {...getInputProps()} />
      <ManagementFileBar refetch={refetch} />
      <FileTileViews refetch={refetch} files={data?.files} />
    </Box>
  );
}
