import { MakeDirForm } from "../MakeDirForm";

type Props = {
  path: string;
  refetch: () => void;
  onClose: () => void;
};

export function MakeModalBody({ ...props }: Props) {
  return <MakeDirForm {...props} />;
}
