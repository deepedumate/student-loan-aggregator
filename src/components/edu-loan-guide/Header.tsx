import { NavLink } from "./NavLink";
import ThemeToggle from "../ui/ThemeToggle";

export const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground hover:text-primary transition-colors">
          {/* <GraduationCap className="h-6 w-6 text-primary" /> */}
          <img src="/edumate_logo.png" alt="Edumate logo" className="h-6 ml-1" />
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/loan-offers"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-semibold"
          >
            Loan Aggregator
          </NavLink>
          
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
