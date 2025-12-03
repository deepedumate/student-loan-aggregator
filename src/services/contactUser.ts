import { createApiClient } from "./apiClient";
import { handleApiError, ApiError } from "@/lib/helper/errorHandler";

const contactUserClient = createApiClient({
  baseURL:
    import.meta.env.VITE_API_BASE_URL_STUDENT ||
    "http://localhost:3031/student",
  useAuth: false,
});

export const contactUserApi = contactUserClient.instance;

// Type definitions for signup payload
export interface SignupPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  baseCurrency?: string;
  studyDestinationCurrency?: string;
  selectedLoanCurrency?: string;
  levelOfEducation?: string;
  studyDestination?: string;
  courseType?: string;
  loanPreference?: string;
  intakeMonth?: string;
  intakeYear?: string;
  loanAmount?: string;
  analyticalExam?: Record<string, string>;
  languageExam?: Record<string, string>;
  coApplicant?: string;
  coApplicantIncomeType?: string;
  coApplicantAnnualIncome?: string;
  coApplicantMobile?: string;
  coApplicantEmail?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  formType?: string;
  submissionDate?: string;
  userAgent?: string;
  referrer?: string;
}

// Type definitions for login payload
export interface LoginPayload {
  phoneNumber: string;
}

// Type definitions for update payload
export interface UpdatePayload {
  studentId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  baseCurrency?: string;
  studyDestinationCurrency?: string;
  selectedLoanCurrency?: string;
  levelOfEducation?: string;
  studyDestination?: string;
  courseType?: string;
  loanPreference?: string;
  intakeMonth?: string;
  intakeYear?: string;
  loanAmount?: string;
  analyticalExam?: Record<string, string>;
  languageExam?: Record<string, string>;
  coApplicant?: string;
  coApplicantIncomeType?: string;
  coApplicantAnnualIncome?: string;
  coApplicantMobile?: string;
  coApplicantEmail?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  formType?: string;
  submissionDate?: string;
  userAgent?: string;
  referrer?: string;
  favourite?: number[];
  interested?: number[];
}

// Helper function to filter out empty values
const filterPayload = (data: Record<string, any>): Record<string, any> => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

// ContactUser Service
export const contactUserService = {
  // Signup endpoint
  signup: async (
    data: SignupPayload
  ): Promise<{ data: any } | { error: ApiError }> => {
    try {
      const filteredPayload = filterPayload(data);
      const response = await contactUserApi.post("/signup", filteredPayload, {
        headers: {
          "X-Use-Auth": "false",
        },
      });
      return response;
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },

  // Login endpoint
  login: async (
    data: LoginPayload
  ): Promise<{ data: any } | { error: ApiError }> => {
    try {
      const response = await contactUserApi.post("/login", data, {
        headers: {
          "X-Use-Auth": "false",
        },
      });
      return response;
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },

  // Update endpoint
  update: async (
    userId: string,
    data: UpdatePayload
  ): Promise<{ data: any } | { error: ApiError }> => {
    try {
      const filteredPayload = filterPayload(data);
      console.log("filteredPayload", filteredPayload);
      const response = await contactUserApi.put(`/${userId}`, filteredPayload, {
        headers: {
          "X-Use-Auth": "true",
        },
      });
      return response;
    } catch (error) {
      return { error: handleApiError(error) };
    }
  },
};

export const { setAuthToken, clearAuthToken } = contactUserClient;

export default contactUserApi;
