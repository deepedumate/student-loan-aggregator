import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight, GraduationCap } from "lucide-react";
import { Card } from "../ui/card";

interface CurrencyControlsProps {
  programCount: number;
  currencyDisplayMode: "original" | "converted" | "both";
  onCurrencyDisplayModeChange: (mode: "original" | "converted" | "both") => void;
  preferredCurrency: string;
  onPreferredCurrencyChange: (currency: string) => void;
  formCurrency: string;
}

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD", flag: "🇺🇸" },
  { value: "EUR", label: "EUR", flag: "🇪🇺" },
  { value: "GBP", label: "GBP", flag: "🇬🇧" },
  { value: "INR", label: "INR", flag: "🇮🇳" },
  { value: "CAD", label: "CAD", flag: "🇨🇦" },
  { value: "AUD", label: "AUD", flag: "🇦🇺" },
  { value: "JPY", label: "JPY", flag: "🇯🇵" },
  { value: "CNY", label: "CNY", flag: "🇨🇳" },
  { value: "SGD", label: "SGD", flag: "🇸🇬" },
  { value: "AED", label: "AED", flag: "🇦🇪" },
];

export const CurrencyControls = ({
  programCount,
  currencyDisplayMode,
  onCurrencyDisplayModeChange,
  preferredCurrency,
  onPreferredCurrencyChange,
  formCurrency,
}: CurrencyControlsProps) => {
  const handleToggle = () => {
    const modes: Array<"original" | "converted" | "both"> = ["original", "converted", "both"];
    const currentIndex = modes.indexOf(currencyDisplayMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    onCurrencyDisplayModeChange(nextMode);
  };

  const getModeLabel = () => {
    if (currencyDisplayMode === "original") return `${formCurrency} Only`;
    if (currencyDisplayMode === "converted") return `${preferredCurrency} Only`;
    return `${formCurrency} + ${preferredCurrency}`;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-primary/5 border-border/50 shadow-md">
      <div className="space-y-3">
        {/* Title and Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Available Programs</h3>
              <p className="text-xs text-muted-foreground">
                {programCount} program{programCount !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>
        </div>

        {/* Currency Controls */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              className="h-9 px-3 text-xs transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm group"
              title="Toggle currency display"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 mr-2 transition-transform duration-300 group-hover:rotate-180" />
              <span className="font-medium whitespace-nowrap">
                {getModeLabel()}
              </span>
            </Button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-border" />

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Convert to:
              </span>
              <Select
                value={preferredCurrency}
                onValueChange={onPreferredCurrencyChange}
              >
                <SelectTrigger className="w-32 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="flex items-center gap-2">
                        <span>{option.flag}</span>
                        <span>{option.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};