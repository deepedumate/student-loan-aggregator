import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, Zap, Calculator, Percent, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoanAmountInputProps {
  totalCost: number;
  currency: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const LoanAmountInput = ({
  totalCost,
  currency,
  value,
  onChange,
  onSubmit
}: LoanAmountInputProps) => {
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  const currentAmount = parseFloat(value) || 0;
  const percentage = totalCost > 0 ? (currentAmount / totalCost) * 100 : 0;
  const isValid = currentAmount > 0 && currentAmount <= totalCost;

  // Quick amount buttons (25%, 50%, 75%, 100%)
  const quickAmounts = [
    { label: "25%", value: 0.25, icon: Zap },
    { label: "50%", value: 0.5, icon: TrendingUp },
    { label: "75%", value: 0.75, icon: Calculator },
    { label: "100%", value: 1, icon: DollarSign }
  ];

  const handleQuickAmount = (multiplier: number) => {
    const amount = Math.round(totalCost * multiplier);
    onChange(amount.toString());
    setSelectedPercentage(multiplier * 100);
  };

  const handleManualInput = (inputValue: string) => {
    onChange(inputValue);
    const amount = parseFloat(inputValue) || 0;
    
    // Check if manual input matches any quick amount
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

  return (
    <Card className="h-full p-6 bg-gradient-to-br from-card via-card to-primary/5 border-border/50 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col h-full space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Loan Amount
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Select or enter amount
            </p>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
            Quick Select
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {quickAmounts.map((qa) => {
              const amount = Math.round(totalCost * qa.value);
              const isSelected = selectedPercentage === qa.value * 100;
              const Icon = qa.icon;
              
              return (
                <button
                  key={qa.label}
                  onClick={() => handleQuickAmount(qa.value)}
                  className={cn(
                    "relative overflow-hidden rounded-xl p-3.5 border-2 transition-all duration-300 group",
                    "hover:shadow-md hover:-translate-y-0.5",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border/50 bg-muted/30 hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors duration-300 flex-shrink-0",
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted group-hover:bg-primary/20 text-muted-foreground group-hover:text-primary"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className={cn(
                        "text-sm font-bold transition-colors",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {qa.label}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {currency} {formatAmount(amount)}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Manual Input with Progress Bar */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Input Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Custom Amount
            </label>
            <div className="space-y-2">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 peer-focus:text-primary z-10" />
                <Input
                  type="number"
                  placeholder={`Amount in ${currency}...`}
                  value={value}
                  onChange={(e) => handleManualInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && isValid && onSubmit()}
                  className={cn(
                    "pl-10 pr-20 h-12 rounded-xl peer transition-all duration-300 text-base font-semibold",
                    "focus:shadow-md hover:border-primary/40",
                    currentAmount > 0 && (isValid 
                      ? "border-green-500/50 focus:border-green-500" 
                      : "border-red-500/50 focus:border-red-500"
                    )
                  )}
                />
                {currentAmount > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
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
              
              {/* Continue Button */}
              <Button
                onClick={onSubmit}
                disabled={!isValid}
                className="w-full gradient-primary h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium">Coverage</span>
              <span className="font-mono">{formatAmount(currentAmount)} / {formatAmount(totalCost)}</span>
            </div>
            <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
              
              {/* Progress fill */}
              <div
                className={cn(
                  "absolute inset-y-0 left-0 transition-all duration-500 ease-out rounded-full",
                  percentage <= 100 
                    ? "bg-gradient-to-r from-green-500 to-green-400" 
                    : "bg-gradient-to-r from-red-500 to-red-400"
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>

              {/* Markers for quick amounts */}
              {[25, 50, 75].map((mark) => (
                <div
                  key={mark}
                  className="absolute top-0 bottom-0 w-px bg-border/50"
                  style={{ left: `${mark}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Validation Messages */}
          {currentAmount > 0 && (
            <div className={cn(
              "flex items-start gap-2 text-xs px-3 py-2 rounded-lg transition-all duration-300",
              isValid
                ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
            )}>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0",
                isValid ? "bg-green-500" : "bg-red-500 animate-pulse"
              )} />
              {isValid ? (
                <span className="font-medium leading-relaxed">
                  Perfect! Requesting {percentage.toFixed(1)}% of program cost
                </span>
              ) : (
                <span className="font-medium leading-relaxed">
                  Exceeds program cost. Max: {currency} {formatAmount(totalCost)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="pt-3 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            💡 Most students finance 70-100% of their education expenses
          </p>
        </div>
      </div>
    </Card>
  );
};