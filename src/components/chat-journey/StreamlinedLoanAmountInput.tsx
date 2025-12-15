import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Percent, ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreamlinedLoanAmountInputProps {
  totalCost: number;
  currency: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const StreamlinedLoanAmountInput = ({
  totalCost,
  currency,
  value,
  onChange,
  onSubmit
}: StreamlinedLoanAmountInputProps) => {
    console.log("StreamlinedLoanAmountInputProps......", { totalCost, currency, value });
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  const currentAmount = parseFloat(value) || 0;
  const percentage = totalCost > 0 ? (currentAmount / totalCost) * 100 : 0;
  const isValid = currentAmount > 0 && currentAmount <= totalCost;

  // Quick amount buttons
  const quickAmounts = [
    { label: "25%", value: 0.25, color: "from-blue-500 to-blue-600" },
    { label: "50%", value: 0.5, color: "from-green-500 to-green-600" },
    { label: "75%", value: 0.75, color: "from-orange-500 to-orange-600" },
    { label: "100%", value: 1, color: "from-purple-500 to-purple-600" }
  ];

  const handleQuickAmount = (multiplier: number) => {
    const amount = Math.round(totalCost * multiplier);
    onChange(amount.toString());
    setSelectedPercentage(multiplier * 100);
  };

  const handleSliderChange = (values: number[]) => {
    const amount = values[0];
    onChange(amount.toString());
    
    // Check if slider value matches any quick amount
    const matchingQuickAmount = quickAmounts.find(qa => {
      const qaAmount = Math.round(totalCost * qa.value);
      return Math.abs(amount - qaAmount) < 100;
    });
    
    setSelectedPercentage(matchingQuickAmount ? matchingQuickAmount.value * 100 : null);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const sliderStep = Math.round(totalCost / 100);

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-accent/5 border-border/50 shadow-md backdrop-blur-sm animate-fade-in">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm">Loan Amount</h3>
          </div>
          <div className="text-xs text-muted-foreground">
            Max: {currency} {formatAmount(totalCost)}
          </div>
        </div>

        {/* Quick Amount Chips - Horizontal Scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickAmounts.map((qa) => {
            const amount = Math.round(totalCost * qa.value);
            const isSelected = selectedPercentage === qa.value * 100;
            
            return (
              <button
                key={qa.label}
                onClick={() => handleQuickAmount(qa.value)}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-full border-2 transition-all duration-300 group whitespace-nowrap text-xs",
                  isSelected
                    ? `bg-gradient-to-r ${qa.color} border-transparent text-white shadow-md`
                    : "border-border/50 bg-muted/30 hover:border-primary/40 text-foreground"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">{qa.label}</span>
                  <span className="opacity-75">
                    {formatAmount(amount)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Amount Display */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Selected Amount</div>
              <div className="text-xl font-bold text-foreground">
                {currency} {formatAmount(currentAmount)}
              </div>
            </div>
          </div>
          {currentAmount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
              <Percent className="w-3.5 h-3.5 text-primary" />
              <span className={cn(
                "text-sm font-bold",
                percentage <= 100 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                {percentage.toFixed(0)}%
              </span>
            </div>
          )}
        </div>

        {/* Shadcn Slider */}
        <div className="space-y-2 px-1">
          <div className="relative pt-2">
            <Slider
              value={[currentAmount]}
              onValueChange={handleSliderChange}
              max={totalCost}
              min={0}
              step={sliderStep}
              className="w-full"
            />
            
            {/* Visual markers overlay */}
            <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none flex justify-between px-1">
              {[25, 50, 75].map((mark) => (
                <div
                  key={mark}
                  className="w-px h-full bg-border/60"
                  style={{ 
                    position: 'absolute',
                    left: `${mark}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Slider Labels */}
          <div className="flex justify-between text-[10px] text-muted-foreground font-medium px-0.5">
            <span>0</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Compact Validation */}
        {currentAmount > 0 && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md transition-all duration-300",
            isValid
              ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"
          )}>
            <div className={cn(
              "w-1 h-1 rounded-full",
              isValid ? "bg-green-500" : "bg-red-500 animate-pulse"
            )} />
            <span className="font-medium">
              {isValid ? (
                `Perfect! ${percentage.toFixed(0)}% coverage`
              ) : (
                `Exceeds max amount`
              )}
            </span>
          </div>
        )}

        {/* Continue Button */}
        <Button
          onClick={onSubmit}
          disabled={!isValid}
          className="w-full gradient-primary h-11 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};