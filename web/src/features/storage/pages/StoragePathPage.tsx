import { Header } from "@/components/layouts/Header";
import { useGetFilesQuery } from "@/gql/graphql";
import { StoragePathPageProps } from "@/pages/storage/[[...path]]";
import { Spinner } from "@chakra-ui/react";
import Error from "next/error";
import { FileTileViews } from "../templates/FileTileViews";

export function StoragePathPage({ path }: StoragePathPageProps) {
  const { loading, error, data } = useGetFilesQuery({
    variables: { path: path },
  });

  if (loading) return <Spinner />;
  if (!data || error) return <Error statusCode={500} />;
  if (!data.files) return <Error statusCode={404} />;

  return (
    <>
      <FileTileViews files={data?.files} />
    </>
  );
}
