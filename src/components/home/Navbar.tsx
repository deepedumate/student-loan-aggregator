import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  GraduationCap,
  Calculator,
  PiggyBank,
  Home,
  Banknote,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Heart,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsAuthenticated,
  selectUser,
  clearUser,
} from "@/store/slices/contactAuthSlice";
import { toast } from "sonner";

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
 * - Glassmorphic design with backdrop blur and animations
 * - Shadcn/ui NavigationMenu dropdown design
 * - Framer Motion smooth animations
 * - Scroll-triggered background changes
 * - Redux authentication integration
 */
export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ✅ Use proper Redux selectors
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  const userData = useAppSelector(selectUser);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // ✅ Extract user name safely with fallbacks
  const getUserName = () => {
    if (!userData?.contact) return null;

    const { first_name, last_name } = userData.contact?.personal_information;

    if (first_name && last_name) return `${first_name} ${last_name}`;
    if (first_name) return first_name;

    return null;
  };

  const userName = getUserName();

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
    setUserMenuOpen(false);
  }, [pathname]);

  // ✅ Fixed: Properly handle logout click
  const handleLogoutClick = () => {
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setShowLogoutDialog(true); // Show confirmation dialog
  };

  // ✅ Fixed: Properly handle logout confirmation
  const handleLogoutConfirm = () => {
    dispatch(clearUser());
    setShowLogoutDialog(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLoansOpen(false);
    setUserMenuOpen(false);
  };

  // ✅ Fixed: Handle undefined name parameter
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
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
              ${isMobileMenuOpen ? "rounded-t-2xl" : "rounded-2xl"}
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
                        <NavigationMenuTrigger
                          className={cn(
                            "h-10 px-5 font-medium rounded-lg transition-all duration-300",
                            // Light theme - TRANSPARENT DEFAULT
                            "bg-transparent text-foreground border border-transparent",
                            "hover:bg-accent hover:text-accent-foreground hover:border-border/50",
                            // CLICKED/OPEN STATE - Blue background
                            "data-[state=open]:bg-primary/10 data-[state=open]:text-primary data-[state=open]:border-primary/20",
                            // Dark theme
                            "dark:bg-transparent dark:text-foreground dark:border-transparent",
                            "dark:hover:bg-accent dark:hover:text-accent-foreground dark:hover:border-border/50",
                            "dark:data-[state=open]:bg-primary/20 dark:data-[state=open]:text-primary-foreground dark:data-[state=open]:border-primary/30",
                            // Icon color
                            "[&_svg]:text-muted-foreground",
                            "hover:[&_svg]:text-accent-foreground",
                            "data-[state=open]:[&_svg]:text-primary dark:data-[state=open]:[&_svg]:text-primary-foreground",
                            // Active/pressed state
                            "active:scale-95",
                            // Focus state
                            "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                          )}
                        >
                          <Banknote className="mr-2 h-4 w-4" />
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

                  {/* ✅ Fixed: User Menu / Login Button */}
                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                          {getInitials(userName)}
                        </div>
                        <span className="text-sm capitalize font-medium text-foreground max-w-[100px] truncate">
                          {userName}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            userMenuOpen && "rotate-180"
                          )}
                        />
                      </button>

                      {/* User Dropdown */}
                      {userMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                            <div className="px-4 py-3 border-b border-border">
                              <p className="text-sm font-medium text-foreground truncate">
                                {userName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {userData?.student?.email || "Verified User"}
                              </p>
                            </div>
                            <Link
                              to="/loan-offers"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              <GraduationCap className="w-4 h-4" />
                              My Loans
                            </Link>
                            <Link
                              to="/loan-offers"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              Favorites
                            </Link>
                            <div className="border-t border-border my-1" />
                            <button
                              onClick={handleLogoutClick}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      {pathname === "/" && (
                        <Link to="/login">
                          <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 h-10 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <User className="mr-2 h-4 w-4" />
                            Login
                          </Button>
                        </Link>
                      )}
                    </>
                  )}

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
                  {/* ✅ Mobile User Section */}
                  {isAuthenticated && userName && (
                    <div className="pb-4 border-b border-border/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {getInitials(userName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {userName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {userData?.student?.email || "Verified User"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Link
                          to="/explore-loans"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <GraduationCap className="w-4 h-4" />
                          My Loans
                        </Link>
                        <Link
                          to="/explore-loans"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Favorites
                        </Link>
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}

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
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isLoansOpen && "rotate-180"
                        )}
                      />
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
                              <div className="text-sm font-medium">
                                {item.title}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
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
                  {!isAuthenticated && pathname === "/" && (
                    <Link to="/login">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md sm:hidden">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
            <AlertDialogDescription>
              You'll need to log in again to access your saved loans and
              preferences.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Navbar;
