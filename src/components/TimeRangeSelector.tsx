import { Button } from "@/components/ui/button";

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y";

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onSelect: (range: TimeRange) => void;
}

const ranges: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y"];

const rangeToDays: Record<TimeRange, number> = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
};

export const getDaysFromRange = (range: TimeRange): number => rangeToDays[range];

export const TimeRangeSelector = ({ selected, onSelect }: TimeRangeSelectorProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={selected === range ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(range)}
          className={
            selected === range
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary hover:bg-secondary/80 text-foreground border-border"
          }
        >
          {range}
        </Button>
      ))}
    </div>
  );
};
