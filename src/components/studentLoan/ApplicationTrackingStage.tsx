import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Circle,
  Calendar,
  TrendingUp,
  FileText,
} from "lucide-react";
import type { Application } from "@/types/studentLoanType";
import { APPLICATION_STAGES } from "@/data/mockData";
import {
  formatShortDate,
  formatRelativeTime,
  getStatusColor,
} from "@/lib/helper/studentLoanHelper";

interface ApplicationTrackingStageProps {
  application: Application;
  onViewSummary: () => void;
}

export default function ApplicationTrackingStage({
  application,
  onViewSummary,
}: ApplicationTrackingStageProps) {
  const stages = APPLICATION_STAGES;

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6" />;
      case "in-progress":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-6 h-6" />
          </motion.div>
        );
      default:
        return <Circle className="w-6 h-6" />;
    }
  };

  const completedStages = stages.filter((s) => s.status === "completed").length;
  const progress = (completedStages / stages.length) * 100;

  return (
    <div className="container mx-auto px-4 max-w-4xl space-y-6">
      {/* Header - RESPONSIVE: Left on mobile, Center on desktop */}
      <motion.div
        className="text-left lg:text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Track Your Application
        </h2>
        <p className="text-muted-foreground">
          Application ID:{" "}
          <span className="font-mono font-semibold">{application.id}</span>
        </p>
      </motion.div>

      {/* Status Overview */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </span>
              <span className="text-sm font-semibold text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {completedStages} of {stages.length} stages completed
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <motion.div
              className="bg-secondary/50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
              <p className="font-semibold text-foreground">
                {formatShortDate(application.submittedDate)}
              </p>
            </motion.div>

            <motion.div
              className="bg-secondary/50 rounded-lg p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Decision By</p>
              </div>
              <p className="font-semibold text-foreground">
                {formatRelativeTime(application.expectedDecisionDate)}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="glass-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Application Timeline
        </h3>

        <div className="space-y-6">
          {stages.map((stage, index) => {
            const statusColors = getStatusColor(stage.status);
            const isLast = index === stages.length - 1;

            return (
              <motion.div
                key={stage.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Circle */}
                  <motion.div
                    className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${
                        stage.status === "completed"
                          ? "bg-success border-success shadow-lg shadow-success/25"
                          : stage.status === "in-progress"
                          ? "bg-primary border-primary shadow-lg shadow-primary/25"
                          : "bg-secondary border-border"
                      }
                    `}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div
                      className={
                        stage.status === "completed"
                          ? "text-white"
                          : stage.status === "in-progress"
                          ? "text-white"
                          : "text-muted-foreground"
                      }
                    >
                      {getStageIcon(stage.status)}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {stage.name}
                      </h4>
                      {stage.status === "in-progress" && (
                        <motion.span
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          In Progress
                        </motion.span>
                      )}
                      {stage.status === "completed" && stage.completedAt && (
                        <span className="text-sm text-muted-foreground">
                          {formatShortDate(stage.completedAt)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {stage.description}
                    </p>

                    {stage.estimatedTime && stage.status === "pending" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Estimated time: {stage.estimatedTime}</span>
                      </div>
                    )}

                    {stage.status === "in-progress" && (
                      <motion.div
                        className="mt-3 p-4 rounded-xl bg-primary/10 border border-primary/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <p className="text-sm text-primary font-medium">
                          <strong>Current Status:</strong> Your application is
                          currently being reviewed. You'll be notified once this
                          stage is complete.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Connecting Line with Animation */}
                {!isLast && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border -mb-6">
                    {stage.status === "completed" && (
                      <motion.div
                        className="w-full bg-gradient-to-b from-success to-primary"
                        initial={{ height: 0 }}
                        animate={{ height: "50%" }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Important Information */}
      <motion.div
        className="glass-card p-6 rounded-2xl bg-gradient-to-r from-accent/5 to-warning/5 border-2 border-accent/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <FileText className="w-6 h-6 text-accent shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Important Information
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "You will receive email notifications at each stage of the application process",
                "Keep your phone accessible for verification calls from the lender",
                "Additional documents may be requested during the verification process",
                "Contact our support team if you have any questions: support@edumate.com",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-accent mt-0.5">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={onViewSummary}
          className="relative px-12 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 overflow-hidden group"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">View Loan Summary (Demo)</span>
        </motion.button>
        <motion.button
          onClick={() => window.location.reload()}
          className="px-8 py-4 text-lg font-semibold rounded-xl bg-secondary text-secondary-foreground border-2 border-border hover:bg-secondary/80 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start New Application
        </motion.button>
      </motion.div>
    </div>
  );
}
