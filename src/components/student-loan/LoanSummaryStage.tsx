import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  DollarSign,
  Percent,
  TrendingDown,
  Download,
  Share2,
  AlertCircle,
  Clock,
  CreditCard,
  FileText,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import type { Application, SelectedLender } from "@/types/studentLoanType";
import { formatCurrency } from "@/lib/helper/studentLoanHelper";

interface LoanSummaryStageProps {
  lender: SelectedLender;
  application: Application;
}

export function LoanSummaryStage({
  lender,
  application,
}: LoanSummaryStageProps) {
  // Access selectedLender from application - adjust this based on your actual type structure
  // Try both 'selectedLender' and 'lender' to handle different possible naming
  const selectedLender =
    (application as any).selectedLender || (application as any).lender;

  if (!selectedLender) {
    return (
      <div className="container mx-auto px-4 max-w-3xl text-center py-12">
        <p className="text-muted-foreground">No lender selected</p>
      </div>
    );
  }

  const loanDetails = {
    loanAmount: application.loanAmount,
    interestRate: selectedLender.interestRate,
    tenure: selectedLender.tenure,
    processingFee: selectedLender.processingFee || 0,
    emi: calculateEMI(
      application.loanAmount,
      selectedLender.interestRate,
      selectedLender.tenure
    ),
    totalInterest: calculateTotalInterest(
      application.loanAmount,
      selectedLender.interestRate,
      selectedLender.tenure
    ),
    totalPayable: 0, // Will be calculated
  };

  loanDetails.totalPayable =
    loanDetails.loanAmount +
    loanDetails.totalInterest +
    loanDetails.processingFee;

  const keyMetrics = [
    {
      icon: DollarSign,
      label: "Monthly EMI",
      value: formatCurrency(loanDetails.emi),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Percent,
      label: "Interest Rate",
      value: `${loanDetails.interestRate}% p.a.`,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Calendar,
      label: "Loan Tenure",
      value: `${loanDetails.tenure} months`,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: TrendingDown,
      label: "Processing Fee",
      value: formatCurrency(loanDetails.processingFee),
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-5xl space-y-6">
      {/* Success Header */}
      <motion.div
        className="text-left lg:text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 border-2 border-success"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <CheckCircle className="w-10 h-10 text-success" />
          </motion.div>
        </motion.div>

        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Application Approved! 🎉
          </motion.h2>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Congratulations! Your loan application has been approved by{" "}
            <span className="font-semibold text-foreground">
              {selectedLender.name}
            </span>
          </motion.p>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <motion.div
              className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mb-4`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </motion.div>
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Loan Details */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Loan Summary
        </h3>

        <div className="space-y-4">
          {[
            {
              label: "Principal Amount",
              value: formatCurrency(loanDetails.loanAmount),
            },
            {
              label: "Interest Rate",
              value: `${loanDetails.interestRate}% per annum`,
            },
            { label: "Loan Tenure", value: `${loanDetails.tenure} months` },
            {
              label: "Processing Fee",
              value: formatCurrency(loanDetails.processingFee),
            },
            {
              label: "Monthly EMI",
              value: formatCurrency(loanDetails.emi),
              highlight: true,
            },
            {
              label: "Total Interest",
              value: formatCurrency(loanDetails.totalInterest),
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className={`flex justify-between items-center py-3 border-b border-border last:border-b-0 ${
                item.highlight ? "bg-primary/5 -mx-4 px-4 rounded-lg" : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.05 }}
            >
              <span
                className={`${
                  item.highlight
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`${
                  item.highlight
                    ? "text-xl font-bold text-primary"
                    : "font-semibold text-foreground"
                }`}
              >
                {item.value}
              </span>
            </motion.div>
          ))}

          <motion.div
            className="flex justify-between items-center py-4 mt-4 border-t-2 border-primary/20 bg-primary/5 -mx-4 px-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <span className="text-lg font-bold text-foreground">
              Total Amount Payable
            </span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(loanDetails.totalPayable)}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Lender Information */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Lender Information
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <motion.div
            className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 shrink-0"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <span className="text-3xl font-bold text-primary">
              {selectedLender.name.charAt(0)}
            </span>
          </motion.div>

          <div className="flex-1 space-y-3">
            <div>
              <h4 className="text-xl font-bold text-foreground">
                {selectedLender.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedLender.type || "Financial Institution"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">
                    {selectedLender.phone || "1800-XXX-XXXX"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">
                    {selectedLender.email || "support@lender.com"}
                  </p>
                </div>
              </motion.div>
            </div>

            {selectedLender.features && selectedLender.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedLender.features.map(
                  (feature: string, index: number) => (
                    <motion.span
                      key={feature}
                      className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      ✓ {feature}
                    </motion.span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-2xl bg-primary/5 border-2 border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-start gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Next Steps
            </h3>
            <p className="text-sm text-muted-foreground">
              Follow these steps to complete your loan disbursement
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: FileText,
              title: "Sign Loan Agreement",
              description:
                "Review and digitally sign the loan agreement document",
              time: "Within 24 hours",
            },
            {
              icon: CreditCard,
              title: "Complete KYC Verification",
              description:
                "Submit your identity documents for final verification",
              time: "1-2 business days",
            },
            {
              icon: CheckCircle,
              title: "Loan Disbursement",
              description: "Funds will be transferred to your account",
              time: "3-5 business days",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <step.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Clock className="w-3 h-3" />
                  <span>{step.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          className="relative px-12 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 overflow-hidden group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10 flex items-center gap-2 justify-center">
            <Download className="w-5 h-5" />
            Download Loan Agreement
          </span>
        </motion.button>

        <motion.button
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-card border-2 border-primary text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-5 h-5" />
          Share Details
        </motion.button>

        <motion.button
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(selectedLender.website || "#", "_blank")}
        >
          <ExternalLink className="w-5 h-5" />
          Visit Lender Website
        </motion.button>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <p>
          You will receive a confirmation email with all the details shortly.
        </p>
        <p className="mt-2">
          For any queries, contact our support team at{" "}
          <a
            href="mailto:support@edumate.com"
            className="text-primary hover:underline font-semibold"
          >
            support@edumate.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}

// Helper Functions
function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

function calculateTotalInterest(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  return emi * tenureMonths - principal;
}
