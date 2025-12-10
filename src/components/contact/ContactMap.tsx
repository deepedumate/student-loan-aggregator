import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Video,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Train,
  Bus,
  Car,
  ArrowRight,
} from "lucide-react";

/**
 * Contact Map Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Animated map loading
 * - Transport options showcase
 * - Virtual meeting CTA
 * - Lucide React icons only
 * - Fully responsive for all devices
 * - Dark mode support
 */
const ContactMap: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const locationFeatures = [
    {
      icon: MapPin,
      label: "Prime Location",
      value: "Lower Parel Business District",
    },
    { icon: Clock, label: "Office Hours", value: "Mon-Fri: 9:00 AM - 6:00 PM" },
    { icon: Phone, label: "Direct Line", value: "+91 7208743607" },
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
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Header */}
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
            <span className="text-foreground">Visit Our </span>
            <span className="text-primary">Office</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:mx-auto leading-relaxed">
            Located in the heart of Mumbai's business district, we're easily
            accessible by all major transport options.
          </p>
        </motion.div>

        {/* Location Features Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12"
        >
          {locationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="border border-border rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <feature.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">
                    {feature.label}
                  </div>
                  <div className="font-semibold text-sm sm:text-base text-foreground truncate">
                    {feature.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Map Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <div className="border-2 border-border rounded-2xl sm:rounded-3xl bg-card shadow-lg overflow-hidden">
            {/* Map Header */}
            <div className="p-4 sm:p-6 border-b border-border bg-primary/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-1 truncate">
                    Edumate Global Office
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground truncate">
                    Trade Link Building, Lower Parel, Mumbai
                  </p>
                </div>

                {/* Status Indicator */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-success/10 border border-success/20 rounded-full flex-shrink-0"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-success rounded-full"
                  />
                  <span className="text-xs sm:text-sm text-success font-semibold whitespace-nowrap">
                    Open Now
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative bg-muted">
              {/* Loading Skeleton */}
              {!mapLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: mapLoaded ? 0 : 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-muted z-10"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </motion.div>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium">
                      Loading map...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.8929903556445!2d72.82921177771254!3d19.004090467139214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce932f47756f%3A0xc480633b0cecc064!2sTradelink!5e0!3m2!1sen!2sin!4v1750070266957!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Floating Directions Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mapLoaded ? 1 : 0, y: mapLoaded ? 0 : 20 }}
                transition={{ delay: 0.5 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.google.com/dir/?api=1&destination=Trade Link Building, Lower Parel, Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-card/95 backdrop-blur-sm border-2 border-primary/20 text-foreground font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-base"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="hidden sm:inline">Get Directions</span>
                  <span className="sm:hidden">Directions</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Virtual Meeting CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            className="border-2 border-border rounded-3xl p-8 sm:p-10 lg:p-12 bg-card shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <div className="text-center">
              {/* Simple Icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
              >
                <Video className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-3 px-2">
                Prefer Virtual Meetings?
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Schedule a video call with our education loan experts from
                anywhere.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto px-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() =>
                    window.open(
                      "https://calendly.com/priyank-edumateglobal/speak-to-our-financing-expert?month=2025-07",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <span className="text-base">Schedule Consultation</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-foreground font-semibold rounded-xl hover:shadow-md transition-all duration-300"
                  onClick={() => (window.location.href = "tel:+917208743607")}
                >
                  <span className="text-base">Call Now</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;
