// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// // import { Header } from "@/components/edu-loan-guide/Header";
// import { Footer } from "@/components/edu-loan-guide/Footer";
// import { InterestedModal } from "@/components/edu-loan-guide/InterestedModal";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   AlertCircle,
//   Clock,
//   DollarSign,
//   Percent,
//   Calendar,
//   FileText,
//   User,
//   Star,
//   TrendingUp,
//   Shield,
//   Phone,
//   Mail,
//   Globe,
//   Award,
//   Heart,
// } from "lucide-react";
// import { LoanData } from "@/components/edu-loan-guide/LoanCard";
// import { toast } from "@/components/ui/sonner";

// const FAVORITES_STORAGE_KEY = "loan-favorites";
// const DUMMY_API_URL = "https://jsonplaceholder.typicode.com/posts";

// // Extended loan data with detailed information
// interface DetailedLoanData extends LoanData {
//   description: string;
//   termsAndConditions: string[];
//   applicationProcess: {
//     steps: string[];
//     requiredDocuments: string[];
//     processingTime: string;
//   };
//   reviews: {
//     id: string;
//     userName: string;
//     rating: number;
//     date: string;
//     comment: string;
//     helpful: number;
//   }[];
//   contactInfo: {
//     phone: string;
//     email: string;
//     website: string;
//   };
//   additionalFeatures: {
//     icon: string;
//     title: string;
//     description: string;
//   }[];
// }

