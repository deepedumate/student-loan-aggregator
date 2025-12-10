import {
  IndianRupee,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const LendingPartnersSlider: React.FC = () => {
  // Partner data
  const partnersRow1 = [
    { name: "Avanse", logo: "/images/logos/lending-partners/Avanse.png" },
    { name: "Credila", logo: "/images/logos/lending-partners/Credila.png" },
    { name: "MPower", logo: "/images/logos/lending-partners/MPower.png" },
    {
      name: "Prodigy",
      logo: "/images/logos/lending-partners/Prodigy-Finance.png",
    },
    {
      name: "IDFC FIRST",
      logo: "/images/logos/lending-partners/IDFC-FIRST.png",
    },
    { name: "Union Bank", logo: "/images/logos/lending-partners/union.png" },
    { name: "PNB", logo: "/images/logos/lending-partners/pnb.png" },
    { name: "Yes Bank", logo: "/images/logos/lending-partners/yes_bank.png" },
    { name: "Axis Bank", logo: "/images/logos/lending-partners/axis_bank.png" },
    {
      name: "Poonawalla",
      logo: "/images/logos/lending-partners/poonawalla.png",
    },
  ];

  const statsDetails = [
    {
      icon: Users,
      number: "15+",
      label: "Lending Partners",
      color: "text-primary",
      gradient: "from-blue-500/10 to-blue-600/10",
    },
    {
      icon: IndianRupee,
      number: "₹1L - ₹2Cr",
      label: "Loan Range",
      color: "text-accent",
      gradient: "from-green-500/10 to-green-600/10",
    },
    {
      icon: TrendingDown,
      number: "8.5%+",
      label: "Interest Rates",
      color: "text-success",
      gradient: "from-purple-500/10 to-purple-600/10",
    },
  ];

  const partnersRow2 = [...partnersRow1];
  const allPartners = [...partnersRow1, ...partnersRow2];

  const features = [
    {
      icon: Shield,
      text: "Trusted Partners",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: TrendingUp,
      text: "Best Rates",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      text: "Expert Support",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <>
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary">Trusted Financial Partners</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center mb-6">
            <span className="text-foreground">Our </span>
            <span className="text-primary">Lending Partners</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            We've partnered with India's most trusted financial institutions to
            bring you the best education loan options
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-foreground/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* First Row - Moving Left to Right */}
        <div className="mb-8 relative py-4 overflow-hidden">
          <div className="flex animate-slide-left w-max">
            {[...allPartners, ...allPartners, ...allPartners].map(
              (partner, index) => (
                <div key={`row1-${index}`} className="flex-shrink-0 mr-6">
                  <div className="group cursor-pointer backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl w-56 h-28 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-primary/30">
                    <div className="relative flex items-center justify-center w-44 h-16 p-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Gradient Mask */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
        </div>

        {/* Second Row - Moving Right to Left */}
        <div className="relative py-4 overflow-hidden">
          <div className="flex animate-slide-right w-max">
            {[...allPartners, ...allPartners, ...allPartners].map(
              (partner, index) => (
                <div key={`row2-${index}`} className="flex-shrink-0 mr-6">
                  <div className="group cursor-pointer backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl w-56 h-28 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:border-primary/30">
                    <div className="relative flex items-center justify-center w-44 h-16 p-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Gradient Mask */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          />
        </div>

        {/* Stats Section - Clean Fintech Design */}
        {/* Stats Section - Clean Fintech Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12"
        >
          {statsDetails.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="flex items-center gap-4 p-4 backdrop-blur-xl bg-card/30 border border-border/40 rounded-xl hover:border-border/60 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              {/* Content */}
              <div>
                <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .animate-slide-left {
          animation: slideLeft 120s linear infinite;
          width: max-content;
        }

        .animate-slide-right {
          animation: slideRight 120s linear infinite;
          width: max-content;
        }

        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-slide-left:hover,
        .animate-slide-right:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-slide-left,
          .animate-slide-right {
            animation-duration: 75s;
          }
        }

        @media (max-width: 576px) {
          .flex-shrink-0 > div {
            width: 200px !important;
            height: 100px !important;
          }

          .flex-shrink-0 > div > div {
            width: 160px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </>
  );
};

export default LendingPartnersSlider;
