import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe, Star, MapPin, Award, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

const StudyAbroadSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCountry, setHoveredCountry] = useState<number | null>(null);

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

  const features = [
    {
      icon: GraduationCap,
      text: "All Degree Levels",
      description: "From UG to PhD programs",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Globe,
      text: "Global Destinations",
      description: "30+ countries available",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Star,
      text: "Best Loan Options",
      description: "Competitive rates & terms",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      text: "Top Universities",
      description: "3000+ partner institutions",
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const countries = [
    { name: "USA", flag: "/images/flags2/usa.jpg", programs: "250+" },
    { name: "UK", flag: "/images/flags2/uk.jpg", programs: "150+" },
    { name: "Canada", flag: "/images/flags2/canada.jpg", programs: "150+" },
    {
      name: "Australia",
      flag: "/images/flags2/australia.jpg",
      programs: "50+",
    },
    { name: "Germany", flag: "/images/flags2/germany.jpg", programs: "200+" },
    { name: "France", flag: "/images/flags2/france.jpg", programs: "100+" },
    { name: "India", flag: "/images/flags2/india.jpg", programs: "500+" },
    { name: "IRE", flag: "/images/flags2/ireland.jpg", programs: "20+" },
  ];

  const benefits = [
    { text: "No collateral for loans up to ₹40L", icon: CheckCircle2 },
    { text: "Competitive interest rates from 8.5%", icon: TrendingUp },
    { text: "Flexible repayment options", icon: CheckCircle2 },
    { text: "Quick approval process", icon: CheckCircle2 },
  ];

  const statsDetails = [
    {
      number: "30+",
      label: "Countries",
      icon: Globe,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      number: "3000+",
      label: "Universities",
      icon: Award,
      color: "text-green-600 dark:text-green-400",
    },
    {
      number: "₹3Cr",
      label: "Max. Loan Amount",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <>
      {/* Enhanced Ambient Background with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="lg:pr-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full text-sm font-medium mb-8"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-primary">Global Education Partner</span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                  <span className="block text-foreground mb-2">
                    Your Gateway to
                  </span>
                  <span className="text-primary">
                    Global Education
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  From undergraduate degrees to PhD programs, we provide
                  comprehensive loan solutions for your international education
                  journey.
                </p>
              </motion.div>

              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-2xl p-4 hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {feature.text}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Why Choose Our Loan Services?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                        <benefit.icon className="w-3.5 h-3.5 text-success" />
                      </div>
                      <span className="text-foreground/80">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-base text-muted-foreground leading-relaxed"
              >
                No matter your degree or destination—US, UK, Canada, Australia,
                or Europe—we offer the{" "}
                <span className="font-semibold text-foreground backdrop-blur-xl bg-primary/10 px-2 py-1 rounded">
                  best loan options
                </span>{" "}
                tailored to your program and financial needs. From undergrad to
                Master's and PhD, we ensure full support for your study abroad
                journey.
              </motion.p>
            </div>
          </motion.div>

          {/* Enhanced Flag Grid Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Premium Glass Card */}
              <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
                <div className="text-center mb-6 lg:mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-primary/5 border border-primary/20 rounded-full mb-4">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Global Reach</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold text-foreground mb-2">
                    Study Destinations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from 15+ countries worldwide
                  </p>
                </div>

                {/* Countries Grid with Enhanced Interaction */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4">
                  {countries.map((country, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredCountry(index)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    >
                      <div className="backdrop-blur-xl bg-background/60 border border-border/50 rounded-2xl p-3 lg:p-4 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="text-center relative z-10">
                          {/* Flag with Ring */}
                          <div className="relative w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-3">
                            <div
                              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                                hoveredCountry === index
                                  ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                                  : "ring-2 ring-border/50"
                              }`}
                            />
                            <img
                              src={country.flag}
                              alt={`${country.name} flag`}
                              className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          {/* Country Info */}
                          <div className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                            {country.name}
                          </div>
                          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                            <GraduationCap className="w-3 h-3" />
                            <span>{country.programs}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View All Link */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 text-center"
                >
                  <button className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300">
                    View all destinations
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div> */}
              </div>
            </div>
          </motion.div>
        </div>

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
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${
                index === 0 ? 'from-blue-500/10 to-blue-600/10' :
                index === 1 ? 'from-green-500/10 to-green-600/10' :
                'from-purple-500/10 to-purple-600/10'
              } flex items-center justify-center`}>
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
    </>
  );
};

export default StudyAbroadSection;