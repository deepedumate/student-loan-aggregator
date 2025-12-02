// import { X, GraduationCap, CheckCircle2, AlertCircle, Download, Printer } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// // import { LoanData } from "./LoanCard";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { useState, useEffect } from "react";
// import { LoanProduct } from "@/types/loanProduct";

// interface LoanComparisonProps {
//   loans: LoanProduct[];
//   open: boolean;
//   onClose: () => void;
//   onRemoveLoan: (loanId: string) => void;
//   onInterested: (loanId: string) => void;
// }

// export function LoanComparison({
//   loans,
//   open,
//   onClose,
//   onRemoveLoan,
//   onInterested
// }: LoanComparisonProps) {
//   const [notes, setNotes] = useState<Record<string, string>>({});

//   // Load notes from localStorage on mount
//   useEffect(() => {
//     const savedNotes = localStorage.getItem('loan-comparison-notes');
//     if (savedNotes) {
//       setNotes(JSON.parse(savedNotes));
//     }
//   }, []);

//   // Save notes to localStorage whenever they change
//   const handleNoteChange = (loanId: string, note: string) => {
//     const updatedNotes = { ...notes, [loanId]: note };
//     setNotes(updatedNotes);
//     localStorage.setItem('loan-comparison-notes', JSON.stringify(updatedNotes));
//   };

//   if (loans.length === 0) return null;

//   const findBest = (key: keyof LoanData, preferLower = true) => {
//     const values = loans.map(loan => loan[key] as number);
//     const bestValue = preferLower ? Math.min(...values) : Math.max(...values);
//     return bestValue;
//   };

//   const bestInterestRate = findBest('interestRate', true);
//   const bestMaxAmount = findBest('maxLoanAmount', false);
//   const bestProcessingFee = findBest('processingFee', true);

//   // Find the best overall loan (most "best" badges)
//   const getBestCount = (loan: LoanData) => {
//     let count = 0;
//     if (loan.interestRate === bestInterestRate) count++;
//     if (loan.maxLoanAmount === bestMaxAmount) count++;
//     if (loan.processingFee === bestProcessingFee) count++;
//     return count;
//   };

//   const bestCounts = loans.map(loan => ({ id: loan.id, count: getBestCount(loan) }));
//   const maxBestCount = Math.max(...bestCounts.map(bc => bc.count));
//   const bestOverallLoanId = loans.length >= 1 ? bestCounts.find(bc => bc.count === maxBestCount)?.id : undefined;

//   const handlePrint = () => {
//     window.print();
//     toast.success("Opening print dialog...");
//   };

//   const handleExport = () => {
//     const comparisonData = loans.map(loan => ({
//       Lender: loan.lenderName,
//       'Interest Rate': `${loan.interestRate}%`,
//       'Max Amount': `$${loan.maxLoanAmount.toLocaleString()}`,
//       'Repayment Period': loan.repaymentPeriod,
//       'Processing Fee': `${loan.processingFee}%`,
//       Rating: `${loan.rating}/5`,
//     }));

//     const csvContent = [
//       Object.keys(comparisonData[0]).join(','),
//       ...comparisonData.map(row => Object.values(row).join(','))
//     ].join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `loan-comparison-${new Date().toISOString().split('T')[0]}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
    
//     toast.success("Comparison exported as CSV!");
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-[95vw] max-h-[90vh] p-0">
//         <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
//           <div className="flex items-center justify-between">
//             <div>
//               <DialogTitle className="text-2xl font-heading font-bold">
//                 Loan Comparison
//               </DialogTitle>
//               <DialogDescription className="mt-1">
//                 Compare up to {loans.length} loan options side by side
//               </DialogDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handlePrint}
//                 className="gap-2"
//               >
//                 <Printer className="w-4 h-4" />
//                 Print
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleExport}
//                 className="gap-2"
//               >
//                 <Download className="w-4 h-4" />
//                 Export CSV
//               </Button>
//             </div>
//           </div>
//         </DialogHeader>

//         <ScrollArea className="h-[calc(90vh-120px)]">
//           <div className="p-6 print:p-4">
//             <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${loans.length}, minmax(280px, 1fr))` }}>
//               {loans.map((loan) => (
//                 <div
//                   key={loan.id}
//                   className={`relative rounded-xl bg-card border shadow-md overflow-hidden print:break-inside-avoid ${
//                     loan.id === bestOverallLoanId
//                       ? 'border-accent border-2 shadow-lg shadow-accent/20'
//                       : 'border-border/50'
//                   }`}
//                 >
//                   {/* Best Overall Badge */}
//                   {loan.id === bestOverallLoanId && (
//                     <div className="absolute top-4 right-12 z-20">
//                       <Badge className="bg-accent text-accent-foreground font-bold shadow-md">
//                         Best Overall
//                       </Badge>
//                     </div>
//                   )}

