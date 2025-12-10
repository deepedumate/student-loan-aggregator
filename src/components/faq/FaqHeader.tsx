import React, { useState, useEffect } from "react";
import { easeOut, motion } from "framer-motion";
import {
  HelpCircle,
  MessageCircle,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface Category {
  icon: React.ElementType;
  title: string;
  count: string;
  color: "primary" | "accent";
}

const FaqHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // FAQ categories with icons and colors
  const faqCategories: Category[] = [
    { icon: BookOpen, title: "Loan Process", count: "12", color: "primary" },
    { icon: CheckCircle, title: "Eligibility", count: "8", color: "accent" },
    { icon: Clock, title: "Processing Time", count: "6", color: "primary" },
    { icon: MessageCircle, title: "Support", count: "5", color: "accent" },
  ];

  // Popular questions for quick access
  const popularQuestions = [
    "How long does loan approval take?",
    "What documents do I need?",
    "Can I apply without a cosigner?",
    "What are the interest rates?",
    "How to check my application status?",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Large Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Blue Orb - Top Left */}
        <motion.div
          className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-primary/10 dark:bg-primary/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent Orange Orb - Top Right */}
        <motion.div
          className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-accent/8 dark:bg-accent/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Success Green Orb - Middle */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-success/8 dark:bg-success/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Primary Blue Orb - Bottom Right */}
        <motion.div
          className="absolute bottom-20 right-1/3 w-[480px] h-[480px] bg-primary/8 dark:bg-primary/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Main content with proper spacing for fixed nav */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Content - 7 columns */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6 sm:space-y-8"
              >
                {/* Badge with GRADIENT */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border border-primary/20 text-foreground px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  <span>FAQ & Support</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-foreground leading-tight">
                    Find Answers to
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="block mt-2 sm:mt-3 md:mt-4 text-primary"
                    >
                      Your Questions
                    </motion.span>
                  </h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                  >
                    Get instant answers to common questions about education
                    loans, eligibility requirements, and application processes.
                    Can't find what you're looking for? Our support team is here
                    to help.
                  </motion.p>
                </motion.div>

                {/* Logo with animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                      Powered by
                    </span>
                  </div>
                  <img
                    src="/edumate_logo.png"
                    className="h-7 sm:h-8 md:h-10 w-auto dark:brightness-100"
                    alt="Edumate Logo"
                  />
                </motion.div>
              </motion.div>

              {/* Right Sidebar - 5 columns */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="lg:col-span-5 space-y-4 sm:space-y-6"
              >
                {/* Quick Stats Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      Quick Stats
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { value: "31+", label: "Total FAQs", color: "primary" },
                      {
                        value: "95%",
                        label: "Solved Instantly",
                        color: "accent",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-3 sm:p-4 bg-muted/30 hover:bg-muted/50 rounded-lg sm:rounded-xl transition-all duration-300"
                      >
                        <div
                          className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 ${
                            stat.color === "primary"
                              ? "text-primary"
                              : "text-accent"
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Categories Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
                    Browse Categories
                  </h3>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2 sm:space-y-3"
                  >
                    {faqCategories.map((category, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/60 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`w-9 h-9 sm:w-10 sm:h-10 ${
                              category.color === "primary"
                                ? "bg-primary/10"
                                : "bg-accent/10"
                            } rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300`}
                          >
                            <category.icon
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                category.color === "primary"
                                  ? "text-primary"
                                  : "text-accent"
                              }`}
                            />
                          </motion.div>

                          <span className="font-semibold text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors duration-300 truncate">
                            {category.title}
                          </span>
                        </div>

                        <span className="text-xs bg-primary/10 text-primary px-2 sm:px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ml-2">
                          {category.count}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Popular Questions Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pb-12 sm:pb-16"
          >
            <div className="border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-card shadow-md">
              {/* Section Header */}
              <div className="text-left mb-6 sm:mb-8 lg:mb-10">
                {/* Badge with GRADIENT */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border border-primary/20 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-primary mb-4"
                >
                  <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Most Asked</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground mb-3"
                >
                  Popular Questions
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-muted-foreground text-sm sm:text-base max-w-2xl"
                >
                  Quick answers to the most common questions from students
                </motion.p>
              </div>

              {/* Questions Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              >
                {popularQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-4 sm:p-5 bg-muted/30 hover:bg-muted/60 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300"
                      >
                        <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </motion.div>

                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300 font-medium">
                        {question}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FaqHeader;
