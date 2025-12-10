import React from "react";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Globe,
  Star,
  MapPin,
  Award,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Zap,
  Earth,
  Building,
} from "lucide-react";

/**
 * STUDY ABROAD SECTION COMPONENT - Improved Spacing & Layout
 *
 * Features:
 * - Proper spacing matching Lending Partners section
 * - Clean theme-based design (no gradients)
 * - Split layout with content and flag grid
 * - Lucide React icons only
 * - Fully responsive with proper mobile/desktop padding
 * - Dark mode support
 */

const StudyAbroadSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: GraduationCap,
      text: "All Degree Levels",
      description: "From UG to PhD programs",
      color: "primary",
    },
    {
      icon: Globe,
      text: "Global Destinations",
      description: "30+ countries available",
      color: "success",
    },
    {
      icon: Star,
      text: "Best Loan Options",
      description: "Competitive rates & terms",
      color: "accent",
    },
    {
      icon: Award,
      text: "Top Universities",
      description: "3000+ partner institutions",
      color: "primary",
    },
  ];

  const countries = [
    { name: "USA", flag: "/images/flags2/usa.jpg", programs: "250+" },
    { name: "UK", flag: "/images/flags2/uk.jpg", programs: "150+" },
    { name: "Canada", flag: "/images/flags2/canada.jpg", programs: "150+" },
    {
      name: "Australia",
      flag: "/images/flags2/australia.jpg",
      programs: "50+",
    },
    { name: "Germany", flag: "/images/flags2/germany.jpg", programs: "200+" },
    { name: "France", flag: "/images/flags2/france.jpg", programs: "100+" },
    { name: "India", flag: "/images/flags2/india.jpg", programs: "500+" },
    { name: "Ireland", flag: "/images/flags2/ireland.jpg", programs: "20+" },
  ];

  const benefits = [
    { text: "No collateral for loans up to ₹40L", icon: DollarSign },
    { text: "Competitive interest rates from 8.5%", icon: TrendingUp },
    { text: "Flexible repayment options", icon: RotateCcw },
    { text: "Quick approval process", icon: Zap },
  ];

  const statsDetails = [
    {
      number: "30+",
      label: "Countries",
      icon: Earth,
      color: "primary",
    },
    {
      number: "3000+",
      label: "Universities",
      icon: Building,
      color: "success",
    },
    {
      number: "₹3Cr",
      label: "Max. Loan Amount",
      icon: DollarSign,
      color: "accent",
    },
  ];

  // Animation variants
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
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden"
      ref={ref}
    >
      {/* FIXED: Changed from px-2 sm:px-4 to px-4 for proper mobile spacing */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Content Side - LEFT ALIGNED */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              <span>Global Education Partner</span>
            </div>

            {/* Main Heading */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-tight mb-4 sm:mb-6">
                <span className="block text-foreground mb-2">
                  Your Gateway to
                </span>
                <span className="block text-primary">Global Education</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                From undergraduate degrees to PhD programs, we provide
                comprehensive loan solutions for your international education
                journey.
              </p>
            </div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <motion.div
                    className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 hover:shadow-md transition-all duration-300 hover:border-primary/30"
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`p-2 rounded-lg sm:rounded-xl flex-shrink-0 ${
                          feature.color === "primary"
                            ? "bg-primary/10"
                            : feature.color === "success"
                            ? "bg-success/10"
                            : "bg-accent/10"
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            feature.color === "primary"
                              ? "text-primary"
                              : feature.color === "success"
                              ? "text-success"
                              : "text-accent"
                          }`}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-xs sm:text-sm mb-1">
                          {feature.text}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
                Why Choose Our Loan Services?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-xs sm:text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-1.5 sm:p-2 bg-success/10 rounded-lg flex-shrink-0">
                      <benefit.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success" />
                    </div>
                    <span className="text-muted-foreground">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              No matter your degree or destination—US, UK, Canada, Australia, or
              Europe—we offer the{" "}
              <span className="font-semibold text-foreground bg-primary/10 px-2 py-1 rounded">
                best loan options
              </span>{" "}
              tailored to your program and financial needs.
            </p>
          </motion.div>

          {/* Flag Grid Side */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header - RESPONSIVE ALIGNMENT */}
            <div className="text-left lg:text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">
                Study Destinations
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground lg:mx-auto max-w-md">
                Choose from 30+ countries worldwide
              </p>
            </div>

            {/* Countries Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {countries.map((country, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <motion.div
                    className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:border-primary/30"
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <div className="text-center">
                      {/* Flag */}
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all duration-300">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Country name */}
                      <div className="font-semibold text-foreground text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors">
                        {country.name}
                      </div>

                      {/* Programs count */}
                      <div className="text-xs text-muted-foreground">
                        {country.programs}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {statsDetails.map((stat, index) => (
            <motion.div
              key={index}
              className="group text-center"
              variants={itemVariants}
            >
              <motion.div
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-3"
                >
                  <div
                    className={`inline-flex p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                      stat.color === "primary"
                        ? "bg-primary/10"
                        : stat.color === "success"
                        ? "bg-success/10"
                        : "bg-accent/10"
                    }`}
                  >
                    <stat.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "success"
                          ? "text-success"
                          : "text-accent"
                      }`}
                    />
                  </div>
                </motion.div>
                <div
                  className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    stat.color === "primary"
                      ? "text-primary"
                      : stat.color === "success"
                      ? "text-success"
                      : "text-accent"
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StudyAbroadSection;
