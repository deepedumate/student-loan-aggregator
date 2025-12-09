import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Shield,
  Users,
  Target,
  Heart,
  Trophy,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import ContactForm from "./ContactForm";

const edumateReasons = [
  {
    title: "No Service Fee for Students",
    desc: "We don't charge you a rupee for our support. Our guidance, counselling, and end-to-end assistance come at no cost to you. That's our promise – fair and student-first.",
    image: "/images/primary-images/loan_expert.png",
    icon: Heart,
  },
  {
    title: "100% Transparent Process",
    desc: "We explain the loan process in a way that makes sense. No hidden costs, no fine print. Just clarity, so you always know what's happening and why.",
    image: "/images/primary-images/loan_offers.png",
    icon: Shield,
  },
  {
    title: "Smooth Coordination with Financial Institutions",
    desc: "We manage communication with banks and NBFCs, helping you avoid back-and-forth or confusion. You focus on your goals – we'll take care of the paperwork.",
    image: "/images/primary-images/document_submission.png",
    icon: Users,
  },
  {
    title: "Customised Loan Options",
    desc: "Every student is different. That's why we assess your profile carefully and recommend loan products that are best suited to your needs – not just what's available.",
    image: "/images/primary-images/loan_approval.png",
    icon: Target,
  },
  {
    title: "Student-Centric Support, Always",
    desc: "You're not just another application to us. Whether you're at the initial inquiry or the final approval stage, we're here to simplify, explain, and support – like a friend who's done this before.",
    image: "/images/primary-images/loan_expert.png",
    icon: Star,
  },
  {
    title: "Trusted by Students and Institutions Alike",
    desc: "Backed by years of experience at SEED Global Education and industry experts, Edumate is trusted by top universities and lending partners to guide students toward their global education dreams.",
    image: "/images/primary-images/loan_offers.png",
    icon: Trophy,
  },
];

const features = [
  { text: "No hidden fees", icon: CheckCircle2 },
  { text: "Expert guidance", icon: CheckCircle2 },
  { text: "Quick approval", icon: CheckCircle2 },
  { text: "24/7 support", icon: CheckCircle2 },
];

const WhyEdumate = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.location.hash === "#form" || window.location.hash === "#contactForm") {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative py-16 lg:py-20 overflow-hidden bg-background">
      {/* Ambient Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.02] rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-primary/5 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Students Choose Us</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-foreground">Why </span>
              <span className="text-primary">Edumate?</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              We simplify your education loan journey – no jargon, no pressure, just genuine support from experts who care about your success.
            </p>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-card/40 border border-border/50 rounded-full"
                >
                  <feature.icon className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          {/* Form Section */}
          <motion.div
            className="xl:col-span-5 order-2 xl:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="xl:sticky xl:top-8">
              <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl overflow-hidden">
                {/* Form Header */}
                <div className="relative bg-gradient-to-br from-primary to-primary-light text-primary-foreground p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                      Get Started Today
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                    Showcase Your Interest
                  </h2>
                  <p className="text-primary-foreground/90 text-sm lg:text-base">
                    Take the first step towards your global education dreams
                  </p>
                </div>

                {/* Form Container */}
                <div className="p-6 lg:p-8" ref={formRef}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="xl:col-span-7 order-1 xl:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {edumateReasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl overflow-hidden h-[360px] hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={reason.image}
                        alt={reason.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/40 dark:from-slate-950/95 dark:via-slate-950/70 dark:to-slate-950/40" />

                    {/* Icon */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="p-3 rounded-xl bg-primary/90 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                        <reason.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-white">
                      <div className="space-y-3">
                        <h3 className="text-lg lg:text-xl font-display font-bold leading-tight">
                          {reason.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                          {reason.desc}
                        </p>

                        {/* Progress Bar */}
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-primary rounded-full transition-all duration-500 ${
                              hoveredCard === idx ? "w-full" : "w-0"
                            }`}
                          />
                        </div>

                        {/* Learn More Link */}
                        <div
                          className={`flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 ${
                            hoveredCard === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                          }`}
                        >
                          Learn more
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-2xl p-8 lg:p-12"
        >
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of students who trusted Edumate for their education loan needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-11 rounded-md px-8 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-accent to-accent-light text-white">
              Get Started Now
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-11 rounded-md px-8 shadow-lg hover:shadow-xl transition-all text-white">
              Talk to Expert
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyEdumate;