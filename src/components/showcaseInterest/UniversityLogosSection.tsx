import React, { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import universityDetails from "../../data/universityDetails.json";

/**
 * UNIVERSITY LOGOS SECTION COMPONENT - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Grid layout with hover animations
 * - Expandable view with smooth transitions
 * - Lucide React icons only
 * - Fully responsive with mobile-left/desktop-center alignment
 * - Dark mode support
 */

const UniversityLogosSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const allSchools = universityDetails;
  const displaySchools = showAll ? allSchools : allSchools.slice(0, 12);
  const hasMoreSchools = allSchools.length > 12;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-2 sm:px-2 py-8 sm:py-12"
      ref={ref}
    >
      {/* Header Section - RESPONSIVE ALIGNMENT - Hidden on mobile */}
      <motion.div
        className="hidden lg:block text-left lg:text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Schools Supported So Far</span>
        </div>

        <h4 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-foreground mb-2 sm:mb-3">
          We support students applying to world-renowned institutions.
        </h4>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl lg:mx-auto">
          You can apply for education loans while applying to these institutions
          or any others.
        </p>
      </motion.div>

      {/* Universities Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <AnimatePresence>
          {displaySchools.map((school, index) => (
            <motion.div
              key={`${school.university}_${index}`}
              className="group text-center"
              variants={itemVariants}
              layout
            >
              {/* Logo Card */}
              <motion.div
                className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 p-2 sm:p-4 lg:p-6 flex items-center justify-center mb-3 sm:mb-4"
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className="relative w-full h-28 sm:h-32 md:h-36">
                  <img
                    src={school.logo_file_name}
                    alt={school.university}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* University Name */}
              <motion.h3
                className="text-xs sm:text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {school.university}
                {school.school_name ? ` - ${school.school_name}` : ""}
              </motion.h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All Button */}
      {hasMoreSchools && (
        <motion.div
          className="text-center mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  View All Partner Universities
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default UniversityLogosSection;
