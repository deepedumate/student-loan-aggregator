import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Zap,
  Settings,
  TrendingUp,
  CreditCard,
  Globe,
  Building,
  Sparkles,
  Handshake,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Why Partner Edumate Component - Improved Spacing & Layout
 *
 * Features:
 * - Proper spacing matching other sections
 * - Clean design with liquid glass effects
 * - Scroll-triggered animations
 * - Expandable cards section
 * - Form integration
 * - Fully responsive
 */

const partnerReasons = [
  {
    title: "Play to your Strengths",
    desc: "When you collaborate with Edumate, you're backed by a team that handles the heavy lifting while creating seamless experiences for all. So whether you are a Career Counsellor or a Overseas Study Counsellor or Visa Counsellor or a Test Prep Expert or a Housing Loan DSA, we want you to continue Playing to Your Strengths and leave the Education Loan journey for your referred students on us.",
    icon: Zap,
    color: "primary",
  },
  {
    title: "We Handle the Hassle",
    desc: "Say goodbye to back-and-forths with multiple lenders. We coordinate with banks, manage documentation, and follow up — so you don't have to.",
    icon: Settings,
    color: "accent",
  },
  {
    title: "No Lost Leads",
    desc: "Leads are digitally tracked and transparently shared in real time. Every student touchpoint is recorded — so nothing falls through the cracks. We keep you updated on each lead's progress—so you're not left guessing.",
    icon: TrendingUp,
    color: "success",
  },
  {
    title: "Uncomplicated Payout Process",
    desc: "We make payouts and commission tracking clean, transparent, and delay-free — no manual chasing, no confusion.",
    icon: CreditCard,
    color: "primary",
  },
  {
    title: "Tap into the SEED Ecosystem",
    desc: "Get access to SEED's global business school network, exclusive scholarships, and curated student-facing events like the Business School Festival.",
    icon: Globe,
    color: "accent",
  },
  {
    title: "Built on Trust, Backed by Experience",
    desc: "With years of experience supporting student mobility through SEED Global Education, and trusted by top universities and lenders — Edumate is your reliable growth partner.",
    icon: Building,
    color: "success",
  },
];