//                   {/* Premium gradient overlay */}
//                   <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl print:hidden ${
//                     loan.id === bestOverallLoanId ? 'bg-accent/10' : 'bg-primary/5'
//                   }`} />

//                   <div className="relative z-10 p-5">
//                     {/* Remove Button */}
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => onRemoveLoan(loan.id)}
//                       className="absolute top-2 right-2 h-7 w-7 rounded-lg hover:bg-muted print:hidden"
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>

//                     {/* Header */}
//                     <div className="mb-4">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center shadow-sm mb-3">
//                         <GraduationCap className="w-6 h-6" />
//                       </div>
//                       <h3 className="font-bold text-lg font-heading mb-1">{loan.lenderName}</h3>
//                       <div className="flex items-center gap-2">
//                         {[...Array(5)].map((_, i) => (
//                           <div
//                             key={i}
//                             className={`w-1.5 h-1.5 rounded-full ${
//                               i < loan.rating ? 'bg-accent' : 'bg-muted-foreground/20'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Comparison Metrics */}
//                     <div className="space-y-3 mb-4">
//                       {/* Interest Rate */}
//                       <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs text-muted-foreground font-medium">Interest Rate</span>
//                           {loan.interestRate === bestInterestRate && (
//                             <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
//                               Best
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="flex items-baseline gap-1">
//                           <span className="text-2xl font-bold">{loan.interestRate}%</span>
//                           <span className="text-xs text-muted-foreground">p.a.</span>
//                         </div>
//                       </div>

//                       {/* Max Loan Amount */}
//                       <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs text-muted-foreground font-medium">Max Amount</span>
//                           {loan.maxLoanAmount === bestMaxAmount && (
//                             <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
//                               Best
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="flex items-baseline gap-1">
//                           <span className="text-xl font-bold">${loan.maxLoanAmount.toLocaleString()}</span>
//                         </div>
//                       </div>

//                       {/* Repayment Period */}
//                       <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
//                         <span className="text-xs text-muted-foreground font-medium block mb-1">
//                           Repayment Period
//                         </span>
//                         <span className="text-lg font-bold">{loan.repaymentPeriod}</span>
//                       </div>

//                       {/* Processing Fee */}
//                       <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-xs text-muted-foreground font-medium">Processing Fee</span>
//                           {loan.processingFee === bestProcessingFee && (
//                             <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
//                               Best
//                             </Badge>
//                           )}
//                         </div>
//                         <span className="text-lg font-bold">{loan.processingFee}%</span>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="mb-4">
//                       <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
//                         Features
//                       </h4>
//                       <div className="space-y-1.5">
//                         {loan.features.map((feature, index) => (
//                           <div key={index} className="flex items-start gap-2 text-xs">
//                             <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
//                             <span className="text-foreground leading-tight">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Eligibility */}
//                     <div className="mb-4">
//                       <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
//                         Eligibility
//                       </h4>
//                       <div className="space-y-1.5">
//                         {loan.eligibilityCriteria.map((criteria, index) => (
//                           <div key={index} className="flex items-start gap-2 text-xs">
//                             <AlertCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
//                             <span className="text-foreground leading-tight">{criteria}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Notes Section */}
//                     <div className="mb-4">
//                       <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
//                         Personal Notes
//                       </h4>
//                       <Textarea
//                         placeholder="Add your observations about this loan..."
//                         value={notes[loan.id] || ''}
//                         onChange={(e) => handleNoteChange(loan.id, e.target.value)}
//                         className="min-h-[80px] text-xs resize-none print:hidden"
//                       />
//                       {notes[loan.id] && (
//                         <div className="hidden print:block mt-2 text-xs text-foreground whitespace-pre-wrap">
//                           {notes[loan.id]}
//                         </div>
//                       )}
//                     </div>

//                     {/* CTA */}
//                     <Button
//                       onClick={() => {
//                         onInterested(loan.id);
//                         onClose();
//                       }}
//                       className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 print:hidden"
//                     >
//                       I'm Interested
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Help Text */}
//             {loans.length < 4 && (
//               <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30 print:hidden">
//                 <p className="text-sm text-muted-foreground text-center">
//                   💡 You can compare up to 4 loans. Select more loans to add them to comparison.
//                 </p>
//               </div>
//             )}
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }


