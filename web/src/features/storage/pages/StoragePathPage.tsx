import { useGetFilesQuery } from "@/gql/graphql";
import { StoragePathPageProps } from "@/pages/storage/[[...path]]";
import { Box, Spinner } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function StoragePathPage({ path }: StoragePathPageProps) {
  const { loading, error, data } = useGetFilesQuery({
    variables: { path: path },
  });

  const onDrop = useCallback(async (files: File[]) => {
    console.log(files);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  if (loading) return <Spinner />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.files) return <Error statusCode={404} />;

  return (
    <Box h="100%" {...getRootProps()}>
      <input {...getInputProps()} />
      <FileTileViews path={path} files={data?.files} />
    </Box>
  );
}
