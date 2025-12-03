import {
  SortKey,
  SortDir,
  LoanProductFilters,
  LoanProductsResponse,
  FilterOptions,
} from "@/types/loanProduct";
import { createApiClient } from "./apiClient";

const loanProductClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3031",
  useAuth: false,
});

export const loanProductApi = loanProductClient.instance;
interface GetLoanProductsParams {
  page: number;
  size: number;
  sortKey: SortKey;
  sortDir: SortDir;
  search?: string;
  filters?: LoanProductFilters;
}

// ✅ Helper function to build query string manually
const buildQueryString = (params: GetLoanProductsParams): string => {
  const queryParts: string[] = [];

  queryParts.push(`page=${params.page}`);
  queryParts.push(`size=${params.size}`);
  queryParts.push(`sortKey=${params.sortKey}`);
  queryParts.push(`sortDir=${params.sortDir}`);

  if (params.search) {
    queryParts.push(`search=${encodeURIComponent(params.search)}`);
  }

  // ✅ Add filters as nested params (filters[key]=value)
  if (params.filters && Object.keys(params.filters).length > 0) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        queryParts.push(`filters[${key}]=${encodeURIComponent(String(value))}`);
      }
    });
  }

  return queryParts.join("&");
};

export const getLoanProducts = async (
  params: GetLoanProductsParams
): Promise<{ data: LoanProductsResponse }> => {
  const queryString = buildQueryString(params);
  const response = await loanProductApi.get(
    `/loanProduct/pagination?${queryString}`
  );
  return response;
};

export const getLoanProductDetails = async (loanProductId: number) => {
  const response = await loanProductApi.get(
    `/loanProduct/details/${loanProductId}`
  );
  return response.data.data;
};

export const getFilterOptions = async (): Promise<{
  data: { success: boolean; message: string; data: FilterOptions };
}> => {
  const response = await loanProductApi.get("/loanProduct/filter-options");
  return response;
};

export const submitInterested = async (data: {
  loanProductId: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
}): Promise<{ data: any }> => {
  const response = await loanProductApi.post(
    "/loan-products/interested",
    data,
    {
      headers: {
        "X-Use-Auth": "true",
      },
    }
  );
  return response;
};

export const { setAuthToken, clearAuthToken } = loanProductClient;

export default loanProductApi;