import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Building2,
  IndianRupee,
  TrendingUp,
  Users,
  Shield,
  // CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import ToolsShowcaseSection from "./Toolsshowcasesection";

// ✅ Constants for better maintainability
const ANIMATION_DELAYS = {
  VISIBILITY_DELAY: 100,
  CAROUSEL_INTERVAL: 5000,
  TYPEWRITER_SPEED: 60,
  TYPEWRITER_BACK_SPEED: 40,
} as const;

const METRICS = {
  STUDENTS_FUNDED: "50,000+",
  TOTAL_DISBURSED: "₹500+ Cr",
  SUCCESS_RATE: "99.2%",
  PROCESSING_TIME: "2 Days",
  LENDERS_COUNT: "12+",
} as const;

// ✅ Types for better TypeScript support
interface Country {
  code: string;
  name: string;
  flag: string;
}

interface Insight {
  title: string;
  metric: string;
  description: string;
  data: string;
  icon: string;
  ariaLabel: string;
}

// interface StaticContent {
//   mainTitle: string;
//   subTitle: string;
// }

/**
 * Premium Fintech Hero Section Component
 * Features:
 * - Glassmorphic design with backdrop blur
 * - Typewriter animation effect
 * - Animated country flags carousel
 * - Statistics cards with hover effects
 * - Insights carousel with smooth transitions
 * - Framer Motion animations throughout
 * - Responsive design
 */
