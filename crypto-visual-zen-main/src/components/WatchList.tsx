import { Star, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const watchListData = [
  { symbol: "AVAX", name: "Avalanche", price: 89.45, change: 4.21, color: "from-red-500 to-pink-500" },
  { symbol: "LINK", name: "Chainlink", price: 23.67, change: -2.15, color: "from-blue-600 to-indigo-600" },
  { symbol: "UNI", name: "Uniswap", price: 12.89, change: 1.45, color: "from-pink-500 to-purple-500" },
  { symbol: "ATOM", name: "Cosmos", price: 15.24, change: 3.78, color: "from-purple-600 to-blue-600" },
];

export const WatchList = () => {
  const { toast } = useToast();
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-neon-orange" />
            Watchlist
          </div>
          <Button variant="ghost" size="sm" onClick={() => {
            toast({
              title: "Add Symbol",
              description: "Search cryptocurrencies to add to watchlist",
            });
          }}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {watchListData.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between p-3 glass rounded-lg hover-lift cursor-pointer group"
            onClick={() => {
              toast({
                title: `${asset.name} (${asset.symbol})`,
                description: `Current price: $${asset.price} • ${asset.change >= 0 ? '+' : ''}${asset.change}%`,
                action: (
                  <Button variant="ghost" size="sm">
                    Trade Now
                  </Button>
                ),
              });
            }}
          >
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
                ${asset.price}
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                asset.change >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {asset.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {asset.change >= 0 ? '+' : ''}{asset.change}%
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="neon" className="w-full mt-4" onClick={() => {
          toast({
            title: "Watchlist Manager",
            description: "Opening crypto search to add more assets...",
          });
        }}>
          Add to Watchlist
        </Button>
      </CardContent>
    </Card>
  );
};