import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { currentStudent } from "../../data/user";
import {
  notifications,
  unreadNotificationsCount,
} from "../../data/applications";

interface HeaderBarProps {
  title: string;
  subtitle?: string;
}

export default function HeaderBar({ title, subtitle }: HeaderBarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const recentNotifications = notifications.slice(0, 4);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left section - Title */}
        <div className="flex flex-col min-w-0 pl-12 lg:pl-0">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-xl lg:text-2xl text-slate-800 dark:text-slate-100 truncate"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-slate-500 dark:text-slate-400 truncate"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search - Hidden on mobile */}
          <motion.div
            className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-accent/30 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <Search size={18} className="text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search loans, applications..."
              className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-48 lg:w-64"
            />
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="hidden sm:flex p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              {unreadNotificationsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadNotificationsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotifOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotifOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                        Notifications
                      </h3>
                      <span className="text-xs text-accent dark:text-accent-light font-medium cursor-pointer hover:text-accent-light dark:hover:text-accent">
                        Mark all as read
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {recentNotifications.map((notif, index) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                            !notif.read
                              ? "bg-orange-50/30 dark:bg-orange-900/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                notif.type === "success"
                                  ? "bg-green-500"
                                  : notif.type === "warning"
                                  ? "bg-amber-500"
                                  : notif.type === "error"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                {new Date(notif.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 text-center">
                      <button className="text-sm text-accent dark:text-accent-light font-medium hover:text-accent-light dark:hover:text-accent">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <img
                  src={currentStudent.avatar}
                  alt={`${currentStudent.firstName} ${currentStudent.lastName}`}
                  className="w-9 h-9 rounded-lg object-cover ring-2 ring-white dark:ring-slate-600"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-700" />
              </div>
              <div className="hidden lg:flex flex-col items-start">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {currentStudent.firstName}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  Student
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`hidden lg:block text-slate-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {currentStudent.firstName} {currentStudent.lastName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {currentStudent.email}
                      </p>
                    </div>
                    <div className="p-2">
                      {[
                        {
                          icon: User,
                          label: "Profile",
                          href: "/student/profile",
                        },
                        { icon: Settings, label: "Settings", href: "#" },
                        {
                          icon: HelpCircle,
                          label: "Help & Support",
                          href: "#",
                        },
                      ].map((item, index) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
                        >
                          <item.icon size={18} />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                    <div className="p-2 border-t border-slate-100 dark:border-slate-700">
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
