import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import AboutUsHeader from "@/components/about/AboutUsHeader";
import VisionCard from "@/components/about/VisionCard";
import MissionCard from "@/components/about/MissionCard";
import ValuesSection from "@/components/about/ValueSection";
import LeadershipCarousel from "@/components/about/LeadershipCarousel";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Large Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Primary Blue Orb - Top Left */}
        <motion.div
          className="absolute -top-48 -left-48 w-96 h-96 bg-primary/10 dark:bg-primary/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent Orange Orb - Top Right */}
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-accent/8 dark:bg-accent/6 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Primary Blue Orb - Middle Left */}
        <motion.div
          className="absolute top-1/3 -left-64 w-[600px] h-[600px] bg-primary/8 dark:bg-primary/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Success Green Orb - Bottom Right */}
        <motion.div
          className="absolute bottom-32 -right-48 w-[550px] h-[550px] bg-success/8 dark:bg-success/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Accent Orange Orb - Bottom Left */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-accent/8 dark:bg-accent/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Hero Section */}
      <AboutUsHeader />

      {/* Main Content Area */}
      <div className="bg-background transition-colors duration-300 relative">
        {/* Enhanced Intro Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4">
          <div className="container mx-auto relative z-10 px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Card - hidden border on mobile, visible on larger screens */}
              <div className="sm:border sm:border-border sm:rounded-2xl lg:rounded-3xl p-0 sm:p-8 lg:p-12 sm:bg-card sm:shadow-md relative overflow-hidden">
                <div className="text-left lg:text-center max-w-5xl lg:mx-auto">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      About Edumate Global
                    </span>
                  </div>

                  {/* Main headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 leading-tight"
                  >
                    <span className="text-foreground">
                      Empowering Students.{" "}
                    </span>
                    <span className="text-primary">
                      Simplifying Education Loans.
                    </span>
                  </motion.h1>

                  {/* Elegant divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-primary lg:mx-auto mb-6 sm:mb-8 md:mb-10 rounded-full"
                  />

                  {/* Content with staggered animations */}
                  <div className="max-w-4xl lg:mx-auto space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-muted-foreground"
                    >
                      At Edumate, we understand that financing higher education
                      can be a complex, often overwhelming experience. With
                      countless lenders, varying terms, and limited guidance,
                      students and families are frequently left navigating this
                      critical step alone.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="font-bold text-primary text-xl sm:text-2xl"
                    >
                      We're here to change that.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-muted-foreground"
                    >
                      Edumate is a student-first platform designed to simplify
                      the education loan journey. We provide unbiased,
                      end-to-end support—from understanding loan options and
                      comparing offers, to handling documentation and
                      coordinating with Banks and NBFCs. All of this, with one
                      clear goal: helping students access the funding they need,
                      without stress or confusion.
                    </motion.p>

                    {/* Highlighted callout box */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="bg-primary/5 border border-primary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm"
                    >
                      <p className="text-foreground font-semibold text-sm sm:text-base md:text-lg">
                        <span className="font-bold text-primary">
                          We are not a lender.
                        </span>{" "}
                        We do not push products that do not make sense to you.
                        We are your partner through the funding journey—fair,
                        transparent, and entirely focused on your needs.
                      </p>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-muted-foreground"
                    >
                      Our role is simple, yet powerful: To give students the
                      clarity and confidence they need to move forward—with the
                      right financing and the right support.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="text-primary font-bold text-lg sm:text-xl md:text-2xl pt-3 sm:pt-4"
                    >
                      Let's make your education journey smoother, smarter, and
                      truly empowering.
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-2 sm:px-4">
          <div className="container mx-auto px-2 sm:px-4">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-left lg:text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Our Foundation
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-3 sm:mb-4">
                Vision & Mission
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl lg:mx-auto">
                Driving our commitment to student success through clear purpose
                and unwavering dedication
              </p>
            </motion.div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <VisionCard />
              <MissionCard />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <ValuesSection />

        {/* Leadership Section */}
        <LeadershipCarousel />
      </div>
    </div>
  );
};

export default AboutPage;
