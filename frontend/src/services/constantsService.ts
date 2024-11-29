import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "backendUrl";
const DEFAULT_BASE_URL = "http://localhost:8000";

export const getBaseUrl = async (): Promise<string> => {
  const storedUrl = await AsyncStorage.getItem(STORAGE_KEY);
  return storedUrl?.replaceAll('"', "") || DEFAULT_BASE_URL;
};

export const saveBaseUrl = async (value: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, value);
};
