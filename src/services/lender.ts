import { createApiClient } from "./apiClient";

const lenderClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3031",
  useAuth: false,
});

export const lenderApi = lenderClient.instance;

export const getLendersList = async () => {
  const response = await lenderApi.get(`/lenders/list`);
  return response.data;
};
