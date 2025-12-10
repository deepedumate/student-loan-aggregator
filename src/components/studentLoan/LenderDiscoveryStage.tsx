import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  X,
  Filter,
  ChevronDown,
} from "lucide-react";
import type {
  StudentProfile,
  EligibilityScore,
  Lender,
  SelectedLender,
  LenderFilters,
} from "@/types/studentLoanType";
import { LENDERS } from "@/data/mockData";
import {
  formatCurrency,
  formatLakhsCrores,
  formatPercentage,
  calculateEMI,
} from "@/lib/helper/studentLoanHelper";

interface LenderDiscoveryStageProps {
  profile: StudentProfile;
  eligibilityScore: EligibilityScore;
  onLenderSelected: (selection: SelectedLender) => void;
}

export default function LenderDiscoveryStage({
  profile,
  eligibilityScore,
  onLenderSelected,
}: LenderDiscoveryStageProps) {
  const [selectedLender, setSelectedLender] = useState<Lender | null>(null);
  const [selectedLoanType, setSelectedLoanType] = useState<
    "secured" | "unsecured"
  >("unsecured");
  const [showFilters, setShowFilters] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const [filters, setFilters] = useState<LenderFilters>({
    searchQuery: "",
    loanType: "all",
    minAmount: 0,
    maxAmount: 20000000,
    sortBy: "relevance",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const filteredLenders = useMemo(() => {
    let result = [...LENDERS];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((lender) =>
        lender.name.toLowerCase().includes(query)
      );
    }

    if (filters.loanType !== "all") {
      result = result.filter((lender) =>
        lender.loanTypes.includes(filters.loanType as "secured" | "unsecured")
      );
    }

    result = result.filter(
      (lender) =>
        lender.maxAmount >= profile.requestedAmount &&
        lender.minAmount <= profile.requestedAmount
    );

    switch (filters.sortBy) {
      case "interest-asc":
        result.sort((a, b) => a.interestRate - b.interestRate);
        break;
      case "interest-desc":
        result.sort((a, b) => b.interestRate - a.interestRate);
        break;
      case "amount-asc":
        result.sort((a, b) => a.maxAmount - b.maxAmount);
        break;
      case "amount-desc":
        result.sort((a, b) => b.maxAmount - a.maxAmount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => {
          const scoreA = a.approvalRate * 0.6 + a.rating * 10 * 0.4;
          const scoreB = b.approvalRate * 0.6 + b.rating * 10 * 0.4;
          return scoreB - scoreA;
        });
    }

    return result;
  }, [filters, profile.requestedAmount]);

  const handleLenderSelect = (lender: Lender) => {
    setSelectedLender(lender);
    setSelectedLoanType(lender.loanTypes[0]);
  };

  const handleProceed = () => {
    if (!selectedLender) return;

    const emi = calculateEMI(
      profile.requestedAmount,
      selectedLender.interestRate,
      selectedLender.tenure
    );
    const totalRepayment = emi * selectedLender.tenure;
    const totalInterest = totalRepayment - profile.requestedAmount;

    const selection: SelectedLender = {
      lender: selectedLender,
      lenderName: selectedLender.name,
      requestedAmount: profile.requestedAmount,
      selectedLoanType,
      estimatedEMI: emi,
      totalInterest,
      totalRepayment,
    };

    onLenderSelected(selection);
  };

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Header */}
      <motion.div
        className="text-left lg:text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Find Your Perfect Lender
        </h2>
        <p className="text-muted-foreground">
          Compare {LENDERS.length} lenders offering loans for{" "}
          {formatLakhsCrores(profile.requestedAmount)}
        </p>
      </motion.div>

      {/* Instructions Banner */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="glass-card p-6 rounded-2xl bg-primary/5 border-2 border-primary/20"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">
                      i
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">
                    How to Choose Your Lender
                  </h3>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground ml-10">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">1.</span>
                    <span>
                      <strong className="text-foreground">
                        Browse & Filter:
                      </strong>{" "}
                      Use search and filters to find lenders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">2.</span>
                    <span>
                      <strong className="text-foreground">Click a Card:</strong>{" "}
                      Select your preferred lender
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">3.</span>
                    <span>
                      <strong className="text-foreground">
                        Review Details:
                      </strong>{" "}
                      Check the loan summary at the bottom
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary">4.</span>
                    <span>
                      <strong className="text-foreground">Proceed:</strong>{" "}
                      Click the "Proceed with [Lender]" button
                    </span>
                  </li>
                </ol>
              </div>
              <motion.button
                onClick={() => setShowInstructions(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Card */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Filter & Search Lenders</span>
          </h3>
          <motion.button
            onClick={() =>
              setFilters({
                searchQuery: "",
                loanType: "all",
                minAmount: 0,
                maxAmount: 20000000,
                sortBy: "relevance",
              })
            }
            className="text-sm text-accent hover:underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All Filters
          </motion.button>
        </div>

        {/* Primary Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-foreground mb-2">
              Search by Name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <motion.input
                type="text"
                placeholder="Search lenders..."
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }))
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                whileFocus={{ scale: 1.01 }}
              />
            </div>
          </div>

          {/* Loan Type */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-2">
              Loan Type
            </label>
            <motion.select
              value={filters.loanType}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  loanType: e.target.value as any,
                }))
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
              whileFocus={{ scale: 1.01 }}
            >
              <option value="all">All Types</option>
              <option value="secured">Secured Only</option>
              <option value="unsecured">Unsecured Only</option>
            </motion.select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-2">
              Sort By
            </label>
            <motion.select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
              whileFocus={{ scale: 1.01 }}
            >
              <option value="relevance">Most Relevant</option>
              <option value="interest-asc">Interest: Low to High</option>
              <option value="interest-desc">Interest: High to Low</option>
              <option value="amount-desc">Max Amount: High to Low</option>
              <option value="rating">Highest Rated</option>
            </motion.select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{showFilters ? "Hide" : "Show"} Advanced Filters</span>
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-4 pt-4 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-foreground mb-3">
                Maximum Loan Amount:{" "}
                <span className="text-accent font-semibold">
                  {formatLakhsCrores(filters.maxAmount)}
                </span>
              </label>
              <input
                type="range"
                min="1000000"
                max="20000000"
                step="500000"
                value={filters.maxAmount}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxAmount: Number(e.target.value),
                  }))
                }
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹10L</span>
                <span>₹200L</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div
          className="mt-4 flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {filteredLenders.length}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {filteredLenders.length === 0
                ? "No lenders match your criteria"
                : filteredLenders.length === 1
                ? "1 lender matches your criteria"
                : `${filteredLenders.length} lenders match your criteria`}
            </span>
          </div>
          {!selectedLender && filteredLenders.length > 0 && (
            <motion.span
              className="text-xs text-accent font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👆 Click a card below
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Empty State */}
      {filteredLenders.length === 0 && (
        <motion.div
          className="glass-card p-12 text-center rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No lenders found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search criteria
          </p>
          <motion.button
            onClick={() =>
              setFilters({
                searchQuery: "",
                loanType: "all",
                minAmount: 0,
                maxAmount: 20000000,
                sortBy: "relevance",
              })
            }
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}

      {/* Selection Prompt */}
      {!selectedLender && filteredLenders.length > 0 && (
        <motion.div
          className="glass-card p-6 rounded-2xl bg-accent/5 border-2 border-accent/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shrink-0"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-accent-foreground text-2xl">👇</span>
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Select a Lender to Continue
              </h3>
              <p className="text-sm text-muted-foreground">
                Click on any lender card below to see detailed loan summary
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Lenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLenders.map((lender, index) => (
          <motion.div
            key={lender.id}
            className={`
              relative cursor-pointer transition-all duration-300
              glass-card p-6 rounded-2xl
              ${
                selectedLender?.id === lender.id
                  ? "ring-4 ring-primary shadow-glow-primary-lg scale-[1.02] bg-primary/5"
                  : "hover:shadow-xl hover:scale-[1.01] hover:border-primary/50"
              }
            `}
            onClick={() => handleLenderSelect(lender)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Selected Badge */}
            <AnimatePresence>
              {selectedLender?.id === lender.id && (
                <motion.div
                  className="absolute -top-3 -right-3 z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="bg-success text-success-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold text-sm">SELECTED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-primary/25">
                  {lender.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {lender.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium text-foreground">
                        {lender.rating}
                      </span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {lender.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground mb-1">
                  Interest Rate
                </p>
                <p className="text-lg font-bold text-foreground">
                  {formatPercentage(lender.interestRate)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground mb-1">Max Amount</p>
                <p className="text-lg font-bold text-foreground">
                  {formatLakhsCrores(lender.maxAmount)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground mb-1">
                  Processing Fee
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatPercentage(lender.processingFee)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-xs text-muted-foreground mb-1">
                  Margin Money
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatPercentage(lender.marginMoney)}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {lender.features.slice(0, 3).map((feature: any, idx: any) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {lender.disbursementTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">
                    {lender.approvalRate}% approval
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {lender.loanTypes.map((type: any) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Lender Summary */}
      <AnimatePresence>
        {selectedLender && (
          <motion.div
            className="glass-card p-6 rounded-2xl sticky bottom-24 z-10 bg-success/5 border-4 border-success/30 shadow-xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    You Selected: {selectedLender.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review your loan details and click "Proceed" when ready
                </p>
              </div>
              <motion.button
                onClick={() => setSelectedLender(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                className="bg-card rounded-xl p-4 border-2 border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Loan Amount
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  {formatLakhsCrores(profile.requestedAmount)}
                </p>
              </motion.div>
              <motion.div
                className="bg-card rounded-xl p-4 border-2 border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Monthly EMI
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {formatCurrency(
                    calculateEMI(
                      profile.requestedAmount,
                      selectedLender.interestRate,
                      selectedLender.tenure
                    )
                  )}
                </p>
              </motion.div>
              <motion.div
                className="bg-card rounded-xl p-4 border-2 border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Loan Tenure
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {selectedLender.tenure / 12} Years
                </p>
              </motion.div>
            </div>

            {/* Loan Type Selection */}
            {selectedLender.loanTypes.length > 1 && (
              <div className="mb-6 p-4 bg-card rounded-xl">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Select Loan Type:
                </p>
                <div className="flex gap-4">
                  {selectedLender.loanTypes.map((type: any) => (
                    <motion.label
                      key={type}
                      className={`
                        flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 transition-all flex-1
                        ${
                          selectedLoanType === type
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="loanType"
                        value={type}
                        checked={selectedLoanType === type}
                        onChange={(e) =>
                          setSelectedLoanType(
                            e.target.value as "secured" | "unsecured"
                          )
                        }
                        className="w-5 h-5 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="text-base font-semibold text-foreground capitalize block">
                          {type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {type === "secured"
                            ? "Collateral required"
                            : "No collateral needed"}
                        </span>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleProceed}
                className="relative flex-1 px-8 py-5 text-lg sm:text-xl font-bold rounded-xl bg-primary text-primary-foreground shadow-xl overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Proceed with {selectedLender.name}
                  <ArrowRight className="w-6 h-6" />
                </span>
              </motion.button>
              <motion.button
                onClick={() => setSelectedLender(null)}
                className="px-6 py-5 text-base rounded-xl bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Choose Different Lender
              </motion.button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              🔒 Secure selection. Change anytime before final submission.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
