import { useDownloadFilesMutation } from "@/gql/graphql";
import { useRouter } from "next/router";

type UploadProps = {
  files: File[];
  onCompleted?: () => void;
};

export function useUpload() {
  return async ({ files, onCompleted }: UploadProps) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_URL}`, {
      method: "POST",
      body: formData,
    });
    onCompleted?.();
  };
}

type DownloadProps = {
  name: string;
  keys: string[];
};

export function useDownload({ name, keys }: DownloadProps) {
  return useDownloadFilesMutation({
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
