import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle,
  Clock,
  Headphones,
  Calendar,
  Linkedin,
  Instagram,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Logo } from "../ui/logo";

/**
 * Contact Header Component - With Floating Orbs on RIGHT
 *
 * Features:
 * - Large floating orbs positioned on right side
 * - Clean theme-based design
 * - Parallax scroll effects
 * - Staggered animations
 * - Lucide React icons only
 * - Fully responsive for all devices
 * - Dark mode support
 */
const ContactUsHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const supportFeatures = [
    {
      icon: Clock,
      text: "24/7 Available",
      detail: "Round-the-clock support",
    },
    {
      icon: Headphones,
      text: "Expert Team",
      detail: "Loan specialists ready",
    },
    {
      icon: Calendar,
      text: "Quick Response",
      detail: "Within 2 hours",
    },
  ];

  // Container animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Large Floating Background Orbs - RIGHT SIDE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Blue Orb - Top Right */}
        <motion.div
          className="absolute -top-32 right-0 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent Orange Orb - Middle Right */}
        <motion.div
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-accent/8 dark:bg-accent/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Success Green Orb - Bottom Right */}
        <motion.div
          className="absolute bottom-20 right-1/4 w-[480px] h-[480px] bg-success/8 dark:bg-success/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Primary Blue Orb - Bottom Center-Right */}
        <motion.div
          className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-primary/8 dark:bg-primary/6 rounded-full blur-3xl"
          animate={{
            scale: [1.05, 1, 1.05],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="pt-16 sm:pt-20 lg:pt-24">
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            style={{ y, opacity }}
            className="py-8 sm:py-12 md:py-16 lg:py-20"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
            >
              {/* Floating Badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-start lg:justify-center"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Get in Touch
                  </span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                variants={itemVariants}
                className="space-y-2 sm:space-y-6 md:space-y-8 text-left lg:text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-foreground leading-tight">
                  Let's Talk About
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block mt-1 sm:mt-2 md:mt-3 text-primary"
                  >
                    Your Dreams
                  </motion.span>
                </h1>

                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl lg:mx-auto"
                >
                  Have questions about education loans? Need personalized
                  guidance? Our expert team is here to help you navigate your
                  financing journey with confidence.
                </motion.p>
              </motion.div>

              {/* Logo - Hidden on mobile */}
              <motion.div
                variants={itemVariants}
                className="hidden sm:flex justify-start lg:justify-center"
              >
                <Logo size="lg" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Support Features & Social Grid */}
          <div className="pb-6 sm:pb-8 md:pb-12 lg:pb-16">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
              {/* Left: Support Features */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6 sm:space-y-8"
              >
                <div className="space-y-3 sm:space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-1 bg-primary rounded-full"
                  />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground">
                    Why Choose Our Support?
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    We understand that choosing an education loan is a crucial
                    decision. Our dedicated support team ensures you get the
                    guidance you need, when you need it.
                  </p>
                </div>

                {/* Feature Cards */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 sm:space-y-4"
                >
                  {supportFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group relative"
                    >
                      {/* Card */}
                      <div className="border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-card shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                          >
                            <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                              {feature.text}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground truncate">
                              {feature.detail}
                            </div>
                          </div>

                          {/* Animated arrow indicator */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="text-primary flex-shrink-0"
                          >
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: Social & Trust Signals */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Quick Response Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-foreground truncate">
                        Quick Response
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Within 2 hours
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Indicator Card - Secure & Confidential */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-foreground truncate">
                        Secure & Confidential
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Your data is protected with enterprise-grade security
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media Card - Stay Connected */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border-2 border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-card shadow-md hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="space-y-4 sm:space-y-6 text-center">
                    {/* Animated icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto"
                    >
                      <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-2">
                        Stay Connected
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Follow us for updates, tips, and student success stories
                      </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 sm:gap-4">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.linkedin.com/company/edumate-global"
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.instagram.com/edumateglobal?igsh=ZzgzN2NlZG1iajlo"
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsHeader;
