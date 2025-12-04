import { useState, useEffect } from "react";
import {
  Filter,
  X,
  ChevronDown,
  Search,
  Save,
  Bookmark,
  Trash2,
} from "lucide-react";
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

const STUDY_LEVELS = [
  "Undergraduate",
  "Graduate - MBA",
  "Graduate - Masters",
  "PhD",
];

const STATUS_OPTIONS = [
  "Applied",
  "Not Applied",
  "Admitted",
  "Rejected",
  "Waitlisted",
  "Enrolled",
];

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
  const [hasAutoPopulated, setHasAutoPopulated] = useState(false);

  const chat = useAppSelector((state) => state.chat);
  console.log("Chat state in LoanFilters:", chat);

  // Auto-populate filters from chat data on mount
  useEffect(() => {
    // Only run once when component mounts and chat data is available
    if (!chat || hasAutoPopulated) return;

    const autoFilters: FilterValues = {};
    let hasData = false;

    // Helper function to convert numeric month to month name
    const getMonthName = (monthNum: number): string => {
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
      return monthNames[monthNum - 1] || "";
    };

    // Extract intake period from intendedMonth/intendedYear (priority)
    if (chat.formData?.intendedMonth) {
      const monthNum =
        typeof chat.formData.intendedMonth === "number"
          ? chat.formData.intendedMonth
          : parseInt(chat.formData.intendedMonth);
      if (monthNum >= 1 && monthNum <= 12) {
        autoFilters.intakeMonth = getMonthName(monthNum);
        hasData = true;
      }
    }

    if (chat.formData?.intendedYear) {
      autoFilters.intakeYear = chat.formData.intendedYear.toString();
      hasData = true;
    }

    // Extract study level from formData with proper formatting
    if (chat.formData?.studyLevel) {
      let studyLevel = chat.formData.studyLevel.toLowerCase();

      // Handle different study level formats to match dropdown values
      // The dropdown uses: undergraduate, graduate_-_mba, graduate_-_masters, phd
      if (studyLevel.includes("masters")) {
        studyLevel = "graduate_-_masters";
      } else if (studyLevel.includes("mba")) {
        studyLevel = "graduate_-_mba";
      } else if (studyLevel.includes("phd") || studyLevel.includes("ph.d")) {
        studyLevel = "phd";
      } else if (
        studyLevel.includes("undergraduate") ||
        studyLevel.includes("undergrad")
      ) {
        studyLevel = "undergraduate";
      }

      autoFilters.studyLevel = studyLevel;
      hasData = true;
    }

    // Extract school name from multiple possible sources (priority order)
    if (chat.programData?.data?.university_name) {
      autoFilters.school = chat.programData.data.university_name;
      hasData = true;
    } else if (chat.universitySuggestions?.[0]?.name) {
      autoFilters.school = chat.universitySuggestions[0].name;
      hasData = true;
    } else if (chat.formData?.universityName) {
      autoFilters.school = chat.formData.universityName;
      hasData = true;
    }

    // Extract program name from multiple sources (priority order)
    if (chat.formData?.program?.program_name) {
      autoFilters.program = chat.formData.program.program_name;
      hasData = true;
    } else if (chat.programData?.data?.program_name) {
      autoFilters.program = chat.programData.data.program_name;
      hasData = true;
    } else if (chat.formData?.program?.programName) {
      autoFilters.program = chat.formData.program.programName;
      hasData = true;
    }

    // Extract admission status from multiple sources
    if (chat.formData?.admitStatus) {
      autoFilters.status = chat.formData.admitStatus
        .toLowerCase()
        .replace(/\s+/g, "_");
      hasData = true;
    } else if (chat.formData?.admitStatus) {
      autoFilters.status = chat.formData.admitStatus
        .toLowerCase()
        .replace(/\s+/g, "_");
      hasData = true;
    } else if (
      chat.step === "verified" ||
      chat.isOtherProgramSelected === false
    ) {
      // If step is verified or they selected a program from suggestions, likely admitted
      autoFilters.status = "admitted";
      hasData = true;
    }

    // Extract financial data from costBreakdown
    // Convert tuition to number (remove $ and commas)
    if (chat.formData?.program?.total_tuition) {
      const tuition = parseFloat(chat.formData.program.total_tuition);
      if (!isNaN(tuition) && tuition > 0) {
        autoFilters.totalTuitionFee = Math.round(tuition);
        hasData = true;
      }
    }

    // Convert living costs to number
    if (chat.formData?.program?.total_cost_of_living) {
      const living = parseFloat(chat.formData.program.total_cost_of_living);
      if (!isNaN(living) && living > 0) {
        autoFilters.totalCostOfLiving = Math.round(living);
        hasData = true;
      }
    }

    // Only update if we have some filters to apply and haven't already populated
    if (hasData && Object.keys(autoFilters).length > 0) {
      console.log("Auto-populating filters with:", autoFilters);

      // Mark as populated BEFORE calling onFilterChange to prevent re-runs
      setHasAutoPopulated(true);

      // Call the filter change handler
      onFilterChange(autoFilters);

      // Show a toast notification
      toast.success(
        `Auto-filled ${Object.keys(autoFilters).length} filter${
          Object.keys(autoFilters).length !== 1 ? "s" : ""
        } from your conversation`,
        {
          description: "You can adjust these filters as needed",
          duration: 4000,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]); // Run when chat state changes

  const handleClearAll = () => {
    onFilterChange({});
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

    // Convert component filters (camelCase) to API filters (snake_case)
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
              {/* Save Preset Section */}
              {appliedFiltersCount > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-foreground">
                        Save Current Filters
                      </span>
                    </div>
                  </div>
                  {showSavePreset ? (
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder="Enter preset name..."
                        value={presetName}
                        onChange={(e) => setPresetName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSavePreset();
                          }
                        }}
                        className="h-10 rounded-lg bg-card border-border/50 focus:border-accent transition-all"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSavePreset}
                          size="sm"
                          className="flex-1 h-9 bg-gradient-to-r from-accent to-accent-light hover:from-accent hover:to-accent text-accent-foreground"
                        >
                          Save Preset
                        </Button>
                        <Button
                          onClick={() => {
                            setShowSavePreset(false);
                            setPresetName("");
                          }}
                          size="sm"
                          variant="outline"
                          className="h-9"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowSavePreset(true)}
                      size="sm"
                      variant="outline"
                      className="w-full h-9 border-accent/40 hover:bg-accent/10 hover:border-accent/60"
                    >
                      <Save className="w-3.5 h-3.5 mr-2" />
                      Save as Preset
                    </Button>
                  )}
                </div>
              )}

              {/* Intake Period */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Intake Period
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Select
                      value={filters.intakeMonth}
                      onValueChange={(value) =>
                        onFilterChange({ ...filters, intakeMonth: value })
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
                  </div>
                  <div>
                    <Select
                      value={filters.intakeYear}
                      onValueChange={(value) =>
                        onFilterChange({ ...filters, intakeYear: value })
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
              </div>

              {/* Study Level */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Study Level
                </Label>
                <Select
                  value={filters.studyLevel}
                  onValueChange={(value) =>
                    onFilterChange({ ...filters, studyLevel: value })
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                  <SelectContent>
                    {STUDY_LEVELS.map((level) => (
                      <SelectItem
                        key={level}
                        value={level.toLowerCase().replace(/\s+/g, "_")}
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Application Status */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Application Status
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    onFilterChange({ ...filters, status: value })
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem
                        key={status}
                        value={status.toLowerCase().replace(/\s+/g, "_")}
                      >
                        {status}
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
                  value={filters.school || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, school: e.target.value })
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
                  value={filters.program || ""}
                  onChange={(e) =>
                    onFilterChange({ ...filters, program: e.target.value })
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
                    value={filters.minLoanAmount || ""}
                    onChange={(e) =>
                      onFilterChange({
                        ...filters,
                        minLoanAmount: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                  <Input
                    type="number"
                    placeholder="Max Amount"
                    value={filters.maxLoanAmount || ""}
                    onChange={(e) =>
                      onFilterChange({
                        ...filters,
                        maxLoanAmount: parseInt(e.target.value) || undefined,
                      })
                    }
                    className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Financial Details */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Tuition Fee
                </Label>
                <Input
                  type="number"
                  placeholder="Enter total tuition fee"
                  value={filters.totalTuitionFee || ""}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      totalTuitionFee: parseInt(e.target.value) || undefined,
                    })
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
                  value={filters.totalCostOfLiving || ""}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      totalCostOfLiving: parseInt(e.target.value) || undefined,
                    })
                  }
                  className="h-11 rounded-lg bg-card border-border/50 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="flex-1 h-11 rounded-lg border-border/50 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive transition-all duration-300"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
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

      {/* Active Filters Display */}
      {appliedFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || key === "searchQuery") return null;

            // Format the display value
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
