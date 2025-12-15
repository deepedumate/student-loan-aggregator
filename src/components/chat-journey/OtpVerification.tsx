import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Loader2, RefreshCw, Pencil, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OtpVerificationProps {
  onVerified: () => void;
}

export const OtpVerification = ({ onVerified }: OtpVerificationProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Focus first OTP input when step changes to otp
  useEffect(() => {
    if (step === 'otp' && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const formatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 15);
  };

  const validatePhone = (phoneNumber: string): boolean => {
    return phoneNumber.length >= 10 && phoneNumber.length <= 15;
  };

  const getFormattedPhone = (): string => {
    return countryCode + phone;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSendOtp = async () => {
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const formattedPhone = getFormattedPhone();
      
      const { data, error: fnError } = await supabase.functions.invoke('loan-chat', {
        body: { action: 'send-otp', data: { phone: formattedPhone } }
      });

      if (fnError) throw fnError;

      if (data?.success) {
        setStep('otp');
        setCountdown(30);
        toast({ title: "OTP Sent", description: "Check your WhatsApp for the verification code." });
      } else {
        throw new Error(data?.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const formattedPhone = getFormattedPhone();

      const { data, error: fnError } = await supabase.functions.invoke('loan-chat', {
        body: { action: 'verify-otp', data: { phone: formattedPhone, otp: otpValue } }
      });

      if (fnError) throw fnError;

      if (data?.valid) {
        toast({ title: "Verified", description: "Phone number verified successfully." });
        onVerified();
      } else {
        setError(data?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error('Verify OTP error:', err);
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setOtp(["", "", "", "", "", ""]);
    await handleSendOtp();
  };

  const otpValue = otp.join('');

  return (
    <Card className="p-6 border-2 bg-card/80 backdrop-blur-sm animate-fade-in max-w-md">
      {step === 'phone' ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Verify Your Phone</h3>
              <p className="text-sm text-muted-foreground">We'll send a code via WhatsApp</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex">
              <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                className="flex-1 h-12 rounded-xl rounded-l-none border-2 border-border/50 text-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button 
            onClick={handleSendOtp}
            disabled={!phone.trim() || isLoading}
            className="w-full btn-primary-enhanced"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Send Verification Code
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
            <ShieldCheck className="w-4 h-4" />
            Your number is encrypted and secure
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Enter OTP</h3>
                <p className="text-sm text-muted-foreground">
                  Sent to {getFormattedPhone()}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => { setStep('phone'); setOtp(["", "", "", "", "", ""]); setError(""); }}
              className="text-xs h-8"
            >
              <Pencil className="w-3 h-3 mr-1" />
              Edit
            </Button>
          </div>

          {/* Premium OTP Input */}
          <div className="py-6">
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className={cn(
                    "w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold",
                    "border-2 rounded-xl bg-background",
                    "transition-all duration-200",
                    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg",
                    digit ? "border-primary bg-primary/5" : "border-border/50",
                    error && "border-destructive"
                  )}
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResend}
              disabled={countdown > 0}
              className={cn(
                "text-sm",
                countdown > 0 && "text-muted-foreground"
              )}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", countdown > 0 && "animate-none")} />
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </Button>
          </div>

          <Button 
            onClick={handleVerifyOtp}
            disabled={otpValue.length !== 6 || isLoading}
            className="w-full btn-primary-enhanced"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Verify & Continue
          </Button>
        </div>
      )}
    </Card>
  );
};
