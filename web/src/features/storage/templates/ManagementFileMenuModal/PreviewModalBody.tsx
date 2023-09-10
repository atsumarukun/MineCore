import { AuthForm } from "../../../../components/templates/AuthForm";

type Props = {
  onClose: () => void;
};

export function PrevieModalBody({ ...props }: Props) {
  return <AuthForm {...props} />;
}
