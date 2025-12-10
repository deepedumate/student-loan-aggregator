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

const ContactUsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background transition-colors duration-300"
    >
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
