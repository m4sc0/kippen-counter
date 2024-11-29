import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useInternal = (key: string, initValue: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        } else if (initValue !== undefined) {
          setValue(initValue);
          await AsyncStorage.setItem(key, JSON.stringify(initValue));
        }
      } catch (error) {
        console.error(`Error loading key ${key} from storage: ${error}`);
      }
    };

    loadValue();
  }, [key, initValue]);

  const saveValue = async (newValue: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(`Error saving key ${key} to storage: ${error}`);
    }
  };

  return [value, saveValue];
};

export default useInternal;
