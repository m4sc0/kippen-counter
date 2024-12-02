import {
  TextInputProps,
  TextInput as DefaultTextInput,
} from "react-native-paper";

export const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <DefaultTextInput {...props} mode="outlined" theme={{ roundness: 10 }} />
  );
};
