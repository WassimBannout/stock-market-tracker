import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, X, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WatchlistProps {
  watchlist: string[];
  currentSymbol?: string;
  onSelectStock: (symbol: string) => void;
  onRemoveStock: (symbol: string) => void;
  onToggleWatchlist: (symbol: string) => void;
  isInWatchlist: boolean;
}

export const Watchlist = ({ 
  watchlist, 
  currentSymbol,
  onSelectStock, 
  onRemoveStock,
  onToggleWatchlist,
  isInWatchlist 
}: WatchlistProps) => {
  if (watchlist.length === 0 && !currentSymbol) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Star className="w-5 h-5 text-accent fill-accent" />
            Watchlist
          </CardTitle>
          {currentSymbol && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleWatchlist(currentSymbol)}
              className="hover:bg-accent/10"
            >
              <Star className={`w-4 h-4 ${isInWatchlist ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {watchlist.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Add stocks to your watchlist to track them easily
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {watchlist.map((symbol) => (
              <Badge
                key={symbol}
                variant="secondary"
                className="bg-secondary/50 hover:bg-secondary border border-border px-3 py-1.5 cursor-pointer group transition-all hover:border-primary/50"
              >
                <button
                  onClick={() => onSelectStock(symbol)}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span className="text-sm font-medium">{symbol}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveStock(symbol);
                  }}
                  className="ml-2 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
