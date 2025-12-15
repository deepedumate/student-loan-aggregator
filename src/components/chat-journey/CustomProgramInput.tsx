import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Sparkles } from "lucide-react";

interface CustomProgramInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CustomProgramInput = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  isLoading = false,
}: CustomProgramInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit();
    }
  };

  return (
    <Card className="p-4 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in shadow-lg">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Custom Program</h4>
              <p className="text-xs text-muted-foreground">
                Enter the program name to get details
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Input Section */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="e.g., Master of Finance"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pl-9 h-11 transition-all duration-300 focus:shadow-sm border-primary/20 focus:border-primary/40"
              autoFocus
            />
          </div>
          <Button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="gradient-primary px-5 h-11 font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                <span>Fetching...</span>
              </>
            ) : (
              <span>Get Details</span>
            )}
          </Button>
        </div>

        {/* Helper Text */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-md">
          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
          <p>
            Enter the full program name (e.g., "Master of Business Administration" or "MBA"). 
            We'll fetch the cost details automatically.
          </p>
        </div>
      </div>
    </Card>
  );
};