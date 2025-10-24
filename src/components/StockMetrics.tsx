import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface StockMetricsProps {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume?: number;
}

export const StockMetrics = ({ 
  symbol, 
  currentPrice, 
  change, 
  changePercent,
  volume 
}: StockMetricsProps) => {
  const isPositive = change >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {symbol}
            </span>
          </div>
          <div className="text-3xl font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isPositive ? 'bg-success/10' : 'bg-destructive/10'}`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              Change
            </span>
          </div>
          <div className={`text-3xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}
          </div>
          <div className={`text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </div>
        </CardContent>
      </Card>

      {volume && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                Volume
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {(volume / 1000000).toFixed(2)}M
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
