import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Clock,
  Percent,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { Loan, formatCurrency } from "../../data/loans";

interface LoanCardProps {
  loan: Loan;
  isSelected?: boolean;
  onSelect?: (loan: Loan) => void;
  onViewDetails?: (loan: Loan) => void;
  variant?: "default" | "compact" | "comparison";
}

export default function LoanCard({
  loan,
  isSelected = false,
  onSelect,
  onViewDetails,
  variant = "default",
}: LoanCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative"
      >
        <div
          className={`
          relative p-5 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
          ${
            isSelected
              ? "bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-900/20 dark:to-blue-900/20 border-2 border-accent dark:border-accent shadow-xl shadow-accent/20"
              : "bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-accent/50 dark:hover:border-accent/50 hover:shadow-lg"
          }
        `}
          onClick={() => onSelect?.(loan)}
        >
          {/* Hover Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />

          {/* Selection Checkmark */}
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center shadow-lg shadow-accent/40 z-10"
            >
              <CheckCircle2 size={16} className="text-white" />
            </motion.div>
          )}

          <div className="relative flex items-center gap-4">
            {/* Logo */}
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-md" />
              <img
                src={loan.lenderLogo}
                alt={loan.lenderName}
                className="relative w-14 h-14 rounded-xl object-cover shadow-lg ring-2 ring-white dark:ring-slate-700"
              />
            </motion.div>

            {/* Info */}
            <div className="relative flex-1 min-w-0">
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 truncate mb-1">
                {loan.lenderName}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={
                        i < Math.floor(loan.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200 dark:text-slate-600"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-primary dark:text-primary-light">
                  {loan.interestRate.min}% - {loan.interestRate.max}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant - Premium Card Design
  const isFeatured = loan.featured || loan.recommended;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft hover:shadow-xl transition-all duration-500">
        {/* Premium Top Accent for Featured */}
        {isFeatured && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-primary">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />
          </div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

        {/* Featured/Recommended Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                ${
                  loan.featured
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/40"
                    : "bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/40"
                }
              `}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {loan.featured ? <Sparkles size={12} /> : <Zap size={12} />}
              </motion.div>
              {loan.featured ? "Featured" : "Best Match"}
            </motion.div>
          </div>
        )}

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {/* Logo with Enhanced Styling */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-lg" />
              <img
                src={loan.lenderLogo}
                alt={loan.lenderName}
                className="relative w-16 h-16 rounded-xl object-cover shadow-xl ring-2 ring-white dark:ring-slate-700"
              />
              {/* Trust Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-success rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-lg"
              >
                <Shield size={12} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Lender Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 truncate mb-2">
                {loan.lenderName}
              </h3>
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Star
                        size={14}
                        className={
                          i < Math.floor(loan.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 dark:text-slate-600"
                        }
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {loan.rating}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  ({loan.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Key Stats Grid - Premium Design */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Interest Rate Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group/stat"
            >
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"
                  initial={false}
                />

                {/* Accent Bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary-light rounded-r" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Percent
                        size={14}
                        className="text-primary dark:text-primary-light"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Interest Rate
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">
                      {loan.interestRate.min}%
                    </span>
                    <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                      – {loan.interestRate.max}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Max Amount Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group/stat"
            >
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"
                  initial={false}
                />

                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-light rounded-r" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                      <TrendingUp
                        size={14}
                        className="text-accent dark:text-accent-light"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Max Amount
                    </span>
                  </div>
                  <span className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">
                    {formatCurrency(loan.loanAmount.max)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex items-center justify-around py-4 px-2 mb-6 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock
                size={16}
                className="text-primary dark:text-primary-light"
              />
              <div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Tenure
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {loan.tenure.max / 12} years
                </p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Building2
                size={16}
                className="text-accent dark:text-accent-light"
              />
              <div>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Processing
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {loan.processingFee}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights - Enhanced */}
          <div className="space-y-2.5 mb-6">
            {loan.highlights.slice(0, 3).map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="group/highlight flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <motion.div
                  className="mt-0.5 p-1 rounded-full bg-success/10 group-hover/highlight:bg-success/20 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <CheckCircle2
                    size={14}
                    className="text-success dark:text-green-400"
                  />
                </motion.div>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-tight font-medium">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons - Premium Design */}
          <div className="flex items-center gap-3">
            {/* Primary Action - View Details */}
            <motion.button
              onClick={() => onViewDetails?.(loan)}
              className="relative flex-1 py-3.5 px-5 rounded-xl font-bold text-white overflow-hidden group/btn shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light group-hover/btn:from-primary-light group-hover/btn:to-accent transition-all duration-300" />

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 3,
                }}
              />

              <span className="relative flex items-center justify-center gap-2">
                View Details
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </span>
            </motion.button>

            {/* Select Button */}
            {onSelect && (
              <motion.button
                onClick={() => onSelect(loan)}
                className={`
                  relative p-3.5 rounded-xl border-2 transition-all overflow-hidden
                  ${
                    isSelected
                      ? "border-accent bg-accent/10 dark:bg-accent/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-accent dark:hover:border-accent bg-white dark:bg-slate-800"
                  }
                `}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    scale: isSelected ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <CheckCircle2
                    size={22}
                    className={
                      isSelected
                        ? "text-accent dark:text-accent-light"
                        : "text-slate-400 dark:text-slate-500"
                    }
                  />
                </motion.div>

                {/* Selection Pulse */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-accent/20 rounded-xl"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Glow Shadow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
          isFeatured
            ? "from-accent/10 to-primary/10"
            : "from-primary/5 to-accent/5"
        } opacity-0 group-hover:opacity-100 blur-2xl -z-10 transition-opacity duration-500`}
        initial={false}
      />
    </motion.div>
  );
}