import {
  X,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { LoanProduct } from "@/types/loanProduct";

interface LoanComparisonProps {
  loans: LoanProduct[];
  open: boolean;
  onClose: () => void;
  onRemoveLoan: (loanId: string) => void;
  onInterested: (loanId: string) => void;
}

// Helper function to extract loan data with null safety
const extractLoanData = (loan: LoanProduct) => {
  const lenderName =
    loan.lender_name || loan.lender?.lender_name || "Unknown Lender";
  const interestRate = parseFloat(
    loan.financial_terms?.interest_rate_range_min || "0"
  );
  const maxLoanAmount = parseFloat(
    loan.financial_terms?.maximum_loan_amount_unsecured ||
      loan.financial_terms?.maximum_loan_amount_secured ||
      "0"
  );
  const repaymentPeriodMonths =
    loan.repayment_terms?.repayment_period_maximum || 0;
  const repaymentPeriod =
    repaymentPeriodMonths > 0
      ? `${Math.floor(repaymentPeriodMonths / 12)} years`
      : "N/A";
  const processingFee = parseFloat(
    loan.financial_terms?.processing_fee_percentage || "0"
  );
  const rating = Math.round(
    parseFloat(loan.performance_metrics?.customer_satisfaction_rating || "0")
  );

  // Extract features dynamically
  const features: string[] = [];
  if (loan.collateral_security?.collateral_required === "No") {
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

  // Extract eligibility criteria dynamically
  const eligibilityCriteria: string[] = [];
  if (loan.eligibility_criteria?.minimum_age) {
    eligibilityCriteria.push(
      `Minimum age: ${loan.eligibility_criteria.minimum_age} years`
    );
  }
  if (loan.eligibility_criteria?.maximum_age) {
    eligibilityCriteria.push(
      `Maximum age: ${loan.eligibility_criteria.maximum_age} years`
    );
  }
  if (loan.eligibility_criteria?.employment_criteria) {
    eligibilityCriteria.push(loan.eligibility_criteria.employment_criteria);
  }
  if (loan.eligibility_criteria?.minimum_percentage_required) {
    eligibilityCriteria.push(
      `Minimum percentage: ${loan.eligibility_criteria.minimum_percentage_required}%`
    );
  }
  if (loan.eligibility_criteria?.nationality_restrictions) {
    eligibilityCriteria.push(
      `Nationality: ${loan.eligibility_criteria.nationality_restrictions}`
    );
  }

  return {
    lenderName,
    interestRate,
    maxLoanAmount,
    repaymentPeriod,
    processingFee,
    rating,
    features,
    eligibilityCriteria,
  };
};

export function LoanComparison({
  loans,
  open,
  onClose,
  onRemoveLoan,
  onInterested,
}: LoanComparisonProps) {
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("loan-comparison-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  const handleNoteChange = (loanId: string, note: string) => {
    const updatedNotes = { ...notes, [loanId]: note };
    setNotes(updatedNotes);
    localStorage.setItem("loan-comparison-notes", JSON.stringify(updatedNotes));
  };

  if (loans.length === 0) return null;

  // Extract data for all loans
  const loansData = loans.map((loan) => ({
    id: loan.id.toString(),
    ...extractLoanData(loan),
  }));

  const findBest = (
    key: "interestRate" | "maxLoanAmount" | "processingFee",
    preferLower = true
  ) => {
    const values = loansData
      .map((loan) => loan[key] as number)
      .filter((v) => v > 0);
    if (values.length === 0) return 0;
    const bestValue = preferLower ? Math.min(...values) : Math.max(...values);
    return bestValue;
  };

  const bestInterestRate = findBest("interestRate", true);
  const bestMaxAmount = findBest("maxLoanAmount", false);
  const bestProcessingFee = findBest("processingFee", true);

  // Find the best overall loan (most "best" badges)
  const getBestCount = (loanData: (typeof loansData)[0]) => {
    let count = 0;
    if (loanData.interestRate === bestInterestRate && loanData.interestRate > 0)
      count++;
    if (loanData.maxLoanAmount === bestMaxAmount && loanData.maxLoanAmount > 0)
      count++;
    if (
      loanData.processingFee === bestProcessingFee &&
      loanData.processingFee > 0
    )
      count++;
    return count;
  };

  const bestCounts = loansData.map((loan) => ({
    id: loan.id,
    count: getBestCount(loan),
  }));
  const maxBestCount = Math.max(...bestCounts.map((bc) => bc.count));
  const bestOverallLoanId =
    loans.length >= 1
      ? bestCounts.find((bc) => bc.count === maxBestCount)?.id
      : undefined;

  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  const handleExport = () => {
    const comparisonData = loansData.map((loan) => ({
      Lender: loan.lenderName,
      "Interest Rate": `${loan.interestRate}%`,
      "Max Amount": `₹${(loan.maxLoanAmount / 100000).toFixed(1)}L`,
      "Repayment Period": loan.repaymentPeriod,
      "Processing Fee": `${loan.processingFee}%`,
      Rating: `${loan.rating}/5`,
    }));

    const csvContent = [
      Object.keys(comparisonData[0]).join(","),
      ...comparisonData.map((row) =>
        Object.values(row)
          .map((val) =>
            typeof val === "string" && val.includes(",") ? `"${val}"` : val
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `loan-comparison-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Comparison exported as CSV!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-heading font-bold">
                Loan Comparison
              </DialogTitle>
              <DialogDescription className="mt-1">
                Compare up to {loans.length} loan options side by side
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="p-6 print:p-4">
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${loans.length}, minmax(280px, 1fr))`,
              }}
            >
              {loansData.map((loanData, index) => {
                const loan = loans[index];
                return (
                  <div
                    key={loanData.id}
                    className={`relative rounded-xl bg-card border shadow-md overflow-hidden print:break-inside-avoid ${
                      loanData.id === bestOverallLoanId
                        ? "border-accent border-2 shadow-lg shadow-accent/20"
                        : "border-border/50"
                    }`}
                  >
                    {/* Best Overall Badge */}
                    {loanData.id === bestOverallLoanId && (
                      <div className="absolute top-4 right-12 z-20">
                        <Badge className="bg-accent text-accent-foreground font-bold shadow-md">
                          Best Overall
                        </Badge>
                      </div>
                    )}

                    {/* Premium gradient overlay */}
                    <div
                      className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl print:hidden ${
                        loanData.id === bestOverallLoanId
                          ? "bg-accent/10"
                          : "bg-primary/5"
                      }`}
                    />

                    <div className="relative z-10 p-5">
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveLoan(loanData.id)}
                        className="absolute top-2 right-2 h-7 w-7 rounded-lg hover:bg-muted print:hidden"
                      >
                        <X className="w-4 h-4" />
                      </Button>

                      {/* Header */}
                      <div className="mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center shadow-sm mb-3">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg font-heading mb-1">
                          {loanData.lenderName}
                        </h3>
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < loanData.rating
                                  ? "bg-accent"
                                  : "bg-muted-foreground/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Comparison Metrics */}
                      <div className="space-y-3 mb-4">
                        {/* Interest Rate */}
                        {loanData.interestRate > 0 && (
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground font-medium">
                                Interest Rate
                              </span>
                              {loanData.interestRate === bestInterestRate && (
                                <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
                                  Best
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold">
                                {loanData.interestRate}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                p.a.
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Max Loan Amount */}
                        {loanData.maxLoanAmount > 0 && (
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground font-medium">
                                Max Amount
                              </span>
                              {loanData.maxLoanAmount === bestMaxAmount && (
                                <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
                                  Best
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold">
                                ₹{(loanData.maxLoanAmount / 100000).toFixed(1)}L
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Repayment Period */}
                        {loanData.repaymentPeriod !== "N/A" && (
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                            <span className="text-xs text-muted-foreground font-medium block mb-1">
                              Repayment Period
                            </span>
                            <span className="text-lg font-bold">
                              {loanData.repaymentPeriod}
                            </span>
                          </div>
                        )}

                        {/* Processing Fee */}
                        {loanData.processingFee > 0 && (
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground font-medium">
                                Processing Fee
                              </span>
                              {loanData.processingFee === bestProcessingFee && (
                                <Badge className="bg-success/10 text-success border-success/20 text-[10px] px-1.5 py-0">
                                  Best
                                </Badge>
                              )}
                            </div>
                            <span className="text-lg font-bold">
                              {loanData.processingFee}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {loanData.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Features
                          </h4>
                          <div className="space-y-1.5">
                            {loanData.features
                              .slice(0, 5)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 text-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                                  <span className="text-foreground leading-tight">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Eligibility */}
                      {loanData.eligibilityCriteria.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Eligibility
                          </h4>
                          <div className="space-y-1.5">
                            {loanData.eligibilityCriteria
                              .slice(0, 5)
                              .map((criteria, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 text-xs"
                                >
                                  <AlertCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-foreground leading-tight">
                                    {criteria}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Notes Section */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Personal Notes
                        </h4>
                        <Textarea
                          placeholder="Add your observations about this loan..."
                          value={notes[loanData.id] || ""}
                          onChange={(e) =>
                            handleNoteChange(loanData.id, e.target.value)
                          }
                          className="min-h-[80px] text-xs resize-none print:hidden"
                        />
                        {notes[loanData.id] && (
                          <div className="hidden print:block mt-2 text-xs text-foreground whitespace-pre-wrap">
                            {notes[loanData.id]}
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={() => {
                          onInterested(loanData.id);
                          onClose();
                        }}
                        className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 print:hidden"
                      >
                        I'm Interested
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help Text */}
            {loans.length < 4 && (
              <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30 print:hidden">
                <p className="text-sm text-muted-foreground text-center">
                  💡 You can compare up to 4 loans. Select more loans to add
                  them to comparison.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}