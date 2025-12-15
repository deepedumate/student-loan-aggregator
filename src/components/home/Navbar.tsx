import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  GraduationCap, 
  Calculator, 
  PiggyBank, 
  Home, 
  Banknote, 
  User, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const loanMenuItems = [
  {
    title: "Explore Education Loans",
    description: "Find the perfect financing solution for your education",
    href: "/explore-loans",
    icon: GraduationCap,
  },
  {
    title: "Loan Eligibility Checker",
    description: "Instantly check your eligibility for education loans",
    href: "https://edumateglobal.com/resources/tools/ai-loan-eligibility-checker",
    icon: Calculator,
  },
  {
    title: "Savings & EMI Calculator",
    description: "Get the best savings methodologies and plan your EMI",
    href: "https://edumateglobal.com/resources/tools/loan-emi-calculator",
    icon: PiggyBank,
  },
];

/**
 * Premium Navigation Component
 * Combines:
 * - Glassmorphic design with backdrop blur and animations from Navigation.tsx
 * - Shadcn/ui NavigationMenu dropdown design from Navbar.tsx
 * - Framer Motion smooth animations
 * - Scroll-triggered background changes
 */
export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    setIsLoansOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLoansOpen(false);
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
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-4 mt-3">
          <div
            className={`
              backdrop-blur-xl shadow-lg transition-all duration-300 ease-in-out border
              ${
                isScrolled
                  ? "bg-white/80 dark:bg-card/80 shadow-xl border-border/50"
                  : "bg-white/70 dark:bg-card/70 shadow-lg border-border/30"
              }
              ${isMobileMenuOpen ? 'rounded-t-2xl' : 'rounded-2xl'}
            `}
          >
            {/* Navbar */}
            <nav className="py-3 px-6">
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
                <div className="hidden lg:flex items-center gap-1">
                  <NavigationMenu>
                    <NavigationMenuList>
                      {/* Loans Dropdown with Icons & Descriptions */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="h-10 px-5 bg-primary/5 hover:bg-primary/10 data-[state=open]:bg-primary/10 text-foreground font-medium rounded-lg border border-primary/20 hover:border-primary/30 transition-all">
                          <Banknote className="mr-2 h-4 w-4 text-primary" />
                          Loans
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card border border-border shadow-xl rounded-xl">
                          <ul className="grid w-[420px] gap-1 p-3">
                            {loanMenuItems.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={item.href}
                                    className="flex items-start gap-4 rounded-lg p-4 transition-all hover:bg-primary/5 group border border-transparent hover:border-primary/10"
                                  >
                                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                      <item.icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {item.title}
                                      </div>
                                      <p className="text-sm text-muted-foreground leading-snug">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Home Loans - Coming Soon */}
                      <NavigationMenuItem>
                        <div className="h-10 px-5 flex items-center gap-2 text-muted-foreground/60 font-medium rounded-lg bg-muted/30 border border-border/50 cursor-not-allowed">
                          <Home className="h-4 w-4" />
                          <span>Homes</span>
                          <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">
                            Soon
                          </span>
                        </div>
                      </NavigationMenuItem>

                      {/* Forex Services - Coming Soon */}
                      <NavigationMenuItem>
                        <div className="h-10 px-5 flex items-center gap-2 text-muted-foreground/60 font-medium rounded-lg bg-muted/30 border border-border/50 cursor-not-allowed">
                          <Banknote className="h-4 w-4" />
                          <span>Forex</span>
                          <span className="text-[10px] bg-accent/15 text-accent px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">
                            Soon
                          </span>
                        </div>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  
                  {/* Login/Profile Button */}
                  <Button 
                    className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 h-10 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>

                  {/* Mobile Menu Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </nav>

            {/* Mobile Menu - Seamlessly attached, no gap */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t border-border/40">
                <div className="px-6 py-4 space-y-4">
                  {/* Mobile Loans Section */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsLoansOpen(!isLoansOpen)}
                      className="flex items-center justify-between w-full py-2 text-left font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-primary" />
                        Loans
                      </span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isLoansOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {isLoansOpen && (
                      <div className="pl-6 space-y-2">
                        {loanMenuItems.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="flex items-start gap-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{item.title}</div>
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Coming Soon Items */}
                  <div className="flex items-center gap-2 py-2 opacity-70">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>Homes</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center gap-2 py-2 opacity-70">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span>Forex Services</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>

                  {/* Mobile Login Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md sm:hidden"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;