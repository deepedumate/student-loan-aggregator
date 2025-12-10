import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Sparkles,
  Shield,
  TrendingUp,
  FileText,
  Clock,
  Award,
} from "lucide-react";
import ProfileStage from "@/components/studentLoan/ProfileStage";
import EligibilityStage from "@/components/studentLoan/EligibilityStage";
import LenderDiscoveryStage from "@/components/studentLoan/LenderDiscoveryStage";
import DocumentationStage from "@/components/studentLoan/DocumentationStage";
import ApplicationTrackingStage from "@/components/studentLoan/ApplicationTrackingStage";
import LoanSummaryStage from "@/components/studentLoan/LoanSummaryStage";   

export default function StudentLoan() {
  // State Management
  const [currentStage, setCurrentStage] = useState(1);
  const [studentProfile, setStudentProfile] = useState(null);
  const [eligibilityScore, setEligibilityScore] = useState(null);
  const [selectedLender, setSelectedLender] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [application, setApplication] = useState(null);

  // Smooth scroll to top on stage change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStage]);

  // Stage completion handlers
  const handleProfileComplete = (profile) => {
    setStudentProfile(profile);
    setCurrentStage(2);
  };

  const handleEligibilityComplete = (score) => {
    setEligibilityScore(score);
    setCurrentStage(3);
  };

  const handleLenderSelected = (lender) => {
    setSelectedLender(lender);
    setCurrentStage(4);
  };

  const handleDocumentsComplete = (docs) => {
    setDocuments(docs);
    const newApplication = {
      id: `APP${Date.now()}`,
      studentName: studentProfile?.fullName || "",
      lenderName: selectedLender?.lenderName || "",
      loanAmount: selectedLender?.requestedAmount || 0,
      status: "in-progress",
      currentStage: "documentation",
      submittedDate: new Date().toISOString(),
      expectedDecisionDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };
    setApplication(newApplication);
    setCurrentStage(5);
  };

  const handleViewSummary = () => {
    setCurrentStage(6);
  };

  // Navigation handlers
  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleStageClick = (stageNumber) => {
    if (stageNumber <= currentStage) {
      setCurrentStage(stageNumber);
    }
  };

  const handleHome = () => {
    if (
      confirm("Are you sure you want to start over? All progress will be lost.")
    ) {
      window.location.reload();
    }
  };

  // Stage configuration
  const stages = [
    {
      number: 1,
      title: "Profile",
      icon: FileText,
      completed: currentStage > 1,
      description: "Basic Information",
    },
    {
      number: 2,
      title: "Eligibility",
      icon: Shield,
      completed: currentStage > 2,
      description: "Check Eligibility",
    },
    {
      number: 3,
      title: "Lenders",
      icon: TrendingUp,
      completed: currentStage > 3,
      description: "Find Best Rates",
    },
    {
      number: 4,
      title: "Documents",
      icon: FileText,
      completed: currentStage > 4,
      description: "Upload Files",
    },
    {
      number: 5,
      title: "Tracking",
      icon: Clock,
      completed: currentStage > 5,
      description: "Track Progress",
    },
    {
      number: 6,
      title: "Summary",
      icon: Award,
      completed: currentStage > 6,
      description: "Review & Confirm",
    },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-x-hidden">
      {/* Premium Header */}
      <motion.div
        className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-full max-w-[100vw] mx-auto px-4 py-6">
          {/* Header Content */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 flex-shrink-0"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary truncate">
                    Student Loan Application
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                    Secure your education funding in minutes
                  </p>
                </div>
              </div>

              {/* Progress Badge */}
              <motion.div
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">
                    Step {currentStage} of {stages.length}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Current Stage Info */}
            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-2"
              key={currentStage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex-shrink-0">
                {currentStage}
              </span>
              <span className="truncate">
                {stages[currentStage - 1]?.title} -{" "}
                {stages[currentStage - 1]?.description}
              </span>
            </motion.p>
          </div>

          {/* Premium Stage Navigation */}
          <PremiumStageNavigation
            stages={stages}
            currentStage={currentStage}
            onStageClick={handleStageClick}
          />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="relative w-full max-w-[100vw] mx-auto px-4 py-8 pb-32 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-full"
          >
            {currentStage === 1 && (
              <ProfileStage
                onComplete={handleProfileComplete}
                initialData={studentProfile}
              />
            )}
            {currentStage === 2 && studentProfile && (
              <EligibilityStage
                profile={studentProfile}
                onComplete={handleEligibilityComplete}
              />
            )}
            {currentStage === 3 && studentProfile && eligibilityScore && (
              <LenderDiscoveryStage
                profile={studentProfile}
                eligibilityScore={eligibilityScore}
                onLenderSelected={handleLenderSelected}
              />
            )}
            {currentStage === 4 && studentProfile && selectedLender && (
              <DocumentationStage
                lender={selectedLender}
                onComplete={handleDocumentsComplete}
                profile={studentProfile}
              />
            )}
            {currentStage === 5 && application && (
              <ApplicationTrackingStage
                application={application}
                onViewSummary={handleViewSummary}
              />
            )}
            {currentStage === 6 && selectedLender && application && (
              <LoanSummaryStage
                lender={selectedLender}
                application={application}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Bottom Navigation Bar */}
      <PremiumNavigationBar
        currentStage={currentStage}
        totalStages={stages.length}
        onBack={handleBack}
        onHome={handleHome}
        showBack={currentStage > 1}
      />
    </div>
  );
}

/**
 * PREMIUM STAGE NAVIGATION COMPONENT
 */
function PremiumStageNavigation({ stages, currentStage, onStageClick }) {
  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Desktop: Horizontal Stepper */}
      <div className="hidden lg:flex items-center justify-between gap-2">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = stage.number === currentStage;
          const isCompleted = stage.completed;
          const isAccessible = stage.number <= currentStage;

          return (
            <div
              key={stage.number}
              className="flex-1 flex items-center min-w-0"
            >
              <motion.button
                onClick={() => isAccessible && onStageClick(stage.number)}
                disabled={!isAccessible}
                className={`
                  relative w-full group min-w-0
                  ${isAccessible ? "cursor-pointer" : "cursor-not-allowed"}
                `}
                whileHover={isAccessible ? { scale: 1.02, y: -2 } : {}}
                whileTap={isAccessible ? { scale: 0.98 } : {}}
              >
                <div
                  className={`
                  relative overflow-hidden rounded-xl p-4 transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20"
                      : isCompleted
                      ? "bg-success/10 border border-success/30"
                      : "bg-card border border-border"
                  }
                  ${isAccessible && "hover:shadow-md"}
                `}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <div className="relative flex items-center gap-3 min-w-0">
                    <div
                      className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        isActive
                          ? "bg-primary shadow-lg shadow-primary/30"
                          : isCompleted
                          ? "bg-success"
                          : "bg-muted"
                      }
                    `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-white" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div
                        className={`
                        text-sm font-semibold truncate transition-colors
                        ${
                          isActive
                            ? "text-primary"
                            : isCompleted
                            ? "text-success"
                            : "text-muted-foreground"
                        }
                      `}
                      >
                        {stage.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {stage.description}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>

              {index < stages.length - 1 && (
                <div className="w-8 px-2 flex-shrink-0">
                  <div
                    className={`
                    h-0.5 rounded-full transition-colors duration-300
                    ${isCompleted ? "bg-success" : "bg-border"}
                  `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet: Compact Stepper */}
      <div className="lg:hidden w-full overflow-x-auto">
        <div className="flex items-center gap-2 pb-2 min-w-min">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.number === currentStage;
            const isCompleted = stage.completed;
            const isAccessible = stage.number <= currentStage;

            return (
              <motion.button
                key={stage.number}
                onClick={() => isAccessible && onStageClick(stage.number)}
                disabled={!isAccessible}
                className={`
                  flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl w-[90px] transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary/10 border-2 border-primary"
                      : isCompleted
                      ? "bg-success/10 border border-success/30"
                      : "bg-card border border-border"
                  }
                  ${
                    isAccessible
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                  }
                `}
                whileTap={isAccessible ? { scale: 0.95 } : {}}
              >
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${
                    isActive
                      ? "bg-primary"
                      : isCompleted
                      ? "bg-success"
                      : "bg-muted"
                  }
                `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`
                  text-xs font-medium text-center line-clamp-1
                  ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-success"
                      : "text-muted-foreground"
                  }
                `}
                >
                  {stage.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * PREMIUM NAVIGATION BAR
 */
function PremiumNavigationBar({
  currentStage,
  totalStages,
  onBack,
  onHome,
  showBack,
}) {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="backdrop-blur-xl bg-card/80 border-t border-border shadow-lg">
        <div className="w-full max-w-[100vw] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Home Button */}
            <motion.button
              onClick={onHome}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-200 border border-border flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground group-hover:text-foreground whitespace-nowrap">
                Start Over
              </span>
            </motion.button>

            {/* Center: Progress Indicator */}
            <div className="flex-1 max-w-md min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {currentStage} of {totalStages}
                </span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden min-w-[60px]">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentStage / totalStages) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <span className="text-sm font-bold text-primary whitespace-nowrap flex-shrink-0">
                  {Math.round((currentStage / totalStages) * 100)}%
                </span>
              </div>
            </div>

            {/* Right: Back Button */}
            {showBack && (
              <motion.button
                onClick={onBack}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all duration-200 border border-primary/20 flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <ArrowLeft className="w-4 h-4 text-primary transition-colors" />
                <span className="hidden sm:inline text-sm font-medium text-primary whitespace-nowrap">
                  Back
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
