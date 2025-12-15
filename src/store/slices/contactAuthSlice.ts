import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  contactUserService,
  SignupPayload,
  LoginPayload,
  UpdatePayload,
} from "@/services/contactUser";

// Contact interface
export interface Contact {
  base_currency: string;
  study_destination_currency: string;
  phone_number: string;
  current_education_level?: string | null;
  target_degree_level?: string;
  preferred_study_destination?: string;
  intake_month?: string;
  intake_year?: string;
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
}

// Student interface
export interface Student {
  id: number;
  contact_id: number;
  email?: string;
  password_hash?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  phone?: string;
  is_active: boolean;
  favourite: number[];
  interested: number[];
  source?: string;
  created_at: string;
  updated_at: string;
}

// Combined data structure
export interface ContactAuthData {
  contact: Contact;
  student: Student;
}

// Updated state interface
interface ContactAuthState {
  isLoading: boolean;
  data: ContactAuthData | null;  // ✅ Changed to match API structure
  error: string | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  signupError: string | null;
  loginError: string | null;
  updateError: string | null;
  isAuthenticated: boolean;
  authToken?: string;
}

const initialState: ContactAuthState = {
  isLoading: false,
  data: null,
  error: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  signupError: null,
  loginError: null,
  updateError: null,
  isAuthenticated: false,
  authToken: undefined,
};

// Async Thunks
export const signup = createAsyncThunk(
  "contactAuth/signup",
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await contactUserService.signup(payload);
      if ("error" in response) {
        return rejectWithValue(response.error.message);
      }
      return response?.data?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.message || "Failed to sign up"
      );
    }
  }
);

export const login = createAsyncThunk(
  "contactAuth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await contactUserService.login(payload);
      if ("error" in response) {
        return rejectWithValue(response.error.message);
      }
      // Store auth token if provided
      if (response.data?.data?.token) {
        localStorage.setItem("authToken", response.data.data.token);
      }
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.message || "Failed to log in"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "contactAuth/updateUser",
  async (
    { userId, payload }: { userId: string; payload: UpdatePayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await contactUserService.update(userId, payload);
      if ("error" in response) {
        return rejectWithValue(response.error.message);
      }
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(
        err.message || "Failed to update user"
      );
    }
  }
);

// Slice
export const contactAuthSlice = createSlice({
  name: "contactAuth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<ContactAuthData>) {
      state.data = action.payload;
      state.isAuthenticated = true;
    },

    clearUser(state) {
      state.data = null;
      state.isAuthenticated = false;
      state.authToken = undefined;
      localStorage.removeItem("authToken");
    },

    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
      localStorage.setItem("authToken", action.payload);
    },

    clearError(state) {
      state.error = null;
      state.signupError = null;
      state.loginError = null;
      state.updateError = null;
    },

    updateFormData(state, action: PayloadAction<Partial<ContactAuthData>>) {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Signup cases
    builder
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigningUp = false;
        state.signupError = action.payload as string;
        state.error = action.payload as string;
      });

    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = action.payload as string;
        state.error = action.payload as string;
      });

    // Update cases
    builder
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (state.data) {
          state.data = { ...state.data, ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload as string;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, setAuthToken, clearError, updateFormData } =
  contactAuthSlice.actions;

// Selectors
export const selectUser = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.data;

export const selectIsAuthenticated = (state: {
  contactAuth: ContactAuthState;
}) => state.contactAuth.isAuthenticated;

export const selectIsSigningUp = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.isSigningUp;

export const selectIsLoggingIn = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.isLoggingIn;

export const selectIsUpdating = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.isUpdating;

export const selectSignupError = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.signupError;

export const selectLoginError = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.loginError;

export const selectUpdateError = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.updateError;

export const selectError = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.error;

export const selectAuthToken = (state: { contactAuth: ContactAuthState }) =>
  state.contactAuth.authToken;

export default contactAuthSlice.reducer;
