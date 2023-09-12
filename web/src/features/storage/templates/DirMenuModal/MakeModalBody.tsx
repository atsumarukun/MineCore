import { MakeDirForm } from "../MakeDirForm";

type Props = {
  onClose: () => void;
};

export function MakeModalBody({ ...props }: Props) {
  return <MakeDirForm {...props} />;
}
