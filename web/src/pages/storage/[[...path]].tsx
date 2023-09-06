import { STORAGE_BASE_URL } from "@/features/storage/const";
import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { GetServerSideProps, NextPage } from "next";

export type StoragePathPageProps = {
  path: string;
};

export default function StoragePath({ path }: StoragePathPageProps) {
  return <StoragePathPage path={path} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      path: context.resolvedUrl.substring(STORAGE_BASE_URL.length),
    },
  };
};
