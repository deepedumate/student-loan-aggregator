import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
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
  type Step
} from "@/store/slices/chatSlice";
import { ChatBubble } from "@/components/ai-loan-path/ChatBubble";
import { OptionButton } from "@/components/ai-loan-path/OptionButton";
// import { LoanCard } from "@/components/ai-loan-path/LoanCard";
import { CostBreakdownCard } from "@/components/ai-loan-path/CostBreakdownCard";
import { IntendedDateCard } from "@/components/ai-loan-path/IntendedDateCard";
import { CurrencyDisplay } from "@/components/ai-loan-path/CurrencyDisplay";
import { ThemeToggle } from "@/components/ai-loan-path/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GraduationCap,
  Building2,
  DollarSign,
  Phone,
  Filter,
  TrendingUp,
  RotateCcw,
  ArrowLeftRight,
  Shield,
  Zap,
  Wallet,
  Calculator,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/apiService";
import { googleMapsService } from "@/lib/Googlemapsservice";

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  "";

const Index = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  // Redux state selectors
  const messages = useSelector((state: RootState) => state.chat.messages);
  const step = useSelector((state: RootState) => state.chat.step);
  const isTyping = useSelector((state: RootState) => state.chat.isTyping);
  const formData = useSelector((state: RootState) => state.chat.formData);
  const countryCode = useSelector((state: RootState) => state.chat.countryCode);
  const programData = useSelector((state: RootState) => state.chat.programData);
  const userInput = useSelector((state: RootState) => state.chat.userInput);
  const phoneValidation = useSelector(
    (state: RootState) => state.chat.phoneValidation
  );
  const otpCountdown = useSelector(
    (state: RootState) => state.chat.otpCountdown
  );
  const universitySuggestions = useSelector(
    (state: RootState) => state.chat.universitySuggestions
  );
  const isLoadingSuggestions = useSelector(
    (state: RootState) => state.chat.isLoadingSuggestions
  );
  const showSuggestions = useSelector(
    (state: RootState) => state.chat.showSuggestions
  );
  const preferredCurrency = useSelector(
    (state: RootState) => state.chat.preferredCurrency
  );
  const exchangeRates = useSelector(
    (state: RootState) => state.chat.exchangeRates
  );
  const showCurrencySelector = useSelector(
    (state: RootState) => state.chat.showCurrencySelector
  );
  const currencyDisplayMode = useSelector(
    (state: RootState) => state.chat.currencyDisplayMode
  );
  const costBreakdown = useSelector(
    (state: RootState) => state.chat.costBreakdown
  );
  const isOtherProgramSelected = useSelector(
    (state: RootState) => state.chat.isOtherProgramSelected
  );
  const customProgramName = useSelector(
    (state: RootState) => state.chat.customProgramName
  );

  // Local state only for Google Maps
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const universityInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  // Auto-scroll to bottom when messages, typing state, or step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping, step]);

  // Initialize Google Maps API
  useEffect(() => {
    const initGoogleMaps = async () => {
      if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "") {
        console.warn(
          "Google Maps API key not found. University autocomplete will not work."
        );
        return;
      }

      try {
        await googleMapsService.initialize(GOOGLE_MAPS_API_KEY);
        setIsGoogleMapsLoaded(true);
        console.log("Google Maps API loaded successfully");
      } catch (error) {
        console.error("Failed to load Google Maps API:", error);
        toast({
          title: "Warning",
          description:
            "University autocomplete may not work properly. Please check your API key.",
          variant: "destructive",
        });
      }
    };

    initGoogleMaps();
  }, [toast]);

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => {
        dispatch(setOtpCountdown(otpCountdown - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown, dispatch]);

  const addMessageHelper = (text: string, isUser: boolean, stepInfo?: Step) => {
    dispatch(
      addMessage({
        text,
        isUser,
        step: stepInfo,
        id: `msg-${Date.now()}-${Math.random()}`,
      })
    );
  };

  const addTypingMessage = async (text: string) => {
    dispatch(setIsTyping(true));
    await new Promise((resolve) => setTimeout(resolve, 400));
    dispatch(setIsTyping(false));
    addMessageHelper(text, false);
  };

  const handleNewConversation = () => {
    dispatch(resetChat());
  };

  // Helper function to extract study destination from university name
  const extractStudyDestination = (universityName: string): string => {
    const university = universityName.toLowerCase();

    if (
      university.includes("harvard") ||
      university.includes("mit") ||
      university.includes("stanford") ||
      university.includes("yale") ||
      university.includes("princeton") ||
      university.includes("columbia") ||
      university.includes("berkeley") ||
      university.includes("caltech") ||
      university.includes("chicago") ||
      university.includes("pennsylvania") ||
      university.includes("cornell") ||
      university.includes("duke") ||
      university.includes("northwestern") ||
      university.includes("brown") ||
      university.includes("vanderbilt") ||
      university.includes("rice") ||
      university.includes("notre dame") ||
      university.includes("ucla") ||
      university.includes("usc") ||
      university.includes("michigan") ||
      university.includes("virginia") ||
      university.includes("carolina") ||
      university.includes("texas") ||
      university.includes("washington") ||
      university.includes("georgia") ||
      university.includes("florida") ||
      university.includes("wisconsin") ||
      university.includes("illinois") ||
      university.includes("boston") ||
      university.includes("nyu") ||
      university.includes("new york university")
    ) {
      return "US";
    }

    if (
      university.includes("oxford") ||
      university.includes("cambridge") ||
      university.includes("imperial") ||
      university.includes("ucl") ||
      university.includes("london") ||
      university.includes("edinburgh") ||
      university.includes("manchester") ||
      university.includes("king's") ||
      university.includes("warwick") ||
      university.includes("bristol") ||
      university.includes("glasgow") ||
      university.includes("durham") ||
      university.includes("birmingham") ||
      university.includes("leeds") ||
      university.includes("southampton") ||
      university.includes("sheffield") ||
      university.includes("nottingham") ||
      university.includes("liverpool")
    ) {
      return "UK";
    }

    if (
      university.includes("toronto") ||
      university.includes("mcgill") ||
      university.includes("british columbia") ||
      university.includes("ubc") ||
      university.includes("waterloo") ||
      university.includes("montreal") ||
      university.includes("alberta") ||
      university.includes("mcmaster") ||
      university.includes("queens") ||
      university.includes("calgary") ||
      university.includes("ottawa") ||
      university.includes("western") ||
      university.includes("dalhousie") ||
      university.includes("simon fraser")
    ) {
      return "Canada";
    }

    if (
      university.includes("melbourne") ||
      university.includes("sydney") ||
      university.includes("queensland") ||
      university.includes("unsw") ||
      university.includes("anu") ||
      university.includes("monash") ||
      university.includes("adelaide") ||
      university.includes("western australia") ||
      university.includes("uwa") ||
      university.includes("rmit") ||
      university.includes("macquarie") ||
      university.includes("deakin")
    ) {
      return "Australia";
    }

    if (
      university.includes("munich") ||
      university.includes("heidelberg") ||
      university.includes("berlin") ||
      university.includes("bonn") ||
      university.includes("freiburg") ||
      university.includes("hamburg") ||
      university.includes("cologne") ||
      university.includes("frankfurt")
    ) {
      return "Germany";
    }

    if (
      university.includes("sorbonne") ||
      university.includes("paris") ||
      university.includes("ecole") ||
      university.includes("lyon") ||
      university.includes("marseille") ||
      university.includes("toulouse")
    ) {
      return "France";
    }

    if (
      university.includes("singapore") ||
      university.includes("nus") ||
      university.includes("ntu") ||
      university.includes("smu")
    ) {
      return "Singapore";
    }

    return "Other";
  };

  // Helper function to map study level
  const mapStudyLevel = (studyLevel: string): string => {
    const mapping: Record<string, string> = {
      undergraduate: "Bachelor",
      graduate_mba: "MBA",
      graduate_masters: "Master",
      phd: "PhD",
    };
    return mapping[studyLevel] || "Bachelor";
  };

  // Helper function to get month name
  const getMonthName = (monthNumber: number): string => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1] || "";
  };

  // Helper function to prepare contact payload
  const prepareContactPayload = (formData: any) => {
    const phoneNumber = formData.phone.replace(/\+/g, "");
    const submissionDate = new Date().toISOString();
    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent : "";
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const studyDestination = extractStudyDestination(formData.universityName);
    const levelOfEducation = mapStudyLevel(formData.studyLevel);
    const intakeMonth = getMonthName(formData.intendedMonth);
    const intakeYear = formData.intendedYear.toString();

    const payload: Record<string, any> = {
      phoneNumber,
      baseCurrency: formData.currency || "USD",
      studyDestinationCurrency: formData.currency || "USD",
      selectedLoanCurrency: formData.currency || "USD",
      levelOfEducation,
      studyDestination,
      loanAmount: formData.loanAmount.toString(),
      utm_campaign: "loan_eligibility",
      formType: "loan_eligibility_checker",
      submissionDate,
      userAgent,
      referrer,
    };

    if (intakeMonth) payload.intakeMonth = intakeMonth;
    if (intakeYear) payload.intakeYear = intakeYear;
    if (formData.loanType)
      payload.loanPreference =
        formData.loanType === "secured" ? "Secured" : "Unsecured";

    return payload;
  };

  const handleEditMessage = (messageId: string) => {
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1) return;

    const editedMessage = messages[messageIndex];
    if (!editedMessage.step) return;

    // Reset to that step
    dispatch(setStep(editedMessage.step));

    toast({
      title: "Editing Response",
      description: "You can now update your selection.",
    });
  };

  const getCurrencySymbol = (currencyCode: string): string => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      INR: "₹",
      CAD: "C$",
      AUD: "A$",
      JPY: "¥",
      CNY: "¥",
      CHF: "CHF",
      SGD: "S$",
      AED: "AED",
      SAR: "SAR",
    };
    return symbols[currencyCode] || currencyCode;
  };

  const fetchExchangeRates = async (baseCurrency: string) => {
    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "get-exchange-rates",
        data: { baseCurrency },
      });

      if (error) throw error;

      if (data && data.rates) {
        dispatch(setExchangeRates(data.rates));
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      toast({
        title: "Exchange Rate Error",
        description: "Using original currency only.",
        variant: "destructive",
      });
    }
  };

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    if (fromCurrency === toCurrency) return amount;
    if (!exchangeRates[toCurrency]) return amount;
    return amount * exchangeRates[toCurrency];
  };

  const formatCurrencyWithConversion = (
    amount: number,
    originalCurrency: string
  ): string => {
    const originalSymbol = getCurrencySymbol(originalCurrency);
    const originalAmount = `${originalSymbol}${amount.toLocaleString()}`;

    if (
      preferredCurrency === originalCurrency ||
      !exchangeRates[preferredCurrency]
    ) {
      return originalAmount;
    }

    const converted = convertCurrency(
      amount,
      originalCurrency,
      preferredCurrency
    );
    const preferredSymbol = getCurrencySymbol(preferredCurrency);
    const convertedAmount = `${preferredSymbol}${Math.round(
      converted
    ).toLocaleString()}`;

    if (currencyDisplayMode === "original") {
      return originalAmount;
    } else if (currencyDisplayMode === "converted") {
      return convertedAmount;
    } else {
      return `${originalAmount} (≈ ${convertedAmount})`;
    }
  };

  const handleStudyLevel = async (level: string) => {
    const labels: Record<string, string> = {
      undergraduate: "Undergraduate",
      graduate_mba: "MBA",
      graduate_masters: "Specialised Masters",
      phd: "PhD",
    };

    addMessageHelper(labels[level], true, "study-level");
    dispatch(updateFormData({ studyLevel: level }));

    const tips: Record<string, string> = {
      undergraduate:
        "Bachelor's programs typically range from **3-4 years** with **flexible repayment options**.",
      graduate_mba:
        "MBA programs often qualify for **preferential rates** at **leading business schools**.",
      graduate_masters:
        "Master's programs frequently qualify for **higher loan amounts** based on **strong ROI metrics**.",
      phd: "PhD programs may have **additional funding options** including **research assistantships**.",
    };

    await addTypingMessage(
      tips[level] + "\n\nWhat is your current admission status?"
    );
    dispatch(setStep("admit-status"));
  };

  const handleAdmitStatus = async (status: string) => {
    const labels: Record<string, string> = {
      applied: "Applied",
      admitted: "Admitted",
      yet_to_apply: "Yet to Apply",
      deferred: "Deferred",
    };

    addMessageHelper(labels[status], true, "admit-status");
    dispatch(updateFormData({ admitStatus: status }));

    const responses: Record<string, string> = {
      applied:
        "Understood. We'll prioritize **pre-approved loan options** for your application timeline.",
      admitted:
        "**Congratulations** on your admission! Let's secure the financing for your program.",
      yet_to_apply:
        "We'll show you loan options to help with **financial planning** for your applications.",
      deferred:
        "We'll identify **flexible loan options** that accommodate your timeline.",
    };

    await addTypingMessage(
      responses[status] + "\n\nWhen do you intend to start your program?"
    );
    dispatch(setStep("intended-date"));
  };

  const handleIntendedDate = async (month: number, year: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    addMessageHelper(`${monthNames[month - 1]} ${year}`, true, "intended-date");
    dispatch(updateFormData({ intendedMonth: month, intendedYear: year }));

    await addTypingMessage("Perfect. Now, please enter your university name.");
    dispatch(setStep("university"));
  };

  const fetchUniversitySuggestions = async (query: string) => {
    if (query.length < 2) {
      dispatch(setUniversitySuggestions([]));
      dispatch(setShowSuggestions(false));
      return;
    }

    if (!isGoogleMapsLoaded || !googleMapsService.isLoaded()) {
      console.warn("Google Maps API not loaded yet");
      return;
    }

    dispatch(setIsLoadingSuggestions(true));

    try {
      const suggestions = await googleMapsService.getUniversitySuggestions(
        query
      );
      dispatch(setUniversitySuggestions(suggestions));
      dispatch(setShowSuggestions(suggestions.length > 0));
    } catch (error) {
      console.error("Error fetching university suggestions:", error);
      dispatch(setUniversitySuggestions([]));
      dispatch(setShowSuggestions(false));
    } finally {
      dispatch(setIsLoadingSuggestions(false));
    }
  };

  const handleUniversityInputChange = (value: string) => {
    dispatch(setUserInput(value));

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      fetchUniversitySuggestions(value);
    }, 300);
  };

  const handleSuggestionSelect = (universityName: string) => {
    dispatch(setUserInput(universityName));
    dispatch(setShowSuggestions(false));
    dispatch(setUniversitySuggestions([]));
    handleUniversitySearch(universityName);
  };

  const handleUniversitySearch = async (selectedUniversity?: string) => {
    const universityName = selectedUniversity || userInput.trim();
    if (!universityName) return;

    addMessageHelper(universityName, true, "university");
    dispatch(setUserInput(""));
    dispatch(setShowSuggestions(false));
    dispatch(setUniversitySuggestions([]));
    dispatch(updateFormData({ universityName }));

    await addTypingMessage(
      `Searching for **${universityName}**. Retrieving available programs...`
    );

    dispatch(setIsTyping(true));

    try {
      const programResponse = await apiService.invokeLoanChat({
        action: "fetch-programs",
        data: {
          universityName,
          studyLevel: formData.studyLevel,
        },
      });

      if (programResponse.error) throw programResponse.error;

      dispatch(setProgramData(programResponse.data));
      dispatch(setIsTyping(false));

      if (
        programResponse.data.success &&
        programResponse.data.data.programs.length > 0
      ) {
        const currency = programResponse.data.data.currency || "USD";
        dispatch(updateFormData({ currency }));
        await fetchExchangeRates(currency);
        await addTypingMessage(
          `Found ${programResponse.data.data.programs.length} programs at ${universityName}. Total costs include tuition and living expenses.\n\nSelect your program:`
        );
        dispatch(setStep("programs"));
      } else {
        await addTypingMessage(
          `Sorry, no programs found for ${universityName} at ${formData.studyLevel} level. Please try another university.`
        );
        dispatch(setStep("university"));
      }
    } catch (error) {
      console.error("Program fetch error:", error);
      dispatch(setIsTyping(false));
      toast({
        title: "Error",
        description: "Failed to fetch programs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProgramSelect = async (program: any) => {
    addMessageHelper(program.program_name, true, "programs");
    const totalCost = program.total_program_cost;
    dispatch(updateFormData({ programId: program.program_name, totalCost }));

    const durationYears = program.duration_years || 0;
    const duration =
      durationYears > 0
        ? `${durationYears} ${durationYears === 1 ? "year" : "years"}`
        : "N/A";

    const totalCostStr = formatCurrencyWithConversion(
      totalCost,
      formData.currency
    );
    const tuitionStr = formatCurrencyWithConversion(
      program.total_tuition,
      formData.currency
    );
    const livingStr = formatCurrencyWithConversion(
      program.total_cost_of_living,
      formData.currency
    );

    const tuitionPerYear = program.tuition_per_year || 0;
    const livingPerYear = program.cost_of_living_per_year || 0;
    const tuitionPerYearStr =
      tuitionPerYear > 0
        ? formatCurrencyWithConversion(tuitionPerYear, formData.currency)
        : undefined;
    const livingPerYearStr =
      livingPerYear > 0
        ? formatCurrencyWithConversion(livingPerYear, formData.currency)
        : undefined;

    dispatch(
      setCostBreakdown({
        totalCost: totalCostStr,
        duration,
        tuition: tuitionStr,
        tuitionPerYear: tuitionPerYearStr,
        living: livingStr,
        livingPerYear: livingPerYearStr,
        showPerYear: durationYears > 1,
      })
    );

    await addTypingMessage(
      "Program selected. Review the cost breakdown below and enter your desired loan amount:"
    );
    dispatch(setStep("loan-amount"));
  };

  const handleOtherProgramClick = () => {
    dispatch(setIsOtherProgramSelected(true));
  };

  const handleCustomProgramSubmit = async () => {
    if (!customProgramName.trim()) {
      toast({
        title: "Program Name Required",
        description: "Please enter a program name.",
        variant: "destructive",
      });
      return;
    }

    addMessageHelper(customProgramName, true, "programs");
    dispatch(setIsTyping(true));

    try {
      const response = await apiService.invokeLoanChat({
        action: "extract-custom-program",
        data: {
          institution_name: formData.universityName,
          program_name: customProgramName,
        },
      });

      if (response.error) throw response.error;

      dispatch(setIsTyping(false));

      if (response.data.success && response.data.data) {
        const apiData = response.data.data;
        const program = apiData.program;
        const currency = apiData.currency || formData.currency;
        const totalCost = program.total_program_cost;

        dispatch(
          updateFormData({
            programId: program.program_name,
            totalCost,
            currency,
          })
        );

        if (currency !== formData.currency) {
          await fetchExchangeRates(currency);
        }

        const durationYears = program.duration_years || 0;
        const duration =
          durationYears > 0
            ? `${durationYears} ${durationYears === 1 ? "year" : "years"}`
            : "N/A";
        const totalCostStr = formatCurrencyWithConversion(totalCost, currency);
        const tuitionStr = formatCurrencyWithConversion(
          program.total_tuition,
          currency
        );
        const livingStr = formatCurrencyWithConversion(
          program.total_cost_of_living,
          currency
        );
        const tuitionPerYear = program.tuition_per_year || 0;
        const livingPerYear = program.cost_of_living_per_year || 0;
        const tuitionPerYearStr =
          tuitionPerYear > 0
            ? formatCurrencyWithConversion(tuitionPerYear, currency)
            : undefined;
        const livingPerYearStr =
          livingPerYear > 0
            ? formatCurrencyWithConversion(livingPerYear, currency)
            : undefined;

        dispatch(
          setCostBreakdown({
            totalCost: totalCostStr,
            duration,
            tuition: tuitionStr,
            tuitionPerYear: tuitionPerYearStr,
            living: livingStr,
            livingPerYear: livingPerYearStr,
            showPerYear: durationYears > 1,
          })
        );

        dispatch(setIsOtherProgramSelected(false));
        dispatch(setCustomProgramName(""));
        await addTypingMessage(
          "Program details retrieved. Review the cost breakdown below and enter your desired loan amount:"
        );
        dispatch(setStep("loan-amount"));
      } else {
        await addTypingMessage(
          `Sorry, couldn't retrieve details for ${customProgramName}. Please try selecting from the list or enter another program name.`
        );
        dispatch(setIsOtherProgramSelected(false));
        dispatch(setCustomProgramName(""));
      }
    } catch (error) {
      console.error("Custom program fetch error:", error);
      dispatch(setIsTyping(false));
      toast({
        title: "Error",
        description: "Failed to fetch program details. Please try again.",
        variant: "destructive",
      });
      dispatch(setIsOtherProgramSelected(false));
      dispatch(setCustomProgramName(""));
    }
  };

  const handleLoanAmount = async () => {
    const amount = parseFloat(userInput);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid loan amount.",
        variant: "destructive",
      });
      return;
    }

    const amountStr = formatCurrencyWithConversion(amount, formData.currency);
    addMessageHelper(amountStr, true, "loan-amount");
    dispatch(updateFormData({ loanAmount: amount }));

    await addTypingMessage(
      `Loan amount: ${amountStr}\n\n**What type of loan are you looking for?**`
    );
    dispatch(setStep("loan-type"));
    dispatch(setUserInput(""));
  };

  const handleLoanType = async (type: "secured" | "unsecured") => {
    const labels: Record<string, string> = {
      secured: "Secured Loan",
      unsecured: "Unsecured Loan",
    };

    addMessageHelper(labels[type], true, "loan-type");
    dispatch(updateFormData({ loanType: type }));

    const responses: Record<string, string> = {
      secured:
        "**Secured Loan** selected. You'll typically get **lower interest rates** and **higher loan amounts** with this option.\n\nFor identity verification and personalized offers, please enter your mobile number. **A verification code will be sent to you on WhatsApp.**",
      unsecured:
        "**Unsecured Loan** selected. Enjoy **faster approval** and **no collateral risk** with this option.\n\nFor identity verification and personalized offers, please enter your mobile number. **A verification code will be sent to you on WhatsApp.**",
    };

    await addTypingMessage(responses[type]);
    dispatch(setStep("otp"));
  };

  const validatePhoneNumber = (
    phone: string
  ): { isValid: boolean; error?: string } => {
    if (!phone.trim()) {
      return { isValid: false, error: "" };
    }

    const cleaned = phone.replace(/[\s-]/g, "");

    if (!/^\d+$/.test(cleaned)) {
      return {
        isValid: false,
        error: "Only numbers allowed",
      };
    }

    if (countryCode === "+91") {
      if (cleaned.length < 10) {
        return {
          isValid: false,
          error: `${10 - cleaned.length} more digits needed`,
        };
      }
      if (cleaned.length > 10) {
        return {
          isValid: false,
          error: "Indian mobile number must be 10 digits",
        };
      }
      if (!/^[6-9]/.test(cleaned)) {
        return {
          isValid: false,
          error: "Must start with 6, 7, 8, or 9",
        };
      }
    } else {
      if (cleaned.length < 7) {
        return {
          isValid: false,
          error: `${7 - cleaned.length} more digits needed`,
        };
      }
      if (cleaned.length > 14) {
        return {
          isValid: false,
          error: "Number too long",
        };
      }
    }

    return { isValid: true };
  };

  const handlePhoneInputChange = (value: string) => {
    dispatch(setUserInput(value));

    if (step === "otp" && !formData.phone) {
      const validation = validatePhoneNumber(value);
      dispatch(setPhoneValidation(validation));
    }
  };

  const handlePhoneSubmit = async () => {
    const cleaned = userInput.replace(/[\s-]/g, "");
    const validation = validatePhoneNumber(cleaned);

    if (!validation.isValid) {
      toast({
        title: "Invalid Phone Number",
        description: validation.error || "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    const formattedPhone = countryCode + cleaned;

    addMessageHelper(`${countryCode} ${userInput}`, true, "otp");
    dispatch(updateFormData({ phone: formattedPhone }));
    dispatch(setPhoneValidation(null));
    dispatch(setIsTyping(true));

    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "send-otp",
        data: { phone: formattedPhone },
      });

      if (error) {
        throw error;
      }

      console.log("OTP send response:", data);

      dispatch(setIsTyping(false));
      dispatch(setOtpCountdown(30));
      await addTypingMessage(
        "**Verification code sent on WhatsApp.** Please enter the 6-digit code."
      );
      dispatch(setUserInput(""));
    } catch (error) {
      console.error("Phone submit error:", error);
      dispatch(setIsTyping(false));
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResendOTP = async () => {
    if (otpCountdown > 0) return;

    dispatch(setIsTyping(true));
    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "send-otp",
        data: { phone: formData.phone },
      });

      if (error) {
        throw error;
      }

      dispatch(setIsTyping(false));
      dispatch(setOtpCountdown(30));
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your WhatsApp.",
      });
    } catch (error) {
      console.error("OTP resend error:", error);
      dispatch(setIsTyping(false));
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditPhone = () => {
    dispatch(updateFormData({ phone: "" }));
    dispatch(setUserInput(""));
    dispatch(setOtpCountdown(0));
    toast({
      title: "Phone Number Reset",
      description: "You can now enter a different phone number.",
    });
  };

  const handleOTPVerify = async () => {
    if (userInput.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    addMessageHelper(userInput, true);
    dispatch(setIsTyping(true));

    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "verify-otp",
        data: { otp: userInput, phone: formData.phone },
      });

      console.log("OTP verification response:", { data, error });

      if (error) {
        throw error;
      }

      dispatch(setIsTyping(false));

      if (data && data.valid) {
        // OTP verified successfully - now save contact data
        dispatch(setIsTyping(true));

        try {
          // Prepare contact payload
          const contactPayload = prepareContactPayload(formData);
          console.log("Saving contact data:", contactPayload);

          // Call contact upsert API
          const contactResponse = await apiService.upsertContact(
            contactPayload
          );

          if (contactResponse.data?.success) {
            console.log("Contact saved successfully:", contactResponse.data);
          } else {
            console.error("Failed to save contact:", contactResponse.error);
          }
        } catch (contactError) {
          console.error("Error saving contact:", contactError);
        }

        // Continue with verification success regardless of contact save result
        dispatch(setIsTyping(false));
        await addTypingMessage(
          "✅ **Verification successful!**\n\nYour profile is now verified. Choose an option below to continue:"
        );
        dispatch(setStep("verified"));
      } else {
        await addTypingMessage(
          data?.message || "Invalid code. Please verify and try again."
        );
      }

      dispatch(setUserInput(""));
    } catch (error) {
      console.error("OTP verification error:", error);
      dispatch(setIsTyping(false));
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckEligibleLoans = async () => {
    const url = "/loans";
    if (typeof window !== "undefined") {
      window.location.assign(url);
    }
  };

  const handleCalculateRepayment = () => {
    const url = "https://edumateglobal.com/resources/tools/loan-emi-calculator";
    if (typeof window !== "undefined") {
      window.location.assign(url);
    }
  };

  const mockLoans = [
    {
      id: "1",
      lenderName: "EduFinance Pro",
      interestRate: 6.5,
      maxAmount: 150000,
      tenure: 15,
      processingFee: 1.5,
      features: [
        "No collateral required",
        "Flexible repayment",
        "Quick approval in 48 hours",
        "100% digitized process",
      ],
      eligible: true,
    },
    {
      id: "2",
      lenderName: "StudyLoan Global",
      interestRate: 7.2,
      maxAmount: 200000,
      tenure: 20,
      processingFee: 2.0,
      features: [
        "Covers full tuition",
        "Grace period available",
        "Pre-visa disbursement",
        "Co-borrower not mandatory",
      ],
      eligible: true,
    },
    {
      id: "3",
      lenderName: "ScholarFund Plus",
      interestRate: 8.0,
      maxAmount: 100000,
      tenure: 10,
      processingFee: 1.0,
      features: [
        "Low processing fee",
        "Quick documentation",
        "Moratorium period",
        "Tax benefits available",
      ],
      eligible: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-hidden relative">
        {step !== "loans" ? (
          <>
            <ScrollArea className="flex-1 h-full">
              <div className="pb-32">
                {messages.map((msg, idx) => {
                  const canEdit =
                    msg.isUser &&
                    msg.step &&
                    step !== "welcome" &&
                    idx < messages.length - 1;
                  return (
                    <ChatBubble
                      key={msg.id || idx}
                      message={msg.text}
                      isUser={msg.isUser}
                      canEdit={canEdit}
                      onEdit={() => msg.id && handleEditMessage(msg.id)}
                    />
                  );
                })}

                {isTyping && <ChatBubble message="" isUser={false} isTyping />}

                {/* Interactive Elements - Inside chat window */}
                <div className="max-w-3xl mx-auto px-4">
                  {step === "welcome" && !isTyping && (
                    <div className="flex justify-center py-6">
                      <Button
                        onClick={async () => {
                          await addTypingMessage(
                            "What level of study are you pursuing?"
                          );
                          dispatch(setStep("study-level"));
                        }}
                        className="gradient-primary px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95"
                      >
                        Get Started
                      </Button>
                    </div>
                  )}

                  {step === "study-level" && !isTyping && (
                    <div className="grid gap-2 py-4">
                      <OptionButton
                        label="Undergraduate"
                        icon={<GraduationCap className="w-5 h-5" />}
                        onClick={() => handleStudyLevel("undergraduate")}
                      />
                      <OptionButton
                        label="MBA"
                        icon={<Building2 className="w-5 h-5" />}
                        onClick={() => handleStudyLevel("graduate_mba")}
                      />
                      <OptionButton
                        label="Specialised Masters"
                        icon={<GraduationCap className="w-5 h-5" />}
                        onClick={() => handleStudyLevel("graduate_masters")}
                      />
                      <OptionButton
                        label="PhD"
                        icon={<GraduationCap className="w-5 h-5" />}
                        onClick={() => handleStudyLevel("phd")}
                      />
                    </div>
                  )}

                  {step === "admit-status" && !isTyping && (
                    <div className="grid gap-2 py-4">
                      <OptionButton
                        label="Applied"
                        onClick={() => handleAdmitStatus("applied")}
                      />
                      <OptionButton
                        label="Admitted"
                        onClick={() => handleAdmitStatus("admitted")}
                      />
                      <OptionButton
                        label="Yet to Apply"
                        onClick={() => handleAdmitStatus("yet_to_apply")}
                      />
                      <OptionButton
                        label="Deferred"
                        onClick={() => handleAdmitStatus("deferred")}
                      />
                    </div>
                  )}

                  {step === "intended-date" && !isTyping && (
                    <div className="py-4">
                      <IntendedDateCard onSelect={handleIntendedDate} />
                    </div>
                  )}

                  {step === "programs" &&
                    !isTyping &&
                    programData?.data?.programs && (
                      <>
                        <div className="flex items-center justify-between mb-3 py-2">
                          <span className="text-xs text-muted-foreground">
                            {programData.data.programs.length} program
                            {programData.data.programs.length !== 1 ? "s" : ""}{" "}
                            found
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const modes: Array<
                                  "original" | "converted" | "both"
                                > = ["original", "converted", "both"];
                                const currentIndex =
                                  modes.indexOf(currencyDisplayMode);
                                const nextMode =
                                  modes[(currentIndex + 1) % modes.length];
                                dispatch(setCurrencyDisplayMode(nextMode));
                              }}
                              className="h-8 px-3 text-xs transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm group"
                              title="Toggle currency display"
                            >
                              <ArrowLeftRight className="w-3 h-3 mr-1.5 transition-transform duration-300 group-hover:rotate-180" />
                              <span className="transition-all duration-300 font-medium">
                                {currencyDisplayMode === "original" &&
                                  `${formData.currency} Only`}
                                {currencyDisplayMode === "converted" &&
                                  `${preferredCurrency} Only`}
                                {currencyDisplayMode === "both" &&
                                  `${formData.currency} + ${preferredCurrency}`}
                              </span>
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              Convert to:
                            </span>
                            <Select
                              value={preferredCurrency}
                              onValueChange={(value) =>
                                dispatch(setPreferredCurrency(value))
                              }
                            >
                              <SelectTrigger className="w-28 h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">🇺🇸 USD</SelectItem>
                                <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                                <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                                <SelectItem value="INR">🇮🇳 INR</SelectItem>
                                <SelectItem value="CAD">🇨🇦 CAD</SelectItem>
                                <SelectItem value="AUD">🇦🇺 AUD</SelectItem>
                                <SelectItem value="JPY">🇯🇵 JPY</SelectItem>
                                <SelectItem value="CNY">🇨🇳 CNY</SelectItem>
                                <SelectItem value="SGD">🇸🇬 SGD</SelectItem>
                                <SelectItem value="AED">🇦🇪 AED</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-3">
                          {programData.data.programs.map(
                            (program: any, idx: number) => {
                              const convertedTotal =
                                formatCurrencyWithConversion(
                                  program.total_program_cost,
                                  formData.currency
                                );
                              return (
                                <Card
                                  key={idx}
                                  className="p-5 cursor-pointer hover:border-primary/50 transition-all duration-300 bg-card transform hover:-translate-y-0.5 hover:shadow-md group"
                                  onClick={() => handleProgramSelect(program)}
                                >
                                  <h4 className="font-semibold text-base mb-2 transition-colors duration-300 group-hover:text-primary">
                                    {program.program_name}
                                  </h4>
                                  <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span className="transition-all duration-300 group-hover:text-foreground">
                                      Duration: {program.duration_years} years
                                    </span>
                                    <span className="transition-all duration-300 group-hover:text-foreground">
                                      Total:{" "}
                                      <CurrencyDisplay value={convertedTotal} />
                                    </span>
                                  </div>
                                  {program.notes && (
                                    <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded transition-colors duration-300 group-hover:bg-muted/50">
                                      {program.notes}
                                    </p>
                                  )}
                                </Card>
                              );
                            }
                          )}

                          {/* Other Option Card */}
                          <Card
                            className="p-5 cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 bg-card/50 transform hover:-translate-y-0.5 hover:shadow-md group"
                            onClick={handleOtherProgramClick}
                          >
                            <h4 className="font-semibold text-base mb-2 transition-colors duration-300 group-hover:text-primary flex items-center gap-2">
                              <span>Other</span>
                              <span className="text-xs font-normal text-muted-foreground">
                                (Enter custom program)
                              </span>
                            </h4>
                            <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                              Can't find your program? Enter it manually to get
                              cost details.
                            </p>
                          </Card>
                        </div>

                        {/* Custom Program Input */}
                        {isOtherProgramSelected && (
                          <div className="mt-4 p-4 border border-primary/30 rounded-lg bg-primary/5">
                            <label className="text-sm font-medium mb-2 block">
                              Enter Program Name
                            </label>
                            <div className="flex gap-2">
                              <Input
                                placeholder="e.g., Master of Finance"
                                value={customProgramName}
                                onChange={(e) =>
                                  dispatch(setCustomProgramName(e.target.value))
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleCustomProgramSubmit()
                                }
                                className="flex-1 h-11 transition-all duration-300 focus:shadow-sm"
                              />
                              <Button
                                onClick={handleCustomProgramSubmit}
                                disabled={!customProgramName.trim()}
                                className="gradient-primary px-5 h-11 font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95"
                              >
                                Fetch Details
                              </Button>
                              <Button
                                onClick={() => {
                                  dispatch(setIsOtherProgramSelected(false));
                                  dispatch(setCustomProgramName(""));
                                }}
                                variant="outline"
                                className="h-11 px-4"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                  {step === "university" && !isTyping && (
                    <div className="relative py-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            ref={universityInputRef}
                            type="text"
                            placeholder="Start typing university name..."
                            value={userInput}
                            onChange={(e) =>
                              handleUniversityInputChange(e.target.value)
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleUniversitySearch()
                            }
                            className="pl-10 h-12 rounded-lg transition-all duration-300 focus:shadow-sm hover:border-primary/40"
                          />
                          {isLoadingSuggestions && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => handleUniversitySearch()}
                          disabled={!userInput.trim()}
                          className="gradient-primary px-6 h-12 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          Search
                        </Button>
                      </div>

                      {showSuggestions && universitySuggestions.length > 0 && (
                        <Card className="absolute bottom-full left-0 right-0 mb-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                          <div className="py-1">
                            {universitySuggestions.map((suggestion, idx) => (
                              <div
                                key={idx}
                                className="px-4 py-3 hover:bg-primary/10 cursor-pointer transition-colors duration-200 border-b border-border last:border-0"
                                onClick={() =>
                                  handleSuggestionSelect(suggestion)
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-primary" />
                                  <span className="text-sm">{suggestion}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>
                  )}

                  {step === "loan-amount" && !isTyping && costBreakdown && (
                    <div className="py-4 space-y-4">
                      <CostBreakdownCard {...costBreakdown} />
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 peer-focus:text-primary" />
                          <Input
                            type="number"
                            placeholder={`Enter amount in ${formData.currency}...`}
                            value={userInput}
                            onChange={(e) =>
                              dispatch(setUserInput(e.target.value))
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleLoanAmount()
                            }
                            className="pl-10 h-12 rounded-lg peer transition-all duration-300 focus:shadow-sm hover:border-primary/40"
                          />
                        </div>
                        <Button
                          onClick={handleLoanAmount}
                          disabled={!userInput || parseFloat(userInput) <= 0}
                          className="gradient-primary px-6 h-12 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === "loan-type" && !isTyping && (
                    <div className="flex py-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Card
                          className="p-3 cursor-pointer hover:border-primary/50 transition-all duration-300 bg-card transform hover:-translate-y-0.5 hover:shadow-md group"
                          onClick={() => handleLoanType("secured")}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                              <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm transition-colors duration-300 group-hover:text-primary">
                                Secured Loan
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                (with collateral)
                              </p>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                              Eg: Property, Land, Fixed Deposits
                            </p>
                          </div>
                        </Card>

                        <Card
                          className="p-3 cursor-pointer hover:border-accent/50 transition-all duration-300 bg-card transform hover:-translate-y-0.5 hover:shadow-md group"
                          onClick={() => handleLoanType("unsecured")}
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm transition-colors duration-300 group-hover:text-accent">
                                Unsecured Loan
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                (without collateral)
                              </p>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-tight">
                              No assets required
                            </p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* Verified Step Action Buttons - Styled as Edumate message */}
                  {step === "verified" && !isTyping && (
                    <div className="flex justify-start py-6">
                      <div className="max-w-2xl w-full">
                        <div className="flex items-start gap-3">
                          {/* <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div> */}
                          <div className="flex-1">
                            {/* <div className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-2">EDUMATE</div> */}
                            <div className="grid gap-4">
                              {/* Success Indicator */}
                              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-4">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-medium">
                                  Profile verified successfully
                                </span>
                              </div>

                              {/* Check Eligible Loans Button - Primary CTA */}
                              <button
                                onClick={handleCheckEligibleLoans}
                                className="group w-full flex items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                    <Wallet className="h-7 w-7 text-white" />
                                  </div>
                                  <div className="text-left">
                                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                      Check Eligible Loans
                                      <Sparkles className="h-4 w-4 text-yellow-300" />
                                    </h3>
                                    <p className="text-sm text-white/90">
                                      View personalized offers from 12+ lenders
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
                              </button>

                              {/* Calculate Monthly Repayment Button - Secondary CTA */}
                              <button
                                onClick={handleCalculateRepayment}
                                className="group w-full flex items-center justify-between gap-4 p-6 rounded-xl border-2 border-accent bg-accent/5 hover:bg-accent/10 hover:border-accent/60 transition-all duration-200 transform hover:-translate-y-0.5"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 group-hover:bg-accent/25 transition-colors">
                                    <Calculator className="h-7 w-7 text-accent" />
                                  </div>
                                  <div className="text-left">
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                      Calculate Monthly Repayment
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      Plan your EMI with our smart calculator
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="h-6 w-6 text-accent group-hover:translate-x-1 transition-transform flex-shrink-0" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === "otp" && !isTyping && !formData.phone && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Select
                          value={countryCode}
                          onValueChange={(value) =>
                            dispatch(setCountryCode(value))
                          }
                        >
                          <SelectTrigger className="w-32 h-12 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">🇮🇳 +91</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44</SelectItem>
                            <SelectItem value="+61">🇦🇺 +61</SelectItem>
                            <SelectItem value="+86">🇨🇳 +86</SelectItem>
                            <SelectItem value="+81">🇯🇵 +81</SelectItem>
                            <SelectItem value="+82">🇰🇷 +82</SelectItem>
                            <SelectItem value="+65">🇸🇬 +65</SelectItem>
                            <SelectItem value="+971">🇦🇪 +971</SelectItem>
                            <SelectItem value="+966">🇸🇦 +966</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 peer-focus:text-primary" />
                          <Input
                            type="tel"
                            placeholder={
                              countryCode === "+91"
                                ? "Enter 10-digit number"
                                : "Enter phone number"
                            }
                            value={userInput}
                            onChange={(e) =>
                              handlePhoneInputChange(e.target.value)
                            }
                            onKeyPress={(e) =>
                              e.key === "Enter" && handlePhoneSubmit()
                            }
                            className={`pl-10 h-12 rounded-lg peer transition-all duration-300 focus:shadow-sm ${
                              phoneValidation === null || userInput === ""
                                ? "hover:border-primary/40"
                                : phoneValidation.isValid
                                ? "border-green-500 focus:border-green-500 hover:border-green-600"
                                : "border-red-500 focus:border-red-500 hover:border-red-600"
                            }`}
                          />
                        </div>
                        <Button
                          onClick={handlePhoneSubmit}
                          disabled={!phoneValidation?.isValid || !userInput}
                          className="gradient-primary px-6 h-12 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          Send OTP
                        </Button>
                      </div>
                      {phoneValidation && userInput && (
                        <div
                          className={`text-sm px-3 py-2 rounded-lg transition-all duration-300 ${
                            phoneValidation.isValid
                              ? "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400"
                              : "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
                          }`}
                        >
                          {phoneValidation.isValid ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Valid phone number
                            </span>
                          ) : (
                            phoneValidation.error && (
                              <span className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {phoneValidation.error}
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {step === "otp" && !isTyping && formData.phone && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {formData.phone}
                          </span>
                        </div>
                        <Button
                          onClick={handleEditPhone}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-primary hover:text-primary/80"
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Enter 6-digit OTP..."
                          value={userInput}
                          onChange={(e) =>
                            dispatch(setUserInput(e.target.value))
                          }
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleOTPVerify()
                          }
                          maxLength={6}
                          className="flex-1 h-12 px-4 rounded-lg text-center tracking-widest text-lg font-semibold transition-all duration-300 focus:shadow-sm hover:border-primary/40"
                        />
                        <Button
                          onClick={handleOTPVerify}
                          className="gradient-primary px-6 h-12 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95"
                        >
                          Verify
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {otpCountdown > 0 ? (
                          <span className="text-muted-foreground">
                            Resend OTP in{" "}
                            <span className="font-semibold text-foreground">
                              {otpCountdown}s
                            </span>
                          </span>
                        ) : (
                          <Button
                            onClick={handleResendOTP}
                            variant="ghost"
                            className="text-primary hover:text-primary/80 font-semibold"
                          >
                            Resend OTP
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Fixed Bottom Bar - visible when a conversation has started */}
            {/* <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-lg z-10">
              <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  {messages.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNewConversation}
                      className="h-9 px-3 transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm group"
                    >
                      <RotateCcw className="w-4 h-4 mr-1.5 transition-transform duration-300 group-hover:-rotate-180" />
                      New Chat
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by Edumate AI</span>
                </div>
              </div>
            </div> */}
          </>
        ) : (
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border border-border rounded-lg bg-card">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-2 text-foreground">
                    Your Loan Matches
                  </h2>
                  <p className="text-muted-foreground">
                    Found{" "}
                    <span className="font-semibold text-accent">
                      {mockLoans.length}
                    </span>{" "}
                    products matching your profile
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live rates
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* {mockLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;