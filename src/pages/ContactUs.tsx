import React from "react";
import { motion } from "framer-motion";
import ContactUsHeader from "@/components/contact/ContactUsHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import { ContactItem } from "@/types/contact";

const contactInfoData: ContactItem[] = [
  {
    title: "Email",
    value: "info@edumateglobal.com",
  },
  {
    title: "Phone",
    value: "+91 7208743607",
  },
  {
    title: "Address",
    value:
      "1st floor, Unit No. 703, Trade Link Building, A Wing, Kamala Mills Compound, Lower Parel West, Lower Parel, Mumbai, Maharashtra 400013, India",
  },
];

/**
 * Premium Fintech Contact Us Page
 *
 * Design Philosophy:
 * - Clean, minimal layout with strategic use of white space
 * - Glassmorphic cards for depth and modern feel
 * - Smooth Framer Motion animations throughout
 * - Consistent color palette from design system
 * - Mobile-first responsive design
 * - Accessibility-focused with proper contrast ratios
 */
const ContactUsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/10 transition-colors duration-300"
    >
      {/* Animated background gradient orbs for premium feel */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ContactUsHeader />
        <ContactInfo items={contactInfoData} />
        <ContactMap />
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
