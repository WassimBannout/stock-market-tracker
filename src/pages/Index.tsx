import { useState, useEffect } from "react";
import { StockSearch } from "@/components/StockSearch";
import { StockMetricsExtended } from "@/components/StockMetricsExtended";
import { StockChart } from "@/components/StockChart";
// ApiKeyInput removed: API key is provided via Vite env and UI prompts are disabled
import { Watchlist } from "@/components/Watchlist";
import { MetricsSkeleton, ChartSkeleton } from "@/components/SkeletonLoader";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, TrendingUp } from "lucide-react";
import { fetchStockData, parseStockData } from "@/lib/stockApi";
import { 
  getApiKey, 
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/localStorage";
import { TimeRange } from "@/components/TimeRangeSelector";

interface StockData {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  chartData: {
    dates: string[];
    prices: number[];
  };
}

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const { toast } = useToast();

  // Load API key and watchlist from localStorage (or embedded Vite env fallback) on mount
  useEffect(() => {
    const storedApiKey = getApiKey();
    if (storedApiKey) setApiKey(storedApiKey);
    setWatchlist(getWatchlist());
  }, []);

  // API key is supplied via Vite env or localStorage. No UI handlers for changing/clearing the key.

  const handleToggleWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      removeFromWatchlist(symbol);
      setWatchlist(watchlist.filter(s => s !== symbol));
      toast({
        title: "Removed from Watchlist",
        description: `${symbol} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist(symbol);
      setWatchlist([...watchlist, symbol]);
      toast({
        title: "Added to Watchlist",
        description: `${symbol} has been added to your watchlist.`,
      });
    }
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    removeFromWatchlist(symbol);
    setWatchlist(watchlist.filter(s => s !== symbol));
    toast({
      title: "Removed from Watchlist",
      description: `${symbol} has been removed.`,
    });
  };

  const fetchStock = async (symbol: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Alpha Vantage API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await fetchStockData(symbol, apiKey);

      if (data["Time Series (Daily)"]) {
        const timeSeries = data["Time Series (Daily)"];
        const parsed = parseStockData(timeSeries, 365); // Get full year of data
        
        const currentPrice = parsed.prices[0];
        const previousPrice = parsed.prices[1];
        const change = currentPrice - previousPrice;
        const changePercent = (change / previousPrice) * 100;

        setStockData({
          symbol,
          currentPrice,
          change,
          changePercent,
          volume: parsed.volumes[0],
          high: parsed.highs[0],
          low: parsed.lows[0],
          open: parsed.opens[0],
          chartData: {
            dates: parsed.dates,
            prices: parsed.prices,
          },
        });

        toast({
          title: "Success",
          description: `Loaded data for ${symbol}`,
        });
      } else if (data["Note"]) {
        toast({
          title: "Rate Limit Exceeded",
          description: "API call frequency limit reached. Please wait a moment and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid stock symbol or API error. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-card/50 to-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 shadow-lg">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Stock Market Tracker
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Real-time market data and analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <StockSearch onSearch={fetchStock} isLoading={isLoading} />
          </div>

          {/* Watchlist */}
          <Watchlist
            watchlist={watchlist}
            currentSymbol={stockData?.symbol}
            onSelectStock={fetchStock}
            onRemoveStock={handleRemoveFromWatchlist}
            onToggleWatchlist={handleToggleWatchlist}
            isInWatchlist={stockData ? watchlist.includes(stockData.symbol) : false}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-6 animate-fade-in">
              <MetricsSkeleton />
              <ChartSkeleton />
            </div>
          )}

          {/* Stock Data */}
          {stockData && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              <StockMetricsExtended
                symbol={stockData.symbol}
                currentPrice={stockData.currentPrice}
                change={stockData.change}
                changePercent={stockData.changePercent}
                volume={stockData.volume}
                high={stockData.high}
                low={stockData.low}
                open={stockData.open}
              />
              <StockChart 
                data={stockData.chartData} 
                symbol={stockData.symbol}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            </div>
          )}

          {/* Empty State */}
          {!stockData && !isLoading && (
            <div className="text-center py-20 animate-slide-up">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-primary/10 to-success/10 mb-6">
                <TrendingUp className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Track Stocks</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Enter a stock symbol above to view real-time market data, historical charts, and key metrics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
