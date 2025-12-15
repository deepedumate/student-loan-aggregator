import { Card } from "@/components/ui/card";
import { GraduationCap, Home, Banknote, ChevronDown, ChevronUp } from "lucide-react";
import { CurrencyDisplay } from "@/components/chat-journey/CurrencyDisplay";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CompactCostBreakdownCardProps {
  totalCost: string;
  duration: string;
  tuition: string;
  tuitionPerYear?: string;
  living: string;
  livingPerYear?: string;
  showPerYear: boolean;
}

export const CompactCostBreakdownCard = ({
  totalCost,
  duration,
  tuition,
  tuitionPerYear,
  living,
  livingPerYear,
  showPerYear
}: CompactCostBreakdownCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tuitionAmount = parseFloat(tuition.replace(/[^0-9.-]+/g, ""));
  const livingAmount = parseFloat(living.replace(/[^0-9.-]+/g, ""));
  const totalAmount = parseFloat(totalCost.replace(/[^0-9.-]+/g, ""));
  const tuitionPercent = ((tuitionAmount / totalAmount) * 100).toFixed(0);
  const livingPercent = ((livingAmount / totalAmount) * 100).toFixed(0);

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-primary/5 border-border/50 shadow-md backdrop-blur-sm animate-fade-in">
      <div className="space-y-3">
        {/* Compact Header with Total Cost */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <Banknote className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Program Cost</div>
              <div className="text-xl font-bold text-foreground tracking-tight">
                <CurrencyDisplay value={totalCost} />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground">Duration</div>
            <div className="text-sm font-semibold text-primary">{duration}</div>
          </div>
        </div>

        {/* Compact Breakdown - Horizontal Layout */}
        <div className="flex gap-2">
          {/* Tuition */}
          <div className="flex-1 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2.5 border border-primary/20">
            <div className="flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Tuition</span>
            </div>
            <div className="text-sm font-bold text-foreground">
              <CurrencyDisplay value={tuition} />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {tuitionPercent}% of total
            </div>
          </div>

          {/* Living */}
          <div className="flex-1 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 p-2.5 border border-accent/20">
            <div className="flex items-center gap-1.5 mb-1">
              <Home className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Living</span>
            </div>
            <div className="text-sm font-bold text-foreground">
              <CurrencyDisplay value={living} />
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {livingPercent}% of total
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        {showPerYear && (tuitionPerYear || livingPerYear) && (
          <>
            {isExpanded && (
              <div className="pt-2 border-t border-border/30 space-y-1.5 animate-fade-in">
                {tuitionPerYear && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Tuition per year</span>
                    <span className="font-semibold text-foreground">
                      <CurrencyDisplay value={tuitionPerYear} />
                    </span>
                  </div>
                )}
                {livingPerYear && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Living per year</span>
                    <span className="font-semibold text-foreground">
                      <CurrencyDisplay value={livingPerYear} />
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors py-1"
            >
              <span className="font-medium">{isExpanded ? 'Less details' : 'More details'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </>
        )}
      </div>
    </Card>
  );
};