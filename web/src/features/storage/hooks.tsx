import { useDownloadFilesMutation } from "@/gql/graphql";
import { client } from "@/pages/_app";
import { DocumentNode } from "graphql";
import { useRouter } from "next/router";

type UploadProps = {
  key: string;
  files: File[];
  onCompleted?: () => void;
  refetchQueries?: DocumentNode[];
};

export function useUpload() {
  return async ({ files, key, onCompleted, refetchQueries }: UploadProps) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_URL}?key=${key}`, {
      method: "POST",
      body: formData,
    });
    onCompleted?.();
    client.refetchQueries({ include: refetchQueries });
  };
}

type DownloadProps = {
  keys: string[];
};

export function useDownload({ keys }: DownloadProps) {
  return useDownloadFilesMutation({
    variables: { keys: keys },
    onCompleted(data) {
      if (data) {
        const blob = new Blob([Buffer.from(data.downloadFiles.data, "base64")]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = data.downloadFiles.name;
        link.click();
        link.remove();
      }
    },
  });
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
