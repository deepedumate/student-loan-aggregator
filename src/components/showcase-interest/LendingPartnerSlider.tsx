import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, TrendingUp, Users } from "lucide-react";

/**
 * LENDING PARTNERS SLIDER COMPONENT - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - White background for logo visibility
 * - Infinite scroll animation
 * - Lucide React icons only
 * - Fully responsive with mobile-left/desktop-center alignment
 * - Dark mode support
 */

const LendingPartnersSlider = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partnersRow1 = [
    { name: "Avanse", logo: "/images/logos/lending-partners/Avanse.png" },
    { name: "Credila", logo: "/images/logos/lending-partners/Credila.png" },
    { name: "MPower", logo: "/images/logos/lending-partners/MPower.png" },
    {
      name: "Prodigy",
      logo: "/images/logos/lending-partners/Prodigy-Finance.png",
    },
    {
      name: "IDFC FIRST",
      logo: "/images/logos/lending-partners/IDFC-FIRST.png",
    },
    { name: "Union Bank", logo: "/images/logos/lending-partners/union.png" },
    { name: "PNB", logo: "/images/logos/lending-partners/pnb.png" },
    { name: "Yes Bank", logo: "/images/logos/lending-partners/yes_bank.png" },
    { name: "Axis Bank", logo: "/images/logos/lending-partners/axis_bank.png" },
    {
      name: "Poonawalla",
      logo: "/images/logos/lending-partners/poonawalla.png",
    },
  ];

  // Duplicate for seamless loop
  const allPartners = [...partnersRow1, ...partnersRow1, ...partnersRow1];

  const features = [
    {
      icon: Shield,
      text: "Trusted Partners",
      color: "success",
    },
    {
      icon: TrendingUp,
      text: "Best Rates",
      color: "primary",
    },
    {
      icon: Users,
      text: "Expert Support",
      color: "accent",
    },
  ];

  return (
    <div
      className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - RESPONSIVE ALIGNMENT */}
        <motion.div
          className="text-left lg:text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Trusted Financial Partners</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6">
            <span className="text-foreground">Our </span>
            <span className="text-primary">Lending Partners</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:mx-auto leading-relaxed mb-6 sm:mb-8">
            We've partnered with India's most trusted financial institutions to
            bring you the best education loan options
          </p>

          {/* Features */}
          <div className="flex justify-start lg:justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 flex-wrap">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`p-1.5 sm:p-2 rounded-lg ${
                    feature.color === "primary"
                      ? "bg-primary/10"
                      : feature.color === "success"
                      ? "bg-success/10"
                      : "bg-accent/10"
                  }`}
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
                </div>
                <span className="text-muted-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="w-20 sm:w-24 h-1 bg-primary lg:mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* First Row - Moving Left to Right */}
        <div className="mb-6 sm:mb-8 relative py-3 sm:py-4 overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{
              x: [0, -1680],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 120,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
            {allPartners.map((partner, index) => (
              <motion.div
                key={`row1-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <div className="group cursor-pointer bg-card border border-border rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md w-48 sm:w-56 h-24 sm:h-28 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                  <div className="relative flex items-center justify-center w-36 sm:w-44 h-14 sm:h-16 p-3 sm:p-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade masks */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background) 0%, transparent 10%, transparent 90%, var(--background) 100%)",
            }}
          />
        </div>

        {/* Second Row - Moving Right to Left */}
        <div className="relative py-3 sm:py-4 overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6"
            animate={{
              x: [-1680, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 120,
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
          >
            {allPartners.map((partner, index) => (
              <motion.div
                key={`row2-${index}`}
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <div className="group cursor-pointer bg-card border border-border rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md w-48 sm:w-56 h-24 sm:h-28 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                  <div className="relative flex items-center justify-center w-36 sm:w-44 h-14 sm:h-16 p-3 sm:p-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade masks */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--background) 0%, transparent 10%, transparent 90%, var(--background) 100%)",
            }}
          />
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              {
                value: "15+",
                label: "Lending Partners",
                color: "primary",
              },
              {
                value: "₹1L - ₹2Cr",
                label: "Loan Range",
                color: "accent",
              },
              {
                value: "8.5%+",
                label: "Interest Rates",
                color: "success",
              },
            ].map((stat, index) => (
              <motion.div key={index} className="group" whileHover={{ y: -4 }}>
                <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
                  <motion.div
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${
                      stat.color === "primary"
                        ? "text-primary"
                        : stat.color === "accent"
                        ? "text-accent"
                        : "text-success"
                    }`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: index * 0.1,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LendingPartnersSlider;
