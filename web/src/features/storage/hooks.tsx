import { useRouter } from "next/router";

type DownloadProps = {
  name: string;
  filekey: string;
};

export function useDownload({ name, filekey }: DownloadProps) {
  return async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STORAGE_URL}${filekey}`);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(await res.blob());
    link.download = name;
    link.click();
    link.remove();
  };
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
