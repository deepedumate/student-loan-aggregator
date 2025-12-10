import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Users,
  Target,
  Heart,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ContactForm from "./ContactForm";

const edumateReasons = [
  {
    title: "No Service Fee",
    subtitle: "100% Free for Students",
    desc: "We don't charge you a rupee. Our guidance, counselling, and end-to-end assistance come at absolutely no cost to you.",
    icon: Heart,
    stat: "₹0",
    statLabel: "Service Fee",
    iconGradient: "from-rose-500 to-pink-600",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    progressGradient: "from-rose-500 to-pink-600",
    hoverGlow: "rose",
    textAccent: "text-rose-600",
  },
  {
    title: "100% Transparent",
    subtitle: "Crystal Clear Process",
    desc: "No hidden costs, no fine print. We explain everything in simple terms so you always know what's happening.",
    icon: Shield,
    stat: "100%",
    statLabel: "Transparency",
    iconGradient: "from-blue-500 to-cyan-600",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
    progressGradient: "from-blue-500 to-cyan-600",
    hoverGlow: "blue",
    textAccent: "text-blue-600",
  },
  {
    title: "Expert Coordination",
    subtitle: "Seamless Communication",
    desc: "We handle all communication with banks and NBFCs, saving you from endless back-and-forth.",
    icon: Users,
    stat: "12+",
    statLabel: "Partners",
    iconGradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    progressGradient: "from-emerald-500 to-teal-600",
    hoverGlow: "emerald",
    textAccent: "text-emerald-600",
  },
  {
    title: "Personalized Match",
    subtitle: "Tailored Just for You",
    desc: "Every student is unique. We analyze your profile and recommend the perfect loan options for your specific needs.",
    icon: Target,
    stat: "50K+",
    statLabel: "Success Stories",
    iconGradient: "from-violet-500 to-purple-600",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    progressGradient: "from-violet-500 to-purple-600",
    hoverGlow: "violet",
    textAccent: "text-violet-600",
  },
  {
    title: "Always There",
    subtitle: "Round-the-Clock Support",
    desc: "You're never alone in this journey. We're here 24/7 to answer questions, provide guidance, and offer support.",
    icon: Star,
    stat: "24/7",
    statLabel: "Support",
    iconGradient: "from-amber-500 to-orange-600",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    progressGradient: "from-amber-500 to-orange-600",
    hoverGlow: "amber",
    textAccent: "text-amber-600",
  },
  {
    title: "Proven Track Record",
    subtitle: "Excellence You Can Trust",
    desc: "Backed by SEED Global Education with years of expertise, trusted by universities and lending partners worldwide.",
    icon: Trophy,
    stat: "99.2%",
    statLabel: "Success Rate",
    iconGradient: "from-indigo-500 to-blue-600",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
    progressGradient: "from-indigo-500 to-blue-600",
    hoverGlow: "indigo",
    textAccent: "text-indigo-600",
  },
];