const WhyPartnerEdumate = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const displayedReasons = showAllCards
    ? partnerReasons
    : partnerReasons.slice(0, 4);
  const hasMoreCards = partnerReasons.length > 4;

  // Initialize FormCrafts
  useEffect(() => {
    const initializeFormCrafts = () => {
      if (typeof window !== "undefined") {
        const win = window as any;

        win._fo = win._fo || [];
        win._fo.push({
          c: "aqewa",
          i: "pzrkrsf",
          m: 0,
          s: 0,
          w: 540,
          t: "rgba(197, 36, 51, 1)",
        });

        const loadScript = () => {
          const existingScript = document.querySelector(
            'script[src="https://formcrafts.com/js/fc.js"]'
          );
          if (existingScript) {
            existingScript.remove();
          }

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.async = true;
          script.src = "https://formcrafts.com/js/fc.js";
          document.body.appendChild(script);
        };

        if (win.fc && typeof win.fc.render === "function") {
          win.fc.render();
        } else {
          loadScript();
          win.fce = 1;
        }
      }
    };

    initializeFormCrafts();
  }, []);

  // Partnership statistics
  const partnershipStats = [
    {
      number: "500+",
      label: "Active Partners",
      icon: Handshake,
      color: "primary",
    },
    {
      number: "50+",
      label: "Partner Lenders",
      icon: Building,
      color: "accent",
    },
    {
      number: "₹100Cr+",
      label: "Loans Facilitated",
      icon: TrendingUp,
      color: "success",
    },
    {
      number: "98%",
      label: "Partner Satisfaction",
      icon: CheckCircle,
      color: "primary",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* FIXED: Proper container with consistent padding */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left lg:text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-card/40 border border-border/50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-sm"
          >
            <Handshake className="w-4 h-4 text-primary" />
            <span className="text-foreground">Partnership Benefits</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 sm:mb-6"
          >
            <span className="text-foreground">Why Partner with </span>
            <span className="text-primary">Edumate?</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl lg:mx-auto"
          >
            Discover the advantages that make Edumate your ideal education
            financing partner
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          {/* Form Section - Sticky on larger screens */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:sticky lg:top-8"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                {/* Decorative element */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: { duration: 4, repeat: Infinity },
                  }}
                  className="absolute top-6 right-6 text-accent/20 z-0"
                >
                  <Sparkles className="w-12 h-12" />
                </motion.div>

                <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 shadow-lg">
                  {/* Form Header */}
                  <div className="relative bg-primary text-primary-foreground p-6 sm:p-8 overflow-hidden">
                    <div className="relative text-left sm:text-center">
                      {/* Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>Get Started Today</span>
                      </motion.div>

                      <motion.h4
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-xl sm:text-2xl font-bold mb-3"
                      >
                        Start Your Partnership Journey
                      </motion.h4>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="text-primary-foreground/90 text-sm sm:text-base"
                      >
                        Fill out the form to begin your partnership with Edumate
                      </motion.p>
                    </div>
                  </div>

                  {/* Form Container */}
                  <div className="p-4 sm:p-6">
                    <div
                      id="aqewa"
                      className="rounded-2xl overflow-hidden w-full bg-muted/30 mx-auto min-h-[400px]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards Grid Section */}
          <div className="lg:col-span-7">
            {/* Cards with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <AnimatePresence mode="popLayout">
                {displayedReasons.map((reason, idx) => {
                  const IconComponent = reason.icon;
                  const colorClasses = {
                    primary: "bg-primary/10 text-primary",
                    accent: "bg-accent/10 text-accent",
                    success: "bg-success/10 text-success",
                  };

                  return (
                    <motion.div
                      key={reason.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        delay: isInView ? idx * 0.1 : 0,
                        duration: 0.5,
                        layout: { duration: 0.3 },
                      }}
                      className="group"
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="relative h-full"
                      >
                        {/* Card */}
                        <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full hover:border-primary/30">
                          {/* Icon */}
                          <motion.div
                            whileHover={{
                              rotate: [0, -10, 10, 0],
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                          >
                            <div
                              className={`w-14 h-14 sm:w-16 sm:h-16 ${
                                colorClasses[
                                  reason.color as keyof typeof colorClasses
                                ]
                              } rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden`}
                            >
                              <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
                            </div>
                          </motion.div>

                          {/* Content */}
                          <h4 className="text-lg sm:text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                            {reason.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {reason.desc}
                          </p>

                          {/* Hover check indicator */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={
                              hoveredCard === idx
                                ? { opacity: 1, scale: 1 }
                                : { opacity: 0, scale: 0 }
                            }
                            className="absolute top-6 right-6"
                          >
                            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center shadow-sm">
                              <CheckCircle className="w-5 h-5 text-success" />
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Show More Button */}
            {hasMoreCards && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="text-center mb-12"
              >
                <motion.button
                  onClick={() => setShowAllCards(!showAllCards)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                    {showAllCards ? "Show Less" : "Show More Benefits"}
                    <motion.div
                      animate={{ rotate: showAllCards ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {showAllCards ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            )}

            {/* Partnership Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            >
              {partnershipStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 1.1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="text-center group h-full"
                >
                  <div className="backdrop-blur-xl bg-card/40 border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full flex flex-col items-center justify-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 ${
                        stat.color === "primary"
                          ? "bg-primary/10"
                          : stat.color === "accent"
                          ? "bg-accent/10"
                          : "bg-success/10"
                      } rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm`}
                    >
                      <stat.icon
                        className={`w-6 h-6 ${
                          stat.color === "primary"
                            ? "text-primary"
                            : stat.color === "accent"
                            ? "text-accent"
                            : "text-success"
                        }`}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      className="relative"
                    >
                      <div
                        className={`text-2xl font-bold mb-1 ${
                          stat.color === "primary"
                            ? "text-primary"
                            : stat.color === "accent"
                            ? "text-accent"
                            : "text-success"
                        }`}
                      >
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground text-xs sm:text-sm font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerEdumate;
