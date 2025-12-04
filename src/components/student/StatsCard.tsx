import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: "primary" | "accent" | "success" | "warning";
  index?: number;
}

const gradients = {
  primary: {
    bg: "from-primary to-primary-light",
    light:
      "from-blue-50/80 via-slate-50/80 to-slate-50/80 dark:from-blue-950/40 dark:via-slate-900/40 dark:to-slate-900/40",
    text: "text-primary dark:text-primary-light",
    shadow: "shadow-primary/10 dark:shadow-primary/20",
    glow: "from-primary/20 to-primary/5",
    border: "border-primary/20 dark:border-primary/30",
    iconBg: "from-primary/10 to-primary-light/10",
  },
  accent: {
    bg: "from-accent to-accent-light",
    light:
      "from-orange-50/80 via-red-50/80 to-slate-50/80 dark:from-orange-950/40 dark:via-slate-900/40 dark:to-slate-900/40",
    text: "text-accent dark:text-accent-light",
    shadow: "shadow-accent/10 dark:shadow-accent/20",
    glow: "from-accent/20 to-accent/5",
    border: "border-accent/20 dark:border-accent/30",
    iconBg: "from-accent/10 to-accent-light/10",
  },
  success: {
    bg: "from-success to-emerald-600",
    light:
      "from-green-50/80 via-emerald-50/80 to-slate-50/80 dark:from-green-950/40 dark:via-slate-900/40 dark:to-slate-900/40",
    text: "text-success dark:text-green-400",
    shadow: "shadow-success/10 dark:shadow-success/20",
    glow: "from-success/20 to-success/5",
    border: "border-success/20 dark:border-success/30",
    iconBg: "from-success/10 to-emerald-600/10",
  },
  warning: {
    bg: "from-warning to-orange-600",
    light:
      "from-amber-50/80 via-orange-50/80 to-slate-50/80 dark:from-amber-950/40 dark:via-slate-900/40 dark:to-slate-900/40",
    text: "text-warning dark:text-amber-400",
    shadow: "shadow-warning/10 dark:shadow-warning/20",
    glow: "from-warning/20 to-warning/5",
    border: "border-warning/20 dark:border-warning/30",
    iconBg: "from-warning/10 to-orange-600/10",
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  gradient,
  index = 0,
}: StatsCardProps) {
  const colors = gradients[gradient];

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
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="relative group"
    >
      {/* Main Card Container */}
      <div
        className={`
        relative overflow-hidden p-6 rounded-2xl
        bg-gradient-to-br ${colors.light}
        border border-slate-200/80 dark:border-slate-700/80
        shadow-soft hover:shadow-xl ${colors.shadow}
        transition-all duration-300
        backdrop-blur-sm
      `}
      >
        {/* Animated Glow Effect on Hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          initial={false}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />

        {/* Floating Orb Background */}
        <motion.div
          className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl opacity-30`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: ["100%", "-100%"],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Icon with Enhanced Animation */}
          <motion.div
            className={`
              inline-flex p-3.5 rounded-xl mb-4
              bg-gradient-to-br ${colors.bg}
              shadow-lg ${colors.shadow}
              relative overflow-hidden
            `}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              rotate: {
                duration: 0.5,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.2,
              },
            }}
          >
            {/* Icon Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Icon className="text-white relative z-10" size={24} />
          </motion.div>

          {/* Title */}
          <motion.p
            className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1 }}
          >
            {title}
          </motion.p>

          {/* Value and Trend */}
          <div className="flex items-end gap-3 mb-1">
            <motion.p
              className={`font-display font-bold text-3xl lg:text-4xl ${colors.text}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1 + 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {value}
            </motion.p>

            {/* Trend Badge with Animation */}
            {trend && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="mb-1.5"
              >
                <motion.span
                  className={`
                    inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full
                    ${
                      trend.isPositive
                        ? "bg-success/10 text-success dark:bg-success/20 dark:text-green-400 border border-success/20"
                        : "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-red-400 border border-destructive/20"
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.span
                    animate={{
                      rotate: trend.isPositive ? 0 : 180,
                    }}
                  >
                    ↑
                  </motion.span>
                  {Math.abs(trend.value)}%
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-xs text-slate-400 dark:text-slate-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Bottom Accent Bar - Animated on Hover */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.bg} rounded-b-2xl`}
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Floating Shadow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-10 blur-xl -z-10`}
        initial={false}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Compact Stats for inline use - Enhanced Version
interface CompactStatProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: "primary" | "accent" | "success" | "warning";
}

export function CompactStat({
  label,
  value,
  icon: Icon,
  color = "primary",
}: CompactStatProps) {
  const colorClasses = {
    primary:
      "text-primary dark:text-primary-light bg-primary/10 border-primary/20",
    accent: "text-accent dark:text-accent-light bg-accent/10 border-accent/20",
    success: "text-success dark:text-green-400 bg-success/10 border-success/20",
    warning: "text-warning dark:text-amber-400 bg-warning/10 border-warning/20",
  };

  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} className="group relative">
      <div className="flex items-center gap-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-soft hover:shadow-md transition-all duration-300">
        {Icon && (
          <motion.div
            className={`p-2.5 rounded-lg ${colorClasses[color]}`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={18} />
          </motion.div>
        )}
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
            {label}
          </p>
          <p className="font-display font-bold text-lg text-slate-800 dark:text-slate-200">
            {value}
          </p>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${colorClasses[color]} opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity duration-300`}
        initial={false}
      />
    </motion.div>
  );
}
