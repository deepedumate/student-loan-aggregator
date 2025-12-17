// @/components/loan/LoanFilters.tsx

import { useState, useEffect, useRef } from "react";
import { Filter, X, Search, Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoanProductFilters } from "@/types/loanProduct";
import { useAppSelector } from "@/store/hooks";
import { selectLenders } from "@/store/slices/lenderSlice";

export interface FilterValues {
  lenderName?: string;
  studyLevel?: string;
  supportedCountries?: string;
  loan_type?: string;
  interestRateMin?: number;
  interestRateMax?: number;
  minLoanAmount?: number;
  maxLoanAmount?: number;
  collateralRequired?: string;
  guarantorRequired?: string;
  searchQuery?: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: LoanProductFilters;
  createdAt: string;
}

interface LoanFiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  appliedFiltersCount: number;
  presets: FilterPreset[];
  onSavePreset: (name: string, filters: LoanProductFilters) => void;
  onLoadPreset: (preset: FilterPreset) => void;
  onDeletePreset: (presetId: string) => void;
}

const STUDY_LEVELS = ["Undergraduate", "MBA", "Specialised Masters", "PhD"];
const SUPPORTED_COUNTRIES = ["USA", "India", "Non USA"];
const COLLATERAL_OPTIONS = ["Yes", "No", "Optional"];

// ✅ Slider ranges
const INTEREST_RATE_MIN = 0;
const INTEREST_RATE_MAX = 20;
const LOAN_AMOUNT_MIN = 0;
const LOAN_AMOUNT_MAX = 10000000; // 1 Crore

