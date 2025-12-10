import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import HomeHeroSection from "@/components/showcaseInterest/HomeHeroSection";
import WhyEdumate from "@/components/home/Whyedumate";
import ProcessSteps from "@/components/showcaseInterest/ProcessStep";
import StudyAbroadSection from "@/components/showcaseInterest/StudyAbroadSection";
import UniversityLogosSection from "@/components/showcaseInterest/UniversityLogosSection";
import LendingPartnersSlider from "@/components/showcaseInterest/LendingPartnersSlider";

const ShowcaseInterestPage = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  } as const;

  return (
    <div className="presentation-page bg-background transition-colors duration-300 overflow-hidden">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <HomeHeroSection />
        </motion.section>

        {/* Why Edumate Section */}
        <motion.section
          className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-muted/30 relative"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-border" />
          <WhyEdumate />
        </motion.section>

        {/* Process Steps */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProcessSteps />
        </motion.section>

        {/* Study Abroad Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <StudyAbroadSection />
        </motion.section>

        {/* University Partners Section */}
        <motion.section
          className="py-12 sm:py-16 md:py-20 bg-muted/30"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4">
            <UniversityLogosSection />
          </div>
        </motion.section>

        {/* Partner Slider */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <LendingPartnersSlider />
        </motion.section>

        {/* Footer CTA Section - RESPONSIVE ALIGNMENT */}
        <motion.section
          className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-card border-t border-border"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-left lg:text-center"
              >
                {/* Trust Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-success/10 border border-success/20 mb-6 sm:mb-8 md:mb-10"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-success">
                    Trusted by 10,000+ students
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 leading-[1.15] tracking-tight"
                >
                  <span className="text-foreground">Ready to Start Your</span>
                  <br className="hidden sm:block" />
                  <span className="inline-block mt-1 sm:mt-2 text-primary">
                    Education Journey?
                  </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl lg:mx-auto leading-relaxed"
                >
                  Join thousands of students who have successfully secured their
                  education funding through our AI-powered platform. Get
                  personalized loan offers in minutes.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start lg:justify-center items-stretch sm:items-center mb-10 sm:mb-12 md:mb-14"
                >
                  {/* Primary CTA */}
                  <motion.button
                    className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg w-full sm:w-auto sm:min-w-[200px] transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                      Get Started Now
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-lg sm:rounded-xl border border-border hover:border-primary/30 transition-all duration-300 w-full sm:w-auto sm:min-w-[200px]"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                      Learn More
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-xs sm:text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
                    </div>
                    <span className="whitespace-nowrap">
                      No credit score impact
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
                    </div>
                    <span className="whitespace-nowrap">
                      100% secure & confidential
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success" />
                    </div>
                    <span className="whitespace-nowrap">
                      Get offers in 2 minutes
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

/**
 * SCROLL TO TOP COMPONENT
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 p-3 sm:p-4 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-[-90deg] group-hover:rotate-[-90deg] transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ShowcaseInterestPage;
