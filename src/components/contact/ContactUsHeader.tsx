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
 * Premium Fintech Contact Header Component
 *
 * Features:
 * - Parallax scroll effects on hero elements
 * - Staggered animations for feature cards
 * - Glassmorphic design with backdrop blur
 * - Smooth hover interactions
 * - Responsive grid layout
 * - Dark mode support
 *
 * Design Decisions:
 * - Large hero text with gradient for impact
 * - Feature cards with icon gradients for visual interest
 * - Social media integration with branded colors
 * - Floating badge animation for attention
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
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Headphones,
      text: "Expert Team",
      detail: "Loan specialists ready",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Calendar,
      text: "Quick Response",
      detail: "Within 2 hours",
      gradient: "from-violet-500 to-violet-600",
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
    <div className="relative bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

      {/* Gradient orbs for depth */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />

      <div className="pt-20 lg:pt-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            style={{ y, opacity }}
            className="py-12 sm:py-16 lg:py-20"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8 sm:space-y-12"
            >
              {/* Floating Badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-start lg:justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl text-primary-700 dark:text-primary-300 px-6 py-3 rounded-full text-sm font-semibold border border-primary-200/50 dark:border-primary-700/50 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  <span>Get in Touch</span>
                </motion.div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                variants={itemVariants}
                className="space-y-6 text-left lg:text-center"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading text-gray-900 dark:text-gray-100 leading-tight">
                  Let's Talk About
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="block mt-2 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent"
                  >
                    Your Dreams
                  </motion.span>
                </h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl lg:mx-auto"
                >
                  Have questions about education loans? Need personalized
                  guidance? Our expert team is here to help you navigate your
                  financing journey with confidence.
                </motion.p>
              </motion.div>

              {/* Logo */}
              <motion.div
                variants={itemVariants}
                className="flex justify-start lg:justify-center"
              >
                <Logo size="lg" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Support Features & Social Grid */}
          <div className="pb-12 sm:pb-16">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Left: Support Features */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                  <h2 className="text-3xl lg:text-4xl font-bold font-heading text-gray-900 dark:text-gray-100">
                    Why Choose Our Support?
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
                  className="space-y-4"
                >
                  {supportFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="group relative"
                    >
                      {/* Glassmorphic Card */}
                      <div className="glass-card p-5 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-4">
                          {/* Icon with gradient background */}
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                          >
                            <feature.icon className="w-7 h-7 text-white" />
                          </motion.div>

                          <div className="flex-1">
                            <div className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                              {feature.text}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {feature.detail}
                            </div>
                          </div>

                          {/* Animated arrow indicator */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="text-primary"
                          >
                            <TrendingUp className="w-5 h-5" />
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
                className="space-y-6"
              >
                {/* Social Media Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-3xl p-8 shadow-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="space-y-6 text-center">
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
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl"
                    >
                      <MessageCircle className="w-8 h-8" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                        Stay Connected
                      </h3>
                      <p className="text-muted-foreground">
                        Follow us for updates, tips, and student success stories
                      </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.linkedin.com/company/edumate-global"
                        className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-6 h-6" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.instagram.com/edumateglobal?igsh=ZzgzN2NlZG1iajlo"
                        className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="w-6 h-6" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Indicator Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-6 shadow-soft border border-success/20 hover:border-success/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <Shield className="w-6 h-6 text-success" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Secure & Confidential
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Your data is protected with enterprise-grade security
                      </div>
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
