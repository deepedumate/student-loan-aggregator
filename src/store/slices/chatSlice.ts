import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Step = 'welcome' | 'study-level' | 'admit-status' | 'intended-date' | 'university' | 'programs' | 'loan-amount' | 'loan-type' | 'otp' | 'verified' | 'loans';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  step?: Step;
  id?: string;
}

interface UniversitySuggestion {
  name: string;          // "Harvard University, Cambridge, MA, USA"
  placeId: string;       // "ChIJOae13ii644kRuC8SkiUkpQQ"
  country: string;       // "US" or "USA"
}

export interface FormData {
  studyLevel: string;
  admitStatus: string;
  intendedMonth: number;
  intendedYear: number;
  universityName: string;
  studyDestination: string;
  program: any;
  totalCost: number;
  loanAmount: number;
  loanType: string;
  phone: string;
  otp: string;
  currency: string;
}

interface ChatState {
  messages: ChatMessage[];
  step: Step;
  isTyping: boolean;
  formData: FormData;
  countryCode: string;
  programData: any | null;
  userInput: string;
  phoneValidation: { isValid: boolean; error?: string } | null;
  otpCountdown: number;
  universitySuggestions: UniversitySuggestion[];
  isLoadingSuggestions: boolean;
  showSuggestions: boolean;
  preferredCurrency: string;
  exchangeRates: Record<string, number>;
  showCurrencySelector: boolean;
  currencyDisplayMode: "original" | "converted" | "both";
  costBreakdown: {
    totalCost: string;
    duration: string;
    tuition: string;
    tuitionPerYear?: string;
    living: string;
    livingPerYear?: string;
    showPerYear: boolean;
  } | null;
  isOtherProgramSelected: boolean;
  customProgramName: string;
}

const initialState: ChatState = {
  messages: [
    {
      text: "Welcome to Edumate. We help smart students make smarter funding decisions.\n\nLet's find the best education financing options tailored to your needs.",
      isUser: false,
    },
  ],
  step: "welcome",
  isTyping: false,
  formData: {
    studyLevel: "",
    admitStatus: "",
    intendedMonth: 0,
    intendedYear: 0,
    universityName: "",
    studyDestination: "",
    program: null,
    totalCost: 0,
    loanAmount: 0,
    loanType: "",
    phone: "",
    otp: "",
    currency: "USD",
  },
  countryCode: "+91",
  programData: null,
  userInput: "",
  phoneValidation: null,
  otpCountdown: 0,
  universitySuggestions: [],
  isLoadingSuggestions: false,
  showSuggestions: false,
  preferredCurrency: "USD",
  exchangeRates: {},
  showCurrencySelector: false,
  currencyDisplayMode: "both",
  costBreakdown: null,
  isOtherProgramSelected: false,
  customProgramName: "",
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setStep: (state, action: PayloadAction<Step>) => {
      state.step = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setProgramData: (state, action: PayloadAction<any>) => {
      state.programData = action.payload;
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    setPhoneValidation: (state, action: PayloadAction<{ isValid: boolean; error?: string } | null>) => {
      state.phoneValidation = action.payload;
    },
    setOtpCountdown: (state, action: PayloadAction<number>) => {
      state.otpCountdown = action.payload;
    },
    setUniversitySuggestions: (state, action: PayloadAction<UniversitySuggestion[]>) => {
      state.universitySuggestions = action.payload;
    },
    setIsLoadingSuggestions: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSuggestions = action.payload;
    },
    setShowSuggestions: (state, action: PayloadAction<boolean>) => {
      state.showSuggestions = action.payload;
    },
    setPreferredCurrency: (state, action: PayloadAction<string>) => {
      state.preferredCurrency = action.payload;
    },
    setExchangeRates: (state, action: PayloadAction<Record<string, number>>) => {
      state.exchangeRates = action.payload;
    },
    setShowCurrencySelector: (state, action: PayloadAction<boolean>) => {
      state.showCurrencySelector = action.payload;
    },
    setCurrencyDisplayMode: (state, action: PayloadAction<'original' | 'converted' | 'both'>) => {
      state.currencyDisplayMode = action.payload;
    },
    setCostBreakdown: (state, action: PayloadAction<ChatState['costBreakdown']>) => {
      state.costBreakdown = action.payload;
    },
    setIsOtherProgramSelected: (state, action: PayloadAction<boolean>) => {
      state.isOtherProgramSelected = action.payload;
    },
    setCustomProgramName: (state, action: PayloadAction<string>) => {
      state.customProgramName = action.payload;
    },
    resetChat: (state) => {
      return initialState;
    },
  },
});

export const {
  addMessage,
  setStep,
  setIsTyping,
  updateFormData,
  setCountryCode,
  setProgramData,
  setUserInput,
  setPhoneValidation,
  setOtpCountdown,
  setUniversitySuggestions,
  setIsLoadingSuggestions,
  setShowSuggestions,
  setPreferredCurrency,
  setExchangeRates,
  setShowCurrencySelector,
  setCurrencyDisplayMode,
  setCostBreakdown,
  setIsOtherProgramSelected,
  setCustomProgramName,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;