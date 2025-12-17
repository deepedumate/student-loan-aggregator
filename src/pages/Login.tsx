import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import OtpInput from "react-otp-input";
import {
  setIsTyping,
  setCountryCode,
  setUserInput,
  setPhoneValidation,
  setOtpCountdown,
  updateFormData,
} from "@/store/slices/chatSlice";
import { login } from "@/store/slices/contactAuthSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/chat-journey/ThemeToggle";
import { Logo } from "@/components/ui/logo";
import { apiService } from "@/lib/apiService";
import { LoginPayload } from "@/services/contactUser";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳", iso: "IN", length: 10 },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸", iso: "US", length: 10 },
  { code: "+44", country: "UK", flag: "🇬🇧", iso: "GB", length: 10 },
  { code: "+61", country: "Australia", flag: "🇦🇺", iso: "AU", length: 9 },
  { code: "+81", country: "Japan", flag: "🇯🇵", iso: "JP", length: 10 },
  { code: "+86", country: "China", flag: "🇨🇳", iso: "CN", length: 11 },
  { code: "+49", country: "Germany", flag: "🇩🇪", iso: "DE", length: 11 },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR", length: 9 },
  { code: "+39", country: "Italy", flag: "🇮🇹", iso: "IT", length: 10 },
  { code: "+34", country: "Spain", flag: "🇪🇸", iso: "ES", length: 9 },
  { code: "+971", country: "UAE", flag: "🇦🇪", iso: "AE", length: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", iso: "SG", length: 8 },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", iso: "MY", length: 10 },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", iso: "ID", length: 11 },
  { code: "+66", country: "Thailand", flag: "🇹🇭", iso: "TH", length: 9 },
  { code: "+27", country: "South Africa", flag: "🇿🇦", iso: "ZA", length: 9 },
];

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countryCode = useSelector((state: RootState) => state.chat.countryCode);
  const userInput = useSelector((state: RootState) => state.chat.userInput);
  const phoneValidation = useSelector(
    (state: RootState) => state.chat.phoneValidation
  );
  const otpCountdown = useSelector(
    (state: RootState) => state.chat.otpCountdown
  );
  const formData = useSelector((state: RootState) => state.chat.formData);
  const isTyping = useSelector((state: RootState) => state.chat.isTyping);

  const prepareContactPayload = (formData: any) => {
    const phoneNumber = formData.phone.replace(/\+/g, "");
    const payload: LoginPayload = {
      phoneNumber,
    };
    return payload;
  };

  useEffect(() => {
    if (!userInput || formData.phone) {
      return;
    }

    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    const expectedLength = selectedCountry?.length || 10;
    const minLength = Math.max(7, expectedLength - 2);
    const maxLength = expectedLength + 2;

    if (!/^\d+$/.test(userInput)) {
      dispatch(
        setPhoneValidation({ isValid: false, error: "Only numbers allowed" })
      );
      return;
    }

    if (userInput.length < minLength) {
      dispatch(
        setPhoneValidation({
          isValid: false,
          error: `${minLength - userInput.length} more digits needed`,
        })
      );
      return;
    }

    if (userInput.length > maxLength) {
      dispatch(
        setPhoneValidation({ isValid: false, error: "Number too long" })
      );
      return;
    }

    dispatch(setPhoneValidation({ isValid: true }));
  }, [userInput, countryCode, formData.phone, dispatch]);

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => {
        dispatch(setOtpCountdown(otpCountdown - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown, dispatch]);

  const handleSendOtp = async () => {
    if (!userInput) {
      toast.error("Please enter your phone number");
      return;
    }

    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    const expectedLength = selectedCountry?.length || 10;
    const minLength = Math.max(7, expectedLength - 2);
    const maxLength = expectedLength + 2;

    if (!/^\d+$/.test(userInput)) {
      toast.error("Phone number should contain only digits");
      return;
    }

    if (userInput.length < minLength || userInput.length > maxLength) {
      toast.error(
        `Please enter a valid ${
          selectedCountry?.country || ""
        } phone number (${expectedLength} digits expected)`
      );
      return;
    }

    const fullPhoneNumber = `${countryCode}${userInput}`;

    dispatch(setIsTyping(true));
    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "send-otp",
        data: { phone: fullPhoneNumber },
      });

      if (error) {
        throw error;
      }

      dispatch(updateFormData({ phone: fullPhoneNumber }));
      dispatch(setUserInput(""));
      dispatch(setPhoneValidation(null));
      dispatch(setOtpCountdown(60));

      toast.success("OTP sent to your WhatsApp!");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      dispatch(setIsTyping(false));
    }
  };

  const handleVerifyOtp = async () => {
    if (userInput.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const fullPhoneNumber = formData.phone;

    dispatch(setIsTyping(true));

    try {
      const { data, error } = await apiService.invokeLoanChat({
        action: "verify-otp",
        data: { otp: userInput, phone: fullPhoneNumber },
      });

      if (error) {
        throw error;
      }

      if (data && data.valid) {
        try {
          const contactPayload = prepareContactPayload(formData);
          const result = await dispatch(login(contactPayload) as any);

          if (result.payload) {
            console.log("Contact saved successfully:", result.payload);
          } else if (result.error) {
            console.error("Failed to save contact:", result.error);
          }
        } catch (contactError) {
          console.error("Error saving contact:", contactError);
        }

        toast.success("Login successful!");
        dispatch(setUserInput(""));
        navigate("/loan-application");
      } else {
        const errorMessage = data?.message || "Invalid OTP. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      const errorMsg =
        error.message || "Verification failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(setIsTyping(false));
    }
  };

  const handleChangeNumber = () => {
    dispatch(setUserInput(""));
    dispatch(updateFormData({ phone: "" }));
    dispatch(setPhoneValidation(null));
    dispatch(setOtpCountdown(0));
  };

  const handleResendOtp = async () => {
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

      dispatch(setOtpCountdown(60));
      toast.success("OTP resent to your WhatsApp!");
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      toast.error(error.message || "Failed to resend OTP. Please try again.");
    } finally {
      dispatch(setIsTyping(false));
    }
  };

  const isPhoneValid = phoneValidation?.isValid ?? null;

  // ✅ Fixed Mobile Responsive OTP Input Styles
  const getOtpInputStyle = (isFilled: boolean, isFocused: boolean) => {
    const isDark = document.documentElement.classList.contains("dark");

    return {
      width: "clamp(2rem, 7vw, 3rem)", // ✅ Even smaller for mobile
      height: "clamp(2.5rem, 9vw, 3.5rem)", // ✅ Proportional height
      fontSize: "clamp(1rem, 4vw, 1.5rem)", // ✅ Smaller font on mobile
      fontWeight: "700",
      textAlign: "center" as const,
      border: isFilled
        ? "2px solid hsl(217 91% 60%)"
        : "2px solid hsl(var(--border))",
      borderRadius: "0.5rem",
      backgroundColor: isFilled
        ? isDark
          ? "hsl(217 91% 60% / 0.15)"
          : "hsl(217 91% 60% / 0.08)"
        : isDark
        ? "hsl(222 47% 11%)"
        : "hsl(0 0% 100%)",
      color: isFilled
        ? isDark
          ? "hsl(0 0% 100%)"
          : "hsl(217 91% 60%)"
        : isDark
        ? "hsl(0 0% 98%)"
        : "hsl(222 20% 15%)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      outline: "none",
      boxShadow: isFocused
        ? "0 0 0 3px hsl(217 91% 60% / 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      transform: isFocused ? "scale(1.05)" : "scale(1)",
      flexShrink: 0,
    };
  };

  return (
    <div className="relative z-10 mx-auto pt-6 sm:pt-12 md:pt-16 lg:pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-background dark:to-gray-950 flex items-center justify-center p-2 sm:p-4 overflow-x-hidden">
      <div className="absolute top-4 right-4 hidden sm:flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="transition-all duration-200 hover:scale-105"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-gray-900 dark:text-white">
                Need Help with OTP?
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Common issues and troubleshooting steps for OTP verification
              </DialogDescription>
            </DialogHeader>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="not-receiving">
                <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                  I&apos;m not receiving the OTP
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">Try these steps:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Check your WhatsApp messages and notifications</li>
                    <li>Ensure you have a stable internet connection</li>
                    <li>
                      Verify you entered the correct phone number with country
                      code
                    </li>
                    <li>Wait for 1-2 minutes before requesting a new OTP</li>
                    <li>
                      Check if WhatsApp is blocked or restricted on your device
                    </li>
                    <li>
                      Make sure you have the latest version of WhatsApp
                      installed
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="wrong-code">
                <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                  The OTP code isn&apos;t working
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">Common reasons:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>
                      OTP codes expire after 10 minutes - request a new one
                    </li>
                    <li>Make sure you&apos;re entering the most recent code</li>
                    <li>Check for typos - codes are case-sensitive</li>
                    <li>Don&apos;t add spaces or special characters</li>
                    <li>After 3 failed attempts, request a new OTP</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="expired">
                <AccordionTrigger className="text-left text-gray-900 dark:text-white">
                  OTP expired or &quot;Invalid or expired&quot; error
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-medium">What to do:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>OTP codes are valid for 10 minutes only</li>
                    <li>Click &quot;Resend OTP&quot; to get a fresh code</li>
                    <li>Enter the new code within 10 minutes</li>
                    <li>
                      If you requested multiple OTPs, use only the latest one
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-xl animate-[fade-in_0.4s_ease-out,scale-in_0.3s_ease-out] bg-white dark:bg-card border-gray-200 dark:border-border overflow-hidden">
        <CardHeader className="space-y-2 text-center px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="mx-auto mb-2 sm:mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-display text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground">
            {formData.phone
              ? "Enter the 6-digit OTP sent to your WhatsApp"
              : "Enter your phone number to get started"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-3 sm:px-6 pb-6 sm:pb-8">
          {!formData.phone ? (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-gray-900 dark:text-foreground"
                >
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={countryCode}
                    onValueChange={(value) => dispatch(setCountryCode(value))}
                    disabled={isTyping}
                  >
                    <SelectTrigger className="w-[140px] bg-white dark:bg-background border-gray-300 dark:border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-popover border-gray-200 dark:border-border z-50">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={userInput}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        const selectedCountry = countryCodes.find(
                          (c) => c.code === countryCode
                        );
                        const maxLength = selectedCountry
                          ? selectedCountry.length + 2
                          : 15;
                        dispatch(setUserInput(value.slice(0, maxLength)));
                      }}
                      onKeyPress={(e) => e.key === "Enter" && handleSendOtp()}
                      disabled={isTyping}
                      className={`pr-10 bg-white dark:bg-background border-gray-300 dark:border-border transition-all duration-300 ${
                        isPhoneValid === true
                          ? "border-green-500 focus-visible:ring-green-500"
                          : isPhoneValid === false
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    {userInput && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isPhoneValid === true && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 animate-[fade-in_0.2s_ease-out,scale-in_0.2s_ease-out]" />
                        )}
                        {isPhoneValid === false && (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 animate-[fade-in_0.2s_ease-out,scale-in_0.2s_ease-out]" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-muted-foreground transition-all duration-300">
                  Enter your phone number without the country code
                  {countryCodes.find((c) => c.code === countryCode)?.length && (
                    <span className="animate-fade-in">
                      {` (${
                        countryCodes.find((c) => c.code === countryCode)?.length
                      } digits for ${
                        countryCodes.find((c) => c.code === countryCode)
                          ?.country
                      })`}
                    </span>
                  )}
                </p>
              </div>

              <Button
                className="w-full transition-all duration-300"
                onClick={handleSendOtp}
                disabled={isTyping || !isPhoneValid}
              >
                {isTyping ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gray-50 dark:bg-muted/50 rounded-lg p-2 sm:p-3 text-center border border-gray-200 dark:border-border/50">
                  <p className="text-xs text-gray-600 dark:text-muted-foreground">
                    OTP sent to
                  </p>
                  <p className="text-sm sm:text-base font-medium mt-1 text-gray-900 dark:text-foreground break-all">
                    {formData.phone}
                  </p>
                </div>

                {/* ✅ Fixed Mobile Responsive OTP Input */}
                <div className="space-y-4">
                  <Label className="text-gray-900 dark:text-foreground text-center block text-sm sm:text-base">
                    Enter OTP
                  </Label>
                  <div className="flex justify-center items-center w-full py-2 overflow-x-hidden">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "clamp(0.25rem, 1vw, 0.75rem)", // ✅ Tighter gap for mobile
                        width: "100%",
                        maxWidth: "360px",
                        padding: "0 0.25rem",
                      }}
                    >
                      <OtpInput
                        value={userInput}
                        onChange={(value) => dispatch(setUserInput(value))}
                        numInputs={6}
                        renderInput={(props, index) => {
                          const isFilled =
                            userInput[index] !== undefined &&
                            userInput[index] !== "";
                          return (
                            <input
                              {...props}
                              disabled={isTyping}
                              style={getOtpInputStyle(isFilled, false)}
                              className="mr-2"
                              onFocus={(e) => {
                                props.onFocus?.(e);
                                e.target.style.boxShadow =
                                  "0 0 0 3px hsl(217 91% 60% / 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onBlur={(e) => {
                                props.onBlur?.(e);
                                e.target.style.boxShadow =
                                  "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                                e.target.style.transform = "scale(1)";
                              }}
                            />
                          );
                        }}
                        shouldAutoFocus
                        inputType="tel"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full transition-all duration-300 relative"
                onClick={handleVerifyOtp}
                disabled={isTyping || userInput.length !== 6}
              >
                {isTyping ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Verifying OTP...</span>
                  </div>
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-sm animate-fade-in">
                <Button
                  variant="link"
                  className="p-0 h-auto transition-all duration-200 hover:scale-105 text-primary text-sm sm:text-base"
                  onClick={handleChangeNumber}
                  disabled={isTyping}
                >
                  Change number
                </Button>

                <Button
                  variant="link"
                  className="p-0 h-auto transition-all duration-200 hover:scale-105 text-primary text-sm sm:text-base"
                  onClick={handleResendOtp}
                  disabled={isTyping || otpCountdown > 0}
                >
                  {otpCountdown > 0
                    ? `Resend in ${otpCountdown}s`
                    : "Resend OTP"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
