import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award, TrendingUp, User, Sparkles } from "lucide-react";
import type { StudentProfile, EligibilityScore } from "@/types/studentLoanType";
import {
  calculateEligibilityScore,
  getEligibilityLevel,
} from "@/lib/helper/studentLoanHelper";

interface EligibilityStageProps {
  profile: StudentProfile;
  onComplete: (score: EligibilityScore) => void;
}

export function EligibilityStage({
  profile,
  onComplete,
}: EligibilityStageProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState<EligibilityScore | null>(null);
  const [animatedScores, setAnimatedScores] = useState({
    overall: 0,
    academic: 0,
    financial: 0,
    profile: 0,
  });

  useEffect(() => {
    // Simulate loading and calculation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      // Calculate eligibility scores
      const academicScore = 75 + Math.random() * 15;
      const financialScore = profile.coApplicantAvailable
        ? 80 + Math.random() * 15
        : 60 + Math.random() * 20;
      const profileScore = 70 + Math.random() * 20;
      const overallScore = calculateEligibilityScore(
        academicScore,
        financialScore,
        profileScore
      );
      const eligibilityLevel = getEligibilityLevel(overallScore);

      const recommendations: string[] = [];
      if (academicScore < 80) {
        recommendations.push(
          "Consider providing additional academic achievements or certifications"
        );
      }
      if (financialScore < 70) {
        recommendations.push(
          "Having a co-applicant with stable income can improve your eligibility"
        );
      }
      if (profileScore < 75) {
        recommendations.push(
          "Strengthen your profile with relevant work experience or extracurriculars"
        );
      }
      if (overallScore >= 80) {
        recommendations.push(
          "Excellent profile! You qualify for premium loan offers"
        );
      }

      const calculatedScore: EligibilityScore = {
        overallScore,
        academicScore,
        financialScore,
        profileScore,
        eligibilityLevel,
        recommendations:
          recommendations.length > 0
            ? recommendations
            : ["Your profile looks good!"],
      };

      setScore(calculatedScore);
      setLoading(false);
      animateScores(calculatedScore);
    }, 2500);

    return () => clearInterval(progressInterval);
  }, [profile]);

  const animateScores = (finalScore: EligibilityScore) => {
    let step = 0;
    const steps = 30;
    const interval = setInterval(() => {
      step++;
      setAnimatedScores({
        overall: Math.round((finalScore.overallScore * step) / steps),
        academic: Math.round((finalScore.academicScore * step) / steps),
        financial: Math.round((finalScore.financialScore * step) / steps),
        profile: Math.round((finalScore.profileScore * step) / steps),
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, 30);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 65) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 65) return "bg-primary";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const getLevelInfo = (level: string) => {
    switch (level) {
      case "excellent":
        return { text: "Excellent", icon: "🌟", color: "text-success" };
      case "good":
        return { text: "Good", icon: "✅", color: "text-primary" };
      case "fair":
        return { text: "Fair", icon: "👍", color: "text-warning" };
      default:
        return {
          text: "Needs Improvement",
          icon: "💡",
          color: "text-accent",
        };
    }
  };

  if (loading || !score) {
    return (
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          className="glass-card p-12 text-center rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Animated Spinner */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-20 blur-xl" />
            <Sparkles className="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
          </motion.div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Analyzing Your Profile
          </h2>
          <p className="text-muted-foreground mb-6">
            We're evaluating your eligibility across multiple criteria
          </p>

          {/* Animated Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {progress}% Complete
            </p>
          </div>

          {/* Status Messages */}
          <div className="mt-8">
            <motion.p
              className="text-sm text-muted-foreground"
              key={progress}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {progress < 40
                ? "Checking academic credentials..."
                : progress < 70
                ? "Evaluating financial profile..."
                : "Calculating final score..."}
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(score.eligibilityLevel);

  return (
    <div className="container mx-auto px-4 max-w-4xl space-y-6">
      {/* Overall Score Card */}
      <motion.div
        className="glass-card p-12 text-left lg:text-center rounded-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Circular Progress */}
        <div className="inline-block mb-4">
          <div className="relative w-40 h-40 mx-auto">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-secondary"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 70 * (1 - animatedScores.overall / 100),
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    className="text-primary"
                    stopColor="currentColor"
                  />
                  <stop
                    offset="100%"
                    className="text-primary"
                    stopColor="currentColor"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <motion.p
                  className={`text-5xl font-bold ${getScoreColor(
                    animatedScores.overall
                  )}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {animatedScores.overall}
                </motion.p>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-2">
          Your Eligibility Score
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">{levelInfo.icon}</span>
          <p className={`text-xl font-semibold ${levelInfo.color}`}>
            {levelInfo.text}
          </p>
        </div>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Congratulations {profile.fullName.split(" ")[0]}! Based on your
          profile, you're eligible for education loans from multiple lenders.
        </p>
      </motion.div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Award,
            label: "Academic",
            score: animatedScores.academic,
            bgColor: "bg-primary/10",
            iconColor: "text-primary",
          },
          {
            icon: TrendingUp,
            label: "Financial",
            score: animatedScores.financial,
            bgColor: "bg-success/10",
            iconColor: "text-success",
          },
          {
            icon: User,
            label: "Profile",
            score: animatedScores.profile,
            bgColor: "bg-accent/10",
            iconColor: "text-accent",
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="glass-card p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center`}
              >
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p
                  className={`text-2xl font-bold ${getScoreColor(item.score)}`}
                >
                  {item.score}
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${getScoreBg(item.score)}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recommendations
        </h3>
        <div className="space-y-3">
          {score.recommendations.map((rec: any, index: any) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <motion.button
          onClick={() => onComplete(score)}
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
          <span className="relative z-10">View Lender Options</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
