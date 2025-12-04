import { motion } from "framer-motion";
import { ApplicationTimeline } from "../../data/applications";
import { TimelineStatus } from "./StatusBadge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TimelineProps {
  items: ApplicationTimeline[];
  variant?: "vertical" | "horizontal";
}

export default function Timeline({
  items,
  variant = "vertical",
}: TimelineProps) {
  if (variant === "horizontal") {
    const completedCount = items.filter((i) => i.status === "completed").length;
    const progressPercentage =
      ((completedCount - 1) / (items.length - 1)) * 100;

    return (
      <div className="relative py-2">
        {/* Background Connection Line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full">
          {/* Subtle Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-slate-300 dark:bg-slate-600 rounded-full"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated Progress Line with Gradient */}
        <motion.div
          className="absolute top-6 left-6 h-1 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `calc(${progressPercentage}% - 1.5rem)` }}
          transition={{
            duration: 1.5,
            ease: [0.21, 0.47, 0.32, 0.98],
            delay: 0.3,
          }}
        >
          <div className="h-full bg-gradient-to-r from-success via-primary to-accent relative">
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
          </div>
        </motion.div>

        {/* Timeline Items */}
        <div className="flex justify-between relative">
          {items.map((item, index) => {
            const isActive = item.status === "current";
            const isCompleted = item.status === "completed";
            const isPending = item.status === "pending";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.4,
                }}
                className="flex flex-col items-center text-center relative"
                style={{ width: `${100 / items.length}%` }}
              >
                {/* Status Indicator with Enhanced Animation */}
                <motion.div
                  className="relative mb-3"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Outer Glow Ring for Active/Completed */}
                  {(isActive || isCompleted) && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${
                        isCompleted ? "bg-success" : "bg-primary"
                      }`}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 0, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Main Status Circle */}
                  <motion.div
                    className={`
                      relative w-12 h-12 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-gradient-to-br from-success to-emerald-600 border-success shadow-lg shadow-success/30"
                          : isActive
                          ? "bg-gradient-to-br from-primary to-primary-light border-primary shadow-lg shadow-primary/30"
                          : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                      }
                    `}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.15 + 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <CheckCircle2 className="text-white" size={24} />
                      </motion.div>
                    )}
                    {isActive && (
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Clock className="text-white" size={20} />
                      </motion.div>
                    )}
                    {isPending && (
                      <Circle
                        className="text-slate-400 dark:text-slate-500"
                        size={20}
                      />
                    )}
                  </motion.div>
                </motion.div>

                {/* Step Label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="space-y-1"
                >
                  <p
                    className={`text-xs font-semibold transition-colors ${
                      isPending
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.step}
                  </p>
                  {item.date && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {item.date}
                    </p>
                  )}
                </motion.div>

                {/* Step Number Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className={`
                    absolute -top-2 left-1/2 -translate-x-1/2
                    w-5 h-5 rounded-full flex items-center justify-center
                    text-[10px] font-bold
                    ${
                      isCompleted || isActive
                        ? "bg-gradient-to-br from-accent to-accent-light text-white shadow-md shadow-accent/30"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }
                  `}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical Timeline
  return (
    <div className="relative">
      {items.map((item, index) => {
        const isActive = item.status === "current";
        const isCompleted = item.status === "completed";
        const isPending = item.status === "pending";
        const isLast = index === items.length - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            className="flex gap-4 pb-8 last:pb-0"
          >
            {/* Timeline Indicator Column */}
            <div className="flex flex-col items-center">
              {/* Status Circle with Animation */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Outer Glow */}
                {(isActive || isCompleted) && (
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      isCompleted ? "bg-success" : "bg-primary"
                    }`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <motion.div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-gradient-to-br from-success to-emerald-600 border-success shadow-lg shadow-success/20"
                        : isActive
                        ? "bg-gradient-to-br from-primary to-primary-light border-primary shadow-lg shadow-primary/20"
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    }
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {isCompleted && (
                    <CheckCircle2 className="text-white" size={18} />
                  )}
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Clock className="text-white" size={16} />
                    </motion.div>
                  )}
                  {isPending && (
                    <Circle
                      className="text-slate-400 dark:text-slate-500"
                      size={16}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="relative flex-1 w-0.5 mt-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden min-h-[40px]">
                  {isCompleted && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-success to-emerald-500"
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut",
                      }}
                    >
                      {/* Flowing Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                        animate={{
                          y: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1,
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="flex-1 pb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex items-start justify-between gap-2 mb-1"
              >
                <div className="flex-1">
                  <p
                    className={`font-semibold mb-1 transition-colors ${
                      isPending
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.step}
                  </p>
                  <p
                    className={`text-sm transition-colors ${
                      isPending
                        ? "text-slate-300 dark:text-slate-600"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                {item.date && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap font-medium">
                    {item.date}
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Simple progress timeline for dashboard - Enhanced
interface SimpleTimelineProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function SimpleTimeline({
  currentStep,
  totalSteps,
  labels,
}: SimpleTimelineProps) {
  return (
    <div className="space-y-4">
      {/* Progress bar with segments */}
      <div className="flex items-center gap-1.5">
        {[...Array(totalSteps)].map((_, index) => (
          <motion.div
            key={index}
            className="relative h-2.5 flex-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Fill based on progress */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                index < currentStep
                  ? "bg-gradient-to-r from-success to-emerald-500"
                  : index === currentStep
                  ? "bg-gradient-to-r from-primary to-accent"
                  : "bg-transparent"
              }`}
              initial={{ width: 0 }}
              animate={{
                width:
                  index < currentStep
                    ? "100%"
                    : index === currentStep
                    ? "100%"
                    : "0%",
              }}
              transition={{
                delay: index * 0.1 + 0.2,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {/* Active segment shimmer */}
              {index === currentStep && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Labels */}
      {labels && (
        <div className="flex justify-between px-1">
          {labels.map((label, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className={`text-xs transition-colors ${
                index <= currentStep
                  ? "text-slate-700 dark:text-slate-300 font-semibold"
                  : "text-slate-400 dark:text-slate-500 font-medium"
              }`}
            >
              {label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
