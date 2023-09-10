import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { GetServerSideProps } from "next";

export type StoragePathPageProps = {
  path: string;
  name: string | null;
};

export default function StoragePath({ path, name }: StoragePathPageProps) {
  return <StoragePathPage path={path} name={name} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const path = !context.query.path
    ? ""
    : typeof context.query.path === "string"
    ? undefined
    : `/${context.query.path.join("/")}`;
  const name = !context.query.name
    ? null
    : typeof context.query.name === "string"
    ? context.query.name
    : context.query.name[context.query.name.length - 1];

  return {
    props: {
      path: path,
      name: name,
    },
  };
};
