import { useState } from "react";
import { TrendingUp, TrendingDown, BarChart3, Wallet, Settings, Bell, Search, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MarketOverview } from "./MarketOverview";
import { PriceChart } from "./PriceChart";
import { Portfolio } from "./Portfolio";
import { TradingPanel } from "./TradingPanel";
import { WatchList } from "./WatchList";
import { Analytics } from "./Analytics";

export const CryptoDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "portfolio", name: "Portfolio", icon: Wallet },
    { id: "trading", name: "Trading", icon: TrendingUp },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    toast({
      title: "Navigation",
      description: `Switched to ${navigation.find(n => n.id === tabId)?.name}`,
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toast({
      title: sidebarOpen ? "Sidebar Hidden" : "Sidebar Visible",
      description: sidebarOpen ? "Sidebar has been collapsed" : "Sidebar has been expanded",
    });
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    toast({
      title: sidebarCollapsed ? "Sidebar Expanded" : "Sidebar Collapsed", 
      description: sidebarCollapsed ? "Full navigation menu visible" : "Mini navigation menu active",
    });
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <header className="h-16 border-b border-border glass bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden hover-lift"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebarCollapse}
              className="hidden lg:flex hover-lift"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            <h1 className="text-2xl font-bold gradient-text">CryptoTrader Pro</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search cryptocurrencies..." 
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-lift relative"
              onClick={() => toast({
                title: "Notifications",
                description: "You have 3 new trading alerts",
                action: (
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                ),
              })}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-lift"
              onClick={() => toast({
                title: "Settings",
                description: "Settings panel opened",
              })}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple cursor-pointer hover-lift"></div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen 
              ? (sidebarCollapsed ? "w-16" : "w-64") 
              : "w-0"
          } transition-all duration-300 border-r border-border glass bg-card/30 backdrop-blur-xl overflow-hidden lg:block`}
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const showText = sidebarOpen && !sidebarCollapsed;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "neon" : "ghost"}
                  className={`w-full gap-3 hover-lift transition-all duration-300 ${
                    showText ? "justify-start px-4" : "justify-center px-0"
                  }`}
                  onClick={() => handleTabChange(item.id)}
                  title={!showText ? item.name : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {showText && <span className="truncate">{item.name}</span>}
                </Button>
              );
            })}
            
            {/* Sidebar Toggle Button (Bottom) */}
            <div className="pt-4 border-t border-border/50 mt-4">
              <Button
                variant="ghost"
                className={`w-full gap-3 hover-lift ${
                  (sidebarOpen && !sidebarCollapsed) ? "justify-start px-4" : "justify-center px-0"
                }`}
                onClick={toggleSidebarCollapse}
                title={!(sidebarOpen && !sidebarCollapsed) ? "Toggle Sidebar" : undefined}
              >
                {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                {(sidebarOpen && !sidebarCollapsed) && <span>Collapse</span>}
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <MarketOverview />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <PriceChart />
                </div>
                <div className="space-y-6">
                  <Portfolio />
                  <WatchList />
                </div>
              </div>
              <Analytics />
            </div>
          )}
          
          {activeTab === "portfolio" && <Portfolio />}
          {activeTab === "trading" && <TradingPanel />}
          {activeTab === "analytics" && <Analytics />}
        </main>
      </div>
    </div>
  );
};