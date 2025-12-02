import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiClientOptions = {
  baseURL: string;
  headers?: Record<string, string>;
  useAuth?: boolean; // Flag to use Authorization instead of API key
};

export type ApiResponse<T = any> = {
  data: T;
  status: number;
  headers: Record<string, any>;
};

export const createApiClient = ({
  baseURL,
  headers = {},
  useAuth = false, // ✅ Default to false = use API key by default
}: ApiClientOptions) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  // Set auth token in instance
  const setAuthToken = (token: string) => {
    instance.defaults.headers.Authorization = `Bearer ${token}`;
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  };

  // Clear auth token
  const clearAuthToken = () => {
    delete instance.defaults.headers.Authorization;
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  };

  // ✅ Request interceptor - API Key by default, Authorization when needed
  instance.interceptors.request.use(
    (config) => {
      // Check if this specific request should use Authorization
      const forceAuth = config.headers?.["X-Use-Auth"] === "true";

      if (forceAuth || useAuth) {
        // ✅ Use Authorization Bearer token
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

        if (token && token.trim() !== "") {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          delete config.headers.Authorization;
        }
        delete config.headers["edumate-api-key"];
        delete config.headers["X-Use-Auth"]; // Clean up flag
      } else {
        // ✅ DEFAULT: Use API Key
        delete config.headers.Authorization;
        config.headers["edumate-api-key"] =
          import.meta.env.VITE_EDUMATE_API_KEY || "";
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle common errors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        clearAuthToken();
        console.error("Unauthorized - Please login again");
      }

      return Promise.reject(error);
    }
  );

  // Generic request method
  const request = async <T = any>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response: AxiosResponse<T> = await instance.request<T>(config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  };

  return {
    instance, // Export instance for direct use
    request,
    setAuthToken,
    clearAuthToken,
  };
};
