import React, { useState, useEffect, useRef } from "react";
import { easeOut, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star,
  Shield,
  Users,
  Target,
  Heart,
  Trophy,
  Sparkles,
  DollarSign,
  GraduationCap,
  Zap,
  Headphones,
} from "lucide-react";

/**
 * WHY EDUMATE COMPONENT - Improved Spacing & Layout
 *
 * Features:
 * - Proper spacing matching Lending Partners section
 * - Clean theme-based design (no gradients)
 * - Card overlays on images
 * - Lucide React icons only
 * - Sticky form section
 * - Fully responsive with proper mobile/desktop padding
 * - Dark mode support
 */

const edumateReasons = [
  {
    title: "No Service Fee for Students",
    desc: "We don't charge you a rupee for our support. Our guidance, counselling, and end-to-end assistance come at no cost to you. That's our promise — fair and student-first.",
    image: "/images/primary-images/loan_expert.png",
    icon: Heart,
    color: "primary",
  },
  {
    title: "100% Transparent Process",
    desc: "We explain the loan process in a way that makes sense. No hidden costs, no fine print. Just clarity, so you always know what's happening and why.",
    image: "/images/primary-images/loan_offers.png",
    icon: Shield,
    color: "accent",
  },
  {
    title: "Smooth Coordination with Financial Institutions",
    desc: "We manage communication with banks and NBFCs, helping you avoid back-and-forth or confusion. You focus on your goals — we'll take care of the paperwork.",
    image: "/images/primary-images/document_submission.png",
    icon: Users,
    color: "success",
  },
  {
    title: "Customised Loan Options",
    desc: "Every student is different. That's why we assess your profile carefully and recommend loan products that are best suited to your needs — not just what's available.",
    image: "/images/primary-images/loan_approval.png",
    icon: Target,
    color: "accent",
  },
  {
    title: "Student-Centric Support, Always",
    desc: "You're not just another application to us. Whether you're at the initial inquiry or the final approval stage, we're here to simplify, explain, and support — like a friend who's done this before.",
    image: "/images/primary-images/loan_expert.png",
    icon: Star,
    color: "primary",
  },
  {
    title: "Trusted by Students and Institutions Alike",
    desc: "Backed by years of experience at SEED Global Education and industry experts, Edumate is trusted by top universities and lending partners to guide students toward their global education dreams.",
    image: "/images/primary-images/loan_offers.png",
    icon: Trophy,
    color: "success",
  },
];

const WhyEdumate = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (
      window.location.hash === "#form" ||
      window.location.hash === "#contactForm"
    ) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const features = [
    { text: "No hidden fees", icon: DollarSign },
    { text: "Expert guidance", icon: GraduationCap },
    { text: "Quick approval", icon: Zap },
    { text: "24/7 support", icon: Headphones },
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

  const cardVariants = {
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
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      {/* FIXED: Changed from no wrapper to proper section wrapper with consistent padding */}
      <div className="container mx-auto px-1 relative z-10" ref={ref}>
        {/* Header Section - RESPONSIVE ALIGNMENT */}
        <motion.div
          className="text-left lg:text-center mb-12 sm:mb-16 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Why Students Choose Us</span>
          </motion.div>

          {/* Main heading */}
          <h3 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Why <span className="text-primary">Edumate?</span>
          </h3>

          {/* Decorative divider */}
          <motion.div
            className="w-20 sm:w-24 h-1 bg-primary lg:mx-auto mb-6 sm:mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl lg:mx-auto leading-relaxed mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We simplify your education loan journey — no jargon, no pressure,
            just genuine support from experts who care about your success.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            className="flex flex-wrap justify-start lg:justify-center gap-2 sm:gap-3"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="inline-flex items-center gap-2 bg-card border border-border px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 relative z-10">
          {/* Form Section - Sticky */}
          <div className="xl:col-span-5 order-2 xl:order-1">
            <motion.div
              className="xl:sticky xl:top-8"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative overflow-hidden">
                <div className="relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
                  {/* Form Header */}
                  <div className="relative bg-primary text-primary-foreground p-5 sm:p-6 lg:p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
                        <span>Get Started Today</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-3">
                        Showcase Your Interest
                      </h2>
                      <p className="text-primary-foreground/90 text-sm sm:text-base">
                        Take the first step towards your global education dreams
                      </p>
                    </motion.div>
                  </div>

                  {/* Form Container */}
                  <div className="p-5 sm:p-6 lg:p-8" ref={formRef}>
                    <div className="space-y-4">
                      <div className="text-center text-muted-foreground text-sm">
                        Replace this div with your ContactForm component
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="xl:col-span-7 order-1 xl:order-2">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {edumateReasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="group cursor-pointer"
                  variants={cardVariants}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[420px] sm:h-[440px] hover:border-primary/30">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={reason.image}
                        alt={reason.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-foreground/50" />

                    {/* Floating icon */}
                    <motion.div
                      className="absolute top-6 right-6 z-20"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div
                        className={`p-3 rounded-xl sm:rounded-2xl shadow-md ${
                          reason.color === "primary"
                            ? "bg-primary"
                            : reason.color === "accent"
                            ? "bg-accent"
                            : "bg-success"
                        }`}
                      >
                        <reason.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8 text-white">
                      <motion.div
                        className="flex flex-col gap-3"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <h3 className="text-lg sm:text-xl font-bold leading-tight">
                          {reason.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-5 sm:line-clamp-4">
                          {reason.desc}
                        </p>

                        {/* Progress bar */}
                        <motion.div
                          className={`h-1 rounded-full mt-2 ${
                            reason.color === "primary"
                              ? "bg-primary"
                              : reason.color === "accent"
                              ? "bg-accent"
                              : "bg-success"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: hoveredCard === idx ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEdumate;
