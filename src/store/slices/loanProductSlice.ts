import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  LoanProduct,
  SortKey,
  SortDir,
  LoanProductFilters,
  FilterOptions,
} from "@/types/loanProduct";
import {
  getFilterOptions,
  getLoanProductDetails,
  getLoanProducts,
} from "@/services/loanProduct";

type LoanProductsState = {
  isLoading: boolean;
  data: LoanProduct[];
  error: string | null;
  selectedLoanProduct: LoanProduct | null;
  isLoadingDetails: boolean;
  detailsError: string | null;
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
  sort: {
    sortKey: SortKey;
    sortDir: SortDir;
  };
  search: string;
  filters: LoanProductFilters;
  filterOptions: FilterOptions | null;
  selectedLoanIds: string[];
  favoriteLoanIds: string[];
  showFavoritesOnly: boolean;
};

const initialState: LoanProductsState = {
  isLoading: false,
  data: [],
  error: null,
  selectedLoanProduct: null,
  isLoadingDetails: false,
  detailsError: null,
  pagination: {
    page: 1,
    size: 9,
    total: 0,
    totalPages: 0,
  },
  sort: {
    sortKey: "interest_rate",
    sortDir: "asc",
  },
  search: "",
  filters: {},
  filterOptions: null,
  selectedLoanIds: [],
  favoriteLoanIds: [],
  showFavoritesOnly: false,
};

export const fetchLoanProducts = createAsyncThunk(
  "loanProducts/fetchLoanProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { loanProducts: LoanProductsState };
      const { pagination, sort, search, filters, showFavoritesOnly } =
        state.loanProducts;

      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== undefined && value !== "" && value !== null
        )
      );

      const res = await getLoanProducts({
        page: pagination.page,
        size: pagination.size,
        sortKey: sort.sortKey,
        sortDir: sort.sortDir,
        search: search || undefined,
        filters:
          Object.keys(cleanedFilters).length > 0 ? cleanedFilters : undefined,
      });

      console.log("API Response:", res.data);

      return {
        data: res.data.data.data,
        total: res.data.data.total,
        page: res.data.data.page,
        size: res.data.data.size,
        totalPages: res.data.data.totalPages,
      };
    } catch (err: any) {
      console.error("API Error:", err);
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch loan products"
      );
    }
  }
);

export const fetchLoanProductDetails = createAsyncThunk(
  "loanProducts/fetchLoanProductDetails",
  async (loanProductId: number, { rejectWithValue }) => {
    try {
      const res = await getLoanProductDetails(loanProductId);
      console.log("Loan Details API Response:", res.data);

      // Return just the loan product data
      return res;
    } catch (err: any) {
      console.error("API Error:", err);
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch loan product details"
      );
    }
  }
);

export const fetchFilterOptions = createAsyncThunk(
  "loanProducts/fetchFilterOptions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getFilterOptions();
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch filter options"
      );
    }
  }
);

export const loanProductsSlice = createSlice({
  name: "loanProducts",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<{ page: number; size?: number }>) {
      state.pagination.page = action.payload.page;
      if (action.payload.size) {
        state.pagination.size = action.payload.size;
      }
    },

    setSort(
      state,
      action: PayloadAction<{ sortKey: SortKey; sortDir: SortDir }>
    ) {
      state.sort = action.payload;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pagination.page = 1;
    },

    // ✅ FIXED: Use type assertion to handle dynamic key assignment
    setFilter(
      state,
      action: PayloadAction<{
        key: keyof LoanProductFilters;
        value: any;
      }>
    ) {
      const { key, value } = action.payload;
      if (value === undefined || value === "" || value === null) {
        delete state.filters[key];
      } else {
        // ✅ Use type assertion to bypass strict typing
        (state.filters as any)[key] = value;
      }
      state.pagination.page = 1;
    },

    setFilters(state, action: PayloadAction<LoanProductFilters>) {
      state.filters = action.payload;
      state.pagination.page = 1;
    },

    resetFilters(state) {
      state.filters = {};
      state.search = "";
      state.pagination.page = 1;
    },

    addLoanToComparison(state, action: PayloadAction<string>) {
      if (!state.selectedLoanIds.includes(action.payload)) {
        if (state.selectedLoanIds.length < 4) {
          state.selectedLoanIds.push(action.payload);
        }
      }
    },

    removeLoanFromComparison(state, action: PayloadAction<string>) {
      state.selectedLoanIds = state.selectedLoanIds.filter(
        (id) => id !== action.payload
      );
    },

    clearComparison(state) {
      state.selectedLoanIds = [];
    },

    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.favoriteLoanIds.indexOf(action.payload);
      if (index > -1) {
        state.favoriteLoanIds.splice(index, 1);
      } else {
        state.favoriteLoanIds.push(action.payload);
      }
    },

    setFavorites(state, action: PayloadAction<string[]>) {
      state.favoriteLoanIds = action.payload;
    },

    toggleShowFavoritesOnly(state) {
      state.showFavoritesOnly = !state.showFavoritesOnly;
    },

    setData(state, action: PayloadAction<LoanProduct[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoanProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination.total = action.payload.total;
        state.pagination.page = action.payload.page;
        state.pagination.size = action.payload.size;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLoanProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchFilterOptions.pending, (state) => {
        // Don't set loading for filter options
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.filterOptions = action.payload;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        console.error("Failed to fetch filter options:", action.payload);
      });

    builder
      .addCase(fetchLoanProductDetails.pending, (state) => {
        state.isLoadingDetails = true;
        state.detailsError = null;
        state.selectedLoanProduct = null;
      })
      .addCase(fetchLoanProductDetails.fulfilled, (state, action) => {
        state.isLoadingDetails = false;
        state.selectedLoanProduct = action.payload;
      })
      .addCase(fetchLoanProductDetails.rejected, (state, action) => {
        state.isLoadingDetails = false;
        state.detailsError = action.payload as string;
        state.selectedLoanProduct = null;
      });
  },
});

export const {
  setPage,
  setSort,
  setSearch,
  setFilter,
  setFilters,
  resetFilters,
  addLoanToComparison,
  removeLoanFromComparison,
  clearComparison,
  toggleFavorite,
  setFavorites,
  toggleShowFavoritesOnly,
  setData,
} = loanProductsSlice.actions;

// Selectors
export const selectLoanProducts = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.data;

export const selectIsLoading = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.isLoading;

export const selectError = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.error;

export const selectPagination = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.pagination;

export const selectSort = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.sort;

export const selectSearch = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.search;

export const selectFilters = (state: { loanProducts: LoanProductsState }) =>
  state.loanProducts.filters;

export const selectFilterOptions = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.filterOptions;

export const selectSelectedLoanIds = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.selectedLoanIds;

export const selectFavoriteLoanIds = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.favoriteLoanIds;

export const selectShowFavoritesOnly = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.showFavoritesOnly;

export const selectSelectedLoans = (state: {
  loanProducts: LoanProductsState;
}) => {
  const { data, selectedLoanIds } = state.loanProducts;
  return data.filter((loan) => selectedLoanIds.includes(loan.id.toString()));
};

export const selectAppliedFiltersCount = (state: {
  loanProducts: LoanProductsState;
}) => {
  return Object.keys(state.loanProducts.filters).length;
};

export const selectSelectedLoanProduct = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.selectedLoanProduct;

export const selectIsLoadingDetails = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.isLoadingDetails;

export const selectDetailsError = (state: {
  loanProducts: LoanProductsState;
}) => state.loanProducts.detailsError;

export default loanProductsSlice.reducer;
