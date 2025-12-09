import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

/**
 * Mission Card Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Animated list items with custom bullets
 * - Staggered reveal animations
 * - Lucide React icons only
 * - Fully responsive
 */
const MissionCard: React.FC = () => {
  const missionPoints = [
    "Supports students in finding the right education loans through a transparent and unbiased process",
    "Eliminates confusion by offering clear, expert guidance—at no cost to students",
    "Collaborates with trusted banks and NBFCs without compromising student interests",
    "Builds confidence and clarity into every step of the loan journey",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      {/* Card container */}
      <div className="relative overflow-hidden h-full">
        {/* Main card */}
        <div className="relative border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 bg-card shadow-sm hover:shadow-md transition-all duration-300 h-full">
          {/* Icon header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 justify-start lg:justify-center"
          >
            {/* Icon container */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-accent/10 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
            >
              <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-foreground group-hover:text-accent transition-colors duration-300">
              Mission
            </h3>
          </motion.div>

          {/* Elegant divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-accent rounded-full mb-3 sm:mb-4 md:mb-6 lg:mx-auto"
            style={{ transformOrigin: "left" }}
          />

          {/* Mission points list with staggered animation */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left lg:text-center">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5, scale: 1.01 }}
                className="flex items-start gap-2 sm:gap-2.5 md:gap-3 group/item lg:justify-center"
              >
                {/* Custom bullet */}
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent mt-1.5 sm:mt-2 shadow-sm lg:hidden"
                />

                {/* Point text */}
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors duration-200">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Subtle bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/50 rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default MissionCard;
