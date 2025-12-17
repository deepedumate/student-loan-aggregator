import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Footer } from "@/components/edu-loan-guide/Footer";
import { InterestedModal } from "@/components/edu-loan-guide/InterestedModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  User,
  Star,
  TrendingUp,
  Shield,
  Phone,
  Mail,
  Globe,
  Award,
  Heart,
  Loader2,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { AppDispatch } from "@/store";
import {
  selectSelectedLoanProduct,
  selectIsLoadingDetails,
  selectDetailsError,
  fetchLoanProductDetails,
  selectLoanProducts,
} from "@/store/slices/loanProductSlice";
import { updateUser } from "@/store/slices/contactAuthSlice";
import { useAppSelector } from "@/store/hooks";

const FAVORITES_STORAGE_KEY = "loan-favorites";

export default function LoanDetails() {
  const { id } = useParams<{ id: string }>();
  console.log("LoanDetails rendering with id:", id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loan = useSelector(selectSelectedLoanProduct);
  const isLoading = useSelector(selectIsLoadingDetails);
  const error = useSelector(selectDetailsError);
  const contactAuth = useSelector(
    (state: any) => state.contactAuth?.data?.student || null
  );

  console.log("loan", loan);

  const [favoriteLoanIds, setFavoriteLoanIds] = useState<string[]>([]);
  const [showInterestedModal, setShowInterestedModal] = useState(false);

  // Get user's interested and favorites from contactAuth
  const userInterested = contactAuth?.interested || [];
  const userFavorites = contactAuth?.favourite || [];

  // Fetch loan details
  useEffect(() => {
    if (id) {
      dispatch(fetchLoanProductDetails(parseInt(id)));
    }
  }, [id, dispatch]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavoriteLoanIds(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteLoanIds)
    );
  }, [favoriteLoanIds]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Loading loan details...
            </h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !loan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Loan Not Found
            </h2>
            <p className="text-gray-600 dark:text-muted-foreground">
              {error || "The loan you're looking for doesn't exist."}
            </p>
            <Button
              onClick={() => navigate("/loan-offers")}
              className="bg-white dark:bg-transparent border-gray-300 dark:border-border text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-primary/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Loans
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Extract data from API response with comprehensive null safety
  const lenderName =
    loan.lender_name || loan.lender?.lender_name || "Unknown Lender";
  const productName =
    loan.product_display_name || loan.product_name || "Education Loan";
  const description =
    loan.product_description || "Comprehensive education loan solution";

  const interestRate = parseFloat(
    loan.financial_terms?.interest_rate_range_min || "0"
  );
  const maxLoanAmountValue = parseFloat(
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
  const processingTime =
    loan.processing_details?.disbursement_timeline || "5-7 business days";

  const rating = Math.round(
    parseFloat(loan.performance_metrics?.customer_satisfaction_rating || "0")
  );

  // Check if loan is interested
  const isInterested = loan ? userInterested.includes(loan.id) : false;

  // Build features array dynamically
  let features: string[] = [];
  if (
    loan.key_features &&
    Array.isArray(loan.key_features) &&
    loan.key_features.length > 0
  ) {
    features = [...loan.key_features];
  } else {
    // Add default features if key_features is empty, null, or undefined
    features = [
      "Competitive interest rates",
      "Flexible repayment",
      "Quick approval",
    ];
  }

  // Build eligibility criteria
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
  if (loan.eligibility_criteria?.co_applicant_required) {
    eligibilityCriteria.push(
      `Co-applicant: ${loan.eligibility_criteria.co_applicant_required}`
    );
  }
  if (loan.eligibility_criteria?.entrance_exam_required) {
    eligibilityCriteria.push(
      `Entrance exam: ${loan.eligibility_criteria.entrance_exam_required}`
    );
  }

  // Build required documents with better handling
  const requiredDocuments: string[] = [];
  if (loan.processing_details?.mandatory_documents) {
    const docs =
      typeof loan.processing_details.mandatory_documents === "string"
        ? loan.processing_details.mandatory_documents
            .split(";")
            .map((d) => d.trim())
            .filter((d) => d)
        : Array.isArray(loan.processing_details.mandatory_documents)
        ? loan.processing_details.mandatory_documents
        : [];
    requiredDocuments.push(...docs);
  }

  // Build terms and conditions
  const termsAndConditions: string[] = [];
  if (loan.financial_terms?.interest_rate_type) {
    termsAndConditions.push(
      `Interest rate type: ${loan.financial_terms.interest_rate_type}`
    );
  }
  if (loan.repayment_terms?.late_payment_charges) {
    termsAndConditions.push(
      `Late payment charges: ${loan.repayment_terms.late_payment_charges}`
    );
  }
  if (loan.special_features?.grace_period_benefits) {
    termsAndConditions.push(loan.special_features.grace_period_benefits);
  }
  if (loan.repayment_terms?.prepayment_allowed === "Yes") {
    termsAndConditions.push("Early repayment allowed");
    if (loan.repayment_terms?.prepayment_charges) {
      termsAndConditions.push(
        `Prepayment charges: ${loan.repayment_terms.prepayment_charges}`
      );
    }
  }
  if (loan.collateral_security?.guarantor_required) {
    termsAndConditions.push(
      `Guarantor required: ${loan.collateral_security.guarantor_required}`
    );
  }
  if (loan.special_features?.tax_benefits_available === "Yes") {
    termsAndConditions.push("Tax benefits available under Section 80E");
  }
  if (loan.repayment_terms?.moratorium_type) {
    termsAndConditions.push(
      `Moratorium type: ${loan.repayment_terms.moratorium_type}`
    );
  }
  if (loan.financial_terms?.margin_money_percentage) {
    termsAndConditions.push(
      `Margin money: ${loan.financial_terms.margin_money_percentage}%`
    );
  }

  // Build features array dynamically
  let applicationSteps: string[] = [];
  if (
    loan.application_process &&
    Array.isArray(loan.application_process) &&
    loan.application_process.length > 0
  ) {
    applicationSteps = [...loan.application_process];
  } else {
    // Add default features if key_features is empty, null, or undefined
    applicationSteps = [
      "Complete online application form with personal and academic details",
      "Upload required documents and verification materials",
      `Initial review and pre-approval within ${processingTime}`,
      "Verification call and document authentication",
      "Final approval and loan agreement signing",
      "Disbursement to educational institution",
    ];
  }

  // Build additional features
  const additionalFeatures = [
    {
      icon: "shield",
      title:
        loan.collateral_security?.insurance_required || "Secure & Protected",
      description:
        loan.special_features?.customer_support_features ||
        "Bank-level security for all your data",
    },
    {
      icon: "award",
      title: "Quality Service",
      description: loan.performance_metrics?.approval_rate
        ? `${loan.performance_metrics.approval_rate}% approval rate`
        : "High approval rate",
    },
    {
      icon: "clock",
      title: "Fast Processing",
      description: processingTime || "Quick processing",
    },
  ];

  // Mock reviews
  const reviews = [
    {
      id: "1",
      userName: "Verified Student",
      rating: rating || 4,
      date: new Date().toISOString().split("T")[0],
      comment: `Great experience with ${lenderName}. The application process was smooth and professional.`,
      helpful: 12,
    },
  ];
  const averageRating = rating || 4;

  // Handle interested button click
  const handleInterested = async () => {
    if (!loan) return;

    const loanProductId = loan.id;

    // ===== STEP 1: Check if user has email =====
    if (!contactAuth || !contactAuth.email) {
      // No email - open modal to collect details
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
            description: `${lenderName} has been removed from your interested list.`,
          });
        } else {
          toast.success("Interest Recorded! ✓", {
            description: `We'll contact you about ${lenderName} soon.`,
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

  const handleToggleFavorite = async () => {
    if (!loan) return;

    const loanProductId = loan.id;

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
            description: `${lenderName} has been removed from your favourite.`,
          });
        } else {
          toast.success("Added to favorites! ❤️", {
            description: `${lenderName} has been added to your favourite for easy access.`,
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

  const isFavorite = loan ? userFavorites.includes(loan.id) : false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col relative z-10 mx-auto pt-16 sm:pt-28 lg:pt-16 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-primary/10 dark:via-background dark:to-accent/10 border-b border-gray-200 dark:border-border/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <Button
            variant="default"
            onClick={() => navigate("/loan-offers")}
            className="mb-4
    text-gray-700 dark:text-foreground
    bg-white/80                 /* Light mode visible background */
    dark:bg-transparent
    border border-gray-300/60   /* LIGHT MODE BORDER */
    hover:bg-gray-100
    dark:hover:bg-primary/10
    shadow-sm text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Loans
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-gray-100 dark:bg-secondary text-gray-900 dark:text-secondary-foreground"
                >
                  {loan.product_status || "Featured Lender"}
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-accent text-accent"
                          : "text-gray-300 dark:text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-muted-foreground ml-1">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                {lenderName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-muted-foreground">
                {description}
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  size="lg"
                  onClick={handleInterested}
                  className={`shadow-lg hover:shadow-xl transition-all ${
                    isInterested
                      ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                      : "bg-gradient-to-r from-accent to-accent-light text-white"
                  }`}
                >
                  {isInterested ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Interested
                    </>
                  ) : (
                    "Show Interest"
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleToggleFavorite}
                  className="text-gray-700 dark:text-foreground
    bg-white/80                 /* Light mode visible background */
    dark:bg-transparent
    border border-gray-300/60   /* LIGHT MODE BORDER */
    hover:bg-gray-100
    dark:hover:bg-primary/10
    shadow-sm text-foreground"
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isFavorite ? "fill-accent text-accent" : ""
                    }`}
                  />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
              </div>
            </div>

            {/* Key Metrics Card */}
            <Card className="border-2 border-gray-200 dark:border-border shadow-lg bg-white dark:bg-card">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Loan Overview
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-muted-foreground">
                  Key terms and conditions at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Interest Rate
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {interestRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Max Amount
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-accent">
                    ₹{(maxLoanAmountValue / 100000).toFixed(1)}L
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-success/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-success" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Repayment Period
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600 dark:text-success">
                    {repaymentPeriod}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Processing Fee
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {processingFee}%
                  </span>
                </div>

                <Separator className="bg-gray-200 dark:bg-border" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-muted-foreground">
                      Processing Time
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {processingTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-muted-foreground">
                      Grace Period
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {loan.repayment_terms?.moratorium_period || 6} months
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="flex flex-wrap w-full h-auto bg-white dark:bg-muted border border-gray-200 dark:border-border">
            <TabsTrigger
              value="overview"
              className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-gray-700 dark:text-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="eligibility"
              className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-gray-700 dark:text-foreground"
            >
              Eligibility
            </TabsTrigger>
            <TabsTrigger
              value="application"
              className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-gray-700 dark:text-foreground"
            >
              Application
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {features.length > 0 && (
              <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-muted/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Additional Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {additionalFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg border border-gray-200 dark:border-border/50 bg-white dark:bg-card"
                    >
                      {feature.icon === "shield" && (
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                      )}
                      {feature.icon === "award" && (
                        <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
                      )}
                      {feature.icon === "clock" && (
                        <Clock className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-success" />
                      )}
                      <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility Tab */}
          <TabsContent value="eligibility" className="space-y-6">
            <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Eligibility Requirements
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-muted-foreground">
                  Make sure you meet these criteria before applying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eligibilityCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-border/50"
                    >
                      <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {criteria}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {requiredDocuments.length > 0 && (
              <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Required Documents
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-muted-foreground">
                    Prepare these documents for a smooth application process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {requiredDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-muted/50"
                      >
                        <FileText className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-foreground">
                          {doc}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Application Tab */}
          <TabsContent value="application" className="space-y-6">
            <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Application Process
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-muted-foreground">
                  Follow these steps to complete your application in{" "}
                  {processingTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationSteps.map((step, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      {index < applicationSteps.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-border" />
                      )}
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="bg-gray-50 dark:bg-muted/50 rounded-lg p-4">
                        <p className="text-sm leading-relaxed text-gray-700 dark:text-foreground">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-card border-gray-200 dark:border-border">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Ready to Apply?
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-muted-foreground">
                  Start your application journey today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-primary/5 rounded-lg border border-blue-200 dark:border-primary/20">
                  <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Fast Approval
                    </p>
                    <p className="text-sm text-gray-600 dark:text-muted-foreground">
                      Most applications are reviewed within {processingTime}
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-accent to-accent-light text-white shadow-md hover:shadow-lg"
                  onClick={handleInterested}
                >
                  {isInterested ? "Interested" : "Show Interest"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Interested Modal */}
      <InterestedModal
        open={showInterestedModal}
        onClose={() => setShowInterestedModal(false)}
        loan={loan}
      />
    </div>
  );
}
