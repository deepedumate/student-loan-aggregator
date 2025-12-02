// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { DollarSign, Calendar, GraduationCap, Building2, BookOpen, TrendingUp, CheckCircle2, ArrowRight, Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { LoanProduct } from "@/types/loanProduct";

// export interface LoanData {
//   id: string;
//   lenderName: string;
//   lenderLogo?: string;
//   interestRate: number;
//   maxLoanAmount: number;
//   repaymentPeriod: string;
//   processingFee: number;
//   features: string[];
//   eligibilityCriteria: string[];
//   rating: number;
// }

// interface LoanCardProps {
//   loan: LoanProduct[];
//   onInterested: (loanId: string) => void;
//   onCompare: (loanId: string) => void;
//   onToggleFavorite: (loanId: string) => void;
//   isSelected?: boolean;
//   isFavorite?: boolean;
// }

// export function LoanCard({ loan, onInterested, onCompare, onToggleFavorite, isSelected, isFavorite }: LoanCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div
//       className={`
//         relative overflow-hidden rounded-xl bg-card border transition-all duration-300
//         hover:shadow-xl hover:-translate-y-1
//         ${isSelected ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border/50 shadow-md'}
//       `}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Premium gradient overlay with floating animation */}
//       <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" />
//       <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-float-delayed" />

//       <div className="relative z-10 p-6">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-3">
//               <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
//             </div>
//             <div>
//               <h3 className="font-bold text-lg font-heading">{loan.lenderName}</h3>
//               <div className="flex items-center gap-2 mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`w-1.5 h-1.5 rounded-full ${
//                       i < loan.rating ? 'bg-accent' : 'bg-muted-foreground/20'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => onToggleFavorite(loan.id)}
//               className="h-8 w-8 rounded-full hover:bg-accent/10 transition-all duration-300 hover:scale-110"
//             >
//               <Heart className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'fill-accent text-accent animate-pulse' : 'text-muted-foreground hover:scale-110'}`} />
//             </Button>
//             {isSelected && (
//               <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
//                 <CheckCircle2 className="w-3 h-3 mr-1" />
//                 Selected
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* Interest Rate - Hero Display */}
//         <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-5 mb-6 border border-primary/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
//           <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full animate-shimmer" />
//           <div className="relative flex items-center gap-2 mb-2">
//             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//             <span className="text-xs font-semibold text-primary uppercase tracking-wider">
//               Interest Rate
//             </span>
//           </div>
//           <div className="relative flex items-baseline gap-2">
//             <h2 className="text-4xl font-bold text-foreground font-heading tracking-tight transition-all duration-300 hover:text-primary">
//               {loan.interestRate}%
//             </h2>
//             <span className="text-sm text-muted-foreground">per annum</span>
//           </div>
//         </div>

//         {/* Key Details */}
//         <div className="grid grid-cols-2 gap-3 mb-6">
//           <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 group">
//             <DollarSign className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-125" />
//             <div>
//               <p className="text-xs text-muted-foreground font-medium">Max Amount</p>
//               <p className="text-sm font-bold">${loan.maxLoanAmount.toLocaleString()}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 group">
//             <Calendar className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-125" />
//             <div>
//               <p className="text-xs text-muted-foreground font-medium">Repayment</p>
//               <p className="text-sm font-bold">{loan.repaymentPeriod}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 group">
//             <TrendingUp className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
//             <div>
//               <p className="text-xs text-muted-foreground font-medium">Processing</p>
//               <p className="text-sm font-bold">{loan.processingFee}%</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 group">
//             <GraduationCap className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
//             <div>
//               <p className="text-xs text-muted-foreground font-medium">Features</p>
//               <p className="text-sm font-bold">{loan.features.length}</p>
//             </div>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="mb-6">
//           <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
//             Key Features
//           </h4>
//           <div className="space-y-2">
//             {loan.features.slice(0, 3).map((feature, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 text-sm animate-fade-in group hover:translate-x-1 transition-transform duration-300"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
//                 <span className="text-foreground">{feature}</span>
//               </div>
//             ))}
//           </div>
//           <Button
//             variant="link"
//             className="text-primary hover:text-primary-light p-0 h-auto mt-3 group"
//             onClick={() => navigate(`/loans/${loan.id}`)}
//           >
//             View Full Details <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
//           </Button>
//         </div>

//         {/* CTAs */}
//         <div className="flex gap-3">
//           <Button
//             onClick={() => onInterested(loan.id)}
//             className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
//             size="lg"
//           >
//             <span className="transition-transform duration-300 group-hover:scale-105">Interested?</span>
//           </Button>
//           <Button
//             onClick={() => onCompare(loan.id)}
//             variant="outline"
//             size="lg"
//             className={`
//               flex-1 border-2 font-semibold transition-all duration-300
//               text-primary hover:text-primary hover:scale-[1.02] active:scale-95 group
//               ${isSelected
//                 ? 'border-primary bg-primary/5 hover:bg-primary/10 animate-pulse'
//                 : 'border-border hover:border-primary/40 hover:bg-primary/5'
//               }
//             `}
//           >
//             <span className="transition-transform duration-300 group-hover:scale-105">
//               {isSelected ? 'Selected' : 'Compare'}
//             </span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Calendar,
  GraduationCap,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoanProduct } from "@/types/loanProduct";

