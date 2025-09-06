import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const analyticsData = {
  performance: {
    totalReturn: 23.45,
    monthlyReturn: 5.67,
    weeklyReturn: 2.34,
    dailyReturn: 0.89,
  },
  riskMetrics: {
    sharpeRatio: 1.45,
    volatility: 45.2,
    maxDrawdown: 15.6,
    beta: 1.23,
  },
  tradingStats: {
    winRate: 68.5,
    avgWin: 4.2,
    avgLoss: 2.1,
    profitFactor: 2.0,
  }
};

export const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Return</p>
                <p className="text-2xl font-bold text-success">+{analyticsData.performance.totalReturn}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Return</p>
                <p className="text-2xl font-bold text-success">+{analyticsData.performance.monthlyReturn}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-neon-cyan" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-neon-purple">{analyticsData.tradingStats.winRate}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-neon-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-neon-orange">{analyticsData.riskMetrics.sharpeRatio}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-neon-orange/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-neon-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Metrics */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-neon-cyan" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Portfolio Volatility</span>
                <span className="font-semibold">{analyticsData.riskMetrics.volatility}%</span>
              </div>
              <Progress value={analyticsData.riskMetrics.volatility} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Max Drawdown</span>
                <span className="font-semibold text-danger">-{analyticsData.riskMetrics.maxDrawdown}%</span>
              </div>
              <Progress value={analyticsData.riskMetrics.maxDrawdown} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-lg font-bold">{analyticsData.riskMetrics.beta}</div>
                <div className="text-xs text-muted-foreground">Beta</div>
              </div>
              <div className="text-center p-3 glass rounded-lg">
                <div className="text-lg font-bold text-success">{analyticsData.riskMetrics.sharpeRatio}</div>
                <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Performance */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-neon-purple" />
              Trading Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-success">+{analyticsData.tradingStats.avgWin}%</div>
                <div className="text-sm text-muted-foreground">Avg Win</div>
              </div>
              <div className="text-center p-4 glass rounded-lg">
                <div className="text-2xl font-bold text-danger">-{analyticsData.tradingStats.avgLoss}%</div>
                <div className="text-sm text-muted-foreground">Avg Loss</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Win Rate</span>
                <span className="font-semibold text-success">{analyticsData.tradingStats.winRate}%</span>
              </div>
              <Progress value={analyticsData.tradingStats.winRate} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Profit Factor</span>
                <span className="font-semibold">{analyticsData.tradingStats.profitFactor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Trades</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Winning Trades</span>
                <span className="font-semibold text-success">160</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Losing Trades</span>
                <span className="font-semibold text-danger">74</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Portfolio Performance
            </div>
            <Button variant="trading" size="sm">
              Download Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary/20 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center space-y-2">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Performance chart visualization</p>
              <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};