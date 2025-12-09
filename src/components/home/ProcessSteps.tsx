import React from "react";
import {
  Calendar,
  User,
  FileText,
  Shield,
  DollarSign,
  ArrowRight,
  ArrowDown,
  CheckCircle,
} from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description:
        "Schedule a convenient time to discuss your education plans and financial needs.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      badgeColor: "bg-blue-600 dark:bg-blue-500",
      arrowColor: "text-blue-400",
      details: [
        "Quick 15-min consultation",
        "Flexible timing",
        "No commitment required",
      ],
    },
    {
      icon: User,
      title: "Connect with Counselor",
      description:
        "Get paired with our expert education loan counselors for personalized guidance.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      badgeColor: "bg-orange-600 dark:bg-orange-500",
      arrowColor: "text-orange-400",
      details: [
        "Experienced professionals",
        "Personalized approach",
        "University-specific advice",
      ],
    },
    {
      icon: FileText,
      title: "Document Assessment",
      description:
        "Our team reviews your profile to identify the best loan options for your needs.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      badgeColor: "bg-cyan-600 dark:bg-cyan-500",
      arrowColor: "text-cyan-400",
      details: [
        "Complete profile review",
        "Eligibility assessment",
        "Best match identification",
      ],
    },
    {
      icon: Shield,
      title: "We Handle Everything",
      description:
        "Sit back while we manage all communications with lenders for a stress-free experience.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      badgeColor: "bg-green-600 dark:bg-green-500",
      arrowColor: "text-green-400",
      details: [
        "End-to-end management",
        "Regular updates",
        "Hassle-free process",
      ],
    },
    {
      icon: DollarSign,
      title: "Receive Funds",
      description:
        "Get quick approval and seamless fund disbursement directly to your institution.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      badgeColor: "bg-purple-600 dark:bg-purple-500",
      arrowColor: "text-purple-400",
      details: [
        "Fast approval process",
        "Direct disbursement",
        "Multiple payment options",
      ],
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>Simple 5-Step Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Your Loan Approval </span>
            <span className="text-primary">
              Roadmap
            </span>
          </h2>

          <p className="text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Navigate through our streamlined process to secure your education
            funding smoothly and efficiently
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-4 relative px-2 sm:px-0">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Card */}
                <div className="flex-1 w-full sm:max-w-sm group flex">
                  <div
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 w-full relative overflow-hidden flex flex-col"
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>

                    <div className="p-5 sm:p-6 lg:p-8 text-center relative z-10 flex flex-col h-full">
                      {/* Icon Container */}
                      <div className="relative mb-5 sm:mb-6 lg:mb-8">
                        <div
                          className={`mx-auto w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center ${step.bgColor} relative group-hover:scale-110 transition-transform duration-300`}
                        >
                          <step.icon
                            className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 ${step.iconColor}`}
                          />
                          <span
                            className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-7 h-7 sm:w-8 sm:h-8 ${step.badgeColor} text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center shadow-lg`}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h6 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-foreground/90 dark:group-hover:text-white transition-colors leading-tight">
                        {step.title}
                      </h6>
                      <p className="text-muted-foreground dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <>
                    <div
                      className={`hidden lg:flex items-center justify-center mt-12 ${step.arrowColor} relative z-20 flex-shrink-0`}
                    >
                      <div className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg border border-slate-200 dark:border-slate-700">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Arrow - Mobile/Tablet */}
                    <div
                      className={`lg:hidden flex justify-center ${step.arrowColor} relative z-20 -my-3`}
                    >
                      <div className="bg-white dark:bg-slate-800 rounded-full p-2.5 sm:p-3 shadow-lg border border-slate-200 dark:border-slate-700">
                        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ProcessSteps;