export function LoanFilters({
  filters,
  onFilterChange,
  appliedFiltersCount,
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
}: LoanFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [showPresetsList, setShowPresetsList] = useState(false);
  const hasAutoPopulated = useRef(false);
  const contact = useAppSelector(
    (state: any) => state.contactAuth?.data?.contact || null
  );
  const lenders = useAppSelector(selectLenders);

  // ✅ LOCAL STATE for pending filters
  const [pendingFilters, setPendingFilters] = useState<FilterValues>(filters);

  // ✅ Slider state for interest rate
  const [interestRateRange, setInterestRateRange] = useState<[number, number]>([
    pendingFilters.interestRateMin || INTEREST_RATE_MAX, // Start at MAX (20%)
    INTEREST_RATE_MAX,
  ]);

  // ✅ Slider state for loan amount
  const [loanAmountRange, setLoanAmountRange] = useState<[number, number]>([
    pendingFilters.minLoanAmount || LOAN_AMOUNT_MIN,
    pendingFilters.maxLoanAmount || LOAN_AMOUNT_MAX,
  ]);

  // ✅ Sync pending filters with applied filters when they change externally
  useEffect(() => {
    if (isOpen) {
      setPendingFilters(filters);
      setInterestRateRange([
        filters.interestRateMin || INTEREST_RATE_MAX, // Start at MAX
        filters.interestRateMax || INTEREST_RATE_MAX,
      ]);
      setLoanAmountRange([
        filters.minLoanAmount || LOAN_AMOUNT_MIN,
        filters.maxLoanAmount || LOAN_AMOUNT_MAX,
      ]);
    }
  }, [filters, isOpen]);

  // ✅ Helper to map study level
  const normalizeStudyLevel = (
    level: string | undefined | null
  ): string | undefined => {
    if (!level) return undefined;
    const normalized = level.toLowerCase();

    if (
      normalized.includes("masters") ||
      normalized === "graduate_masters" ||
      normalized === "specialised masters"
    ) {
      return "Specialised Masters";
    } else if (normalized.includes("mba") || normalized === "graduate_mba") {
      return "MBA";
    } else if (normalized.includes("phd") || normalized === "ph.d") {
      return "PhD";
    } else if (
      normalized.includes("undergraduate") ||
      normalized.includes("undergrad")
    ) {
      return "Undergraduate";
    }

    return level;
  };

  // ✅ Helper to map study destination
  const mapStudyDestinationToFilter = (
    destination: string | undefined | null
  ): string | undefined => {
    if (!destination) return undefined;
    const normalized = destination.trim().toLowerCase();

    if (
      normalized.startsWith("us") ||
      normalized.startsWith("usa") ||
      normalized === "united states"
    ) {
      return "USA";
    }

    if (normalized.startsWith("india")) {
      return "India";
    }

    return "Non USA";
  };

  // ✅ Auto-populate from contact auth data (runs once)
  useEffect(() => {
    if (!contact || hasAutoPopulated.current) return;

    const autoFilters: FilterValues = {};
    let hasData = false;

    // Extract loan type
    if (contact?.loan_preference?.loan_type_preference) {
      const loanTypePref = contact.loan_preference.loan_type_preference;
      const mapping: { [key: string]: string } = {
        Secured: "Secured Education Loan",
        Unsecured: "Unsecured Education Loan",
      };
      if (mapping[loanTypePref]) {
        autoFilters.loan_type = mapping[loanTypePref];
        hasData = true;
      }
    }

    // Extract study level
    if (contact.academic_profile?.target_degree_level) {
      const normalizedLevel = normalizeStudyLevel(
        contact.academic_profile?.target_degree_level
      );
      if (normalizedLevel) {
        autoFilters.studyLevel = normalizedLevel;
        hasData = true;
      }
    }

    // Extract supported countries from preferred study destination
    if (contact?.academic_profile?.preferred_study_destination) {
      const mappedCountry = mapStudyDestinationToFilter(
        contact?.academic_profile?.preferred_study_destination
      );
      if (mappedCountry) {
        autoFilters.supportedCountries = mappedCountry;
        hasData = true;
      }
    }

    // Only apply if we have data
    if (hasData && Object.keys(autoFilters).length > 0) {
      console.log("Auto-populating filters from contact:", autoFilters);
      hasAutoPopulated.current = true;
      onFilterChange(autoFilters);
      toast.success(
        `Auto-filled ${Object.keys(autoFilters).length} filter${
          Object.keys(autoFilters).length !== 1 ? "s" : ""
        } from your profile`,
        {
          description: "You can adjust these filters as needed",
          duration: 4000,
        }
      );
    }
  }, [contact, onFilterChange]);

  // ✅ Handle pending filter changes
  const handlePendingFilterChange = (key: keyof FilterValues, value: any) => {
    setPendingFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Apply filters when button is clicked
  const handleApplyFilters = () => {
    // Apply slider values to pending filters
    const finalFilters = {
      ...pendingFilters,
    };

    // ✅ FIXED: Only exclude if BOTH values are at default
    const isInterestRateDefault =
      interestRateRange[0] === INTEREST_RATE_MIN &&
      interestRateRange[1] === INTEREST_RATE_MAX;

    const isLoanAmountDefault =
      loanAmountRange[0] === LOAN_AMOUNT_MIN &&
      loanAmountRange[1] === LOAN_AMOUNT_MAX;

    if (!isInterestRateDefault) {
      finalFilters.interestRateMin = interestRateRange[0];
      // finalFilters.interestRateMax = interestRateRange[1];
    }

    if (!isLoanAmountDefault) {
      finalFilters.minLoanAmount = loanAmountRange[0];
      finalFilters.maxLoanAmount = loanAmountRange[1];
    }

    console.log("Applying filters:", finalFilters);

    onFilterChange(finalFilters);
    setIsOpen(false);
    toast.success("Filters applied successfully");
  };

  // ✅ Clear all filters
  const handleClearAll = () => {
    const clearedFilters: FilterValues = {
      searchQuery: pendingFilters.searchQuery,
    };
    setPendingFilters(clearedFilters);
    setInterestRateRange([INTEREST_RATE_MIN, INTEREST_RATE_MAX]);
    setLoanAmountRange([LOAN_AMOUNT_MIN, LOAN_AMOUNT_MAX]);
    onFilterChange(clearedFilters);
    toast.success("All filters cleared");
  };

  const handleRemoveFilter = (key: keyof FilterValues) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFilterChange(newFilters);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error("Please enter a preset name");
      return;
    }

    if (appliedFiltersCount === 0) {
      toast.error("No filters applied to save");
      return;
    }

    const apiFilters: LoanProductFilters = {};

    if (filters.studyLevel) apiFilters.study_level = filters.studyLevel;
    if (filters.loan_type) apiFilters.product_type = filters.loan_type;
    if (filters.supportedCountries)
      apiFilters.supported_countries = filters.supportedCountries;
    if (filters.minLoanAmount)
      apiFilters.loan_amount_min = filters.minLoanAmount;
    if (filters.maxLoanAmount)
      apiFilters.loan_amount_max = filters.maxLoanAmount;
    if (filters.interestRateMin)
      apiFilters.interest_rate = filters.interestRateMin;
    // if (filters.interestRateMax)
    //   apiFilters.interest_rate_max = filters.interestRateMax;
    if (filters.collateralRequired)
      apiFilters.collateral_required = filters.collateralRequired;
    if (filters.guarantorRequired)
      apiFilters.guarantor_required = filters.guarantorRequired;

    onSavePreset(presetName.trim(), apiFilters);
    setPresetName("");
  };

  const handleLoadPreset = (preset: FilterPreset) => {
    onLoadPreset(preset);
    setShowPresetsList(false);
  };

  const handleDeletePreset = (presetId: string) => {
    onDeletePreset(presetId);
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex gap-3">
        {/* ✅ Search remains real-time */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search lenders, features..."
            value={filters.searchQuery || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="h-12 pl-10 pr-4 rounded-xl bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>

        {/* Preset Management Buttons */}
        {presets.length > 0 && (
          <Button
            onClick={() => setShowPresetsList(!showPresetsList)}
            variant="outline"
            size="lg"
            className="h-12 px-6 rounded-xl border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            <Bookmark className="w-5 h-5 mr-2" />
            Presets
            <Badge className="ml-2 bg-accent/10 text-accent border-accent/20">
              {presets.length}
            </Badge>
          </Button>
        )}

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-xl border-border/50 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-all duration-300 relative"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              {appliedFiltersCount > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {appliedFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-2xl font-heading">
                Filter Loans
              </SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect loan match
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-6">
              {/* Study Level */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Study Level
                </Label>
                <Select
                  value={pendingFilters.studyLevel}
                  onValueChange={(value) =>
                    handlePendingFilterChange("studyLevel", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    {STUDY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Supported Countries */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Supported Countries
                </Label>
                <Select
                  value={pendingFilters.supportedCountries}
                  onValueChange={(value) =>
                    handlePendingFilterChange("supportedCountries", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loan Type */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Loan Type
                </Label>
                <Select
                  value={pendingFilters.loan_type}
                  onValueChange={(value) =>
                    handlePendingFilterChange("loan_type", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Secured Education Loan">
                      Secured
                    </SelectItem>
                    <SelectItem value="Unsecured Education Loan">
                      Unsecured
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Lender
                </Label>
                <Select
                  value={pendingFilters.lenderName}
                  onValueChange={(value) =>
                    handlePendingFilterChange("lenderName", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select lender" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {lenders && lenders.length > 0 ? (
                      lenders
                        .filter(
                          (lender) => lender.is_active && !lender.is_deleted
                        )
                        .map((lender) => (
                          <SelectItem
                            key={lender.id}
                            value={lender.lender_name}
                          >
                            {lender.lender_name || lender.lender_name}
                          </SelectItem>
                        ))
                    ) : (
                      <SelectItem value="no-lenders" disabled>
                        No lenders available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* ✅ Interest Rate Range Slider */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Maximum Interest Rate
                </Label>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">0%</span>
                    <span className="font-medium text-primary">
                      Up to {interestRateRange[0]}%
                    </span>
                  </div>
                  <Slider
                    value={[interestRateRange[0]]}
                    onValueChange={(value) =>
                      setInterestRateRange([value[0], INTEREST_RATE_MAX] as [
                        number,
                        number
                      ])
                    }
                    min={INTEREST_RATE_MIN}
                    max={INTEREST_RATE_MAX}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{INTEREST_RATE_MAX}%</span>
                  </div>
                </div>
              </div>

              {/* ✅ Loan Amount Range Slider */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Maximum Loan Amount
                </Label>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹0</span>
                    <span className="font-medium text-primary">
                      Up to {formatCurrency(loanAmountRange[0])}
                    </span>
                  </div>
                  <Slider
                    value={[loanAmountRange[0]]}
                    onValueChange={(value) =>
                      setLoanAmountRange([value[0], LOAN_AMOUNT_MAX] as [
                        number,
                        number
                      ])
                    }
                    min={LOAN_AMOUNT_MIN}
                    max={LOAN_AMOUNT_MAX}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(LOAN_AMOUNT_MIN)}</span>
                    <span>{formatCurrency(LOAN_AMOUNT_MAX)}</span>
                  </div>
                </div>
              </div>

              {/* Collateral Required */}
              {/* <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Collateral Required
                </Label>
                <Select
                  value={pendingFilters.collateralRequired}
                  onValueChange={(value) =>
                    handlePendingFilterChange("collateralRequired", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLLATERAL_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* Guarantor Required */}
              {/* <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Guarantor Required
                </Label>
                <Select
                  value={pendingFilters.guarantorRequired}
                  onValueChange={(value) =>
                    handlePendingFilterChange("guarantorRequired", value)
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLLATERAL_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* ❌ COMMENTED OUT FILTERS */}
              {/* 
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Intake Period
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={pendingFilters.intakeMonth}
                    onValueChange={(value) =>
                      handlePendingFilterChange("intakeMonth", value)
                    }
                  >
                    <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={pendingFilters.intakeYear}
                    onValueChange={(value) =>
                      handlePendingFilterChange("intakeYear", value)
                    }
                  >
                    <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  School
                </Label>
                <Input
                  type="text"
                  placeholder="Enter school name"
                  value={pendingFilters.school || ""}
                  onChange={(e) =>
                    handlePendingFilterChange("school", e.target.value)
                  }
                  className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Program
                </Label>
                <Input
                  type="text"
                  placeholder="Enter program name"
                  value={pendingFilters.program || ""}
                  onChange={(e) =>
                    handlePendingFilterChange("program", e.target.value)
                  }
                  className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Tuition Fee
                </Label>
                <Input
                  type="number"
                  placeholder="Enter total tuition fee"
                  value={pendingFilters.totalTuitionFee || ""}
                  onChange={(e) =>
                    handlePendingFilterChange(
                      "totalTuitionFee",
                      parseInt(e.target.value) || undefined
                    )
                  }
                  className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Cost of Living
                </Label>
                <Input
                  type="number"
                  placeholder="Enter cost of living"
                  value={pendingFilters.totalCostOfLiving || ""}
                  onChange={(e) =>
                    handlePendingFilterChange(
                      "totalCostOfLiving",
                      parseInt(e.target.value) || undefined
                    )
                  }
                  className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              */}

              {/* ✅ Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="flex-1 h-11 rounded-lg border-border/50 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive transition-all duration-300"
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleApplyFilters}
                  className="flex-1 h-11 rounded-lg bg-gradient-to-r from-primary to-primary-light hover:from-primary hover:to-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Presets List Dropdown */}
      {showPresetsList && presets.length > 0 && (
        <div className="relative">
          <div className="absolute top-2 right-0 w-80 max-h-96 overflow-y-auto rounded-xl bg-card border border-border/50 shadow-xl z-50 animate-scale-in">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold font-heading">Saved Presets</h3>
                <Button
                  onClick={() => setShowPresetsList(false)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <button
                    onClick={() => handleLoadPreset(preset)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{preset.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Object.keys(preset.filters).length} filter
                      {Object.keys(preset.filters).length !== 1
                        ? "s"
                        : ""} •{" "}
                      {new Date(preset.createdAt).toLocaleDateString()}
                    </p>
                  </button>
                  <Button
                    onClick={() => handleDeletePreset(preset.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {appliedFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || key === "searchQuery") return null;

            let displayValue = value;
            let displayKey = key;

            // Format display for specific keys
            if (key === "interestRateMin" || key === "interestRateMax") {
              displayValue = `${value}%`;
              displayKey = key === "interestRateMin" ? "Min Rate" : "Max Rate";
            } else if (key === "minLoanAmount" || key === "maxLoanAmount") {
              displayValue = formatCurrency(value as number);
              displayKey =
                key === "minLoanAmount" ? "Min Amount" : "Max Amount";
            } else if (typeof value === "number") {
              displayValue = value.toLocaleString();
            }

            return (
              <Badge
                key={key}
                variant="secondary"
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span className="text-xs font-medium">
                  {displayKey.replace(/([A-Z])/g, " $1").trim()}: {displayValue}
                </span>
                <button
                  onClick={() => handleRemoveFilter(key as keyof FilterValues)}
                  className="ml-2 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
