import { TrendingUp, TrendingDown, Wallet, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const portfolioData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: 0.5423,
    value: 22980.45,
    change: 2.45,
    percentage: 45.2,
    color: "from-orange-500 to-yellow-500"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: 8.234,
    value: 22067.89,
    change: -1.25,
    percentage: 34.6,
    color: "from-blue-500 to-purple-500"
  },
  {
    symbol: "ADA",
    name: "Cardano",
    amount: 15420,
    value: 7478.70,
    change: 5.67,
    percentage: 12.8,
    color: "from-blue-400 to-cyan-400"
  },
  {
    symbol: "SOL",
    name: "Solana",
    amount: 47.2,
    value: 4640.70,
    change: 3.21,
    percentage: 7.4,
    color: "from-purple-500 to-pink-500"
  }
];

export const Portfolio = () => {
  const { toast } = useToast();
  const totalValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = 2.34; // Overall portfolio change percentage
  const isPositive = totalChange >= 0;

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-neon-cyan" />
            Portfolio
          </div>
          <Button variant="neon" size="sm" onClick={() => {
            toast({
              title: "Add Asset",
              description: "Opening asset selection dialog...",
              action: (
                <Button variant="ghost" size="sm">
                  Browse
                </Button>
              ),
            });
          }}>
            <Plus className="h-4 w-4 mr-1" />
            Add Asset
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Portfolio Summary */}
        <div className="text-center space-y-2 p-4 glass rounded-lg">
          <div className="text-3xl font-bold">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className={`flex items-center justify-center gap-1 ${
            isPositive ? 'text-success' : 'text-danger'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-medium">
              {isPositive ? '+' : ''}{totalChange}% (24h)
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Total Portfolio Value
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Asset Allocation</h4>
            <Button variant="ghost" size="sm" onClick={() => {
              toast({
                title: "Portfolio Rebalancing",
                description: "Calculating optimal asset allocation...",
              });
            }}>Rebalance</Button>
          </div>
          
          {portfolioData.map((asset) => (
            <div key={asset.symbol} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${asset.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">{asset.symbol}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{asset.symbol}</div>
                    <div className="text-xs text-muted-foreground">{asset.name}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-sm">
                    ${asset.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-xs ${
                    asset.change >= 0 ? 'text-success' : 'text-danger'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{asset.amount} {asset.symbol}</span>
                  <span>{asset.percentage}%</span>
                </div>
                <Progress 
                  value={asset.percentage} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="success" className="flex items-center gap-2" onClick={() => {
            toast({
              title: "Buy Order",
              description: "Opening buy interface for selected assets...",
            });
          }}>
            <Plus className="h-4 w-4" />
            Buy
          </Button>
          <Button variant="danger" className="flex items-center gap-2" onClick={() => {
            toast({
              title: "Sell Order", 
              description: "Opening sell interface for portfolio assets...",
            });
          }}>
            <Minus className="h-4 w-4" />
            Sell
          </Button>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">24h P&L</div>
            <div className="font-semibold text-success">+$1,234.56</div>
          </div>
          <div className="text-center p-3 glass rounded-lg">
            <div className="text-sm text-muted-foreground">Total P&L</div>
            <div className="font-semibold text-success">+$12,890.45</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};