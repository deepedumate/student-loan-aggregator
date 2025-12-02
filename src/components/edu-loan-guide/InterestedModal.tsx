// import { useState, useEffect } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { LoanData } from "./LoanCard";
// import { toast } from "sonner";
// import { Mail, User, CheckCircle2, AlertCircle } from "lucide-react";

// // Common email domain typos and their corrections
// const EMAIL_DOMAIN_CORRECTIONS: Record<string, string> = {
//   // Gmail variations
//   "gmial.com": "gmail.com",
//   "gmai.com": "gmail.com",
//   "gmil.com": "gmail.com",
//   "gmaill.com": "gmail.com",
//   "gmail.co": "gmail.com",
//   "gmail.con": "gmail.com",
//   "gamil.com": "gmail.com",
//   "gmeil.com": "gmail.com",

//   // Yahoo variations
//   "yaho.com": "yahoo.com",
//   "yahooo.com": "yahoo.com",
//   "yahoo.co": "yahoo.com",
//   "yahoo.con": "yahoo.com",
//   "yhoo.com": "yahoo.com",
//   "ymail.co": "ymail.com",

//   // Outlook variations
//   "outlok.com": "outlook.com",
//   "outloo.com": "outlook.com",
//   "outlook.co": "outlook.com",
//   "outlook.con": "outlook.com",
//   "hotmial.com": "hotmail.com",
//   "hotmai.com": "hotmail.com",
//   "hotmail.co": "hotmail.com",

//   // Other common domains
//   "aol.co": "aol.com",
//   "icloud.co": "icloud.com",
//   "protonmail.co": "protonmail.com",
//   "live.co": "live.com",
// };

// interface InterestedModalProps {
//   open: boolean;
//   onClose: () => void;
//   loan: LoanData | null;
// }

// export function InterestedModal({ open, onClose, loan }: InterestedModalProps) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [consent, setConsent] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; consent?: string }>({});
//   const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

//   // Check for email typos
//   useEffect(() => {
//     if (email && email.includes("@")) {
//       const [localPart, domain] = email.split("@");
//       if (domain && EMAIL_DOMAIN_CORRECTIONS[domain.toLowerCase()]) {
//         const correctedDomain = EMAIL_DOMAIN_CORRECTIONS[domain.toLowerCase()];
//         setEmailSuggestion(`${localPart}@${correctedDomain}`);
//       } else {
//         setEmailSuggestion(null);
//       }
//     } else {
//       setEmailSuggestion(null);
//     }
//   }, [email]);

//   const validateForm = () => {
//     const newErrors: { firstName?: string; lastName?: string; email?: string; consent?: string } = {};

//     if (!firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     } else if (firstName.trim().length > 50) {
//       newErrors.firstName = "First name must be less than 50 characters";
//     }

//     if (!lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     } else if (lastName.trim().length > 50) {
//       newErrors.lastName = "Last name must be less than 50 characters";
//     }

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Please enter a valid email address";
//     } else if (email.length > 255) {
//       newErrors.email = "Email must be less than 255 characters";
//     }

//     if (!consent) {
//       newErrors.consent = "You must agree to be contacted to proceed";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Send to dummy API
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: "Loan Interest Submission",
//           loanId: loan?.id,
//           lenderName: loan?.lenderName,
//           firstName: firstName.trim(),
//           lastName: lastName.trim(),
//           email: email.trim(),
//           consent: consent,
//           timestamp: new Date().toISOString(),
//         }),
//       });

//       if (response.ok) {
//         toast.success("Interest Submitted! 🎉", {
//           description: `Thank you ${firstName}! ${loan?.lenderName} will contact you at ${email} soon.`,
//         });

//         // Reset form
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setConsent(false);
//         setErrors({});
//         onClose();
//       } else {
//         throw new Error("Failed to submit");
//       }
//     } catch (error) {
//       toast.error("Submission Failed", {
//         description: "Please try again later or contact support.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setConsent(false);
//     setErrors({});
//     setEmailSuggestion(null);
//     onClose();
//   };

