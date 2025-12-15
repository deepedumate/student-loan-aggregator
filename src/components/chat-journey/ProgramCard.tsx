import { Card } from "@/components/ui/card";
import { GraduationCap, Clock, DollarSign, ChevronRight, Sparkles } from "lucide-react";
import { CurrencyDisplay } from "@/components/chat-journey/CurrencyDisplay";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: {
    program_name: string;
    duration_years: number;
    total_program_cost: number;
    notes?: string;
  };
  convertedTotal: string;
  onClick: () => void;
  isOther?: boolean;
}

export const ProgramCard = ({ program, convertedTotal, onClick, isOther = false }: ProgramCardProps) => {
  if (isOther) {
    return (
      <Card
        className="relative overflow-hidden p-4 cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg group"
        onClick={onClick}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-base transition-colors duration-300 group-hover:text-primary">
                Other Program
              </h4>
              <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 rounded-full bg-muted/50">
                Custom
              </span>
            </div>
            <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-foreground pl-9">
              Can't find your program? Enter it manually to get cost details.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-1" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="relative overflow-hidden p-4 cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transform hover:-translate-y-1 group"
      onClick={onClick}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-4">
            <h4 className="font-bold text-base leading-tight transition-colors duration-300 group-hover:text-primary line-clamp-2">
              {program.program_name}
            </h4>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
        </div>

        {/* Details */}
        <div className="flex items-center gap-3 text-sm">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">
              {program.duration_years} {program.duration_years === 1 ? "year" : "years"}
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-4 bg-border" />

          {/* Cost */}
          <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <DollarSign className="w-3.5 h-3.5" />
            <span className="font-semibold">
              <CurrencyDisplay value={convertedTotal} />
            </span>
          </div>
        </div>

        {/* Notes (if any) */}
        {/* {program.notes && (
          <div className="mt-3 pt-3 border-t border-border/30">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {program.notes}
            </p>
          </div>
        )} */}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
};