// // Mock detailed loan data - in production, fetch from API
// const DETAILED_LOANS: Record<string, DetailedLoanData> = {
//   "1": {
//     id: "1",
//     lenderName: "Education Finance Corp",
//     interestRate: 6.5,
//     maxLoanAmount: 150000,
//     repaymentPeriod: "15 years",
//     processingFee: 1.5,
//     rating: 5,
//     features: [
//       "No collateral required",
//       "Flexible repayment options",
//       "Grace period of 6 months",
//       "Part-payment without penalties",
//     ],
//     eligibilityCriteria: [
//       "Valid admission letter required",
//       "Co-signer may be needed",
//       "Minimum credit score: 650",
//     ],
//     description:
//       "Education Finance Corp offers comprehensive student loan solutions designed to support your academic journey. With competitive rates and flexible terms, we've helped over 50,000 students achieve their educational dreams across 30+ countries.",
//     termsAndConditions: [
//       "Interest rates are variable and subject to market conditions",
//       "Early repayment is allowed without penalties after 12 months",
//       "Late payment fees: 2% of installment amount",
//       "Loan disbursement directly to educational institution",
//       "Grace period begins after course completion",
//       "Deferment options available for financial hardship",
//       "Annual interest rate review based on credit performance",
//       "Cosigner release available after 24 consecutive on-time payments",
//     ],
//     applicationProcess: {
//       steps: [
//         "Complete online application form with personal and academic details",
//         "Upload required documents and verification materials",
//         "Initial review and pre-approval within 48-72 hours",
//         "Verification call and document authentication",
//         "Final approval and loan agreement signing",
//         "Disbursement to educational institution within 5-7 business days",
//       ],
//       requiredDocuments: [
//         "Valid government-issued ID (passport/driver's license)",
//         "Official admission letter from educational institution",
//         "Academic transcripts and certificates",
//         "Proof of enrollment and tuition fee breakdown",
//         "Bank statements (last 6 months)",
//         "Employment proof for cosigner (if applicable)",
//         "Credit report authorization form",
//       ],
//       processingTime: "5-7 business days",
//     },
//     reviews: [
//       {
//         id: "1",
//         userName: "Sarah Johnson",
//         rating: 5,
//         date: "2024-11-15",
//         comment:
//           "Excellent service! The application process was smooth and the customer support team was incredibly helpful. Got approved within 3 days. Highly recommend for international students.",
//         helpful: 24,
//       },
//       {
//         id: "2",
//         userName: "Michael Chen",
//         rating: 5,
//         date: "2024-10-28",
//         comment:
//           "Best rates I could find for my MBA program. The flexible repayment options really helped me plan my finances better. No hidden fees!",
//         helpful: 18,
//       },
//       {
//         id: "3",
//         userName: "Priya Sharma",
//         rating: 4,
//         date: "2024-10-10",
//         comment:
//           "Good overall experience. The process was straightforward, though it took slightly longer than expected. Customer service was responsive and answered all my questions.",
//         helpful: 12,
//       },
//     ],
//     contactInfo: {
//       phone: "+1 (800) 555-0123",
//       email: "support@educationfinance.com",
//       website: "www.educationfinance.com",
//     },
//     additionalFeatures: [
//       {
//         icon: "shield",
//         title: "Secure & Encrypted",
//         description: "Bank-level security for all your data",
//       },
//       {
//         icon: "award",
//         title: "Award Winning",
//         description: "Best Student Loan Provider 2024",
//       },
//       {
//         icon: "clock",
//         title: "24/7 Support",
//         description: "Round-the-clock customer assistance",
//       },
//     ],
//   },
//   "2": {
//     id: "2",
//     lenderName: "Global Student Finance",
//     interestRate: 7.2,
//     maxLoanAmount: 125000,
//     repaymentPeriod: "12 years",
//     processingFee: 2.0,
//     rating: 4,
//     features: [
//       "Quick approval in 48 hours",
//       "No prepayment penalty",
//       "Online application process",
//       "Dedicated loan advisor",
//     ],
//     eligibilityCriteria: [
//       "Enrollment verification required",
//       "Proof of income or co-signer",
//       "Valid student visa",
//     ],
//     description:
//       "Global Student Finance specializes in fast-track education loans for international students. Our streamlined digital process and dedicated advisors ensure you get funding approval within 48 hours, so you never miss important enrollment deadlines.",
//     termsAndConditions: [
//       "Fixed interest rates locked at application",
//       "No penalties for early loan repayment",
//       "Automatic payment option available with 0.25% rate discount",
//       "Payment deferment available during studies",
//       "Loan tenure can be extended up to 15 years in special cases",
//       "Processing fee is waived for loan amounts above $75,000",
//       "Insurance coverage optional but recommended",
//       "Minimum monthly payment: $200",
//     ],
//     applicationProcess: {
//       steps: [
//         "Submit online pre-qualification form (5 minutes)",
//         "Receive preliminary approval and rate quote within 2 hours",
//         "Upload supporting documents through secure portal",
//         "Schedule video verification call with loan advisor",
//         "E-sign loan agreement with digital verification",
//         "Receive funds within 48 hours of final approval",
//       ],
//       requiredDocuments: [
//         "Passport and visa documentation",
//         "University acceptance letter with tuition breakdown",
//         "Recent academic records and test scores",
//         "Proof of address in home country",
//         "Co-signer income verification (if applicable)",
//         "Bank statements from last 3 months",
//         "Passport-size photographs",
//       ],
//       processingTime: "2-3 business days",
//     },
//     reviews: [
//       {
//         id: "1",
//         userName: "Ahmed Hassan",
//         rating: 5,
//         date: "2024-11-20",
//         comment:
//           "Lightning fast! Got approved in less than 36 hours. My advisor walked me through every step. Perfect for students who need quick funding.",
//         helpful: 31,
//       },
//       {
//         id: "2",
//         userName: "Emily Rodriguez",
//         rating: 4,
//         date: "2024-11-08",
//         comment:
//           "Very efficient process. The online portal is user-friendly. Interest rate is slightly higher than others, but the speed and service make up for it.",
//         helpful: 15,
//       },
//       {
//         id: "3",
//         userName: "Ravi Patel",
//         rating: 4,
//         date: "2024-10-22",
//         comment:
//           "Great customer service and quick turnaround. Had a few questions about the repayment terms, and they were very helpful in explaining everything clearly.",
//         helpful: 9,
//       },
//     ],
//     contactInfo: {
//       phone: "+1 (888) 765-4321",
//       email: "info@globalstudentfinance.com",
//       website: "www.globalstudentfinance.com",
//     },
//     additionalFeatures: [
//       {
//         icon: "clock",
//         title: "48-Hour Approval",
//         description: "Fastest approval in the industry",
//       },
//       {
//         icon: "shield",
//         title: "Digital Security",
//         description: "Encrypted document handling",
//       },
//       {
//         icon: "award",
//         title: "Expert Advisors",
//         description: "Personal guidance throughout",
//       },
//     ],
//   },
//   "3": {
//     id: "3",
//     lenderName: "Scholar Funding Solutions",
//     interestRate: 5.9,
//     maxLoanAmount: 200000,
//     repaymentPeriod: "20 years",
//     processingFee: 1.0,
//     rating: 5,
//     features: [
//       "Lowest interest rates",
//       "Interest-only payments while studying",
//       "Unemployment protection",
//       "Death and disability coverage",
//     ],
//     eligibilityCriteria: [
//       "Must be admitted to partner schools",
//       "Minimum GPA of 3.0",
//       "U.S. co-signer required for international students",
//     ],
//     description:
//       "Scholar Funding Solutions offers the most competitive rates in the market with comprehensive borrower protection. We partner with top-tier universities worldwide and provide flexible interest-only payment options during your study period, plus life and disability insurance coverage.",
//     termsAndConditions: [
//       "Interest rates are among the lowest in the industry",
//       "Interest-only payments available during enrollment period",
//       "Comprehensive unemployment protection included",
//       "Free life and disability insurance coverage",
//       "Grace period of 9 months post-graduation",
//       "No penalties for extra payments or early payoff",
//       "Annual rate reduction of 0.25% for on-time payments",
//       "Loan forgiveness programs for public service careers",
//     ],
//     applicationProcess: {
//       steps: [
//         "Verify eligibility with partner university status",
//         "Complete comprehensive application with academic history",
//         "Submit GPA verification and acceptance documentation",
//         "Co-signer approval and income verification",
//         "Underwriting review and credit assessment (7-10 days)",
//         "Final approval and detailed loan terms review",
//         "Insurance enrollment and disbursement authorization",
//       ],
//       requiredDocuments: [
//         "Official university acceptance letter",
//         "Complete academic transcripts with GPA verification",
//         "Government-issued photo identification",
//         "Co-signer financial documents and employment verification",
//         "Proof of enrollment and program cost breakdown",
//         "Tax returns for last 2 years (co-signer)",
//         "Insurance beneficiary designation form",
//       ],
//       processingTime: "7-10 business days",
//     },
//     reviews: [
//       {
//         id: "1",
//         userName: "Jennifer Martinez",
//         rating: 5,
//         date: "2024-11-18",
//         comment:
//           "Absolutely the best rates I could find anywhere! The interest-only payment option during my MBA was a lifesaver. Plus the insurance coverage gives great peace of mind.",
//         helpful: 42,
//       },
//       {
//         id: "2",
//         userName: "David Kim",
//         rating: 5,
//         date: "2024-11-05",
//         comment:
//           "Outstanding loan product. The 20-year repayment period keeps monthly payments manageable. The unemployment protection is a fantastic feature that other lenders don't offer.",
//         helpful: 28,
//       },
//       {
//         id: "3",
//         userName: "Sophia Williams",
//         rating: 5,
//         date: "2024-10-15",
//         comment:
//           "Premium service for premium schools. The comprehensive coverage and low rates make this the clear winner. Processing took a bit longer but worth the wait.",
//         helpful: 19,
//       },
//     ],
//     contactInfo: {
//       phone: "+1 (877) 234-5678",
//       email: "scholars@scholarfunding.com",
//       website: "www.scholarfundingsolutions.com",
//     },
//     additionalFeatures: [
//       {
//         icon: "shield",
//         title: "Full Protection",
//         description: "Life, disability & unemployment coverage",
//       },
//       {
//         icon: "award",
//         title: "Best Rates",
//         description: "Industry-leading low interest rates",
//       },
//       {
//         icon: "clock",
//         title: "Flexible Terms",
//         description: "Up to 20 years repayment",
//       },
//     ],
//   },
//   "4": {
//     id: "4",
//     lenderName: "Future Academic Bank",
//     interestRate: 7.8,
//     maxLoanAmount: 100000,
//     repaymentPeriod: "10 years",
//     processingFee: 2.5,
//     rating: 3,
//     features: [
//       "Same-day approval available",
//       "Mobile app for tracking",
//       "Automatic payment discount",
//       "Refinancing options available",
//     ],
//     eligibilityCriteria: [
//       "Credit check required",
//       "Employment history verification",
//       "Valid identification documents",
//     ],
//     description:
//       "Future Academic Bank brings modern banking technology to education financing. Our proprietary mobile app lets you manage your entire loan from application to final payment, with real-time notifications and same-day approval for qualified applicants.",
//     termsAndConditions: [
//       "Interest rates based on creditworthiness and employment",
//       "Same-day approval available for pre-qualified applicants",
//       "Mobile app provides 24/7 loan management access",
//       "Automatic payment setup reduces rate by 0.5%",
//       "Refinancing options available after 12 months",
//       "Late payment grace period of 10 days",
//       "Credit reporting to all major bureaus monthly",
//       "Option to switch to graduated repayment plan",
//     ],
//     applicationProcess: {
//       steps: [
//         "Download mobile app and create secure account",
//         "Complete digital application with instant credit check",
//         "Upload identification and income verification",
//         "Receive instant pre-approval decision (qualified applicants)",
//         "Review and accept loan terms through app",
//         "Complete e-signature verification",
//         "Funds disbursed same day or next business day",
//       ],
//       requiredDocuments: [
//         "Government-issued photo ID",
//         "Social Security number or equivalent",
//         "Proof of current employment and income",
//         "Bank account statements (last 2 months)",
//         "University enrollment verification",
//         "Current address verification",
//         "Credit authorization form",
//       ],
//       processingTime: "Same day to 2 business days",
//     },
//     reviews: [
//       {
//         id: "1",
//         userName: "Marcus Johnson",
//         rating: 4,
//         date: "2024-11-12",
//         comment:
//           "The mobile app is fantastic! I can track everything from my phone. Approval was quick. Rate is a bit high but the convenience is worth it for me.",
//         helpful: 16,
//       },
//       {
//         id: "2",
//         userName: "Lisa Chen",
//         rating: 3,
//         date: "2024-10-30",
//         comment:
//           "Good tech platform and fast approval. However, interest rate is higher than I'd like. Good option if you need money quickly and have decent credit.",
//         helpful: 11,
//       },
//       {
//         id: "3",
//         userName: "Robert Taylor",
//         rating: 3,
//         date: "2024-10-18",
//         comment:
//           "Decent experience overall. The app is slick and modern. Processing was fast. Would have preferred a lower rate, but I needed funds immediately so this worked.",
//         helpful: 8,
//       },
//     ],
//     contactInfo: {
//       phone: "+1 (866) 789-0123",
//       email: "support@futureacademicbank.com",
//       website: "www.futureacademicbank.com",
//     },
//     additionalFeatures: [
//       {
//         icon: "clock",
//         title: "Same-Day Funding",
//         description: "Get approved and funded fast",
//       },
//       {
//         icon: "shield",
//         title: "Mobile First",
//         description: "Manage everything from your phone",
//       },
//       {
//         icon: "award",
//         title: "Tech Enabled",
//         description: "Modern banking technology",
//       },
//     ],
//   },
//   "5": {
//     id: "5",
//     lenderName: "Merit-Based Lending",
//     interestRate: 6.8,
//     maxLoanAmount: 175000,
//     repaymentPeriod: "18 years",
//     processingFee: 1.8,
//     rating: 4,
//     features: [
//       "Rewards for academic excellence",
//       "Career guidance services included",
//       "Income-based repayment options",
//       "Graduate school priority processing",
//     ],
//     eligibilityCriteria: [
//       "Strong academic record required",
//       "Acceptance to accredited institution",
//       "Career placement potential assessment",
//     ],
//     description:
//       "Merit-Based Lending rewards academic excellence with preferential rates and comprehensive career support. We don't just provide funding—we invest in your future success with included career counseling, networking opportunities, and income-based repayment flexibility.",
//     termsAndConditions: [
//       "Interest rate discounts for academic achievement (up to 1%)",
//       "Income-based repayment plans available post-graduation",
//       "Free career counseling and job placement assistance",
//       "Graduate degree programs receive priority processing",
//       "Loyalty benefits for borrowers pursuing advanced degrees",
//       "Annual scholarship opportunities for top performers",
//       "Flexible forbearance options during job transitions",
//       "No penalty for switching between repayment plans",
//     ],
//     applicationProcess: {
//       steps: [
//         "Submit application with detailed academic credentials",
//         "Academic merit evaluation and GPA verification",
//         "Career potential assessment interview",
//         "Financial background and eligibility review",
//         "Personalized rate quote based on merit evaluation",
//         "Loan terms customization and career counseling enrollment",
//         "Final approval and funding disbursement (5-7 days)",
//       ],
//       requiredDocuments: [
//         "Complete academic transcripts from all institutions",
//         "Standardized test scores (SAT, GRE, GMAT as applicable)",
//         "Letters of recommendation (2 minimum)",
//         "Personal statement or career goals essay",
//         "Admission acceptance documentation",
//         "Resume or CV with relevant experience",
//         "Financial aid award letter (if applicable)",
//       ],
//       processingTime: "5-7 business days",
//     },
//     reviews: [
//       {
//         id: "1",
//         userName: "Alexandra Foster",
//         rating: 5,
//         date: "2024-11-10",
//         comment:
//           "Love that they reward good grades! Got a 0.5% rate reduction for my GPA. The career services are actually helpful—helped me land internships through their network.",
//         helpful: 27,
//       },
//       {
//         id: "2",
//         userName: "James Mitchell",
//         rating: 4,
//         date: "2024-11-01",
//         comment:
//           "Great concept and solid execution. The merit-based approach is refreshing. Career guidance is a nice bonus. Process was thorough but fair.",
//         helpful: 20,
//       },
//       {
//         id: "3",
//         userName: "Natalie Wong",
//         rating: 4,
//         date: "2024-10-20",
//         comment:
//           "Really appreciate the income-based repayment option. Gives me peace of mind starting my career. The whole experience feels like they're investing in students, not just lending money.",
//         helpful: 14,
//       },
//     ],
//     contactInfo: {
//       phone: "+1 (855) 321-6789",
//       email: "merit@meritlending.com",
//       website: "www.meritbasedlending.com",
//     },
//     additionalFeatures: [
//       {
//         icon: "award",
//         title: "Merit Rewards",
//         description: "Rate discounts for academic excellence",
//       },
//       {
//         icon: "shield",
//         title: "Career Support",
//         description: "Free job placement assistance",
//       },
//       {
//         icon: "clock",
//         title: "Flexible Plans",
//         description: "Income-based repayment options",
//       },
//     ],
//   },
// };