//   const acceptSuggestion = () => {
//     if (emailSuggestion) {
//       setEmail(emailSuggestion);
//       setEmailSuggestion(null);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold font-heading">Express Your Interest</DialogTitle>
//           <DialogDescription className="text-base">
//             Interested in <span className="font-semibold text-foreground">{loan?.lenderName}</span>?
//             Fill in your details and we'll connect you with the lender.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-5 py-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="firstName" className="text-sm font-semibold">
//                 First Name <span className="text-destructive">*</span>
//               </Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   id="firstName"
//                   placeholder="John"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className={`pl-10 ${errors.firstName ? "border-destructive" : ""}`}
//                   maxLength={50}
//                 />
//               </div>
//               {errors.firstName && (
//                 <p className="text-xs text-destructive">{errors.firstName}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="lastName" className="text-sm font-semibold">
//                 Last Name <span className="text-destructive">*</span>
//               </Label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   id="lastName"
//                   placeholder="Doe"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className={`pl-10 ${errors.lastName ? "border-destructive" : ""}`}
//                   maxLength={50}
//                 />
//               </div>
//               {errors.lastName && (
//                 <p className="text-xs text-destructive">{errors.lastName}</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm font-semibold">
//               Email Address <span className="text-destructive">*</span>
//             </Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="john.doe@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
//                 maxLength={255}
//               />
//             </div>
//             {emailSuggestion && (
//               <Alert className="border-accent/50 bg-accent/5">
//                 <AlertCircle className="h-4 w-4 text-accent" />
//                 <AlertDescription className="flex items-center justify-between">
//                   <span className="text-sm">
//                     Did you mean <span className="font-semibold text-accent">{emailSuggestion}</span>?
//                   </span>
//                   <Button
//                     type="button"
//                     size="sm"
//                     variant="ghost"
//                     onClick={acceptSuggestion}
//                     className="h-7 text-accent hover:text-accent hover:bg-accent/10 ml-2"
//                   >
//                     Use this
//                   </Button>
//                 </AlertDescription>
//               </Alert>
//             )}
//             {errors.email && (
//               <p className="text-xs text-destructive">{errors.email}</p>
//             )}
//           </div>

//           <div className="space-y-3 rounded-lg bg-muted/50 p-4 border border-border/50">
//             <div className="flex items-start gap-3">
//               <Checkbox
//                 id="consent"
//                 checked={consent}
//                 onCheckedChange={(checked) => setConsent(checked as boolean)}
//                 className={errors.consent ? "border-destructive" : ""}
//               />
//               <div className="flex-1">
//                 <Label
//                   htmlFor="consent"
//                   className="text-sm leading-relaxed cursor-pointer"
//                 >
//                   I allow the Edumate team and <span className="font-semibold">{loan?.lenderName}</span> to contact me for additional steps regarding this loan application.
//                   <span className="text-destructive ml-1">*</span>
//                 </Label>
//               </div>
//             </div>
//             {errors.consent && (
//               <p className="text-xs text-destructive ml-7">{errors.consent}</p>
//             )}
//           </div>
//         </form>

//         <DialogFooter className="gap-2">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleClose}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <CheckCircle2 className="w-4 h-4 mr-2" />
//                 Submit Interest
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoanData } from "./LoanCard";
import { toast } from "sonner";
import { Mail, User, CheckCircle2, AlertCircle } from "lucide-react";
import { apiService } from "@/lib/apiService";
import { LoanProduct } from "@/types/loanProduct";

const EMAIL_DOMAIN_CORRECTIONS: Record<string, string> = {
  // Gmail variations
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gamil.com": "gmail.com",
  "gmeil.com": "gmail.com",

  // Yahoo variations
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yhoo.com": "yahoo.com",
  "ymail.co": "ymail.com",

  // Outlook variations
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "outlook.co": "outlook.com",
  "outlook.con": "outlook.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.co": "hotmail.com",

  // Other common domains
  "aol.co": "aol.com",
  "icloud.co": "icloud.com",
  "protonmail.co": "protonmail.com",
  "live.co": "live.com",
};

