import { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { LoanCard } from "@/components/edu-loan-guide/LoanCard";
import { LoanCardSkeleton } from "@/components/edu-loan-guide/LoanCardSkeleton";
import {
  LoanFilters,
  FilterPreset,
} from "@/components/edu-loan-guide/LoanFilters";
import { LoanComparison } from "@/components/edu-loan-guide/LoanComparison";
import {
  SortControls,
  SortOptions,
} from "@/components/edu-loan-guide/SortControls";
import { InterestedModal } from "@/components/edu-loan-guide/InterestedModal";
import { ProductTour } from "@/components/edu-loan-guide/ProductTour";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  GraduationCap,
  TrendingUp,
  ArrowRight,
  X,
  Heart,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  selectLoanProducts,
  selectIsLoading,
  selectError,
  selectPagination,
  selectSort,
  selectSearch,
  selectFilters,
  selectSelectedLoanIds,
  selectSelectedLoans,
  selectFavoriteLoanIds,
  selectShowFavoritesOnly,
  selectAppliedFiltersCount,
  fetchLoanProducts,
  setFilters,
  setSearch,
  setSort,
  setPage,
  resetFilters,
  removeLoanFromComparison,
  addLoanToComparison,
  clearComparison,
  toggleShowFavoritesOnly,
} from "@/store/slices/loanProductSlice";
import { LoanProduct, LoanProductFilters } from "@/types/loanProduct";
import { fetchLenders, selectLenders } from "@/store/slices/lenderSlice";
import { updateUser } from "@/store/slices/contactAuthSlice";

