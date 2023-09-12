import { RenameFileForm } from "../RenameFileForm";

type Props = {
  name: string;
  onClose: () => void;
};

export function RenameModalBody({ ...props }: Props) {
  return <RenameFileForm {...props} />;
}
