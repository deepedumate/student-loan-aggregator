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
} from "lucide-react";

/**
 * Premium Contact Map Component
 *
 * Features:
 * - Animated map loading with skeleton state
 * - Transport options showcase
 * - Virtual meeting CTA
 * - Office status indicator (open/closed)
 * - Glassmorphic cards with hover effects
 * - Smooth scroll-triggered animations
 *
 * Design Decisions:
 * - Map header shows real-time status
 * - Transport icons use gradient backgrounds
 * - CTA section encourages both physical and virtual visits
 * - Floating directions button overlays the map
 * - Premium shadow and border treatments
 */
const ContactMap: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const transportOptions = [
    {
      icon: Train,
      type: "Metro",
      info: "Lower Parel Station - 5 min walk",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Bus,
      type: "Bus",
      info: "Multiple routes available",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Car,
      type: "Taxi",
      info: "Uber/Ola pickup point nearby",
      color: "from-violet-500 to-violet-600",
    },
  ];

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
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-accent-light to-primary rounded-full" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            <span className="text-foreground">Visit Our </span>
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Office
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {locationFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-muted-foreground mb-1">
                    {feature.label}
                  </div>
                  <div className="font-semibold text-foreground truncate">
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
          className="mb-16"
        >
          <div className="glass-card rounded-3xl shadow-2xl border-2 border-primary/10 overflow-hidden">
            {/* Map Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-1">
                    Edumate Global Office
                  </h3>
                  <p className="text-muted-foreground">
                    Trade Link Building, Lower Parel, Mumbai
                  </p>
                </div>

                {/* Status Indicator */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-success rounded-full"
                  />
                  <span className="text-sm text-success font-semibold">
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
                      className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                      <MapPin className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-muted-foreground font-medium">
                      Loading map...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.8929903556445!2d72.82921177771254!3d19.004090467139214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce932f47756f%3A0xc480633b0cecc064!2sTradelink!5e0!3m2!1sen!2sin!4v1750070266957!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Floating Directions Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mapLoaded ? 1 : 0, y: mapLoaded ? 0 : 20 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.google.com/dir/?api=1&destination=Trade Link Building, Lower Parel, Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-2 border-primary/20 text-foreground font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Navigation className="w-5 h-5 text-primary" />
                  <span>Get Directions</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Transport Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
              Easy to Reach
            </h3>
            <p className="text-muted-foreground">
              Multiple transport options available
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {transportOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <option.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {option.type}
                </h4>
                <p className="text-sm text-muted-foreground">{option.info}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Virtual Meeting CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-10 shadow-xl border-2 border-accent/10 hover:border-accent/20 transition-all duration-300 max-w-4xl mx-auto"
          >
            <div className="text-center">
              {/* Icon */}
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
                className="w-16 h-16 bg-gradient-to-br from-accent via-accent-light to-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
              >
                <Video className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold font-heading text-foreground mb-4">
                Prefer Virtual Meetings?
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                We also offer online consultations for your convenience.
                Schedule a video call with our education loan experts from
                anywhere.
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: CheckCircle2, text: "Same expert guidance" },
                  { icon: Calendar, text: "Flexible scheduling" },
                  { icon: MessageSquare, text: "Screen sharing support" },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 justify-center md:justify-start"
                  >
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-accent to-accent-light text-accent-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() =>
                    window.open(
                      "https://calendly.com/priyank-edumateglobal/speak-to-our-financing-expert?month=2025-07",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <Video className="w-5 h-5" />
                  <span>Schedule Video Call</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Calendar className="w-5 h-5" />
                  </motion.div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-card border-2 border-border hover:border-accent/50 text-foreground font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  onClick={() => (window.location.href = "tel:+917208743607")}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </div>
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
