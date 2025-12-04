import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Plus,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import HeaderBar from "../../components/student/HeaderBar";
import {
  StatsCard,
  ApplicationMiniCard,
  Timeline,
  LoanCard,
} from "../../components/student";
import {
  applications,
  dashboardStats,
  Application,
} from "../../data/applications";
import { loans } from "../../data/loans";
import { currentStudent } from "../../data/user";

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const { scrollY } = useScroll();

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 300], [0, 50]);
  const heroOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Get recent and active applications
  const recentApplications = applications.slice(0, 3);
  const activeApplication = applications.find(
    (app) => app.status === "under_review" || app.status === "documents_pending"
  );

  // Featured loans
  const featuredLoans = loans.filter((loan) => loan.featured).slice(0, 3);

  return (
    <>
      <HeaderBar
        title="Dashboard"
        subtitle={`Welcome back, ${currentStudent.firstName}!`}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Hero Section with Gradient Background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative px-4 lg:px-8 pt-8 pb-6 overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {/* Floating Orbs for Premium Feel */}
          <motion.div
            className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"
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
          />

          <div className="relative z-10">
            {/* Premium Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-accent" size={20} />
                </motion.div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Your Financial Journey
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl lg:text-5xl mb-2">
                <span className="gradient-text">Welcome back,</span>
                <br />
                <span className="text-slate-800 dark:text-slate-100">
                  {currentStudent.firstName}!
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                Track your education loan applications and discover personalized
                financing options
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="px-4 lg:px-8 pb-8 space-y-8">
          {/* Stats Grid - Enhanced with Stagger Animation */}
          <section>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <StatsCard
                title="Total Applications"
                value={dashboardStats.totalApplications}
                subtitle={`${dashboardStats.pendingApplications} pending review`}
                icon={FileText}
                gradient="primary"
                trend={{ value: 25, isPositive: true }}
                index={0}
              />
              <StatsCard
                title="Approved Loans"
                value={dashboardStats.approvedLoans}
                subtitle="Successfully processed"
                icon={CheckCircle}
                gradient="success"
                index={1}
              />
              <StatsCard
                title="In Progress"
                value={dashboardStats.pendingApplications}
                subtitle="Awaiting decision"
                icon={Clock}
                gradient="warning"
                index={2}
              />
              <StatsCard
                title="Total Sanctioned"
                value={`₹${(dashboardStats.totalSanctioned / 100000).toFixed(
                  1
                )}L`}
                subtitle="Loan amount approved"
                icon={TrendingUp}
                gradient="accent"
                index={3}
              />
            </motion.div>
          </section>

          {/* Quick Actions - Premium Card Design */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                  <Zap className="text-primary" size={20} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
                    Quick Actions
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Streamline your loan application process
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Compare Loans Action */}
                <motion.button
                  onClick={() => navigate("/student/compare")}
                  className="group relative p-6 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="p-3.5 rounded-xl bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Search className="text-white" size={24} />
                    </motion.div>
                    <div className="text-left flex-1">
                      <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 mb-1">
                        Compare Loans
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Find personalized rates from 20+ lenders
                      </p>
                      <div className="flex items-center gap-1 text-primary dark:text-primary-light font-semibold text-sm">
                        Start comparing
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary-light"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* New Application Action */}
                <motion.button
                  onClick={() => navigate("/student/applications")}
                  className="group relative p-6 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="p-3.5 rounded-xl bg-gradient-to-br from-accent to-accent-light shadow-lg shadow-accent/30"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Plus className="text-white" size={24} />
                    </motion.div>
                    <div className="text-left flex-1">
                      <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 mb-1">
                        New Application
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Apply to multiple lenders in minutes
                      </p>
                      <div className="flex items-center gap-1 text-accent dark:text-accent-light font-semibold text-sm">
                        Start application
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-light"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Upload Documents Action */}
                <motion.button
                  onClick={() => navigate("/student/documents")}
                  className="group relative p-6 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-success/10 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="p-3.5 rounded-xl bg-gradient-to-br from-success to-emerald-600 shadow-lg shadow-success/30"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="text-white" size={24} />
                    </motion.div>
                    <div className="text-left flex-1">
                      <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 mb-1">
                        Upload Documents
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        {dashboardStats.documentsRequired -
                          dashboardStats.documentsUploaded}{" "}
                        documents pending upload
                      </p>
                      <div className="flex items-center gap-1 text-success font-semibold text-sm">
                        Upload now
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-success to-emerald-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Applications & Loans */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Application Progress */}
              {activeApplication && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft"
                >
                  {/* Premium Gradient Border Top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                          <Target className="text-primary" size={20} />
                        </div>
                        <div>
                          <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
                            Application in Progress
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {activeApplication.lenderName} •{" "}
                            {activeApplication.course}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() =>
                          navigate(
                            `/student/applications/${activeApplication.id}`
                          )
                        }
                        className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-1 group"
                        whileHover={{ x: 2 }}
                      >
                        View Details
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </motion.button>
                    </div>
                    <Timeline
                      items={activeApplication.timeline}
                      variant="horizontal"
                    />
                  </div>
                </motion.section>
              )}

              {/* Recent Applications */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
                        Recent Applications
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Track your active loan applications
                      </p>
                    </div>
                    <motion.button
                      onClick={() => navigate("/student/applications")}
                      className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-1 group"
                      whileHover={{ x: 2 }}
                    >
                      View All
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {recentApplications.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <ApplicationMiniCard
                        application={app}
                        onClick={() =>
                          navigate(`/student/applications/${app.id}`)
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Featured Loans */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10">
                      <Sparkles className="text-accent" size={20} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
                        Recommended for You
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Personalized loan offers based on your profile
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => navigate("/student/compare")}
                    className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-1 group"
                    whileHover={{ x: 2 }}
                  >
                    View All
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </motion.button>
                </div>
                <div className="space-y-6">
                  {featuredLoans.map((loan, index) => (
                    <motion.div
                      key={loan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <LoanCard
                        loan={loan}
                        onViewDetails={(loan) => {
                          console.log("View loan:", loan);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-6">
              {/* Profile Completion - Enhanced */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 shadow-soft"
              >
                {/* Decorative Elements */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />

                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
                      <Target className="text-white" size={16} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
                      Profile Completion
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {currentStudent.profileCompletion}% Complete
                        </span>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs font-bold text-accent px-2 py-1 rounded-full bg-accent/10"
                        >
                          {100 - currentStudent.profileCompletion}% to go
                        </motion.span>
                      </div>
                      <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-accent-light rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${currentStudent.profileCompletion}%`,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      </div>
                    </div>
                    <motion.button
                      onClick={() => navigate("/student/profile")}
                      className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Complete Profile
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                      {/* Hover Gradient Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.section>

              {/* Document Status - Enhanced */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-success/20 to-success/10">
                      <FileText className="text-success" size={16} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
                      Documents
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between p-4 bg-success/5 dark:bg-success/10 rounded-xl border border-success/20 dark:border-success/20">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <CheckCircle size={20} className="text-success" />
                          </motion.div>
                          <div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Uploaded
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Successfully verified
                            </p>
                          </div>
                        </div>
                        <span className="font-display font-bold text-xl text-success">
                          {dashboardStats.documentsUploaded}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between p-4 bg-warning/5 dark:bg-warning/10 rounded-xl border border-warning/20 dark:border-warning/20">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Clock size={20} className="text-warning" />
                          </motion.div>
                          <div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Pending
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Action required
                            </p>
                          </div>
                        </div>
                        <span className="font-display font-bold text-xl text-warning">
                          {dashboardStats.documentsRequired -
                            dashboardStats.documentsUploaded}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* Quick Stats - Premium Card */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10">
                      <TrendingUp className="text-primary" size={16} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
                      Market Insights
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Avg. Interest Rate
                        </span>
                        <span className="font-display font-bold text-slate-800 dark:text-slate-200">
                          9.2%
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-accent/30 dark:hover:border-accent/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Avg. Processing Time
                        </span>
                        <span className="font-display font-bold text-slate-800 dark:text-slate-200">
                          15 days
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 hover:border-success/30 dark:hover:border-success/30 transition-colors">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Success Rate
                        </span>
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-success"
                          />
                          <span className="font-display font-bold text-success">
                            85%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
