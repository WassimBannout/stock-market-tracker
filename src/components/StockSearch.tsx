import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface StockSearchProps {
  onSearch: (symbol: string) => void;
  isLoading?: boolean;
}

export const StockSearch = ({ onSearch, isLoading }: StockSearchProps) => {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      onSearch(symbol.toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <Input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL, TSLA)"
        className="flex-1 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !symbol.trim()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
};
