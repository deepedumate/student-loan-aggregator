import { memo } from "react";
import { cn } from "@/lib/utils";
import { OptionCard } from "./OptionCard";

interface OptionItem {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  duration?: string;
}

interface OptionsGridProps {
  options: OptionItem[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
  animate?: boolean;
}

const OptionsGridComponent = ({
  options,
  onSelect,
  selectedValue,
  columns = 2,
  compact = false,
  animate = true,
}: OptionsGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };
  console.log("OptionsGridComponent", options);

  return (
    <div 
      className={cn(
        "grid gap-3 py-4",
        "ml-[3.25rem] lg:ml-[3.75rem]", // Align with chat bubble content
        gridCols[columns]
      )}
    >
      
      {options.map((option, index) => (
        <div
          key={option.value}
          className={cn(
            animate && " animate-options-in"
          )}
          style={{
            animationDelay: animate ? `${100 + index * 50}ms` : undefined,
            animationFillMode: "forwards",
          }}
        >
          <OptionCard
            label={option.label}
            description={option.description}
            icon={option.icon}
            badge={option.badge}
            duration={option.duration}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            compact={compact}
          />
        </div>
      ))}
    </div>
  );
};

export const OptionsGrid = memo(OptionsGridComponent);
