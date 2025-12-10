import React, { useState, useEffect } from "react";
import { easeOut, motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Users,
  Award,
  Target,
  Heart,
  Shield,
  TrendingUp,
} from "lucide-react";

/**
 * About Us Header Component - With Floating Orbs
 *
 * Features:
 * - Large floating background orbs in theme colors
 * - Clean theme-based design
 * - Staggered content animations
 * - Lucide React icons only
 * - Fully responsive for all devices
 * - Dark mode support
 */
const AboutUsHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Large Floating Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Blue Orb - Top Right */}
        <motion.div
          className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent Orange Orb - Bottom Left */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-accent/8 dark:bg-accent/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Success Green Orb - Middle */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-[450px] h-[450px] bg-success/8 dark:bg-success/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Main content container with standardized spacing */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust indicators bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-4 sm:py-6 border-b border-border/50"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Status indicators */}
              <div className="flex items-center gap-4 sm:gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                    Trusted Platform
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                    Since 2020
                  </span>
                </motion.div>
              </div>

              {/* Key value props */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="border border-border bg-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-sm"
                >
                  <span className="text-muted-foreground">Mission:</span>
                  <span className="ml-2 font-bold text-foreground">
                    Student Success
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="border border-border bg-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-sm"
                >
                  <span className="text-muted-foreground">Focus:</span>
                  <span className="ml-2 font-bold text-primary">
                    Transparency
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Hero content */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left content - 7 columns */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="lg:col-span-7 space-y-6 sm:space-y-8"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    About Edumate
                  </span>
                </div>

                {/* Main headline */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 sm:space-y-6"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-foreground leading-tight">
                    Simplifying Education
                    <span className="block mt-2 sm:mt-3 text-primary">
                      Loans for Students
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                    We're your trusted partner in making quality education
                    accessible through transparent, student-first loan guidance
                    since 2020.
                  </p>
                </motion.div>

                {/* Key stats */}
                <motion.div variants={itemVariants}>
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {[
                      {
                        value: "50K+",
                        label: "Students Helped",
                        color: "primary",
                      },
                      {
                        value: "₹500Cr+",
                        label: "Loans Facilitated",
                        color: "accent",
                      },
                      {
                        value: "99.2%",
                        label: "Success Rate",
                        color: "success",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="group text-center cursor-default"
                      >
                        <div
                          className={`text-2xl sm:text-3xl font-bold mb-1 ${
                            stat.color === "primary"
                              ? "text-primary"
                              : stat.color === "accent"
                              ? "text-accent"
                              : "text-success"
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

                {/* Social links */}
                <motion.div variants={itemVariants}>
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground font-semibold">
                      Connect with us:
                    </span>
                    <motion.a
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.linkedin.com/company/edumate-global"
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-600 hover:bg-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.instagram.com/edumateglobal?igsh=ZzgzN2NlZG1iajlo"
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-pink-600 hover:bg-pink-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right content - 5 columns */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-5 space-y-4 sm:space-y-6"
              >
                {/* Logo card */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-card shadow-sm hover:shadow-md transition-all duration-300 text-center group"
                >
                  <img
                    src="/edumate_logo.png"
                    className="h-12 sm:h-16 w-auto mx-auto mb-3 sm:mb-4 filter dark:brightness-100 group-hover:scale-110 transition-transform duration-300"
                    alt="Edumate Logo"
                  />
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Trusted education financing platform
                  </p>
                </motion.div>

                {/* Why choose us card */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      Why Choose Us
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Unbiased guidance, zero processing fees, and personalized
                    support throughout your loan journey.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Value props grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pb-12 sm:pb-16 lg:pb-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Shield,
                  title: "Our Values",
                  items: [
                    "Student-first approach",
                    "Complete transparency",
                    "Zero hidden costs",
                  ],
                  color: "primary",
                },
                {
                  icon: Users,
                  title: "Our Impact",
                  items: [
                    "100+ universities",
                    "50+ banking partners",
                    "24/7 expert support",
                  ],
                  color: "accent",
                },
                {
                  icon: TrendingUp,
                  title: "Since 2020",
                  description:
                    "Licensed platform serving students across India and internationally with proven results.",
                  color: "success",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group h-full"
                >
                  <div className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md transition-all duration-300 h-full relative overflow-hidden">
                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${
                            card.color === "primary"
                              ? "bg-primary/10"
                              : card.color === "accent"
                              ? "bg-accent/10"
                              : "bg-success/10"
                          } rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <card.icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              card.color === "primary"
                                ? "text-primary"
                                : card.color === "accent"
                                ? "text-accent"
                                : "text-success"
                            }`}
                          />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">
                          {card.title}
                        </h3>
                      </div>
                      {card.items ? (
                        <div className="space-y-2">
                          {card.items.map((item, i) => (
                            <div
                              key={i}
                              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                              • {item}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {card.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHeader;
