import React, { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import FaqHeader from "./FaqHeader";

/**
 * FAQ Page Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Smooth Framer Motion animations
 * - Lucide React icons only
 * - Fully responsive for all devices
 * - Dark mode support
 */

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string>("collapseOne");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? "" : id);
  };

  const faqData: FAQ[] = [
    {
      id: "collapseOne",
      question: "Do I have to pay Edumate for your services?",
      answer:
        "No. Edumate does not charge students for our services. While some banks may have processing fees, we are completely transparent and will walk you through every charge—honestly.",
      category: "Pricing",
    },
    {
      id: "collapseTwo",
      question: "Are you a lender or a bank?",
      answer:
        "No, we are not lenders. We are facilitators. We connect you to trusted loan providers and help you choose what's right for you.",
      category: "About Us",
    },
    {
      id: "collapseThree",
      question: "How is Edumate different from other loan platforms?",
      answer:
        "We put students first. That means no aggressive selling, no confusing terms, and no bias. Just friendly, expert support tailored to your goals.",
      category: "Services",
    },
    {
      id: "collapseFour",
      question: "How long does the loan process take?",
      answer:
        "It depends on the lender, your profile, and the documentation. While we aim to help you move quickly, our focus is on getting it right—not rushing.",
      category: "Process",
    },
    {
      id: "collapseFifth",
      question: "What kinds of loans do you help with?",
      answer:
        "We assist with loans for higher education abroad and India—covering tuition fees, living expenses, and more. Whether you need a secured or unsecured loan, we help you explore both.",
      category: "Loans",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Students Helped",
      icon: Users,
      color: "primary",
    },
    {
      number: "50+",
      label: "Partner Lenders",
      icon: TrendingUp,
      color: "accent",
    },
    {
      number: "24/7",
      label: "Expert Support",
      icon: Clock,
      color: "primary",
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <FaqHeader />

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4">
        <div className="container mx-auto max-w-7xl px-2 sm:px-4">
          {/* Section Header with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left mb-12 sm:mb-16 lg:mb-20"
          >
            {/* Badge with subtle animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Frequently Asked Questions</span>
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-3 sm:mb-4 md:mb-6"
            >
              <span className="text-foreground">Get Your</span>
              <br className="sm:hidden" />
              <span className="text-foreground"> </span>
              <span className="text-primary">Questions Answered</span>
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-16 sm:w-20 lg:w-24 h-1 sm:h-1.5 bg-primary mb-6 sm:mb-8 rounded-full"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl"
            >
              Get quick answers to the most common queries about our services,
              eligibility, documentation, and how{" "}
              <span className="font-semibold text-primary">EduMate</span> helps
              you navigate your education loan journey with confidence.
            </motion.p>
          </motion.div>

          {/* FAQ Accordion Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              className="space-y-2 sm:space-y-3 md:space-y-4"
              variants={containerVariants}
            >
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div
                    initial={false}
                    className="bg-background border border-border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Question Header */}
                    <motion.button
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      className="w-full text-left p-3 sm:p-4 md:p-5 lg:p-6 font-semibold transition-all duration-300 flex items-start justify-between gap-2 sm:gap-3 md:gap-4 hover:bg-muted/30"
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={activeAccordion === faq.id}
                      aria-controls={faq.id}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-1 min-w-0">
                        {/* Category Badge with animation */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex-shrink-0"
                        >
                          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border border-primary/20">
                            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span>{faq.category}</span>
                          </span>
                        </motion.div>

                        {/* Question Text */}
                        <div className="flex-1 min-w-0 sm:mt-0.5">
                          <span className="text-foreground text-xs sm:text-sm md:text-base lg:text-lg font-semibold leading-relaxed block">
                            {faq.question}
                          </span>
                        </div>
                      </div>

                      {/* Toggle Icon with rotation animation */}
                      <motion.div
                        animate={{
                          rotate: activeAccordion === faq.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                            activeAccordion === faq.id
                              ? "bg-primary/10 text-primary shadow-sm"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {activeAccordion === faq.id ? (
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </div>
                      </motion.div>
                    </motion.button>

                    {/* Answer Content with AnimatePresence */}
                    <AnimatePresence initial={false}>
                      {activeAccordion === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                            <motion.div
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="bg-muted/50 rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border-l-4 border-primary"
                            >
                              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm lg:text-base">
                                {faq.answer}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern" />
              </div>

              <div className="relative max-w-3xl text-left">
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Still have questions?</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-3 sm:mb-4"
                >
                  Can't find what you're looking for?
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-primary-foreground/90 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed"
                >
                  Our expert team is here to help you with personalized guidance
                  for your education loan journey.
                </motion.p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="bg-card text-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-white/50 text-sm sm:text-base"
                  onClick={() =>
                    window.open(
                      "https://calendly.com/priyank-edumateglobal/speak-to-our-financing-expert?month=2025-07",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Contact Our Experts
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Section with enhanced cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover="hover"
                className="group"
              >
                <div className="relative overflow-hidden border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-card shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Background on hover */}
                  <div
                    className={`absolute inset-0 ${
                      stat.color === "primary" ? "bg-primary/5" : "bg-accent/5"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                        stat.color === "primary"
                          ? "bg-primary/10"
                          : "bg-accent/10"
                      } rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-sm`}
                    >
                      <stat.icon
                        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                          stat.color === "primary"
                            ? "text-primary"
                            : "text-accent"
                        }`}
                      />
                    </motion.div>

                    {/* Number */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 md:mb-3 text-center ${
                        stat.color === "primary"
                          ? "text-primary"
                          : "text-accent"
                      }`}
                    >
                      {stat.number}
                    </motion.div>

                    {/* Label */}
                    <div className="text-muted-foreground text-center font-semibold text-xs sm:text-sm lg:text-base">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