// export default function LoanDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [favoriteLoanIds, setFavoriteLoanIds] = useState<string[]>([]);
//   const [showInterestedModal, setShowInterestedModal] = useState(false);

//   // Load favorites from localStorage
//   useEffect(() => {
//     const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
//     if (savedFavorites) {
//       try {
//         setFavoriteLoanIds(JSON.parse(savedFavorites));
//       } catch (error) {
//         console.error("Error loading favorites:", error);
//       }
//     }
//   }, []);

//   // Save favorites to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteLoanIds));
//   }, [favoriteLoanIds]);

//   const loan = id ? DETAILED_LOANS[id] : null;

//   if (!loan) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col">
//         {/* <Header /> */}
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center space-y-4">
//             <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
//             <h2 className="text-2xl font-bold">Loan Not Found</h2>
//             <p className="text-muted-foreground">The loan you're looking for doesn't exist.</p>
//             <Button onClick={() => navigate("/loans")}>
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Loans
//             </Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const averageRating = loan.reviews.reduce((acc, r) => acc + r.rating, 0) / loan.reviews.length;

//   const handleApplyNow = () => {
//     toast.success("Application Started! 🎉", {
//       description: `Redirecting you to ${loan.lenderName}'s application portal...`,
//     });
//   };

//   const handleToggleFavorite = async () => {
//     if (!loan) return;

