// Environment variables helper - supports Vite, Create React App, and Next.js
const getEnvVar = (name: string): string | undefined => {
  // Vite (import.meta.env)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[name];
  }
  
  // Create React App / Next.js (process.env) - only works in Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  
  return undefined;
};

// API service with real backend implementations
// Environment variables for API endpoints
const API_BASE_URL_GUPSHUP = 
  getEnvVar('VITE_API_BASE_URL_GUPSHUP') || 
  getEnvVar('REACT_APP_API_BASE_URL_GUPSHUP') || 
  getEnvVar('NEXT_PUBLIC_API_BASE_URL_GUPSHUP') || 
  '';

const API_BASE_URL_LOAN = 
  getEnvVar('VITE_API_BASE_URL_LOAN') || 
  getEnvVar('REACT_APP_API_BASE_URL_LOAN') || 
  getEnvVar('NEXT_PUBLIC_API_BASE_URL_LOAN') || 
    '';

const API_BASE_URL_CONTACTS = 
  getEnvVar('VITE_API_BASE_URL_CONTACTS') || 
  getEnvVar('REACT_APP_API_BASE_URL_CONTACTS') || 
  getEnvVar('NEXT_PUBLIC_API_BASE_URL_CONTACTS') || 
  'http://localhost:3031';
    
interface LoanChatRequest {
  action: string;
  data?: any;
}

interface ContactUpsertPayload {
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

interface LoanChatResponse {
  data: any;
  error?: any;
}

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store generated OTP in memory (in production, use secure backend storage)
let generatedOTPStore: { [phone: string]: string } = {};

export const apiService = {
  // Main loan chat API handler
  invokeLoanChat: async (request: LoanChatRequest): Promise<LoanChatResponse> => {
    const { action, data } = request;

    try {
      switch (action) {
        case 'send-otp':
          return await apiService.sendOTP(data);
        
        case 'verify-otp':
          return await apiService.verifyOTP(data);
        
        case 'university-autocomplete':
          // Note: University autocomplete uses Google Places API directly in the component
          // This is just a fallback
          return {
            data: {
              suggestions: []
            }
          };
        
        case 'fetch-programs':
          return await apiService.fetchPrograms(data);
        
        case 'extract-custom-program':
          return await apiService.extractCustomProgram(data);
        
        case 'get-exchange-rates':
          return await apiService.getExchangeRates(data);
        
        default:
          return {
            data: null,
            error: { message: 'Unknown action' }
          };
      }
    } catch (error: any) {
      console.error(`API Error for action ${action}:`, error);
      return {
        data: null,
        error: { message: error.message || 'API request failed' }
      };
    }
  },

  // Send OTP via WhatsApp (Gupshup API)
  sendOTP: async (data: { phone: string }): Promise<LoanChatResponse> => {
    try {
      // Generate OTP
      const otp = generateOTP();
      
      // Store OTP for verification
      generatedOTPStore[data.phone] = otp;

      // Extract country code and phone number
      const phoneMatch = data.phone.match(/^(\+\d+)(\d+)$/);
      if (!phoneMatch) {
        throw new Error('Invalid phone number format');
      }
      
      const countryCode = phoneMatch[1].replace('+', '');
      const number = phoneMatch[2];

      // Call WhatsApp OTP API
      const response = await fetch(`${API_BASE_URL_GUPSHUP}/send-otp`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer seed_visa_tutor_2024',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_code: countryCode,
          number: number,
          otp_code: otp
        }),
      });

      if (!response.ok) {
        // Even if API fails, store OTP for demo purposes
        console.warn('OTP API failed, but OTP stored for demo:', otp);
        return {
          data: {
            success: true,
            message: 'OTP sent successfully (demo mode)',
            demo_otp: otp // For development only
          }
        };
      }

      const responseData = await response.json();

