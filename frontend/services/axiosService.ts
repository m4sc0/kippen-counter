import axios from "axios";
import { getBaseUrl } from "./constantsService";
import { deleteToken, getToken, saveToken } from "./authService";

const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
  const baseUrl = await getBaseUrl();
  config.baseURL = baseUrl;

  const token = await getToken("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await getToken("refresh_token");
      if (refreshToken) {
        try {
          const baseUrl = await getBaseUrl();
          const { data } = await axios.post(
            `${baseUrl}/api/auth/token/refresh/`,
            {
              refresh: refreshToken,
            },
          );

          await saveToken("access_token", data.access);
          error.config.headers.Authorization = `Bearer ${data.access}`;
          return axios(error.config); // Retry the failed request
        } catch (refreshError) {
          await deleteToken("access_token");
          await deleteToken("refresh_token");
        }
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
