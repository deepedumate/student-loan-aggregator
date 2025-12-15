import { useState, useEffect, useRef } from "react";
import { Filter, X, Search, Save, Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
export interface FilterValues {
  intakeMonth?: string;
  intakeYear?: string;
  studyLevel?: string;
  status?: string;
  school?: string;
  program?: string;
  minLoanAmount?: number;
  maxLoanAmount?: number;
  totalTuitionFee?: number;
  totalCostOfLiving?: number;
  supportedCountries?: string;
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

const MONTHS = [
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

const SUPPORTED_COUNTRIES = ["USA", "India", "Non USA"];

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
  const [showSavePreset, setShowSavePreset] = useState(false);
  const [showPresetsList, setShowPresetsList] = useState(false);
  const hasAutoPopulated = useRef(false);
  const contact = useAppSelector(
    (state: any) => state.contactAuth?.data?.contact || null
  );

  // ✅ LOCAL STATE for pending filters (not applied yet)
  const [pendingFilters, setPendingFilters] = useState<FilterValues>(filters);

  // ✅ Sync pending filters with applied filters when they change externally
  useEffect(() => {
    if (isOpen) {
      setPendingFilters(filters);
    }
  }, [filters, isOpen]);

  // ✅ Helper to convert month name to lowercase format
  const normalizeMonthName = (month: string | number): string | undefined => {
    // If it's already lowercase month name, return it
    if (typeof month === "string") {
      const lowercased = month.toLowerCase();
      const validMonths = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

      if (validMonths.includes(lowercased)) {
        return lowercased;
      }
    }

    // If it's a number (1-12), convert to month name
    if (typeof month === "number" || !isNaN(Number(month))) {
      const monthNum = typeof month === "number" ? month : parseInt(month);
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      if (monthNum >= 1 && monthNum <= 12) {
        return monthNames[monthNum - 1];
      }
    }

    return undefined;
  };

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

    return level; // Return original if no match
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

    // Extract intake month (handle both string name and number)
    if (contact.intake_month) {
      const normalizedMonth = normalizeMonthName(contact.intake_month);
      if (normalizedMonth) {
        autoFilters.intakeMonth = normalizedMonth;
        hasData = true;
      }
    }

    // Extract intake year
    if (contact.intake_year) {
      autoFilters.intakeYear = contact.intake_year.toString();
      hasData = true;
    }

    // Extract study level
    if (contact.target_degree_level) {
      const normalizedLevel = normalizeStudyLevel(contact.target_degree_level);
      if (normalizedLevel) {
        autoFilters.studyLevel = normalizedLevel;
        hasData = true;
      }
    }

    // Extract supported countries from preferred study destination
    if (contact.preferred_study_destination) {
      const mappedCountry = mapStudyDestinationToFilter(
        contact.preferred_study_destination
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

  // ✅ Handle pending filter changes (update local state only)
  const handlePendingFilterChange = (key: keyof FilterValues, value: any) => {
    setPendingFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Apply filters when button is clicked
  const handleApplyFilters = () => {
    onFilterChange(pendingFilters);
    setIsOpen(false);
    toast.success("Filters applied successfully");
  };

  // ✅ Clear all filters
  const handleClearAll = () => {
    const clearedFilters: FilterValues = {
      searchQuery: pendingFilters.searchQuery,
    };
    setPendingFilters(clearedFilters);
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

    if (filters.intakeMonth) apiFilters.intake_month = filters.intakeMonth;
    if (filters.intakeYear)
      apiFilters.intake_year = parseInt(filters.intakeYear);
    if (filters.studyLevel) apiFilters.study_level = filters.studyLevel;
    if (filters.school) apiFilters.school_name = filters.school;
    if (filters.program) apiFilters.program_name = filters.program;
    if (filters.minLoanAmount)
      apiFilters.loan_amount_min = filters.minLoanAmount;
    if (filters.maxLoanAmount)
      apiFilters.loan_amount_max = filters.maxLoanAmount;
    if (filters.totalTuitionFee)
      apiFilters.total_tuition_fee = filters.totalTuitionFee;
    if (filters.totalCostOfLiving)
      apiFilters.cost_of_living = filters.totalCostOfLiving;

    onSavePreset(presetName.trim(), apiFilters);
    setPresetName("");
    setShowSavePreset(false);
  };

  const handleLoadPreset = (preset: FilterPreset) => {
    onLoadPreset(preset);
    setShowPresetsList(false);
  };

  const handleDeletePreset = (presetId: string, presetName: string) => {
    onDeletePreset(presetId);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

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
        <div className="preset-actions">
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
        </div>

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
              {/* Intake Period */}
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

              {/* School */}
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

              {/* Program */}
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

              {/* Loan Amount Range */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Loan Amount Range
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min Amount"
                    value={pendingFilters.minLoanAmount || ""}
                    onChange={(e) =>
                      handlePendingFilterChange(
                        "minLoanAmount",
                        parseInt(e.target.value) || undefined
                      )
                    }
                    className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  <Input
                    type="number"
                    placeholder="Max Amount"
                    value={pendingFilters.maxLoanAmount || ""}
                    onChange={(e) =>
                      handlePendingFilterChange(
                        "maxLoanAmount",
                        parseInt(e.target.value) || undefined
                      )
                    }
                    className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Total Tuition Fee */}
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

              {/* Total Cost of Living */}
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

              {/* ✅ Action Buttons - Apply filters on click */}
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

      {/* Presets List Dropdown - unchanged */}
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
                    onClick={() => handleDeletePreset(preset.id, preset.name)}
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

      {/* Active Filters Display - unchanged */}
      {appliedFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || key === "searchQuery") return null;

            let displayValue = value;
            if (typeof value === "number") {
              displayValue = value.toLocaleString();
            }

            return (
              <Badge
                key={key}
                variant="secondary"
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span className="text-xs font-medium">
                  {key.replace(/([A-Z])/g, " $1").trim()}: {displayValue}
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
