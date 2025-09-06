import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Maximize2 } from "lucide-react";

const timeframes = ["1H", "4H", "1D", "1W", "1M", "3M", "1Y"];

const generateChartData = () => {
  const data = [];
  let basePrice = 42000;
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 2000;
    basePrice += change;
    data.push({
      time: i,
      price: Math.max(basePrice, 30000),
      volume: Math.random() * 1000000 + 500000
    });
  }
  return data;
};

export const PriceChart = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [chartData] = useState(generateChartData());
  
  const currentPrice = 42350.25;
  const priceChange = 2.45;
  const isPositive = priceChange >= 0;

  // Generate SVG path for the price line
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const minPrice = Math.min(...chartData.map(d => d.price));
  const priceRange = maxPrice - minPrice;
  
  const pathData = chartData.map((point, index) => {
    const x = (index / (chartData.length - 1)) * 100;
    const y = 100 - ((point.price - minPrice) / priceRange) * 100;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">₿</span>
            </div>
            Bitcoin (BTC/USD)
          </CardTitle>
          <Button variant="ghost" size="icon" className="hover-lift">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">
            ${currentPrice.toLocaleString()}
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            <TrendingUp className={`h-4 w-4 ${!isPositive ? 'rotate-180' : ''}`} />
            <span className="font-medium">
              {isPositive ? '+' : ''}{priceChange}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timeframe Selector */}
        <div className="flex items-center gap-2 bg-secondary/30 rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={activeTimeframe === timeframe ? "neon" : "ghost"}
              size="sm"
              onClick={() => setActiveTimeframe(timeframe)}
              className="flex-1"
            >
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="relative h-80 bg-secondary/20 rounded-lg p-4 overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Grid Lines */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Grid */}
            {[20, 40, 60, 80].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="0.1"
                opacity="0.3"
              />
            ))}
            
            {/* Area under curve */}
            <path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill="url(#chartGradient)"
            />
            
            {/* Price line */}
            <path
              d={pathData}
              fill="none"
              stroke="hsl(var(--neon-cyan))"
              strokeWidth="0.3"
              className="chart-line"
              style={{
                filter: "drop-shadow(0 0 4px hsl(var(--neon-cyan) / 0.6))"
              }}
            />
            
            {/* Data points */}
            {chartData.slice(0, 10).map((point, index) => {
              const x = (index / (chartData.length - 1)) * 100;
              const y = 100 - ((point.price - minPrice) / priceRange) * 100;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="0.3"
                  fill="hsl(var(--neon-cyan))"
                  className="opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    filter: "drop-shadow(0 0 2px hsl(var(--neon-cyan)))"
                  }}
                />
              );
            })}
          </svg>
          
          {/* Price Labels */}
          <div className="absolute left-2 top-2 text-xs text-muted-foreground">
            ${maxPrice.toFixed(0)}
          </div>
          <div className="absolute left-2 bottom-2 text-xs text-muted-foreground">
            ${minPrice.toFixed(0)}
          </div>
        </div>

        {/* Chart Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">24h High</div>
            <div className="font-semibold text-success">$43,250</div>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">24h Low</div>
            <div className="font-semibold text-danger">$41,150</div>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div className="font-semibold">28.5B</div>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-semibold">830.2B</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};