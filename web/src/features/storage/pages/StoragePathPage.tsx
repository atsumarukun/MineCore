import { useGetFilesQuery } from "@/gql/graphql";
import { Box, useToast } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";
import { useCallback, useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ApolloError } from "@apollo/client";
import { Loading } from "@/components/parts/Loading";
import { ManagementFileBar } from "../templates/ManagementFileBar";
import { useGetPath, useGetQueryParam, useUpload } from "../hooks";
import { ViewMode, ViewModeContext } from "../provides/ViewModeProvider";
import { FileListViews } from "../templates/FileListViews";
import { RefetchContext } from "@/providers/RefetchProvider";

export function StoragePathPage() {
  const path = useGetPath();
  const name = useGetQueryParam("name");
  const context = useContext(ViewModeContext);
  const refetchContext = useContext(RefetchContext);
  const toast = useToast();

  const { loading, error, data, refetch } = useGetFilesQuery({
    variables: {
      path: path,
      name: name,
    },
  });
  const upload = useUpload();

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        await upload({
          key: path,
          files: files,
          onCompleted() {
            refetch();
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
    [path, data]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
  });

  useEffect(() => {
    refetchContext.setFn({ refetch: refetch });
  }, [refetch]);

  if (loading) return <Loading />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.files) return <Error statusCode={404} />;

  return (
    <Box h="100%" {...getRootProps()}>
      <input {...getInputProps()} />
      <ManagementFileBar />
      {context.viewMode === ViewMode.tile ? (
        <FileTileViews files={data.files} />
      ) : (
        <FileListViews files={data.files} />
      )}
    </Box>
  );
}
