import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProgramCurrencyHeader({
  programCount,
  currencyDisplayMode,
  formCurrency,
  preferredCurrency,
  onCurrencyChange,
  onCurrencyDisplayModeChange
}) {
    const handleToggle = () => {
    const modes: Array<"original" | "converted" | "both"> = ["original", "converted", "both"];
    const currentIndex = modes.indexOf(currencyDisplayMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    onCurrencyDisplayModeChange(nextMode);
  };
  return (
    <div className="flex items-center justify-between mb-3 py-2">
      <span className="text-xs text-muted-foreground">
        {programCount} program{programCount !== 1 ? "s" : ""} found
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          className="h-8 px-3 text-xs transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-sm group"
          title="Toggle currency display"
        >
          <ArrowLeftRight className="w-3 h-3 mr-1.5 transition-transform duration-300 group-hover:rotate-180" />
          <span className="font-medium transition-all duration-300">
            {currencyDisplayMode === "original" && `${formCurrency} Only`}
            {currencyDisplayMode === "converted" && `${preferredCurrency} Only`}
            {currencyDisplayMode === "both" && `${formCurrency} + ${preferredCurrency}`}
          </span>
        </Button>

        <span className="text-xs text-muted-foreground">Convert to:</span>

        <Select value={preferredCurrency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">🇺🇸 USD</SelectItem>
            <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
            <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
            <SelectItem value="INR">🇮🇳 INR</SelectItem>
            <SelectItem value="CAD">🇨🇦 CAD</SelectItem>
            <SelectItem value="AUD">🇦🇺 AUD</SelectItem>
            <SelectItem value="JPY">🇯🇵 JPY</SelectItem>
            <SelectItem value="CNY">🇨🇳 CNY</SelectItem>
            <SelectItem value="SGD">🇸🇬 SGD</SelectItem>
            <SelectItem value="AED">🇦🇪 AED</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
