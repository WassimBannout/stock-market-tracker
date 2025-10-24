import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeRange, TimeRangeSelector, getDaysFromRange } from "./TimeRangeSelector";

Chart.register(...registerables);

interface StockChartProps {
  data: {
    dates: string[];
    prices: number[];
  };
  symbol: string;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export const StockChart = ({ data, symbol, timeRange, onTimeRangeChange }: StockChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data.dates.length) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const days = getDaysFromRange(timeRange);
    const filteredDates = data.dates.slice(0, days).reverse();
    const filteredPrices = data.prices.slice(0, days).reverse();

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "hsla(217, 91%, 60%, 0.3)");
    gradient.addColorStop(1, "hsla(217, 91%, 60%, 0)");

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: filteredDates,
        datasets: [
          {
            label: symbol,
            data: filteredPrices,
            borderColor: "hsl(217, 91%, 60%)",
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "hsl(217, 91%, 60%)",
            pointHoverBorderColor: "hsl(210, 40%, 98%)",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "hsl(220, 20%, 14%)",
            titleColor: "hsl(210, 40%, 98%)",
            bodyColor: "hsl(210, 40%, 98%)",
            borderColor: "hsl(217, 91%, 60%)",
            borderWidth: 2,
            padding: 16,
            displayColors: false,
            titleFont: {
              size: 14,
              weight: "bold",
            },
            bodyFont: {
              size: 16,
              weight: "bold",
            },
            callbacks: {
              label: (context) => {
                return `$${context.parsed.y.toFixed(2)}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "hsl(220, 15%, 25%)",
              drawTicks: false,
            },
            ticks: {
              color: "hsl(215, 20%, 65%)",
              maxTicksLimit: 8,
              font: {
                size: 11,
              },
            },
            border: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "hsl(220, 15%, 25%)",
              drawTicks: false,
            },
            ticks: {
              color: "hsl(215, 20%, 65%)",
              callback: (value) => `$${value}`,
              font: {
                size: 11,
              },
            },
            border: {
              display: false,
            },
          },
        },
      },
    };

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, symbol, timeRange]);

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border w-full hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-foreground">Price Chart</CardTitle>
          <TimeRangeSelector selected={timeRange} onSelect={onTimeRangeChange} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

