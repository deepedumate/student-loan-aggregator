import React from "react";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  User,
  FileText,
  Shield,
  DollarSign,
  ArrowRight,
  ArrowDown,
  CheckCircle,
} from "lucide-react";

/**
 * PROCESS STEPS COMPONENT - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Horizontal flow for desktop
 * - Vertical timeline for mobile
 * - Lucide React icons only
 * - Fully responsive with mobile-left/desktop-center alignment
 * - Dark mode support
 */

const ProcessSteps = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description:
        "Schedule a convenient time to discuss your education plans and financial needs.",
      color: "primary",
      details: [
        "Quick 15-min consultation",
        "Flexible timing",
        "No commitment required",
      ],
    },
    {
      icon: User,
      title: "Connect with Counselor",
      description:
        "Get paired with our expert education loan counselors for personalized guidance.",
      color: "accent",
      details: [
        "Experienced professionals",
        "Personalized approach",
        "University-specific advice",
      ],
    },
    {
      icon: FileText,
      title: "Document Assessment",
      description:
        "Our team reviews your profile to identify the best loan options for your needs.",
      color: "primary",
      details: [
        "Complete profile review",
        "Eligibility assessment",
        "Best match identification",
      ],
    },
    {
      icon: Shield,
      title: "We Handle Everything",
      description:
        "Sit back while we manage all communications with lenders for a stress-free experience.",
      color: "success",
      details: [
        "End-to-end management",
        "Regular updates",
        "Hassle-free process",
      ],
    },
    {
      icon: DollarSign,
      title: "Receive Funds",
      description:
        "Get quick approval and seamless fund disbursement directly to your institution.",
      color: "accent",
      details: [
        "Fast approval process",
        "Direct disbursement",
        "Multiple payment options",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
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
        {/* Header - RESPONSIVE ALIGNMENT */}
        <motion.div
          className="text-left lg:text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>Simple 5-Step Process</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-3 sm:mb-4 md:mb-6">
            <span className="text-foreground">Your Loan Approval </span>
            <span className="text-primary">Roadmap</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl lg:mx-auto leading-relaxed">
            Navigate through our streamlined process to secure your education
            funding smoothly and efficiently
          </p>
        </motion.div>

        {/* Steps - Desktop Horizontal Layout */}
        <div className="relative">
          <motion.div
            className="hidden lg:flex justify-center items-stretch gap-3 xl:gap-4 relative px-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Card */}
                <motion.div className="flex-1 max-w-xs" variants={stepVariants}>
                  <motion.div
                    className="bg-card border border-border rounded-2xl xl:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 h-full relative overflow-hidden group"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="p-6 xl:p-8 text-center relative z-10 flex flex-col h-full">
                      {/* Icon Container */}
                      <div className="relative mb-6 xl:mb-8">
                        <motion.div
                          className={`mx-auto w-16 h-16 xl:w-20 xl:h-20 rounded-xl xl:rounded-2xl flex items-center justify-center ${
                            step.color === "primary"
                              ? "bg-primary/10"
                              : step.color === "accent"
                              ? "bg-accent/10"
                              : "bg-success/10"
                          } relative shadow-sm`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <step.icon
                            className={`w-8 h-8 xl:w-10 xl:h-10 ${
                              step.color === "primary"
                                ? "text-primary"
                                : step.color === "accent"
                                ? "text-accent"
                                : "text-success"
                            }`}
                          />
                          {/* Number badge */}
                          <span
                            className={`absolute -top-2 xl:-top-3 -right-2 xl:-right-3 w-7 h-7 xl:w-8 xl:h-8 ${
                              step.color === "primary"
                                ? "bg-primary"
                                : step.color === "accent"
                                ? "bg-accent"
                                : "bg-success"
                            } text-white text-xs xl:text-sm font-bold rounded-full flex items-center justify-center shadow-md ring-4 ring-background`}
                          >
                            {index + 1}
                          </span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <h6 className="text-lg xl:text-xl font-bold mb-3 xl:mb-4 text-foreground leading-tight">
                        {step.title}
                      </h6>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                        {step.description}
                      </p>

                      {/* Details list - Shows on hover */}
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ height: 0 }}
                      >
                        <div className="space-y-2 text-xs text-muted-foreground">
                          {step.details.map((detail, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 justify-center"
                            >
                              <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    className={`flex items-center justify-center mt-12 ${
                      step.color === "primary"
                        ? "text-primary"
                        : step.color === "accent"
                        ? "text-accent"
                        : "text-success"
                    } relative z-20 flex-shrink-0`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <div className="bg-card/80 rounded-full p-2 xl:p-3 shadow-sm border border-border">
                      <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6" />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Steps - Mobile/Tablet Vertical Layout */}
          <motion.div
            className="lg:hidden space-y-4 sm:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div variants={stepVariants}>
                  <motion.div
                    className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-3 sm:p-4 md:p-6 relative z-10">
                      <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center ${
                              step.color === "primary"
                                ? "bg-primary/10"
                                : step.color === "accent"
                                ? "bg-accent/10"
                                : "bg-success/10"
                            } relative shadow-sm`}
                          >
                            <step.icon
                              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                                step.color === "primary"
                                  ? "text-primary"
                                  : step.color === "accent"
                                  ? "text-accent"
                                  : "text-success"
                              }`}
                            />
                            <span
                              className={`absolute -top-1 sm:-top-1.5 md:-top-2 -right-1 sm:-right-1.5 md:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${
                                step.color === "primary"
                                  ? "bg-primary"
                                  : step.color === "accent"
                                  ? "bg-accent"
                                  : "bg-success"
                              } text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h6 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 sm:mb-2 text-foreground leading-tight">
                            {step.title}
                          </h6>
                          <p className="text-muted-foreground text-xs leading-relaxed mb-2 sm:mb-3">
                            {step.description}
                          </p>

                          {/* Details */}
                          <div className="space-y-1">
                            {step.details.map((detail, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-muted-foreground"
                              >
                                <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Arrow down for mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    className={`flex justify-center ${
                      step.color === "primary"
                        ? "text-primary"
                        : step.color === "accent"
                        ? "text-accent"
                        : "text-success"
                    } -my-2`}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  >
                    <div className="bg-card/80 rounded-full p-2 sm:p-3 shadow-sm border border-border">
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
