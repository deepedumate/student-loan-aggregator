import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Clock,
  Users,
  Award,
  ArrowRight,
  Zap,
} from "lucide-react";

interface ContactItem {
  title: string;
  value: string;
}

interface ContactInfoProps {
  items: ContactItem[];
}

/**
 * Premium Contact Information Component
 *
 * Features:
 * - Animated contact cards with glassmorphic design
 * - Copy-to-clipboard functionality with visual feedback
 * - Staggered reveal animations on scroll
 * - Feature showcase with gradient icons
 * - Responsive grid layout
 * - CTA section with primary actions
 *
 * Design Decisions:
 * - Cards use subtle gradients for depth
 * - Icon colors match the design system
 * - Hover effects provide interactive feedback
 * - Address card spans 2 columns for better readability
 * - Features section uses colored gradient backgrounds for visual interest
 */
const ContactInfo: React.FC<ContactInfoProps> = ({ items }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index.toString());
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Icon mapping with custom colors
  const iconMap: Record<
    string,
    { icon: React.ComponentType<any>; gradient: string }
  > = {
    Email: {
      icon: Mail,
      gradient: "from-blue-500 to-blue-600",
    },
    Phone: {
      icon: Phone,
      gradient: "from-emerald-500 to-emerald-600",
    },
    Address: {
      icon: MapPin,
      gradient: "from-violet-500 to-violet-600",
    },
  };

  // Separate address from other items
  const addressItem = items.find((item) => item.title === "Address");
  const otherItems = items.filter((item) => item.title !== "Address");

  const features = [
    {
      icon: Clock,
      text: "Response within 24 hours",
      color: "from-blue-500 to-blue-600",
      detail: "Fast turnaround on all inquiries",
    },
    {
      icon: Users,
      text: "Expert financial counselors",
      color: "from-emerald-500 to-emerald-600",
      detail: "Dedicated support team",
    },
    {
      icon: Award,
      text: "Tailor Made Solutions",
      color: "from-violet-500 to-violet-600",
      detail: "Personalized loan options",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-primary-light to-accent rounded-full" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-foreground">Get in </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about education loans? Our expert team is here to
            guide you every step of the way.
          </p>
        </motion.div>

        {/* Main Contact Info Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="glass-card rounded-3xl shadow-xl border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Email and Phone Cards */}
              {otherItems.map((item, index) => {
                const { icon: IconComponent, gradient } = iconMap[item.title];
                const isEmail = item.title === "Email";
                const isPhone = item.title === "Phone";

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-8 text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
                  >
                    {/* Hover gradient overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h5 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h5>

                      {/* Value - clickable for phone/email */}
                      {isEmail ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="block text-muted-foreground hover:text-primary mb-4 leading-relaxed transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : isPhone ? (
                        <a
                          href={`tel:${item.value}`}
                          className="block text-muted-foreground hover:text-primary mb-4 leading-relaxed transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item.value}
                        </p>
                      )}

                      {/* Copy Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(item.value, index)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-primary/10 text-secondary-foreground hover:text-primary rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        {copied === index.toString() ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Address Card - Spans 2 columns */}
              {addressItem && (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.01 }}
                  className="group relative md:col-span-2 p-8 text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 pointer-events-none"
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h5 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                      {addressItem.title}
                    </h5>

                    {/* Address */}
                    <p className="text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
                      {addressItem.value}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(addressItem.value, 999)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-primary/10 text-secondary-foreground hover:text-primary rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        {copied === "999" ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          addressItem.value
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
                      >
                        <MapPin className="w-4 h-4" />
                        View on Maps
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-heading text-foreground mb-4">
              Why Students Choose Our Support
            </h3>
            <p className="text-muted-foreground text-lg">
              We're committed to providing exceptional service at every step
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="glass-card rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 text-center h-full">
                  {/* Animated background gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 rounded-2xl pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Text */}
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.text}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-10 shadow-xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-300 max-w-3xl mx-auto"
          >
            {/* Accent decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>

            <h3 className="text-3xl font-bold font-heading text-foreground mb-4">
              Ready to Start Your Education Journey?
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Schedule a free consultation with our education loan experts today
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() =>
                  window.open(
                    "https://calendly.com/priyank-edumateglobal/speak-to-our-financing-expert?month=2025-07",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <span>Schedule Consultation</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-card border-2 border-border hover:border-primary/50 text-foreground font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                onClick={() => (window.location.href = "/faqs")}
              >
                View FAQ
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