interface LoanCardProps {
  loan: LoanProduct; // ✅ FIXED: Changed from LoanProduct[] to LoanProduct
  onInterested: (loanId: string) => void;
  onCompare: (loanId: string) => void;
  onToggleFavorite: (loanId: string) => void;
  isSelected?: boolean;
  isFavorite?: boolean;
}

export function LoanCard({
  loan,
  onInterested,
  onCompare,
  onToggleFavorite,
  isSelected,
  isFavorite,
}: LoanCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: Extract data from nested API structure with proper null checks
  const lenderName =
    loan.lender_name || loan.lender?.lender_name || "Unknown Lender";
  const interestRate = parseFloat(
    loan.financial_terms?.interest_rate_range_min || "0"
  );
  const maxLoanAmount =
    parseFloat(
      loan.financial_terms?.maximum_loan_amount_unsecured ||
        loan.financial_terms?.maximum_loan_amount_secured ||
        "0"
    ) / 100000; // Convert to lakhs
  const repaymentPeriodMonths =
    loan.repayment_terms?.repayment_period_maximum || 0;
  const repaymentPeriod = `${Math.floor(repaymentPeriodMonths / 12)} years`;
  const processingFee = parseFloat(
    loan.financial_terms?.processing_fee_percentage || "0"
  );
  const rating = Math.round(
    parseFloat(loan.performance_metrics?.customer_satisfaction_rating || "0")
  );

  // ✅ FIXED: Build features array from API data
  const features: string[] = [];

  if (
    loan.collateral_security?.collateral_required === "No" ||
    loan.collateral_security?.collateral_required === null
  ) {
    features.push("No collateral required");
  }

  if (loan.repayment_terms?.moratorium_period) {
    features.push(
      `${loan.repayment_terms.moratorium_period} months moratorium`
    );
  }

  if (loan.repayment_terms?.prepayment_allowed === "Yes") {
    features.push("Prepayment allowed");
  }

  if (loan.special_features?.digital_features) {
    features.push(loan.special_features.digital_features);
  }

  if (loan.special_features?.tax_benefits_available === "Yes") {
    features.push("Tax benefits available");
  }

  if (loan.processing_details?.application_mode) {
    features.push(`${loan.processing_details.application_mode} application`);
  }

  // Ensure at least 3 features
  if (features.length === 0) {
    features.push(
      "Competitive interest rates",
      "Flexible repayment",
      "Quick approval"
    );
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl bg-card border transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${
          isSelected
            ? "border-primary shadow-lg ring-2 ring-primary/20"
            : "border-border/50 shadow-md"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium gradient overlay with floating animation */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-float-delayed" />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Building2 className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-heading line-clamp-1">
                {lenderName}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {loan.product_display_name || loan.product_name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < rating ? "bg-accent" : "bg-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(loan.id.toString())}
              className="h-8 w-8 rounded-full hover:bg-accent/10 transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isFavorite
                    ? "fill-accent text-accent animate-pulse"
                    : "text-muted-foreground hover:scale-110"
                }`}
              />
            </Button>
            {isSelected && (
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Selected
              </Badge>
            )}
          </div>
        </div>

        {/* Interest Rate - Hero Display */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-5 mb-6 border border-primary/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full animate-shimmer" />
          <div className="relative flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Interest Rate
            </span>
          </div>
          <div className="relative flex items-baseline gap-2">
            <h2 className="text-4xl font-bold text-foreground font-heading tracking-tight transition-all duration-300 hover:text-primary">
              {interestRate.toFixed(2)}%
            </h2>
            <span className="text-sm text-muted-foreground">per annum</span>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 group">
            <DollarSign className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-125" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Max Amount
              </p>
              <p className="text-sm font-bold">₹{maxLoanAmount.toFixed(1)}L</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 group">
            <Calendar className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-125" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Repayment
              </p>
              <p className="text-sm font-bold">{repaymentPeriod}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 group">
            <TrendingUp className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Processing
              </p>
              <p className="text-sm font-bold">{processingFee.toFixed(1)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/30 transition-all duration-300 hover:bg-muted/50 hover:border-accent/30 hover:shadow-md hover:-translate-y-0.5 group">
            <GraduationCap className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Type</p>
              <p className="text-xs font-bold line-clamp-1">
                {loan.product_type || "Education Loan"}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Key Features
          </h4>
          <div className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm animate-fade-in group hover:translate-x-1 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <span className="text-foreground line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="text-primary hover:text-primary-light p-0 h-auto mt-3 group"
            onClick={() => navigate(`/loans/${loan.id}`)}
          >
            View Full Details{" "}
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <Button
            onClick={() => onInterested(loan.id.toString())}
            className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
            size="lg"
          >
            <span className="transition-transform duration-300 group-hover:scale-105">
              Interested?
            </span>
          </Button>
          <Button
            onClick={() => onCompare(loan.id.toString())}
            variant="outline"
            size="lg"
            className={`
              flex-1 border-2 font-semibold transition-all duration-300
              text-primary hover:text-primary hover:scale-[1.02] active:scale-95 group
              ${
                isSelected
                  ? "border-primary bg-primary/5 hover:bg-primary/10 animate-pulse"
                  : "border-border hover:border-primary/40 hover:bg-primary/5"
              }
            `}
          >
            <span className="transition-transform duration-300 group-hover:scale-105">
              {isSelected ? "Selected" : "Compare"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
