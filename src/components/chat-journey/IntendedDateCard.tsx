import { Card } from "@/components/ui/card";
import { Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface IntendedDateCardProps {
  onSelect: (month: number, year: number) => void;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear + 2];
};

export const IntendedDateCard = ({ onSelect }: IntendedDateCardProps) => {
  const years = generateYears();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <Card className="p-6 bg-card border-border/50 shadow-xl backdrop-blur-sm max-w-2xl">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">Intended Start Date</h3>
          <p className="text-sm text-muted-foreground">When do you plan to begin your program?</p>
        </div>
      </div>

      {/* Year Selector */}
      <div className="flex gap-2 mb-6">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={cn(
              "relative flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200",
              selectedYear === year
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {year}
            {selectedYear === year && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}
          </button>
        ))}
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => {
          const isPast = selectedYear === currentYear && index < currentMonth;
          return (
            <button
              key={month}
              onClick={() => !isPast && onSelect(index + 1, selectedYear)}
              disabled={isPast}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
                isPast
                  ? "bg-muted/30 text-muted-foreground/30 cursor-not-allowed border border-border/20"
                  : "bg-muted/50 text-foreground border border-border/40 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {month}
            </button>
          );
        })}
      </div>
    </Card>
  );
};
