import { ReactNode } from "react";
import { Button } from "react-native";

interface DefaultButtonProps {
  onClick: () => void;
  text: ReactNode;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  onClick,
  text,
}) => {
  return <Button title={text} />;
};
