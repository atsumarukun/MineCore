import { GetFilesQuery } from "@/gql/graphql";
import { Grid } from "@chakra-ui/react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { FileTileViewItem } from "../parts/FileTileViewItem";

type Props = {
  files: GetFilesQuery["files"];
};

export function FileTileViews({ files }: Props) {
  return (
    <Grid
      gap={8}
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(6, 1fr)",
      }}
    >
      {files.map((file) => (
        <FileTileViewItem
          file={file}
          icon={file.isDir ? FaFolder : FaFileAlt}
        />
      ))}
    </Grid>
  );
}
