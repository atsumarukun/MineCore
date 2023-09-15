import { useDownloadFilesMutation } from "@/gql/graphql";
import { useRouter } from "next/router";

type DownloadProps = {
  name: string;
  keys: string[];
};

export function useDownload({ name, keys }: DownloadProps) {
  const [download] = useDownloadFilesMutation({
    variables: { keys: keys },
    onCompleted(data) {
      if (data) {
        const blob = new Blob([Buffer.from(data.downloadFiles, "base64")]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
        link.remove();
      }
    },
  });

  return download;
}

export function useGetPath() {
  const router = useRouter();
  const path = router.query.path;
  return typeof path === "object" ? `/${path.join("/")}` : path ?? "";
}

export function useGetQueryParam(key: string) {
  const router = useRouter();
  const value = router.query[key];
  return typeof value === "object" ? value.join(",") : value ?? "";
}