//     const isFavorite = favoriteLoanIds.includes(loan.id);

//     if (isFavorite) {
//       setFavoriteLoanIds(favoriteLoanIds.filter(loanId => loanId !== loan.id));
//       toast.success("Removed from favorites", {
//         description: `${loan.lenderName} has been removed from your bookmarks.`,
//       });
//     } else {
//       setFavoriteLoanIds([...favoriteLoanIds, loan.id]);
//       toast.success("Added to favorites! ❤️", {
//         description: `${loan.lenderName} has been bookmarked for easy access.`,
//       });

//       // Send to dummy API (demonstration only)
//       try {
//         await fetch(DUMMY_API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             title: 'Loan Favorited',
//             loanId: loan.id,
//             lenderName: loan.lenderName,
//             userId: 'demo-user',
//             timestamp: new Date().toISOString(),
//           }),
//         });
//       } catch (error) {
//         console.error("Error sending to API:", error);
//       }
//     }
//   };

//   const isFavorite = loan ? favoriteLoanIds.includes(loan.id) : false;

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* <Header /> */}

//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Button
//             variant="ghost"
//             onClick={() => navigate("/loans")}
//             className="mb-4 hover:bg-primary/5"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to All Loans
//           </Button>

//           <div className="grid lg:grid-cols-2 gap-8 items-start">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary" className="px-3 py-1">
//                   Featured Lender
//                 </Badge>
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-4 h-4 ${
//                         i < loan.rating ? "fill-accent text-accent" : "text-muted-foreground"
//                       }`}
//                     />
//                   ))}
//                   <span className="text-sm text-muted-foreground ml-1">
//                     {averageRating.toFixed(1)} ({loan.reviews.length} reviews)
//                   </span>
//                 </div>
//               </div>

//               <h1 className="font-heading text-4xl lg:text-5xl font-bold">{loan.lenderName}</h1>
//               <p className="text-lg text-muted-foreground">{loan.description}</p>

//               <div className="flex flex-wrap gap-3 pt-4">
//                 <Button
//                   size="lg"
//                   onClick={() => setShowInterestedModal(true)}
//                   className="bg-gradient-to-r from-accent to-accent-light shadow-lg hover:shadow-xl transition-all"
//                 >
//                   Interested?
//                 </Button>
//                 <Button size="lg" variant="outline" onClick={handleToggleFavorite}>
//                   <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-accent text-accent' : ''}`} />
//                   {isFavorite ? 'Saved' : 'Save'}
//                 </Button>
//               </div>
//             </div>

//             {/* Key Metrics Card */}
//             <Card className="border-2 shadow-lg">
//               <CardHeader>
//                 <CardTitle>Loan Overview</CardTitle>
//                 <CardDescription>Key terms and conditions at a glance</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <Percent className="w-5 h-5 text-primary" />
//                     <span className="font-medium">Interest Rate</span>
//                   </div>
//                   <span className="text-2xl font-bold text-primary">{loan.interestRate}%</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <DollarSign className="w-5 h-5 text-accent" />
//                     <span className="font-medium">Max Amount</span>
//                   </div>
//                   <span className="text-2xl font-bold text-accent">
//                     ${(loan.maxLoanAmount / 1000).toFixed(0)}K
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-5 h-5 text-success" />
//                     <span className="font-medium">Repayment Period</span>
//                   </div>
//                   <span className="text-xl font-bold text-success">{loan.repaymentPeriod}</span>
//                 </div>

//                 <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <FileText className="w-5 h-5 text-muted-foreground" />
//                     <span className="font-medium">Processing Fee</span>
//                   </div>
//                   <span className="text-xl font-bold">{loan.processingFee}%</span>
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Processing Time</span>
//                     <span className="font-semibold">{loan.applicationProcess.processingTime}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Grace Period</span>
//                     <span className="font-semibold">6 months</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <Tabs defaultValue="overview" className="space-y-8">
//           <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
//             <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
//             <TabsTrigger value="application">Application</TabsTrigger>
//             <TabsTrigger value="reviews">Reviews</TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Key Features</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {loan.features.map((feature, index) => (
//                     <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                       <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Additional Benefits</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   {loan.additionalFeatures.map((feature, index) => (
//                     <div key={index} className="text-center p-4 rounded-lg border border-border/50 bg-card">
//                       {feature.icon === "shield" && <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />}
//                       {feature.icon === "award" && <Award className="w-8 h-8 mx-auto mb-2 text-accent" />}
//                       {feature.icon === "clock" && <Clock className="w-8 h-8 mx-auto mb-2 text-success" />}
//                       <h4 className="font-semibold mb-1">{feature.title}</h4>
//                       <p className="text-sm text-muted-foreground">{feature.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Contact Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                     <Phone className="w-5 h-5 text-primary" />
//                     <a href={`tel:${loan.contactInfo.phone}`} className="hover:underline">
//                       {loan.contactInfo.phone}
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                     <Mail className="w-5 h-5 text-primary" />
//                     <a href={`mailto:${loan.contactInfo.email}`} className="hover:underline">
//                       {loan.contactInfo.email}
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                     <Globe className="w-5 h-5 text-primary" />
//                     <a
//                       href={`https://${loan.contactInfo.website}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline"
//                     >
//                       {loan.contactInfo.website}
//                     </a>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Eligibility Tab */}
//           <TabsContent value="eligibility" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Eligibility Requirements</CardTitle>
//                 <CardDescription>Make sure you meet these criteria before applying</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {loan.eligibilityCriteria.map((criteria, index) => (
//                     <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border/50">
//                       <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
//                       <div>
//                         <p className="font-medium">{criteria}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Required Documents</CardTitle>
//                 <CardDescription>Prepare these documents for a smooth application process</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-3">
//                   {loan.applicationProcess.requiredDocuments.map((doc, index) => (
//                     <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                       <FileText className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
//                       <span className="text-sm">{doc}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Terms & Conditions Tab */}
//           <TabsContent value="terms" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Terms & Conditions</CardTitle>
//                 <CardDescription>Important terms you should know before applying</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {loan.termsAndConditions.map((term, index) => (
//                     <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
//                       <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
//                         {index + 1}
//                       </div>
//                       <p className="text-sm leading-relaxed">{term}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Application Tab */}
//           <TabsContent value="application" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Application Process</CardTitle>
//                 <CardDescription>
//                   Follow these steps to complete your application in {loan.applicationProcess.processingTime}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {loan.applicationProcess.steps.map((step, index) => (
//                     <div key={index} className="relative pl-8 pb-6 last:pb-0">
//                       {index < loan.applicationProcess.steps.length - 1 && (
//                         <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
//                       )}
//                       <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
//                         {index + 1}
//                       </div>
//                       <div className="bg-muted/50 rounded-lg p-4">
//                         <p className="text-sm leading-relaxed">{step}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Ready to Apply?</CardTitle>
//                 <CardDescription>Start your application journey today</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
//                   <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
//                   <div className="flex-1">
//                     <p className="font-semibold">Fast Approval</p>
//                     <p className="text-sm text-muted-foreground">
//                       Most applications are reviewed within {loan.applicationProcess.processingTime}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Reviews Tab */}
//           <TabsContent value="reviews" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Customer Reviews</CardTitle>
//                 <CardDescription>
//                   See what other students say about {loan.lenderName}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</div>
//                     <div className="flex items-center gap-1 mt-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.round(averageRating)
//                               ? "fill-accent text-accent"
//                               : "text-muted-foreground"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Based on {loan.reviews.length} reviews
//                     </p>
//                   </div>
//                   <Separator orientation="vertical" className="h-20" />
//                   <div className="flex-1 space-y-2">
//                     {[5, 4, 3, 2, 1].map((stars) => {
//                       const count = loan.reviews.filter((r) => r.rating === stars).length;
//                       const percentage = (count / loan.reviews.length) * 100;
//                       return (
//                         <div key={stars} className="flex items-center gap-2">
//                           <span className="text-sm w-3">{stars}</span>
//                           <Star className="w-3 h-3 fill-accent text-accent" />
//                           <Progress value={percentage} className="h-2 flex-1" />
//                           <span className="text-sm text-muted-foreground w-8">{count}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <Separator />

//                 <div className="space-y-4">
//                   {loan.reviews.map((review) => (
//                     <div key={review.id} className="p-4 rounded-lg border border-border/50">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="font-semibold">{review.userName}</span>
//                             <Badge variant="secondary" className="text-xs">
//                               Verified Borrower
//                             </Badge>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 className={`w-3 h-3 ${
//                                   i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
//                                 }`}
//                               />
//                             ))}
//                             <span className="text-xs text-muted-foreground ml-2">
//                               {new Date(review.date).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-sm leading-relaxed mb-3">{review.comment}</p>
//                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <Button variant="ghost" size="sm" className="h-7 text-xs">
//                           <CheckCircle2 className="w-3 h-3 mr-1" />
//                           Helpful ({review.helpful})
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Interested Modal */}
//       <InterestedModal
//         open={showInterestedModal}
//         onClose={() => setShowInterestedModal(false)}
//         loan={loan}
//       />