export default function LoanList() {
  const dispatch = useAppDispatch();

  // Redux state
  const loans = useAppSelector(selectLoanProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const pagination = useAppSelector(selectPagination);
  const sort = useAppSelector(selectSort);
  const search = useAppSelector(selectSearch);
  const filters = useAppSelector(selectFilters);
  const selectedLoanIds = useAppSelector(selectSelectedLoanIds);
  const selectedLoans = useAppSelector(selectSelectedLoans);
  const favoriteLoanIds = useAppSelector(selectFavoriteLoanIds);
  const showFavoritesOnly = useAppSelector(selectShowFavoritesOnly);
  const appliedFiltersCount = useAppSelector(selectAppliedFiltersCount);
  const contactAuth = useAppSelector(
    (state: any) => state.contactAuth?.data?.student || null
  );
  const lenders = useAppSelector(selectLenders);
  const userFavorites = contactAuth?.favourite || [];
  const userInterested = contactAuth?.interested || [];

  // Local UI state only (no persistence)
  const [showComparison, setShowComparison] = useState(false);
  const [showInterestedModal, setShowInterestedModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [presets, setPresets] = useState<FilterPreset[]>([]); // Runtime only, no persistence
  const previousSearch = useRef(search);
  // Debounce timer ref
  const searchDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if only search changed
    const searchChanged = previousSearch.current !== search;
    previousSearch.current = search;

    // Clear any existing timer
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }

    // If ONLY search changed AND it's not empty, debounce it
    if (searchChanged && search !== "") {
      searchDebounceTimer.current = setTimeout(() => {
        dispatch(fetchLoanProducts());
      }, 500); // 500ms debounce for search
    } else {
      // For everything else (filters, sort, pagination) or empty search, fetch immediately
      dispatch(fetchLoanProducts());
    }

    // Cleanup
    return () => {
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }
    };
  }, [
    dispatch,
    pagination.page,
    pagination.size,
    sort,
    filters,
    search,
    showFavoritesOnly,
  ]);

  useEffect(() => {
    dispatch(fetchLenders());
  }, []);

  // Convert filters to component format
  const componentFilters = useMemo(() => {
    return {
      intakeMonth: filters.intake_month,
      intakeYear: filters.intake_year?.toString(),
      studyLevel: filters.study_level,
      school: filters.school_name,
      program: filters.program_name,
      minLoanAmount: filters.loan_amount_min,
      maxLoanAmount: filters.loan_amount_max,
      totalTuitionFee: filters.total_tuition_fee,
      totalCostOfLiving: filters.cost_of_living,
      searchQuery: search,
    };
  }, [filters, search]);

  // Convert component filters back to API format
  const handleComponentFilterChange = (newFilters: any) => {
    const apiFilters: LoanProductFilters = {};

    if (newFilters.intakeMonth)
      apiFilters.intake_month = newFilters.intakeMonth;
    if (newFilters.intakeYear)
      apiFilters.intake_year = parseInt(newFilters.intakeYear);
    if (newFilters.studyLevel) apiFilters.study_level = newFilters.studyLevel;
    if (newFilters.school) apiFilters.school_name = newFilters.school;
    if (newFilters.program) apiFilters.program_name = newFilters.program;
    if (newFilters.minLoanAmount)
      apiFilters.loan_amount_min = newFilters.minLoanAmount;
    if (newFilters.maxLoanAmount)
      apiFilters.loan_amount_max = newFilters.maxLoanAmount;
    if (newFilters.totalTuitionFee)
      apiFilters.total_tuition_fee = newFilters.totalTuitionFee;
    if (newFilters.totalCostOfLiving)
      apiFilters.cost_of_living = newFilters.totalCostOfLiving;

    dispatch(setFilters(apiFilters));

    // Handle search separately for debouncing
    if (newFilters.searchQuery !== search) {
      dispatch(setSearch(newFilters.searchQuery || ""));
    }
  };

  // Convert sort options
  const componentSortOptions = useMemo(
    () => ({
      field: sort.sortKey,
      direction: sort.sortDir,
    }),
    [sort]
  );

  const handleSortChange = (sortOptions: SortOptions) => {
    dispatch(
      setSort({
        sortKey: sortOptions.field as any,
        sortDir: sortOptions.direction,
      })
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage({ page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAllFilters = () => {
    dispatch(resetFilters());
  };

  // Preset management (runtime only - no localStorage)
  const handleSavePreset = (name: string, filterValues: LoanProductFilters) => {
    const newPreset: FilterPreset = {
      id: Date.now().toString(),
      name,
      filters: filterValues,
      createdAt: new Date().toISOString(),
    };
    setPresets([...presets, newPreset]);
    toast.success(`Preset "${name}" saved`, {
      description: "Note: Presets are cleared on page refresh",
    });
  };

  const handleLoadPreset = (preset: FilterPreset) => {
    dispatch(setFilters(preset.filters));
    toast.success(`Preset "${preset.name}" loaded`);
  };

  const handleDeletePreset = (presetId: string) => {
    setPresets(presets.filter((p) => p.id !== presetId));
    toast.success("Preset deleted");
  };

  const handleInterested = async (loanId: string) => {
    const loan = loans.find((l) => l.id.toString() === loanId);
    const loanProductId = parseInt(loanId, 10);

    // ===== STEP 1: Check if user has email =====
    if (!contactAuth || !contactAuth.email) {
      // No email - open modal to collect details
      setSelectedLoan(loan);
      setShowInterestedModal(true);
      return;
    }

    // ===== STEP 2: User has email - toggle interested status directly =====
    const currentInterested = contactAuth.interested || [];
    const isAlreadyInterested = currentInterested.includes(loanProductId);

    // Create new interested array
    let newInterested: number[];
    if (isAlreadyInterested) {
      // Remove from interested
      newInterested = currentInterested.filter(
        (id: number) => id !== loanProductId
      );
    } else {
      // Add to interested
      newInterested = [...currentInterested, loanProductId];
    }

    console.log("Updating interested:", {
      userId: contactAuth.id,
      currentInterested,
      newInterested,
      loanProductId,
      action: isAlreadyInterested ? "REMOVE" : "ADD",
    });

    try {
      // Call update API
      const result = await dispatch(
        updateUser({
          userId: contactAuth.id.toString(),
          payload: {
            studentId: contactAuth.id,
            interested: newInterested,
          },
        }) as any
      );

      if (result.payload) {
        // Show success toast
        if (isAlreadyInterested) {
          toast.success("Removed from interested", {
            description: `${loan?.lender_name} has been removed from your interested list.`,
          });
        } else {
          toast.success("Interest Recorded! ✓", {
            description: `We'll contact you about ${loan?.lender_name} soon.`,
          });
        }
      } else {
        throw new Error("Failed to update interest");
      }
    } catch (error: any) {
      console.error("Failed to update interest:", error);
      toast.error("Failed to update interest", {
        description: error.message || "Please try again later.",
      });
    }
  };

  const handleCompare = (loanId: string) => {
    if (selectedLoanIds.includes(loanId)) {
      dispatch(removeLoanFromComparison(loanId));
      toast.info("Loan removed from comparison");
    } else if (selectedLoanIds.length >= 4) {
      toast.error("You can compare up to 4 loans at a time");
    } else {
      dispatch(addLoanToComparison(loanId));
      toast.success("Loan added to comparison");
    }
  };

  const handleRemoveFromComparison = (loanId: string) => {
    dispatch(removeLoanFromComparison(loanId));
  };

  const handleOpenComparison = () => {
    if (selectedLoanIds.length < 2) {
      toast.error("Select at least 2 loans to compare");
      return;
    }
    setShowComparison(true);
  };

  const handleClearSelection = () => {
    dispatch(clearComparison());
    toast.info("Selection cleared", {
      description: "All loans removed from comparison.",
    });
  };

  const handleToggleFavorite = async (loanId: string) => {
    const loan = loans.find((l) => l.id.toString() == loanId);
    const loanProductId = parseInt(loanId, 10);

    // Check if user is logged in
    if (!contactAuth || !contactAuth.id) {
      toast.error("Please log in first", {
        description: "You need to be logged in to save favorites.",
      });
      return;
    }

    // Get current favorites from contactAuth
    const currentFavorites = contactAuth.favourite || [];
    const isFavorite = currentFavorites.includes(loanProductId);

    // Create new favorites array
    let newFavorites: number[];
    if (isFavorite) {
      // Remove from favorites
      newFavorites = currentFavorites.filter(
        (id: number) => id !== loanProductId
      );
    } else {
      // Add to favorites
      newFavorites = [...currentFavorites, loanProductId];
    }

    console.log("Updating favorites:", {
      userId: contactAuth.id,
      currentFavorites,
      newFavorites,
      loanProductId,
      action: isFavorite ? "REMOVE" : "ADD",
    });

    try {
      // Call update API
      const result = await dispatch(
        updateUser({
          userId: contactAuth.id.toString(),
          payload: {
            studentId: contactAuth.id,
            favourite: newFavorites,
          },
        }) as any
      );

      if (result.payload) {
        // Show success toast
        if (isFavorite) {
          toast.success("Removed from favorites", {
            description: `${loan?.lender_name} has been removed from your favourite.`,
          });
        } else {
          toast.success("Added to favorites! ❤️", {
            description: `${loan?.lender_name} has been added to your favourite for easy access.`,
          });
        }
      } else {
        throw new Error("Failed to update favorites");
      }
    } catch (error: any) {
      console.error("Failed to update favorites:", error);
      toast.error("Failed to update favorites", {
        description: error.message || "Please try again later.",
      });
    }
  };

  const handleToggleShowFavorites = () => {
    dispatch(toggleShowFavoritesOnly());
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-lg">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-3">
                Find Your Perfect Education Loan
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Compare loans from top lenders, get personalized
                recommendations, and secure funding for your academic journey.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <p className="text-2xl font-bold text-primary">
                {isLoading ? "..." : pagination.total}
              </p>
              <p className="text-sm text-muted-foreground">Loan Products</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <p className="text-2xl font-bold text-accent">
                {isLoading ? "..." : lenders?.length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Lenders</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <p className="text-2xl font-bold text-success">
                {appliedFiltersCount}
              </p>
              <p className="text-sm text-muted-foreground">Filters Active</p>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <p className="text-2xl font-bold text-primary">
                {favoriteLoanIds.length}
              </p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 filter-section">
          <LoanFilters
            filters={componentFilters}
            onFilterChange={handleComponentFilterChange}
            appliedFiltersCount={appliedFiltersCount}
            presets={presets}
            onSavePreset={handleSavePreset}
            onLoadPreset={handleLoadPreset}
            onDeletePreset={handleDeletePreset}
          />
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4 sort-controls">
          <SortControls
            sortOptions={componentSortOptions}
            onSortChange={handleSortChange}
          />
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={handleToggleShowFavorites}
            className={`transition-all duration-300 hover:scale-105 group ${
              showFavoritesOnly
                ? "bg-gradient-to-r from-accent to-accent-light"
                : ""
            }`}
          >
            <Heart
              className={`w-4 h-4 mr-2 transition-all duration-300 group-hover:scale-125 ${
                showFavoritesOnly ? "fill-current animate-pulse" : ""
              }`}
            />
            {showFavoritesOnly
              ? `Favorites (${favoriteLoanIds.length})`
              : "Show Favorites"}
          </Button>
        </div>

        {/* Compare Button */}
        {selectedLoanIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-scale-in w-full max-w-md px-4 comparison-button">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleClearSelection}
                size="lg"
                variant="outline"
                className="h-16 w-16 rounded-2xl border-2 hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg group"
              >
                <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
              </Button>
              <div className="relative flex-1">
                <Button
                  onClick={handleOpenComparison}
                  size="lg"
                  className="w-full h-16 px-8 rounded-2xl bg-gradient-to-r from-accent via-accent-light to-accent hover:from-accent-light hover:via-accent hover:to-accent-light !text-white hover:!text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 text-lg border-2 border-accent/30 group"
                  style={{
                    boxShadow: `0 0 ${
                      20 + selectedLoanIds.length * 15
                    }px hsl(var(--accent) / ${
                      0.4 + selectedLoanIds.length * 0.15
                    }), 0 10px 40px -10px hsl(var(--accent) / ${
                      0.3 + selectedLoanIds.length * 0.1
                    })`,
                  }}
                >
                  <TrendingUp className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="transition-transform duration-300 group-hover:scale-105">
                    Compare {selectedLoanIds.length} Loan
                    {selectedLoanIds.length > 1 ? "s" : ""}
                  </span>
                  <ArrowRight className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Badge className="absolute -top-2 -right-2 h-8 px-3 text-sm font-bold bg-primary text-primary-foreground shadow-lg border-2 border-background animate-bounce-subtle">
                  {selectedLoanIds.length}/4
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Error handling */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div className="flex-1">
              <p className="font-semibold text-destructive">
                Error loading loans
              </p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
            <Button
              onClick={() => dispatch(fetchLoanProducts())}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Results Header */}
        {!isLoading && !error && (
          <div className="flex items-center justify-between mb-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold font-heading">
                {pagination.total} Loan Options Available
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {pagination.totalPages > 1 && (
                  <>
                    Showing {(pagination.page - 1) * pagination.size + 1}-
                    {Math.min(
                      pagination.page * pagination.size,
                      pagination.total
                    )}{" "}
                    of {pagination.total} •{" "}
                  </>
                )}
                Sorted by {sort.sortKey.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        )}

        {/* Loan Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(pagination.size)].map((_, index) => (
              <LoanCardSkeleton key={index} />
            ))}
          </div>
        ) : loans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {loans.map((loan, index) => (
                <div
                  key={loan.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <LoanCard
                    loan={loan}
                    onInterested={handleInterested}
                    onCompare={handleCompare}
                    onToggleFavorite={handleToggleFavorite}
                    isSelected={selectedLoanIds.includes(loan.id.toString())}
                    isFavorite={userFavorites.includes(loan.id)}
                    isInterested={userInterested.includes(loan.id)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 mb-8 flex justify-center animate-fade-in">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          pagination.page > 1 &&
                          handlePageChange(pagination.page - 1)
                        }
                        className={
                          pagination.page === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-primary/10 transition-colors"
                        }
                      />
                    </PaginationItem>

                    {pagination.page > 3 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(1)}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {pagination.page > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    )
                      .filter((page) => {
                        return (
                          page === pagination.page ||
                          page === pagination.page - 1 ||
                          page === pagination.page + 1 ||
                          (pagination.page <= 2 && page <= 3) ||
                          (pagination.page >= pagination.totalPages - 1 &&
                            page >= pagination.totalPages - 2)
                        );
                      })
                      .map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={pagination.page === page}
                            className={`cursor-pointer transition-all duration-300 ${
                              pagination.page === page
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "hover:bg-primary/10"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {pagination.page < pagination.totalPages - 2 && (
                      <>
                        {pagination.page < pagination.totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() =>
                              handlePageChange(pagination.totalPages)
                            }
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                          >
                            {pagination.totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          pagination.page < pagination.totalPages &&
                          handlePageChange(pagination.page + 1)
                        }
                        className={
                          pagination.page === pagination.totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer hover:bg-primary/10 transition-colors"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              No loans match your criteria
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more options
            </p>
            <Button
              onClick={handleClearAllFilters}
              variant="outline"
              className="border-primary/40 hover:bg-primary/5"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      <LoanComparison
        loans={selectedLoans}
        open={showComparison}
        onClose={() => setShowComparison(false)}
        onRemoveLoan={handleRemoveFromComparison}
        onInterested={handleInterested}
      />

      {/* Interested Modal */}
      <InterestedModal
        open={showInterestedModal}
        onClose={() => setShowInterestedModal(false)}
        loan={selectedLoan}
      />

      {/* Product Tour */}
      <ProductTour />

      {/* <Footer /> */}
    </div>
  );
}
