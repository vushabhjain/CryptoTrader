import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Calculator, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TradingPanel = () => {
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const recentTrades = [
    { id: 1, type: "BUY", symbol: "BTC", amount: 0.1234, price: 42350, time: "2m ago", status: "Completed" },
    { id: 2, type: "SELL", symbol: "ETH", amount: 2.5, price: 2680, time: "5m ago", status: "Completed" },
    { id: 3, type: "BUY", symbol: "ADA", amount: 1500, price: 0.485, time: "12m ago", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-neon-cyan" />
              Trade Execution
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={side} onValueChange={setSide} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="buy" 
                  className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Buy
                </TabsTrigger>
                <TabsTrigger 
                  value="sell"
                  className="data-[state=active]:bg-danger data-[state=active]:text-danger-foreground"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Sell
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <BuyForm orderType={orderType} setOrderType={setOrderType} amount={amount} setAmount={setAmount} price={price} setPrice={setPrice} />
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <SellForm orderType={orderType} setOrderType={setOrderType} amount={amount} setAmount={setAmount} price={price} setPrice={setPrice} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Order Book Preview */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Order Book (BTC/USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Asks */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Asks</div>
                <div className="space-y-1">
                  {[42360, 42355, 42352].map((price, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 glass rounded">
                      <span className="text-danger">{price}</span>
                      <span>{(Math.random() * 5 + 0.1).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Price */}
              <div className="text-center p-3 bg-neon-cyan/10 rounded-lg">
                <div className="text-lg font-bold text-neon-cyan">$42,350.25</div>
                <div className="text-xs text-success">+2.45%</div>
              </div>

              {/* Bids */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Bids</div>
                <div className="space-y-1">
                  {[42348, 42345, 42340].map((price, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 glass rounded">
                      <span className="text-success">{price}</span>
                      <span>{(Math.random() * 5 + 0.1).toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-neon-purple" />
            Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    trade.type === 'BUY' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                  }`}>
                    {trade.type}
                  </div>
                  <div>
                    <div className="font-medium">{trade.symbol}</div>
                    <div className="text-xs text-muted-foreground">{trade.amount} @ ${trade.price}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm">{trade.time}</div>
                  <div className={`text-xs ${
                    trade.status === 'Completed' ? 'text-success' : 'text-warning'
                  }`}>
                    {trade.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BuyForm = ({ orderType, setOrderType, amount, setAmount, price, setPrice }: any) => {
  const { toast } = useToast();
  
  const handleBuyOrder = () => {
    toast({
      title: "Buy Order Submitted",
      description: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} buy order for ${amount || '0'} BTC submitted successfully`,
      action: (
        <Button variant="ghost" size="sm">
          View Order
        </Button>
      ),
    });
  };

  return (
    <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Pair</Label>
        <Select defaultValue="BTC/USD">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTC/USD">BTC/USD</SelectItem>
            <SelectItem value="ETH/USD">ETH/USD</SelectItem>
            <SelectItem value="ADA/USD">ADA/USD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Order Type</Label>
        <Select value={orderType} onValueChange={setOrderType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="limit">Limit</SelectItem>
            <SelectItem value="stop">Stop</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {orderType === "limit" && (
      <div className="space-y-2">
        <Label>Price (USD)</Label>
        <Input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    )}

    <div className="space-y-2">
      <Label>Amount (BTC)</Label>
      <Input
        type="number"
        placeholder="0.00000000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex gap-2">
        {[25, 50, 75, 100].map((percent) => (
          <Button key={percent} variant="ghost" size="sm" className="text-xs">
            {percent}%
          </Button>
        ))}
      </div>
    </div>

    <div className="space-y-2 p-3 glass rounded-lg">
      <div className="flex justify-between text-sm">
        <span>Available:</span>
        <span>$12,450.00</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total:</span>
        <span>~$5,000.00</span>
      </div>
    </div>

    <Button variant="success" size="lg" className="w-full" onClick={handleBuyOrder}>
      Buy BTC
    </Button>
  </div>
  );
};

const SellForm = ({ orderType, setOrderType, amount, setAmount, price, setPrice }: any) => {
  const { toast } = useToast();
  
  const handleSellOrder = () => {
    toast({
      title: "Sell Order Submitted",
      description: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} sell order for ${amount || '0'} BTC submitted successfully`,
      action: (
        <Button variant="ghost" size="sm">
          View Order
        </Button>
      ),
    });
  };

  return (
    <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Pair</Label>
        <Select defaultValue="BTC/USD">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTC/USD">BTC/USD</SelectItem>
            <SelectItem value="ETH/USD">ETH/USD</SelectItem>
            <SelectItem value="ADA/USD">ADA/USD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Order Type</Label>
        <Select value={orderType} onValueChange={setOrderType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="limit">Limit</SelectItem>
            <SelectItem value="stop">Stop</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {orderType === "limit" && (
      <div className="space-y-2">
        <Label>Price (USD)</Label>
        <Input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
    )}

    <div className="space-y-2">
      <Label>Amount (BTC)</Label>
      <Input
        type="number"
        placeholder="0.00000000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex gap-2">
        {[25, 50, 75, 100].map((percent) => (
          <Button key={percent} variant="ghost" size="sm" className="text-xs">
            {percent}%
          </Button>
        ))}
      </div>
    </div>

    <div className="space-y-2 p-3 glass rounded-lg">
      <div className="flex justify-between text-sm">
        <span>Available:</span>
        <span>0.5423 BTC</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total:</span>
        <span>~$5,000.00</span>
      </div>
    </div>

    <Button variant="danger" size="lg" className="w-full" onClick={handleSellOrder}>
      Sell BTC
    </Button>
  </div>
  );
};