const HeroSection= () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setUserPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setUserPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ✅ Optimized countries data
  const countries: Country[] = useMemo(
    () => [
      { code: "US", name: "United States", flag: "/images/flags2/usa.jpg" },
      { code: "UK", name: "United Kingdom", flag: "/images/flags2/uk.jpg" },
      { code: "CA", name: "Canada", flag: "/images/flags2/canada.jpg" },
      { code: "AU", name: "Australia", flag: "/images/flags2/australia.jpg" },
      { code: "SG", name: "Singapore", flag: "/images/flags2/singapore.jpg" },
      { code: "DE", name: "Germany", flag: "/images/flags2/germany.jpg" },
      { code: "FR", name: "France", flag: "/images/flags2/france.jpg" },
      { code: "IRE", name: "Ireland", flag: "/images/flags2/ireland.jpg" },
      { code: "AE", name: "UAE", flag: "/images/flags2/uae.jpg" },
      { code: "IN", name: "India", flag: "/images/flags2/india.jpg" },
    ],
    []
  );

  // ✅ Enhanced insights with accessibility labels
  const insights: Insight[] = useMemo(
    () => [
      {
        title: "Market Intelligence",
        metric: `Real-time rates from ${METRICS.LENDERS_COUNT} lenders`,
        description:
          "Our AI continuously monitors interest rates across financial institutions.",
        data: "Updated every 15 minutes",
        icon: "📊",
        ariaLabel: "Market intelligence showing real-time rates from over 12+ lenders",
      },
      {
        title: "Approval Analytics",
        metric: `${METRICS.SUCCESS_RATE} success rate for qualified applicants`,
        description:
          "Advanced algorithms pre-qualify candidates based on academic performance.",
        data: `Based on ${METRICS.STUDENTS_FUNDED} applications`,
        icon: "🎯",
        ariaLabel: "Approval analytics with 99.2% success rate for qualified applicants",
      },
      {
        title: "Speed Optimization",
        metric: `Average processing: ${METRICS.PROCESSING_TIME}`,
        description:
          "Streamlined digital verification and instant decision algorithms.",
        data: "vs 2-3 weeks industry standard",
        icon: "⚡",
        ariaLabel: "Speed optimization with 2 days average processing time",
      },
      {
        title: "Cost Transparency",
        metric: "₹0 hidden charges",
        description: "Edumate doesn't charge anything. Complete fee transparency.",
        data: "Save ₹15,000+ on average",
        icon: "💎",
        ariaLabel: "Cost transparency with zero processing fees and hidden charges",
      },
    ],
    []
  );

  // Typewriter words
  const words = useMemo(
    () => [
      "Compare Education Loans",
      "Find Best Rates",
      "Get Instant Approval",
      "Save Thousands",
    ],
    []
  );

  // ✅ Typewriter effect
  useEffect(() => {
    if (userPrefersReducedMotion) {
      setCurrentText(words[0]);
      return;
    }

    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? ANIMATION_DELAYS.TYPEWRITER_BACK_SPEED : ANIMATION_DELAYS.TYPEWRITER_SPEED
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, userPrefersReducedMotion]);

  // ✅ Optimized carousel effect
  useEffect(() => {
    if (!isVisible || userPrefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, ANIMATION_DELAYS.CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [isVisible, insights.length, userPrefersReducedMotion]);

  // ✅ Intersection Observer for performance
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), ANIMATION_DELAYS.VISIBILITY_DELAY);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ Navigation handlers
  const handlePrevInsight = useCallback(() => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
  }, [insights.length]);

  const handleNextInsight = useCallback(() => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  }, [insights.length]);

  // Statistics data
  const stats = useMemo(
    () => [
      {
        icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: METRICS.STUDENTS_FUNDED,
        label: "Students Funded",
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: METRICS.TOTAL_DISBURSED,
        label: "Loans Disbursed",
        color: "from-green-500 to-emerald-500",
      },
      {
        icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: METRICS.SUCCESS_RATE,
        label: "Success Rate",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: METRICS.PROCESSING_TIME,
        label: "Avg Processing",
        color: "from-orange-500 to-red-500",
      },
    ],
    []
  );

  // Feature cards data
  const features = useMemo(
    () => [
      {
        icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7" />,
        title: "100% Secure",
        description: "Bank-grade encryption",
        gradient: "from-blue-500/10 to-cyan-500/10",
      },
      {
        icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7" />,
        title: "Quick Approval",
        description: "Get approved in 48 hours",
        gradient: "from-green-500/10 to-emerald-500/10",
      },
      {
        icon: <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />,
        title: "Multiple Lenders",
        description: "Compare 12+ banks instantly",
        gradient: "from-purple-500/10 to-pink-500/10",
      },
    ],
    []
  );

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden `}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <main className="grid lg:grid-cols-[1fr,400px] xl:grid-cols-[1fr,450px] gap-8 lg:gap-12 items-start">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full shadow-soft"
              >
                <motion.div
                  className="w-2 h-2 bg-success rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs sm:text-sm font-semibold text-success">
                  Trusted by {METRICS.STUDENTS_FUNDED} Students
                </span>
              </motion.div>

              {/* Main Heading with Typewriter */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground leading-tight font-heading"
                >
                  Your Gateway to
                  <br />
                  <span className="text-primary">Global Education</span>
                </motion.h1>

                {/* Typewriter Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="h-12 sm:h-14 lg:h-16 flex items-center"
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-0.5 h-6 sm:h-7 lg:h-8 bg-accent ml-1"
                    />
                  </p>
                </motion.div>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Access exclusive education loan rates, get instant approvals, and make
                data-driven decisions with our comprehensive comparison platform.
              </motion.p>

              {/* Statistics Cards */}
              {/* <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="glass-card p-4 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 group"
                  >
                    <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-2`}>
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div> */}

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="grid sm:grid-cols-3 gap-4 pt-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`glass-card p-4 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 bg-gradient-to-br ${feature.gradient}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Country Flags Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="pt-6"
              >
                <div className="glass-card p-6 rounded-2xl shadow-soft">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Study Destinations We Cover
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {countries.map((country, index) => (
                      <motion.div
                        key={country.code}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + index * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="group relative"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 border-border/50 hover:border-primary">
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                          {country.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Insights Carousel */}
            <motion.aside
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="lg:sticky lg:top-32"
            >
              {isVisible && (
                <div className="glass-card p-6 rounded-2xl shadow-lg">
                  <header className="mb-6">
                    <h2 className="text-xl font-bold text-foreground font-heading">
                      Platform Intelligence
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Data-driven insights
                    </p>
                  </header>

                  {/* Insights Carousel */}
                  <div className="relative min-h-[360px] overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentInsight}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 h-full flex flex-col justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="text-2xl" aria-hidden="true">
                              {insights[currentInsight].icon}
                            </div>
                            <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                              {insights[currentInsight].title}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="text-xl font-bold text-foreground mb-2">
                              {insights[currentInsight].metric}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {insights[currentInsight].description}
                            </p>
                          </div>
                        </div>

                        <div className="glass-card p-4 rounded-xl">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Data point
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {insights[currentInsight].data}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevInsight}
                      className="p-3 bg-muted hover:bg-muted-foreground/20 rounded-xl transition-colors"
                      aria-label="Previous insight"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.button>

                    {/* Dots Indicator */}
                    <div className="flex gap-2">
                      {insights.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentInsight(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentInsight
                              ? "bg-primary w-6"
                              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                          }`}
                          aria-label={`Go to insight ${index + 1}`}
                        />
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextInsight}
                      className="p-3 bg-primary hover:bg-primary-light text-primary-foreground rounded-xl transition-colors"
                      aria-label="Next insight"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.aside>
          </main>
        </div>

        {/* Footer Info */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="border-t border-border/30 mt-16"
        >
          <div className="max-w-7xl mx-auto py-8 text-center">
            <p className="text-muted-foreground text-sm">
              Trusted by students at 3000+ Pre Approved Universities | 30+ Countries
              Supported | Loans available for UG, Certification, Executive & PG Programs
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default HeroSection;
