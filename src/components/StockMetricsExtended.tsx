import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  ArrowUpCircle,
  ArrowDownCircle,
  Circle
} from "lucide-react";

interface StockMetricsExtendedProps {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume?: number;
  high?: number;
  low?: number;
  open?: number;
}

export const StockMetricsExtended = ({ 
  symbol, 
  currentPrice, 
  change, 
  changePercent,
  volume,
  high,
  low,
  open
}: StockMetricsExtendedProps) => {
  const isPositive = change >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-primary/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {symbol}
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`text-sm mt-1 font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-success/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${isPositive ? 'bg-success/10 group-hover:bg-success/20' : 'bg-destructive/10 group-hover:bg-destructive/20'} transition-colors`}>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Change
            </span>
          </div>
          <div className={`text-3xl font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}
          </div>
          <div className={`text-sm mt-1 ${isPositive ? 'text-success/80' : 'text-destructive/80'}`}>
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}% today
          </div>
        </CardContent>
      </Card>

      {volume !== undefined && (
        <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-accent/50 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Volume
              </span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {(volume / 1000000).toFixed(2)}M
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              shares traded
            </div>
          </CardContent>
        </Card>
      )}

      {high !== undefined && low !== undefined && (
        <Card className="bg-gradient-to-br from-card to-card/80 border-border hover:border-primary/50 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Circle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Day Range
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                <span className="text-lg font-bold text-foreground">${high.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowDownCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-muted-foreground">Low</span>
                </div>
                <span className="text-lg font-bold text-foreground">${low.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
