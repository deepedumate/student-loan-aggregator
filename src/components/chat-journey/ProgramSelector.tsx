import { Card } from "@/components/ui/card";
import { ProgramCard } from "@/components/chat-journey/ProgramCard";
import { CurrencyControls } from "@/components/chat-journey/CurrencyControls";
import { CustomProgramInput } from "@/components/chat-journey/CustomProgramInput";
import { GraduationCap, Sparkles } from "lucide-react";
import ProgramCurrencyHeader from "./ProgramCurrencyHeader";

interface Program {
  program_name: string;
  duration_years: number;
  total_program_cost: number;
  notes?: string;
}

interface ProgramSelectorProps {
  programs: Program[];
  currencyDisplayMode: "original" | "converted" | "both";
  onCurrencyDisplayModeChange: (mode: "original" | "converted" | "both") => void;
  preferredCurrency: string;
  onPreferredCurrencyChange: (currency: string) => void;
  formCurrency: string;
  onProgramSelect: (program: Program) => void;
  onOtherProgramClick: () => void;
  isOtherProgramSelected: boolean;
  customProgramName: string;
  onCustomProgramNameChange: (name: string) => void;
  onCustomProgramSubmit: () => void;
  onCustomProgramCancel: () => void;
  formatCurrencyWithConversion: (amount: number, currency: string) => string;
  isLoading?: boolean;
}

export const ProgramSelector = ({
  programs,
  currencyDisplayMode,
  onCurrencyDisplayModeChange,
  preferredCurrency,
  onPreferredCurrencyChange,
  formCurrency,
  onProgramSelect,
  onOtherProgramClick,
  isOtherProgramSelected,
  customProgramName,
  onCustomProgramNameChange,
  onCustomProgramSubmit,
  onCustomProgramCancel,
  formatCurrencyWithConversion,
  isLoading = false,
}: ProgramSelectorProps) => {
  const programCount = programs.length;

  return (
    <div className="py-4 space-y-4 max-w-3xl mx-auto animate-fade-in">
      <ProgramCurrencyHeader  
        programCount={programCount}
        currencyDisplayMode={currencyDisplayMode}
        formCurrency={formCurrency}
        preferredCurrency={preferredCurrency}
        onCurrencyDisplayModeChange={onCurrencyDisplayModeChange}
        onCurrencyChange={onPreferredCurrencyChange}
      />
      {/* Programs Grid */}
      <div className="space-y-3">
        {programs.map((program, idx) => {
          const convertedTotal = formatCurrencyWithConversion(
            program.total_program_cost,
            formCurrency
          );
          return (
            <ProgramCard
              key={idx}
              program={program}
              convertedTotal={convertedTotal}
              onClick={() => onProgramSelect(program)}
            />
          );
        })}

        {/* Other Option Card */}
        <ProgramCard
          program={{
            program_name: "Other Program",
            duration_years: 0,
            total_program_cost: 0,
          }}
          convertedTotal="0"
          onClick={onOtherProgramClick}
          isOther={true}
        />
      </div>

      {/* Custom Program Input */}
      {isOtherProgramSelected && (
        <CustomProgramInput
          value={customProgramName}
          onChange={onCustomProgramNameChange}
          onSubmit={onCustomProgramSubmit}
          onCancel={onCustomProgramCancel}
          isLoading={isLoading}
        />
      )}

      {/* Helper Text */}
      {!isOtherProgramSelected && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/30">
          <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
          <p>
            Select a program to see detailed cost breakdown and proceed with your loan application.
          </p>
        </div>
      )}
    </div>
  );
};