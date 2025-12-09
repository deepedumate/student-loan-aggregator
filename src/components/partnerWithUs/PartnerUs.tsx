import { useEffect } from "react";
import { motion } from "framer-motion";
import PartnerHeader from "./PartnerHeader";
import WhyPartnerEdumate from "./WhyPartnerEdumate";

/**
 * Premium Partner Page - Fintech Style
 *
 * Features:
 * - Clean design with smooth transitions
 * - Form redirect functionality
 * - Fully responsive
 * - Dark mode support
 */

export default function PremiumPartnerPage() {
  useEffect(() => {
    // Setup form redirect functionality
    const setupFormRedirect = () => {
      const formRedirectElements =
        document.getElementsByClassName("form-redirect");
      Array.from(formRedirectElements).forEach((item) => {
        item.addEventListener("click", bringFormInFrame);
      });
    };

    const bringFormInFrame = () => {
      const partnerForm = document.getElementById("aqewa");
      if (partnerForm) {
        partnerForm.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    setupFormRedirect();

    // Cleanup function
    return () => {
      const formRedirectElements =
        document.getElementsByClassName("form-redirect");
      Array.from(formRedirectElements).forEach((item) => {
        item.removeEventListener("click", bringFormInFrame);
      });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="presentation-page bg-background"
    >
      {/* Header Section */}
      <PartnerHeader />

      {/* Why Partner Section */}
      <WhyPartnerEdumate />
    </motion.div>
  );
}
