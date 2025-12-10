import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Handshake,
  TrendingUp,
  Sparkles,
  Globe,
  Shield,
  ArrowRight,
} from "lucide-react";

/**
 * Partner Header Component - Improved Spacing & Layout
 *
 * Features:
 * - Proper spacing matching other sections
 * - Clean design with liquid glass effects
 * - Smooth parallax scrolling effects
 * - Staggered animations
 * - Fully responsive
 * - Dark mode support
 */

const PartnerHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Impact stats
  const impactStats = [
    {
      value: "₹500Cr+",
      label: "Disbursed",
      color: "primary",
    },
    {
      value: "50K+",
      label: "Students",
      color: "accent",
    },
    {
      value: "500+",
      label: "Partners",
      color: "success",
    },
  ];

  // Partnership value propositions
  const keyValues = [
    {
      icon: TrendingUp,
      text: "Higher Revenue",
      description: "Boost your earnings with competitive commissions",
    },
    {
      icon: Shield,
      text: "Trusted Platform",
      description: "Industry-leading security and reliability",
    },
    {
      icon: Globe,
      text: "Pan-India Reach",
      description: "Connect with students nationwide",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Main Content Container - FIXED: Proper spacing */}
      <div className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-2">
                <Handshake className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Partnership Benefits
                </span>
              </div>

              {/* Headline with staggered reveal */}
              <div className="space-y-4">
                {["Partner.", "Profit.", "Progress."].map((word, index) => (
                  <motion.h1
                    key={word}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.3 + index * 0.15,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-none text-primary"
                  >
                    {word}
                  </motion.h1>
                ))}

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-xl pt-4"
                >
                  Join India's fastest-growing EdFintech ecosystem and transform
                  education financing together.
                </motion.p>
              </div>

              {/* Value Propositions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {keyValues.map((value, index) => (
                  <motion.div
                    key={value.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group backdrop-blur-xl bg-card/40 border border-border/50 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <value.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </motion.div>
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                        {value.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span className="relative flex items-center gap-2 text-sm sm:text-base">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column: Stats & Branding */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Central Logo/Brand Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative flex justify-center mb-12"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="backdrop-blur-xl bg-card/40 border border-border/50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 relative group"
                >
                  <div className="relative">
                    <div className="text-5xl font-display font-bold text-primary mb-2">
                      Edumate
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      EdFintech Platform
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Impact Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {impactStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.7 + index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group"
                  >
                    <div className="backdrop-blur-xl bg-card/40 border border-border/50 p-6 rounded-2xl text-center relative overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{
                          delay: 0.8 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="relative"
                      >
                        <div
                          className={`text-2xl md:text-3xl font-bold mb-2 ${
                            stat.color === "primary"
                              ? "text-primary"
                              : stat.color === "accent"
                              ? "text-accent"
                              : "text-success"
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm font-semibold text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Success Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="text-center mb-2"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 backdrop-blur-xl bg-card/40 border border-border/50 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-success rounded-full"
                  />
                  <span className="font-semibold text-sm text-foreground">
                    Growing Partnership Network
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-border/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnerHeader;