//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { Header } from "@/components/edu-loan-guide/Header";
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
} from "@/store/slices/loanProductSlice";

const FAVORITES_STORAGE_KEY = "loan-favorites";

export default function LoanDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const loan = useSelector(selectSelectedLoanProduct);
  const isLoading = useSelector(selectIsLoadingDetails);
  const error = useSelector(selectDetailsError);

  const [favoriteLoanIds, setFavoriteLoanIds] = useState<string[]>([]);
  const [showInterestedModal, setShowInterestedModal] = useState(false);

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
      <div className="min-h-screen bg-background flex flex-col">
        {/* <Header /> */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
            <h2 className="text-2xl font-bold">Loading loan details...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or not found state
  if (error || !loan) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* <Header /> */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold">Loan Not Found</h2>
            <p className="text-muted-foreground">
              {error || "The loan you're looking for doesn't exist."}
            </p>
            <Button onClick={() => navigate("/loans")}>
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

  // Build features array dynamically
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

  // Build application process steps
  const applicationSteps: string[] = [
    "Complete online application form with personal and academic details",
    "Upload required documents and verification materials",
    `Initial review and pre-approval within ${processingTime}`,
    "Verification call and document authentication",
    "Final approval and loan agreement signing",
    "Disbursement to educational institution",
  ];

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

  // Contact information
  // const contactInfo = {
  //   phone:
  //     loan.lender?.contact_phone ||
  //     loan.system_integration?.support_contact_phone ||
  //     null,
  //   email:
  //     loan.lender?.contact_email ||
  //     loan.system_integration?.support_contact_email ||
  //     null,
  //   website: loan.lender?.website || null,
  // };

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

  const handleToggleFavorite = () => {
    if (!loan) return;

    const loanId = loan.id.toString();
    const isFavorite = favoriteLoanIds.includes(loanId);

    if (isFavorite) {
      setFavoriteLoanIds(favoriteLoanIds.filter((id) => id !== loanId));
      toast.success("Removed from favorites", {
        description: `${lenderName} has been removed from your bookmarks.`,
      });
    } else {
      setFavoriteLoanIds([...favoriteLoanIds, loanId]);
      toast.success("Added to favorites! ❤️", {
        description: `${lenderName} has been bookmarked for easy access.`,
      });
    }
  };

  const isFavorite = loan
    ? favoriteLoanIds.includes(loan.id.toString())
    : false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Header /> */}

      {/* Hero Section - EXACT ORIGINAL SPACING */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/loans")}
            className="mb-4 hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Loans
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {loan.product_status || "Featured Lender"}
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-heading text-4xl lg:text-5xl font-bold">
                {lenderName}
              </h1>
              <p className="text-lg text-muted-foreground">{description}</p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button
                  size="lg"
                  onClick={() => setShowInterestedModal(true)}
                  className="bg-gradient-to-r from-accent to-accent-light shadow-lg hover:shadow-xl transition-all"
                >
                  Interested?
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleFavorite}
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
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle>Loan Overview</CardTitle>
                <CardDescription>
                  Key terms and conditions at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    <span className="font-medium">Interest Rate</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {interestRate}%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <span className="font-medium">Max Amount</span>
                  </div>
                  <span className="text-2xl font-bold text-accent">
                    ₹{(maxLoanAmountValue / 100000).toFixed(1)}L
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-success" />
                    <span className="font-medium">Repayment Period</span>
                  </div>
                  <span className="text-xl font-bold text-success">
                    {repaymentPeriod}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">Processing Fee</span>
                  </div>
                  <span className="text-xl font-bold">{processingFee}%</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Processing Time
                    </span>
                    <span className="font-semibold">{processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Grace Period</span>
                    <span className="font-semibold">
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
          {/* ✅ FIXED: Restored original 5-column tabs layout */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Additional Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {additionalFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg border border-border/50 bg-card"
                    >
                      {feature.icon === "shield" && (
                        <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                      )}
                      {feature.icon === "award" && (
                        <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
                      )}
                      {feature.icon === "clock" && (
                        <Clock className="w-8 h-8 mx-auto mb-2 text-success" />
                      )}
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* {(contactInfo.phone ||
              contactInfo.email ||
              contactInfo.website) && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contactInfo.phone && contactInfo.phone.trim() !== "" && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Phone className="w-5 h-5 text-primary" />
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="hover:underline"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {contactInfo.email && contactInfo.email.trim() !== "" && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Mail className="w-5 h-5 text-primary" />
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="hover:underline"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                    {contactInfo.website &&
                      contactInfo.website.trim() !== "" && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <Globe className="w-5 h-5 text-primary" />
                          <a
                            href={`https://${contactInfo.website.replace(
                              /^https?:\/\//,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {contactInfo.website}
                          </a>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            )} */}
          </TabsContent>

          {/* Eligibility Tab */}
          <TabsContent value="eligibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
                <CardDescription>
                  Make sure you meet these criteria before applying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eligibilityCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border/50"
                    >
                      <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{criteria}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {requiredDocuments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Prepare these documents for a smooth application process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {requiredDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <FileText className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Terms & Conditions Tab */}
          <TabsContent value="terms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>
                  Important terms you should know before applying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {termsAndConditions.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border/50"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed">{term}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Tab */}
          <TabsContent value="application" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>
                  Follow these steps to complete your application in{" "}
                  {processingTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationSteps.map((step, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      {index < applicationSteps.length - 1 && (
                        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                      )}
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
                <CardDescription>
                  Start your application journey today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold">Fast Approval</p>
                    <p className="text-sm text-muted-foreground">
                      Most applications are reviewed within {processingTime}
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setShowInterestedModal(true)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  See what other students say about {lenderName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(averageRating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on {reviews.length} reviews
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-20" />
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter(
                        (r) => r.rating === stars
                      ).length;
                      const percentage = (count / reviews.length) * 100;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-3">{stars}</span>
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <Progress value={percentage} className="h-2 flex-1" />
                          <span className="text-sm text-muted-foreground w-8">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-lg border border-border/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">
                              {review.userName}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Verified Borrower
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed mb-3">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Interested Modal */}
      <InterestedModal
        open={showInterestedModal}
        onClose={() => setShowInterestedModal(false)}
        loan={{
          id: loan.id.toString(),
          lenderName,
          interestRate,
          maxLoanAmount: maxLoanAmountValue,
          repaymentPeriod,
          processingFee,
          rating,
          features,
          eligibilityCriteria,
        }}
      />

      <Footer />
    </div>
  );
}
