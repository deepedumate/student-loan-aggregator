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
 * Contact Information Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Copy-to-clipboard functionality
 * - Staggered reveal animations
 * - Lucide React icons only
 * - Fully responsive for all devices
 * - Dark mode support
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

  // Icon mapping
  const iconMap: Record<
    string,
    { icon: React.ComponentType<any>; color: string }
  > = {
    Email: {
      icon: Mail,
      color: "text-blue-600 dark:text-blue-400",
    },
    Phone: {
      icon: Phone,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    Address: {
      icon: MapPin,
      color: "text-violet-600 dark:text-violet-400",
    },
  };

  // Separate address from other items
  const addressItem = items.find((item) => item.title === "Address");
  const otherItems = items.filter((item) => item.title !== "Address");

  const features = [
    {
      icon: Clock,
      text: "Response within 24 hours",
      detail: "Fast turnaround on all inquiries",
    },
    {
      icon: Users,
      text: "Expert financial counselors",
      detail: "Dedicated support team",
    },
    {
      icon: Award,
      text: "Tailor Made Solutions",
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
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left lg:text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 bg-primary rounded-full" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-3 sm:mb-4 md:mb-6">
            <span className="text-foreground">Get in </span>
            <span className="text-primary">Touch</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:mx-auto leading-relaxed">
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
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="sm:border sm:border-border sm:rounded-2xl lg:rounded-3xl sm:shadow-md sm:bg-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Email and Phone Cards */}
              {otherItems.map((item, index) => {
                const { icon: IconComponent, color } = iconMap[item.title];
                const isEmail = item.title === "Email";
                const isPhone = item.title === "Phone";

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-4 sm:p-6 md:p-8 text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
                  >
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.5 }}
                        className="mb-3 sm:mb-4 md:mb-6"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          <IconComponent
                            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${color}`}
                          />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h5 className="text-base sm:text-lg md:text-xl font-bold font-heading text-foreground mb-2 sm:mb-2.5 md:mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h5>

                      {/* Value - clickable for phone/email */}
                      {isEmail ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="block text-sm sm:text-base text-muted-foreground hover:text-primary mb-3 sm:mb-4 leading-relaxed transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : isPhone ? (
                        <a
                          href={`tel:${item.value}`}
                          className="block text-sm sm:text-base text-muted-foreground hover:text-primary mb-3 sm:mb-4 leading-relaxed transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                          {item.value}
                        </p>
                      )}

                      {/* Copy Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(item.value, index)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary hover:bg-primary/10 text-secondary-foreground hover:text-primary rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        {copied === index.toString() ? (
                          <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Address Card - Spans 2 columns on desktop */}
              {addressItem && (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.01 }}
                  className="group relative md:col-span-2 p-4 sm:p-6 md:p-8 text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
                >
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                      className="mb-3 sm:mb-4 md:mb-6"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-violet-600 dark:text-violet-400" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h5 className="text-base sm:text-lg md:text-xl font-bold font-heading text-foreground mb-2 sm:mb-2.5 md:mb-3 group-hover:text-primary transition-colors">
                      {addressItem.title}
                    </h5>

                    {/* Address */}
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 md:mb-6 leading-relaxed max-w-md mx-auto px-2">
                      {addressItem.value}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(addressItem.value, 999)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary hover:bg-primary/10 text-secondary-foreground hover:text-primary rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        {copied === "999" ? (
                          <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Copy</span>
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
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg"
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>View on Maps</span>
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
          className="mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="text-left lg:text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-foreground mb-2 sm:mb-3 md:mb-4">
              Why Students Choose Our Support
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl lg:mx-auto">
              We're committed to providing exceptional service at every step
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-card shadow-sm hover:shadow-md transition-all duration-300 text-center h-full">
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 shadow-sm group-hover:shadow-md transition-shadow"
                    >
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                    </motion.div>

                    {/* Text */}
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors px-2">
                      {feature.text}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground px-2">
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
            className="border-2 border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 bg-card shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300 max-w-3xl mx-auto"
          >
            {/* Accent decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6"
            >
              <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-primary" />
            </motion.div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-foreground mb-2 sm:mb-3 md:mb-4 px-2 sm:px-4">
              Ready to Start Your Education Journey?
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4">
              Schedule a free consultation with our education loan experts today
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() =>
                  window.open(
                    "https://calendly.com/priyank-edumateglobal/speak-to-our-financing-expert?month=2025-07",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <span className="text-sm sm:text-base">
                  Schedule Consultation
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-card border-2 border-border hover:border-primary/50 text-foreground font-semibold rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-300 text-sm sm:text-base"
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