interface InterestedModalProps {
  open: boolean;
  onClose: () => void;
  loan: LoanProduct | null;
}

export function InterestedModal({ open, onClose, loan }: InterestedModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    consent?: string;
  }>({});
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  // Check for email typos
  useEffect(() => {
    if (email && email.includes("@")) {
      const [localPart, domain] = email.split("@");
      if (domain && EMAIL_DOMAIN_CORRECTIONS[domain.toLowerCase()]) {
        const correctedDomain = EMAIL_DOMAIN_CORRECTIONS[domain.toLowerCase()];
        setEmailSuggestion(`${localPart}@${correctedDomain}`);
      } else {
        setEmailSuggestion(null);
      }
    } else {
      setEmailSuggestion(null);
    }
  }, [email]);

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      consent?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.trim().length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.trim().length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (email.length > 255) {
      newErrors.email = "Email must be less than 255 characters";
    }

    if (!consent) {
      newErrors.consent = "You must agree to be contacted to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Prepare payload for the contact upsert API
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        formType: "loan_interest_form",
        submissionDate: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || window.location.href,
        // Add loan-specific data if available
        ...(loan && {
          loanPreference: loan.lender_name,
        }),
        // UTM parameters (if available in URL)
        utm_source:
          new URLSearchParams(window.location.search).get("utm_source") ||
          undefined,
        utm_campaign:
          new URLSearchParams(window.location.search).get("utm_campaign") ||
          undefined,
        utm_medium:
          new URLSearchParams(window.location.search).get("utm_medium") ||
          undefined,
      };

      console.log("Submitting loan interest with payload:", payload);

      // ✅ Call the real API service
      const response = await apiService.upsertContact(payload);

      if (response.data?.success) {
        toast.success("Interest Submitted! 🎉", {
          description: `Thank you ${firstName}! ${
            loan?.lender_name || "The lender"
          } will contact you at ${email} soon.`,
          duration: 5000,
        });

        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setConsent(false);
        setErrors({});
        onClose();
      } else {
        throw new Error(
          response.data?.message ||
            response.error?.message ||
            "Failed to submit"
        );
      }
    } catch (error: any) {
      console.error("Interest submission error:", error);
      toast.error("Submission Failed", {
        description:
          error.message || "Please try again later or contact support.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setConsent(false);
    setErrors({});
    setEmailSuggestion(null);
    onClose();
  };

  const acceptSuggestion = () => {
    if (emailSuggestion) {
      setEmail(emailSuggestion);
      setEmailSuggestion(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading">
            Express Your Interest
          </DialogTitle>
          <DialogDescription className="text-base">
            Interested in{" "}
            <span className="font-semibold text-foreground">
              {loan?.lender_name}
            </span>
            ? Fill in your details and we'll connect you with the lender.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold">
                First Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`pl-10 ${
                    errors.firstName ? "border-destructive" : ""
                  }`}
                  maxLength={50}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`pl-10 ${
                    errors.lastName ? "border-destructive" : ""
                  }`}
                  maxLength={50}
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                maxLength={255}
              />
            </div>
            {emailSuggestion && (
              <Alert className="border-accent/50 bg-accent/5">
                <AlertCircle className="h-4 w-4 text-accent" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm">
                    Did you mean{" "}
                    <span className="font-semibold text-accent">
                      {emailSuggestion}
                    </span>
                    ?
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={acceptSuggestion}
                    className="h-7 text-accent hover:text-accent hover:bg-accent/10 ml-2"
                  >
                    Use this
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-3 rounded-lg bg-muted/50 p-4 border border-border/50">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className={errors.consent ? "border-destructive" : ""}
              />
              <div className="flex-1">
                <Label
                  htmlFor="consent"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I allow the Edumate team and{" "}
                  <span className="font-semibold">{loan?.lender_name}</span> to
                  contact me for additional steps regarding this loan
                  application.
                  <span className="text-destructive ml-1">*</span>
                </Label>
              </div>
            </div>
            {errors.consent && (
              <p className="text-xs text-destructive ml-7">{errors.consent}</p>
            )}
          </div>
        </form>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Interest
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