const WhyEdumate = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

  // Get glow color based on card color
  const getGlowColor = (color: string) => {
    const glowColors: { [key: string]: string } = {
      rose: "rgba(244, 63, 94, 0.15)",
      blue: "rgba(59, 130, 246, 0.15)",
      emerald: "rgba(16, 185, 129, 0.15)",
      violet: "rgba(139, 92, 246, 0.15)",
      amber: "rgba(245, 158, 11, 0.15)",
      indigo: "rgba(99, 102, 241, 0.15)",
    };
    return glowColors[color] || "rgba(59, 130, 246, 0.15)";
  };

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-muted/30">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - No Fade Animation */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Why Students Choose Us
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Why <span className="text-primary">Edumate?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            We simplify your education loan journey – no jargon, no pressure,
            just genuine support from experts who care about your success.
          </p>
        </div>

        {/* Main Grid - No Fade Animation */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Form - Sticky */}
          <div className="xl:col-span-5 order-2 xl:order-1">
            <div className="xl:sticky xl:top-24">
              <motion.div
                className="relative bg-card border border-border rounded-2xl overflow-hidden"
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Form Header */}
                <div className="relative bg-gradient-to-br from-primary to-primary-light text-primary-foreground p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-xs font-semibold">
                      Get Started Today
                    </div>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-3">
                    Showcase Your Interest
                  </h3>
                  <p className="text-primary-foreground/90 text-base">
                    Take the first step towards your global education dreams
                  </p>
                </div>

                {/* Form */}
                <div className="p-8 lg:p-10" ref={formRef}>
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Colorful Reason Cards - No Fade Animation */}
          <div className="xl:col-span-7 order-1 xl:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {edumateReasons.map((reason, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group"
                >
                  <motion.div
                    className="relative h-full bg-card border border-border rounded-2xl p-8 overflow-hidden"
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                    }}
                    animate={{
                      boxShadow:
                        hoveredCard === idx
                          ? `0 20px 40px -15px ${getGlowColor(
                              reason.hoverGlow
                            )}`
                          : "0 0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {/* Subtle Background Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${reason.iconGradient} opacity-0 group-hover:opacity-5`}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Floating Particles on Hover */}
                    {hoveredCard === idx && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1.5 h-1.5 ${reason.iconBg} opacity-60 rounded-full`}
                            initial={{
                              x: Math.random() * 200,
                              y: Math.random() * 200,
                              opacity: 0,
                            }}
                            animate={{
                              y: [null, Math.random() * -80 - 20],
                              opacity: [0, 0.6, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Colorful Icon and Stat */}
                    <div className="relative flex items-start justify-between mb-6">
                      <motion.div
                        className={`p-4 rounded-xl ${reason.iconBg} text-white shadow-lg`}
                        whileHover={{
                          rotate: [0, -8, 8, 0],
                          scale: 1.15,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <reason.icon className="w-6 h-6" />
                      </motion.div>

                      <div className="text-right">
                        <motion.div
                          className="text-3xl font-bold text-foreground"
                          whileHover={{ scale: 1.1 }}
                        >
                          {reason.stat}
                        </motion.div>
                        <div className="text-xs text-muted-foreground font-medium mt-1">
                          {reason.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {reason.title}
                        </h3>
                        <p
                          className={`text-sm font-medium ${reason.textAccent}`}
                        >
                          {reason.subtitle}
                        </p>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {reason.desc}
                      </p>

                      {/* Animated Progress Bar */}
                      <div className="pt-4">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${reason.progressGradient} rounded-full`}
                            initial={{ width: "0%" }}
                            animate={{
                              width: hoveredCard === idx ? "100%" : "0%",
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      {/* Learn More with Arrow Animation */}
                      <motion.div
                        className={`flex items-center gap-2 text-sm font-semibold ${reason.textAccent} pt-2`}
                        animate={{
                          x: hoveredCard === idx ? 8 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>Learn more</span>
                        <motion.div
                          animate={{
                            x: hoveredCard === idx ? [0, 5, 0] : 0,
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: hoveredCard === idx ? Infinity : 0,
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Corner Shine Effect */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA - No Fade Animation */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="relative bg-card border border-border rounded-2xl p-10 lg:p-16 text-center overflow-hidden">
            {/* Subtle Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/3"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />

            <div className="relative">
              {/* Trust Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-success/10 px-4 py-2.5 rounded-full mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-semibold text-success">
                  Trusted by 50,000+ Students Worldwide
                </span>
              </motion.div>

              {/* CTA Title */}
              <h3 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Start Your{" "}
                <span className="text-primary">Journey?</span>
              </h3>

              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of students who trusted Edumate for their
                education loan needs
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  className="group px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Now
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <motion.button
                  className="px-10 py-4 bg-card hover:bg-muted border-2 border-border hover:border-primary/40 text-foreground font-semibold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Talk to Expert
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyEdumate;
