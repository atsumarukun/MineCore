import { AuthForm } from "../../../../components/templates/AuthForm";

type Props = {
  onClose: () => void;
};

export function AuthModalBody({ ...props }: Props) {
  return <AuthForm {...props} />;
}
