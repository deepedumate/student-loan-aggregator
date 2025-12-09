import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Shield,
  Users,
  CheckCircle,
  Heart,
  Lightbulb,
} from "lucide-react";

/**
 * Values Section Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Grid layout with cards
 * - Icon with solid backgrounds
 * - Staggered reveal animations
 * - Lucide React icons only
 * - Fully responsive
 */
const ValueSection: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "Building relationships through honest communication and clear processes",
      color: "primary",
    },
    {
      icon: Users,
      title: "Student-First Approach",
      description:
        "Every decision is made with student success and wellbeing in mind",
      color: "accent",
    },
    {
      icon: GraduationCap,
      title: "Educational Excellence",
      description:
        "Supporting academic dreams with the right financial foundation",
      color: "success",
    },
    {
      icon: Heart,
      title: "Personalized Support",
      description:
        "Understanding that every student's journey is unique and valuable",
      color: "pink",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description:
        "Consistent, dependable service throughout your education journey",
      color: "primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Continuously improving our platform for better student experiences",
      color: "accent",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4 bg-background relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-2 sm:px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left lg:text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Our Values</span>
          </div>

          {/* Section title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-3 sm:mb-4">
            What Drives Us Forward
          </h2>

          {/* Elegant divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 sm:w-20 lg:w-24 h-1 bg-primary lg:mx-auto rounded-full"
          />
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            const colorClasses = {
              primary: "bg-primary/10 text-primary",
              accent: "bg-accent/10 text-accent",
              success: "bg-success/10 text-success",
              pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group h-full"
              >
                {/* Card container */}
                <div className="border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 bg-card shadow-sm hover:shadow-md transition-all duration-300 h-full relative overflow-hidden">
                  {/* Content */}
                  <div className="relative text-center">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                        colorClasses[value.color as keyof typeof colorClasses]
                      } rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-foreground mb-2 sm:mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>

                    {/* Mini divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                      className={`h-0.5 w-10 sm:w-12 md:w-16 ${
                        value.color === "primary"
                          ? "bg-primary"
                          : value.color === "accent"
                          ? "bg-accent"
                          : value.color === "success"
                          ? "bg-success"
                          : "bg-pink-600"
                      } mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full`}
                    />

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
