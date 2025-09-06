import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const cryptoData = [
  { 
    id: 1, 
    symbol: "BTC", 
    name: "Bitcoin", 
    price: 42350.25, 
    change: 2.45, 
    volume: "28.5B",
    marketCap: "830.2B",
    color: "from-orange-500 to-yellow-500"
  },
  { 
    id: 2, 
    symbol: "ETH", 
    name: "Ethereum", 
    price: 2680.75, 
    change: -1.25, 
    volume: "12.8B",
    marketCap: "322.4B",
    color: "from-blue-500 to-purple-500"
  },
  { 
    id: 3, 
    symbol: "ADA", 
    name: "Cardano", 
    price: 0.485, 
    change: 5.67, 
    volume: "1.2B",
    marketCap: "17.1B",
    color: "from-blue-400 to-cyan-400"
  },
  { 
    id: 4, 
    symbol: "SOL", 
    name: "Solana", 
    price: 98.32, 
    change: 3.21, 
    volume: "2.1B",
    marketCap: "42.8B",
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: 5, 
    symbol: "DOT", 
    name: "Polkadot", 
    price: 7.45, 
    change: -2.11, 
    volume: "456M",
    marketCap: "8.9B",
    color: "from-pink-500 to-red-500"
  },
  { 
    id: 6, 
    symbol: "MATIC", 
    name: "Polygon", 
    price: 0.89, 
    change: 4.33, 
    volume: "312M",
    marketCap: "8.2B",
    color: "from-purple-600 to-indigo-600"
  }
];

export const MarketOverview = () => {
  const { toast } = useToast();
  const totalMarketCap = "1.72T";
  const totalVolume = "89.3B";
  const dominance = 52.3;

  return (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <DollarSign className="h-4 w-4 text-neon-cyan" />
              Total Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMarketCap}</div>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingUp className="h-3 w-3" />
              +2.45% (24h)
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Activity className="h-4 w-4 text-neon-purple" />
              24h Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume}</div>
            <div className="flex items-center gap-1 text-sm text-danger">
              <TrendingDown className="h-3 w-3" />
              -1.23% (24h)
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-neon-green" />
              BTC Dominance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dominance}%</div>
            <div className="text-sm text-muted-foreground">
              Market Share
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Cryptocurrencies */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Top Cryptocurrencies</span>
            <Button variant="trading" size="sm" onClick={() => {
              toast({
                title: "Market Data",
                description: "Opening full market analysis...",
              });
            }}>
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.id}
                className="p-4 rounded-lg glass border border-border/50 hover-lift group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{crypto.symbol}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{crypto.symbol}</div>
                      <div className="text-sm text-muted-foreground">{crypto.name}</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${crypto.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {crypto.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Price</span>
                    <span className="font-semibold">
                      ${crypto.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Volume</span>
                    <span className="text-sm">${crypto.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Market Cap</span>
                    <span className="text-sm">${crypto.marketCap}</span>
                  </div>
                </div>

                <Button 
                  variant="neon" 
                  size="sm" 
                  className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    toast({
                      title: "Trading Alert",
                      description: `Opening ${crypto.symbol} trading interface...`,
                      action: (
                        <Button variant="ghost" size="sm">
                          Quick Buy
                        </Button>
                      ),
                    });
                  }}
                >
                  Trade {crypto.symbol}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};