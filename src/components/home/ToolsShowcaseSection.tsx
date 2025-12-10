import React from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, ArrowRight, Check } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  iconGradient: string;
  href: string;
  ctaText: string;
  index: number;
  badge?: string;
}

/**
 * Mobile-Optimized Tool Card
 * - Colorful icons (blue/orange)
 * - Primary buttons (consistent)
 * - Beautiful mobile spacing
 */
const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  features,
  icon,
  iconGradient,
  href,
  ctaText,
  index,
  badge,
}) => {
  return (
    <motion.a
      href={href}
      className="group block h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="h-full bg-card rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl p-6 sm:p-8 flex flex-col">
        {/* Colorful Icon and Badge */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className={`inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${iconGradient} text-white rounded-2xl items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          {badge && (
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.3 }}
            >
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-success">
                {badge}
              </span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight leading-tight">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>

          {/* Features - Mobile Optimized */}
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-foreground/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.4 + idx * 0.1 }}
              >
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button - PRIMARY COLOR (Consistent for both!) */}
        <motion.div
          className="w-full px-6 py-3.5 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300" />
        </motion.div>
      </div>
    </motion.a>
  );
};

/**
 * Mobile-Optimized Tools Showcase Section
 *
 * Features:
 * - Colorful icons (AI = Blue, EMI = Orange)
 * - Consistent primary buttons
 * - Perfect mobile spacing
 * - Touch-optimized
 */
const ToolsShowcaseSection: React.FC = () => {
  const tools = [
    {
      title: "AI Eligibility Checker",
      description:
        "Instant AI assessment — find your eligibility before applying. No credit hit.",
      features: [
        "Instant results",
        "Personalized suggestions",
        "No credit hit",
        "Secure & private",
      ],
      icon: <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />,
      iconGradient: "from-blue-500 to-blue-600", // Blue gradient
      href: "https://edumateglobal.com/resources/tools/ai-loan-eligibility-checker",
      ctaText: "Check Eligibility",
      badge: "Free to use",
    },
    {
      title: "EMI Calculator",
      description:
        "Compare repayment options and plan your finances with our smart EMI calculator.",
      features: [
        "Real-time calculations",
        "Multiple scenarios",
        "Interest breakdown",
        "Payment schedule",
      ],
      icon: <Calculator className="w-7 h-7 sm:w-8 sm:h-8" />,
      iconGradient: "from-orange-500 to-orange-600", // Orange gradient
      href: "https://edumateglobal.com/resources/tools/loan-emi-calculator",
      ctaText: "Calculate EMI",
      badge: "Free to use",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header - Mobile Optimized */}
        <div className="max-w-3xl mb-10 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                Free Tools
              </span>
            </div>

            {/* Title - Mobile Optimized */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight leading-tight">
              Smart Tools for Better Decisions
            </h2>

            {/* Description - Mobile Optimized */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Use our AI-powered tools to check your eligibility and calculate
              monthly repayments before applying for your education loan.
            </p>
          </motion.div>
        </div>

        {/* Tools Grid - Mobile Optimized Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} index={index} />
          ))}
        </div>

        {/* Bottom Trust Banner - Mobile Optimized */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-6 py-4 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              <span className="text-sm sm:text-base font-medium text-foreground">
                Trusted by 50,000+ students
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-border rounded-full" />
            <span className="text-sm sm:text-base text-muted-foreground">
              100% Free • No Hidden Charges
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsShowcaseSection;
