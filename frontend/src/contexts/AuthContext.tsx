import { deleteToken, getToken, saveToken } from "@/src/services/authService";
import apiClient from "@/src/services/axiosService";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id?: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiClient.post("/api/auth/login/", {
        username,
        password,
      });
      await saveToken("access_token", data.data.access);
      await saveToken("refresh_token", data.data.refresh);

      const user = await apiClient.get<User>("/api/user/");
      console.log(`User: ${user.data}`);
      setUser(user.data);
      return true;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await deleteToken("access_token");
    await deleteToken("refresh_token");
    setUser(null);
  };

  const checkAuth = async () => {
    setLoading(true);
    const token = await getToken("access_token");
    if (token) {
      try {
        const { data } = await apiClient.get("/api/protected/");
        setUser(data);
      } catch {
        await logout();
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  return context;
};
