import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  MapPin,
  GraduationCap,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Application } from "../../data/applications";
import { formatCurrency } from "../../data/loans";
import StatusBadge from "./StatusBadge";

interface ApplicationCardProps {
  application: Application;
  onViewDetails?: (application: Application) => void;
  index?: number;
}

export default function ApplicationCard({
  application,
  onViewDetails,
  index = 0,
}: ApplicationCardProps) {
  const progressPercentage =
    (application.documentsSubmitted / application.documentsRequired) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-soft hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
        {/* Top Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              {/* Lender Logo with Enhanced Styling */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-md" />
                <img
                  src={application.lenderLogo}
                  alt={application.lenderName}
                  className="relative w-14 h-14 rounded-xl object-cover shadow-lg ring-2 ring-white dark:ring-slate-700"
                />
                {/* Online Status Indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white dark:border-slate-800"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div>
                <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">
                  {application.lenderName}
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp
                      size={14}
                      className="text-primary dark:text-primary-light"
                    />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {application.interestRate}% p.a.
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    {application.tenure / 12} years
                  </span>
                </div>
              </div>
            </div>
            <StatusBadge status={application.status} animated />
          </div>

          {/* Loan Amount - Premium Display */}
          <motion.div
            className="relative mb-5 p-5 rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-700/50 dark:to-slate-800/50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5" />

            {/* Decorative Elements */}
            <motion.div
              className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                Loan Amount
              </p>
              <p className="font-display font-bold text-3xl gradient-text">
                {formatCurrency(application.amount, application.currency)}
              </p>
            </div>
          </motion.div>

          {/* Course Details */}
          <div className="space-y-3 mb-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-colors group/item"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                <GraduationCap
                  size={16}
                  className="text-primary dark:text-primary-light"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                  Course
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {application.course}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-accent/30 dark:hover:border-accent/30 transition-colors group/item"
            >
              <div className="p-2 rounded-lg bg-accent/10 group-hover/item:bg-accent/20 transition-colors">
                <MapPin
                  size={16}
                  className="text-accent dark:text-accent-light"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                  University
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {application.university}, {application.country}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Documents Progress - Enhanced */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
                  <FileText
                    size={14}
                    className="text-slate-600 dark:text-slate-400"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Documents Progress
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {application.documentsSubmitted}/
                  {application.documentsRequired}
                </span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10"
                >
                  {Math.round(progressPercentage)}%
                </motion.span>
              </div>
            </div>
            <div className="relative h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{
                  duration: 1.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: index * 0.1 + 0.4,
                }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Next Step Alert */}
          {application.nextStep && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="relative mb-5 p-4 rounded-xl overflow-hidden group/alert"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20" />
              <div className="absolute inset-0 border border-amber-200 dark:border-amber-800/50 rounded-xl" />

              {/* Pulse Effect */}
              <motion.div
                className="absolute -right-2 -top-2 w-16 h-16 bg-amber-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative flex items-start gap-3">
                <motion.div
                  className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AlertCircle
                    className="text-amber-600 dark:text-amber-400"
                    size={16}
                  />
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1">
                    Action Required
                  </p>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-300">
                    {application.nextStep}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Calendar size={14} />
              <span className="text-xs font-medium">
                Updated {application.updatedDate}
              </span>
            </div>

            <motion.button
              onClick={() => onViewDetails?.(application)}
              className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-light hover:text-accent dark:hover:text-accent transition-colors group/btn"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Glow Shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 blur-xl -z-10"
        initial={false}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Enhanced Mini Card for Dashboard
interface ApplicationMiniCardProps {
  application: Application;
  onClick?: () => void;
}

export function ApplicationMiniCard({
  application,
  onClick,
}: ApplicationMiniCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Card Container */}
      <div className="relative flex items-center gap-4 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 overflow-hidden">
        {/* Hover Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        {/* Side Accent Bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent"
          initial={{ height: 0 }}
          whileHover={{ height: "100%" }}
          transition={{ duration: 0.3 }}
        />

        {/* Logo */}
        <motion.div
          className="relative"
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-sm" />
          <img
            src={application.lenderLogo}
            alt={application.lenderName}
            className="relative w-12 h-12 rounded-lg object-cover ring-2 ring-white dark:ring-slate-700 shadow-md"
          />
        </motion.div>

        {/* Content */}
        <div className="relative flex-1 min-w-0">
          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate mb-1">
            {application.lenderName}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {formatCurrency(application.amount)}
            </p>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {application.interestRate}% p.a.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="relative">
          <StatusBadge status={application.status} size="sm" showIcon={false} />
        </div>

        {/* Arrow Icon */}
        <motion.div
          className="text-slate-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors"
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}
