import { memo } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface OptionCardProps {
  label: string;
  onClick: () => void;
  selected?: boolean;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
  duration?: string;
  compact?: boolean;
}

const OptionCardComponent = ({ 
  label, 
  onClick, 
  selected, 
  icon, 
  description, 
  badge, 
  duration,
  compact 
}: OptionCardProps) => {
  console.log("OptionCardComponent", label, selected, compact);
  if (compact) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left px-4 py-3 rounded-xl border transition-all duration-200",
          "flex items-center gap-3 group",
          "hover:shadow-md active:scale-[0.99]",
          selected
            ? "bg-primary text-primary-foreground border-primary shadow-md"
            : "bg-card border-border/50 hover:border-primary/30 hover:bg-primary/5"
        )}
      >
        {icon && (
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
            selected
              ? "bg-primary-foreground/20"
              : "bg-primary/10 text-primary group-hover:bg-primary/15"
          )}>
            {icon}
          </div>
        )}
        <span className={cn(
          "font-medium text-sm flex-1",
          selected ? "text-primary-foreground" : "text-foreground"
        )}>
          {label}
        </span>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-scale-in">
            <Check className="w-3 h-3 text-primary-foreground" />
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300",
        "flex items-center gap-4 group relative overflow-hidden",
        "hover:shadow-lg active:scale-[0.99]",
        selected
          ? "bg-primary/70 text-primary-foreground border-primary shadow-lg"
          : "bg-card border-border/30 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
      )}
    >
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-primary/10 via-transparent to-accent/5",
        !selected && "group-hover:opacity-100"
      )} />
      {/* Badge & Duration */}
      {(badge || duration) && (
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {duration && (
            <span className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-full",
              selected 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {duration}
            </span>
          )}
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground bg-accent px-2 py-0.5 rounded-full shadow-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10",
          selected
            ? "bg-primary-foreground/20"
            : "bg-primary/10 text-primary group-hover:bg-primary/15 group-hover:scale-105"
        )}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 relative z-10">
        <span className={cn(
          "font-semibold text-base block transition-colors",
          selected ? "text-primary-foreground" : "text-foreground"
        )}>
          {label}
        </span>
        {description && (
          <span className={cn(
            "text-sm mt-1 block transition-colors",
            selected ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {description}
          </span>
        )}
      </div>

      {/* Selection Indicator */}
      {selected ? (
        <div className="w-7 h-7 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-scale-in flex-shrink-0 relative z-10">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      ) : (
        <ChevronRight className={cn(
          "w-5 h-5 flex-shrink-0 transition-all duration-300 relative z-10",
          "text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5"
        )} />
      )}
    </button>
  );
};

export const OptionCard = memo(OptionCardComponent);
