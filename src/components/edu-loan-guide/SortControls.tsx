import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// ✅ FIXED: Changed to match API field names (snake_case)
export type SortField =
  | "interest_rate"
  | "max_loan_amount"
  | "processing_fee"
  | "rating"
  | "lender_name"
  | "product_name"
  | "created_at";
export type SortDirection = "asc" | "desc";

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

interface SortControlsProps {
  sortOptions: SortOptions;
  onSortChange: (options: SortOptions) => void;
}

// ✅ FIXED: Updated sort fields to match API
const SORT_FIELDS = [
  { value: "interest_rate", label: "Interest Rate" },
  { value: "max_loan_amount", label: "Max Loan Amount" },
  { value: "processing_fee", label: "Processing Fee" },
  { value: "rating", label: "Rating" },
  { value: "lender_name", label: "Lender Name" },
  { value: "product_name", label: "Product Name" },
  { value: "created_at", label: "Recently Added" },
] as const;

export function SortControls({ sortOptions, onSortChange }: SortControlsProps) {
  const toggleDirection = () => {
    onSortChange({
      ...sortOptions,
      direction: sortOptions.direction === "asc" ? "desc" : "asc",
    });
  };

  const getSortLabel = () => {
    const field = SORT_FIELDS.find((f) => f.value === sortOptions.field);
    return field?.label || "Sort by";
  };

  const getDirectionLabel = () => {
    if (
      sortOptions.field === "interest_rate" ||
      sortOptions.field === "processing_fee"
    ) {
      return sortOptions.direction === "asc" ? "Low to High" : "High to Low";
    }
    if (
      sortOptions.field === "lender_name" ||
      sortOptions.field === "product_name"
    ) {
      return sortOptions.direction === "asc" ? "A to Z" : "Z to A";
    }
    if (sortOptions.field === "created_at") {
      return sortOptions.direction === "asc" ? "Oldest First" : "Newest First";
    }
    return sortOptions.direction === "asc" ? "Lowest First" : "Highest First";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Sort by:
        </span>
      </div>

      <Select
        value={sortOptions.field}
        onValueChange={(value) =>
          onSortChange({ ...sortOptions, field: value as SortField })
        }
      >
        <SelectTrigger className="w-[180px] h-10 rounded-lg bg-card border-border/50 hover:border-primary/40 transition-colors">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {SORT_FIELDS.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={toggleDirection}
        variant="outline"
        size="sm"
        className="h-10 px-3 rounded-lg border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
      >
        {sortOptions.direction === "asc" ? (
          <ArrowUp className="w-4 h-4 mr-2" />
        ) : (
          <ArrowDown className="w-4 h-4 mr-2" />
        )}
        {getDirectionLabel()}
      </Button>
    </div>
  );
}
