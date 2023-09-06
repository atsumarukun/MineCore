import { GetFilesQuery } from "@/gql/graphql";
import { Grid } from "@chakra-ui/react";
import { FileTileViewItem } from "../parts/FileTileViewItem";

type Props = {
  path: string;
  files: GetFilesQuery["files"];
};

export function FileTileViews({ path, files }: Props) {
  return (
    <Grid
      gap={8}
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(6, 1fr)",
      }}
    >
      {path && (
        <FileTileViewItem
          file={{
            name: "../",
            key: path.substring(0, path.lastIndexOf("/")),
            isDir: true,
          }}
        />
      )}
      {files.map((file) => (
        <FileTileViewItem file={file} key={file.key} />
      ))}
    </Grid>
  );
}
