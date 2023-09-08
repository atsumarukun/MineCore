import { useEffect } from "react";

type Props = {
  name: string;
  filekey: string;
};

export function useDownload({ name, filekey }: Props) {
  return async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STORAGE_URL}${filekey}`);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(await res.blob());
    link.download = name;
    link.click();
    link.remove();
  };
}
