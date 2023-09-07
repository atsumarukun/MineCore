import { RenameFileForm } from "../RenameFileForm";

type Props = {
  name: string;
  path: string;
  refetch: () => void;
  onClose: () => void;
};

export function RenameModalBody({ ...props }: Props) {
  return <RenameFileForm {...props} />;
}
