import React from "react";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, ExternalLink } from "lucide-react";

/**
 * SCHOLARSHIP SECTION COMPONENT - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Scholarship cards with image overlays
 * - Solid color badges and buttons
 * - Lucide React icons only
 * - Fully responsive
 * - Dark mode support
 */

const ScholarshipSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scholarships = [
    {
      id: "S66da9a21c213h",
      school_id: "U66ddae00a7668",
      name: "SEED Golden Ticket Club Scholarship",
      subheading: "Apply for 2 awards covering up to $5,000",
      about: "#",
      thumbnail: "/images/scholarship/SEED golden ticket.jpg",
      total: 10000,
      category: "business",
    },
    {
      id: "S66da9a21ce72g",
      school_id: "U66ddae00a7668",
      name: "SEED Business Leadership Scholarship",
      subheading:
        "Apply for 1 award covering up to $5,000 of your tuition fees.",
      about: "#",
      thumbnail: "/images/scholarship/Business Leadership.png",
      total: 5000,
      category: "business",
    },
    {
      id: "S66da9a21ce88t",
      school_id: "U66ddae00a7668",
      name: "SEED STEM Leadership Scholarship",
      subheading:
        "Apply for 1 award covering up to $5,000 of your tuition fees.",
      about: "#",
      thumbnail: "/images/scholarship/Stem Leadership.png",
      total: 5000,
      category: "STEM",
    },
    {
      id: "S66da9a21ce95x",
      school_id: "U66ddae00a7668",
      name: "SEED Women in Leadership Scholarship",
      subheading:
        "Apply for 1 award covering up to $5,000 of your tuition fees.",
      about: "#",
      thumbnail: "/images/scholarship/Women Leadership.png",
      total: 5000,
      category: null,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="py-12 sm:py-16 md:py-20 bg-muted/30 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Scholarship Opportunities</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6 px-4">
            <span className="text-foreground">Access </span>
            <span className="text-primary">$3.5M</span>
            <span className="text-foreground"> in SEED Scholarships</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Fill out the interest form and get eligible for the SEED Scholarship
            Fund
          </p>
        </motion.div>

        {/* Scholarship Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship.id}
              className="group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -12 }}
            >
              <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col hover:border-primary/30">
                {/* Image Section */}
                <div className="relative overflow-hidden h-40 sm:h-48 bg-muted">
                  <img
                    src={scholarship.thumbnail}
                    alt={`${scholarship.name} scholarship program`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category badge */}
                  {scholarship.category && (
                    <motion.div
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {scholarship.category.toUpperCase()}
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 text-center flex-1 flex flex-col">
                  <h5 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {scholarship.name}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed flex-grow">
                    {scholarship.subheading}
                  </p>

                  {/* Amount Card */}
                  <motion.div
                    className="bg-primary/10 border border-primary/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-primary">
                        USD {scholarship.total.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Scholarship Amount
                      </div>
                    </div>
                  </motion.div>

                  {/* Apply Button */}
                  <motion.a
                    href={`https://scholarships.seedglobaleducation.com/scholarship.php?id=${scholarship.id}`}
                    className={`group/btn relative inline-flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
                      scholarship.category === "STEM"
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    } shadow-sm hover:shadow-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    role="button"
                  >
                    <span className="relative z-10 text-sm sm:text-base">
                      Apply Now
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg text-sm sm:text-base lg:text-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore More Scholarships</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipSection;
