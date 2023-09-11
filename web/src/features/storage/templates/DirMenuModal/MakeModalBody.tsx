import { MakeDirForm } from "../MakeDirForm";

type Props = {
  refetch: () => void;
  onClose: () => void;
};

export function MakeModalBody({ ...props }: Props) {
  return <MakeDirForm {...props} />;
}
