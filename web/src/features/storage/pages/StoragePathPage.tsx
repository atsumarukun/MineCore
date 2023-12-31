import { GetFilesDocument, useGetFilesQuery } from "@/gql/graphql";
import { Box, useToast } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Loading } from "@/components/parts/Loading";
import { ManagementFileBar } from "../templates/ManagementFileBar";
import { useGetPath, useGetQueryParam, useUpload } from "../hooks";
import { ViewMode, ViewModeContext } from "../provides/ViewModeProvider";
import { FileListViews } from "../templates/FileListViews";

export function StoragePathPage() {
  const path = useGetPath();
  const name = useGetQueryParam("name");
  const context = useContext(ViewModeContext);
  const toast = useToast();

  const { loading, error, data } = useGetFilesQuery({
    variables: {
      path: path,
      name: name,
    },
  });
  const upload = useUpload({
    onCompleted() {
      toast({
        title: "アップロードしました.",
        status: "success",
        duration: 5000,
      });
    },
    onError(e) {
      toast({
        title: "エラーが発生しました.",
        description: e.message,
        status: "error",
        duration: 5000,
      });
    },
    refetchQueries: [GetFilesDocument],
  });

  const onDrop = useCallback(
    async (files: File[]) => {
      await upload({
        variables: {
          key: path,
          files: files,
        },
      });
    },
    [path, data]
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
      <ManagementFileBar />
      {context.viewMode === ViewMode.tile ? (
        <FileTileViews files={data.files} />
      ) : (
        <FileListViews files={data.files} />
      )}
    </Box>
  );
}
