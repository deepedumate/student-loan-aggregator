import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getLendersList } from "@/services/lender";

export interface Lender {
  id: number;
  lender_name: string;
  lender_display_name: string | null;
  lender_type: string | null;
  lender_category: string | null;
  lender_logo_url: string | null;
  website_url: string | null;
  hs_created_by_user_id: number | null;
  hs_createdate: string | null;
  hs_lastmodifieddate: string | null;
  hs_merged_object_ids: string | null;
  hs_object_id: string | null;
  hs_object_source_detail_1: string | null;
  hs_object_source_detail_2: string | null;
  hs_object_source_detail_3: string | null;
  hs_object_source_label: string | null;
  hs_shared_team_ids: string | null;
  hs_shared_user_ids: string | null;
  hs_updated_by_user_id: number | null;
  hubspot_owner_assigneddate: string | null;
  hubspot_owner_id: string | null;
  hubspot_team_id: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string | null;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  deleted_by: string | null;
  deleted_on: string | null;
  source: string | null;
}

type LendersState = {
  isLoading: boolean;
  data: Lender[];
  error: string | null;
  selectedLender: Lender | null;
  isLoadingDetails: boolean;
  detailsError: string | null;
};

const initialState: LendersState = {
  isLoading: false,
  data: [],
  error: null,
  selectedLender: null,
  isLoadingDetails: false,
  detailsError: null,
};

export const fetchLenders = createAsyncThunk(
  "lenders/fetchLenders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLendersList();
      console.log("Lenders API Response:", res.data);

      // Return the data array from response
      return res.data.data || res.data;
    } catch (err: any) {
      console.error("Lenders API Error:", err);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch lenders"
      );
    }
  }
);

export const lendersSlice = createSlice({
  name: "lenders",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Lender[]>) {
      state.data = action.payload;
    },

    setSelectedLender(state, action: PayloadAction<Lender | null>) {
      state.selectedLender = action.payload;
    },

    clearError(state) {
      state.error = null;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Lenders
    builder
      .addCase(fetchLenders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLenders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLenders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.data = [];
      });
  },
});

export const { setData, setSelectedLender, clearError } = lendersSlice.actions;

// Selectors
export const selectLenders = (state: { lenders: LendersState }) =>
  state.lenders.data;

export const selectIsLoading = (state: { lenders: LendersState }) =>
  state.lenders.isLoading;

export const selectError = (state: { lenders: LendersState }) =>
  state.lenders.error;

export const selectSelectedLender = (state: { lenders: LendersState }) =>
  state.lenders.selectedLender;

export const selectIsLoadingDetails = (state: { lenders: LendersState }) =>
  state.lenders.isLoadingDetails;

export const selectDetailsError = (state: { lenders: LendersState }) =>
  state.lenders.detailsError;

export default lendersSlice.reducer;