      return {
        data: {
          success: true,
          message: 'OTP sent successfully',
          ...responseData
        }
      };
    } catch (error: any) {
      // Fallback for demo - store OTP even if API fails
      const otp = generatedOTPStore[data.phone] || generateOTP();
      generatedOTPStore[data.phone] = otp;
      
      console.error('Send OTP error:', error);
      return {
        data: {
          success: true,
          message: 'OTP sent (demo mode)',
          demo_otp: otp // For development only
        }
      };
    }
  },

  // Verify OTP
  verifyOTP: async (data: { otp: string; phone: string }): Promise<LoanChatResponse> => {
    try {
      const storedOTP = generatedOTPStore[data.phone];
      
      if (!storedOTP) {
        return {
          data: {
            valid: false,
            message: 'No OTP found for this phone number. Please request a new OTP.'
          }
        };
      }

      const isValid = data.otp === storedOTP;

      if (isValid) {
        // Clear OTP after successful verification
        delete generatedOTPStore[data.phone];
      }

      return {
        data: {
          valid: isValid,
          message: isValid ? 'OTP verified successfully' : 'Invalid OTP. Please try again.'
        }
      };
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      return {
        data: {
          valid: false,
          message: 'OTP verification failed'
        },
        error: { message: error.message }
      };
    }
  },

  // Fetch programs from extract-costs API
  fetchPrograms: async (data: { universityName: string; studyLevel: string }): Promise<LoanChatResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL_LOAN}/extract-costs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'edumate-api-key': 'edumate'
        },
        body: JSON.stringify({
          institution_name: data.universityName,
          study_level: data.studyLevel,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData && responseData.data?.programs && responseData.data.programs.length > 0) {
        return {
          data: {
            success: true,
            data: {
              programs: responseData.data.programs,
              currency: responseData.data.currency || 'USD',
            }
          }
        };
      } else {
        return {
          data: {
            success: false,
            message: 'No programs found'
          }
        };
      }
    } catch (error: any) {
      console.error('Fetch programs error:', error);
      return {
        data: {
          success: false,
          message: 'Failed to fetch programs'
        },
        error: { message: error.message }
      };
    }
  },

  // Extract custom program from extract-program API
  extractCustomProgram: async (data: { institution_name: string; program_name: string }): Promise<LoanChatResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL_LOAN}/extract-program/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'edumate-api-key': 'edumate'
        },
        body: JSON.stringify({
          institution_name: data.institution_name,
          program_name: data.program_name,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData && responseData.data?.program) {
        return {
          data: {
            success: true,
            data: {
              program: responseData.data.program,
              currency: responseData.data.currency || 'USD',
            }
          }
        };
      } else {
        return {
          data: {
            success: false,
            message: 'Program details not found'
          }
        };
      }
    } catch (error: any) {
      console.error('Extract custom program error:', error);
      return {
        data: {
          success: false,
          message: 'Failed to extract program details'
        },
        error: { message: error.message }
      };
    }
  },

  // Get exchange rates
  getExchangeRates: async (data: { baseCurrency: string }): Promise<LoanChatResponse> => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${data.baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const exchangeData = await response.json();

      if (exchangeData && exchangeData.rates) {
        return {
          data: {
            rates: exchangeData.rates
          }
        };
      } else {
        // Fallback rates
        return {
          data: {
            rates: {
              USD: 1,
              EUR: 0.92,
              GBP: 0.79,
              INR: 83.12,
              CAD: 1.36,
              AUD: 1.53,
              JPY: 149.5,
              CNY: 7.24,
              SGD: 1.34,
              AED: 3.67,
            }
          }
        };
      }
    } catch (error: any) {
      console.error('Exchange rates error:', error);
      // Return fallback rates
      return {
        data: {
          rates: {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            INR: 83.12,
            CAD: 1.36,
            AUD: 1.53,
            JPY: 149.5,
            CNY: 7.24,
            SGD: 1.34,
            AED: 3.67,
          }
        }
      };
    }
  },

  // Upsert contact - save user data after OTP verification
  upsertContact: async (payload: ContactUpsertPayload): Promise<LoanChatResponse> => {
    try {
      // Filter out undefined/null/empty values from payload
      const filteredPayload = Object.entries(payload).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      console.log('Upserting contact with payload:', filteredPayload);

      const response = await fetch(`${API_BASE_URL_CONTACTS}/contacts/upsert`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();

      return {
        data: {
          success: true,
          message: 'Contact saved successfully',
          ...responseData
        }
      };
    } catch (error: any) {
      console.error('Contact upsert error:', error);
      return {
        data: {
          success: false,
          message: 'Failed to save contact data'
        },
        error: { message: error.message }
      };
    }
  },
};

// Export for development - remove in production
export { generatedOTPStore };