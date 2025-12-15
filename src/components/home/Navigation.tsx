import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

interface NestedDropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownItem {
  label: string;
  href?: string;
  description?: string;
  nested?: NestedDropdownItem[];
}

interface NavigationItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

type NavbarProps = {
  onFormScroll?: () => void;
};

/**
 * Premium Fintech Navigation Component
 * Features:
 * - Glassmorphic design with backdrop blur
 * - Smooth Framer Motion animations
 * - Responsive mobile menu with elegant transitions
 * - Nested dropdown support
 * - Scroll-triggered background changes
 */
const Navigation: React.FC<NavbarProps> = ({ onFormScroll }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isHomePage = pathname === "/" || pathname === "/showcase-your-interest";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Resources",
      dropdown: [
        {
          label: "Tools",
          description: "",
          nested: [
            {
              label: "AI Loan Eligibility Checker",
              href: "/resources/tools/ai-loan-eligibility-checker",
            },
            {
              label: "Loan Repayment Calculator",
              href: "/resources/tools/loan-emi-calculator",
            },
          ],
        },
      ],
    },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  }, [pathname]);

  // Close dropdowns when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth >= 1024) {
        const target = event.target as Element;
        let clickedInside = false;

        Object.values(dropdownRefs.current).forEach((ref) => {
          if (ref && ref.contains(target)) {
            clickedInside = true;
          }
        });

        if (!clickedInside) {
          setActiveDropdown(null);
          setActiveNestedDropdown(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (itemLabel: string) => {
    setActiveDropdown(activeDropdown === itemLabel ? null : itemLabel);
    setActiveNestedDropdown(null);
  };

  const toggleNestedDropdown = (itemLabel: string) => {
    setActiveNestedDropdown(activeNestedDropdown === itemLabel ? null : itemLabel);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  };

  // Don't show nav on certain pages
  if (
    pathname.startsWith("/partners") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/university")
  ) {
    return null;
  }

  return (
    <>
      {/* Fixed Navigation Container with glassmorphic effect */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="mx-4 mt-3">
          <nav
            className={`
              relative backdrop-blur-xl shadow-lg rounded-2xl py-3 px-6 
              transition-all duration-300 ease-in-out border
              ${
                isScrolled
                  ? "bg-white/80 dark:bg-card/80 shadow-xl border-border/50"
                  : "bg-white/70 dark:bg-card/70 shadow-lg border-border/30"
              }
            `}
          >
            <div className="flex items-center justify-between">
              {/* Logo with hover animation */}
              <Link
                to="/"
                className="flex items-center font-bold text-foreground hover:text-accent transition-all duration-300 transform hover:scale-105"
                onClick={closeMobileMenu}
              >
                <motion.img
                  src="/images/logos/edumate-logos/edumate_logo.png"
                  className="h-9 drop-shadow-sm"
                  alt="Edumate Logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center flex-1 justify-center">
                <ul className="flex items-center space-x-2">
                  {navigationItems.map((item) => (
                    <li
                      key={item.label}
                      className="relative"
                      ref={(el) => {
                        dropdownRefs.current[item.label] = el;
                      }}
                    >
                      {item.dropdown ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2
                              transition-all duration-300
                              ${
                                activeDropdown === item.label
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "text-foreground hover:bg-muted hover:text-accent"
                              }
                            `}
                            onClick={() => toggleDropdown(item.label)}
                          >
                            {item.label}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                activeDropdown === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </motion.button>

                          {/* Desktop Dropdown with Framer Motion */}
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 mt-2 min-w-[280px] rounded-2xl shadow-xl backdrop-blur-xl bg-white/95 dark:bg-card/95 border border-border/50 overflow-hidden z-50"
                              >
                                {item.dropdown.map((dropItem) => (
                                  <div key={dropItem.label}>
                                    {dropItem.nested ? (
                                      <>
                                        <button
                                          className="w-full px-5 py-3 text-left flex items-center justify-between hover:bg-muted transition-all duration-200 group"
                                          onClick={() => toggleNestedDropdown(dropItem.label)}
                                        >
                                          <span className="font-medium text-foreground group-hover:text-accent">
                                            {dropItem.label}
                                          </span>
                                          <ChevronRight
                                            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-transform duration-300 ${
                                              activeNestedDropdown === dropItem.label
                                                ? "rotate-90"
                                                : ""
                                            }`}
                                          />
                                        </button>

                                        <AnimatePresence>
                                          {activeNestedDropdown === dropItem.label && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden bg-muted/50"
                                            >
                                              {dropItem.nested?.map((nestedItem) => (
                                                <Link
                                                  key={nestedItem.href}
                                                  to={nestedItem.href}
                                                  className="block px-8 py-3 text-sm text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200"
                                                  onClick={closeMobileMenu}
                                                >
                                                  {nestedItem.label}
                                                </Link>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </>
                                    ) : (
                                      <Link
                                        to={dropItem.href!}
                                        className="block px-5 py-3 text-foreground hover:bg-muted hover:text-accent transition-all duration-200"
                                        onClick={closeMobileMenu}
                                      >
                                        <div className="font-medium">{dropItem.label}</div>
                                        {dropItem.description && (
                                          <div className="text-xs text-muted-foreground mt-1">
                                            {dropItem.description}
                                          </div>
                                        )}
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.href!}
                          className={`
                            block px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                            ${
                              isActiveLink(item.href!)
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-foreground hover:bg-muted hover:text-accent"
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-3">
                <ThemeToggle />

                {/* CTA Button - Desktop */}
                {isHomePage && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden lg:block px-5 py-2 bg-gradient-to-r from-accent to-accent-light text-accent-foreground font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={onFormScroll}
                  >
                    Showcase Your Interest
                  </motion.button>
                )}

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden p-2 rounded-xl bg-muted hover:bg-muted-foreground/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </nav>
        </div>
      </motion.div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-[72px] right-4 bottom-4 w-[calc(100%-2rem)] max-w-sm bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 z-40 lg:hidden overflow-hidden"
            >
              <div className="h-full overflow-y-auto p-6 scrollbar-thin">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-2"
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          className={`
                            w-full p-4 text-left flex items-center justify-between rounded-xl font-medium text-base transition-all duration-300
                            ${
                              activeDropdown === item.label
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
                            }
                          `}
                          onClick={() => toggleDropdown(item.label)}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-2"
                            >
                              <div className="ml-4 pl-4 border-l-2 border-accent/30">
                                {item.dropdown.map((dropItem) => (
                                  <div key={dropItem.label} className="mb-2">
                                    {dropItem.nested ? (
                                      <>
                                        <button
                                          className={`
                                            w-full p-3 text-left flex items-center justify-between rounded-xl text-sm transition-all duration-300
                                            ${
                                              activeNestedDropdown === dropItem.label
                                                ? "bg-accent/10 text-accent"
                                                : "text-foreground hover:bg-muted"
                                            }
                                          `}
                                          onClick={() => toggleNestedDropdown(dropItem.label)}
                                        >
                                          <div className="font-medium">{dropItem.label}</div>
                                          <ChevronRight
                                            className={`w-3 h-3 transition-transform duration-300 ${
                                              activeNestedDropdown === dropItem.label
                                                ? "rotate-90"
                                                : ""
                                            }`}
                                          />
                                        </button>

                                        <AnimatePresence>
                                          {activeNestedDropdown === dropItem.label && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden mt-2"
                                            >
                                              <div className="ml-3 pl-3 border-l-2 border-accent/20">
                                                {dropItem.nested?.map((nestedItem) => (
                                                  <Link
                                                    key={nestedItem.href}
                                                    to={nestedItem.href}
                                                    className={`
                                                      block p-3 rounded-xl text-sm mb-2 font-medium transition-all duration-300
                                                      ${
                                                        isActiveLink(nestedItem.href)
                                                          ? "bg-gradient-to-r from-accent to-accent-light text-accent-foreground shadow-md"
                                                          : "bg-muted/50 text-foreground hover:bg-muted hover:text-accent"
                                                      }
                                                    `}
                                                    onClick={closeMobileMenu}
                                                  >
                                                    {nestedItem.label}
                                                  </Link>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </>
                                    ) : (
                                      <Link
                                        to={dropItem.href!}
                                        className="block p-3 rounded-xl text-sm transition-all duration-300 font-medium bg-muted/50 text-foreground hover:bg-muted hover:text-accent"
                                        onClick={closeMobileMenu}
                                      >
                                        {dropItem.label}
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.href!}
                        className={`
                          block p-4 rounded-xl font-medium text-base transition-all duration-300
                          ${
                            isActiveLink(item.href!)
                              ? "bg-gradient-to-r from-accent to-accent-light text-accent-foreground shadow-md"
                              : "text-foreground hover:bg-muted hover:text-accent"
                          }
                        `}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile CTA Button */}
                {isHomePage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 pt-6 border-t border-border"
                  >
                    <button
                      className="w-full py-4 px-6 bg-gradient-to-r from-accent to-accent-light text-accent-foreground font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => {
                        const formElement = document.getElementById("interest-form");
                        if (formElement) {
                          const yOffset = -340;
                          const y =
                            formElement.getBoundingClientRect().top +
                            window.scrollY +
                            yOffset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                        closeMobileMenu();
                      }}
                    >
                      Showcase Your Interest
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
