import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import { celo } from "wagmi/chains";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from "@/lib/wagmi";
import { hasInjectedProvider, isMiniPay } from "@/lib/helpers";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Fund from "@/pages/Fund";
import NotFound from "@/pages/NotFound";
import { toast } from "sonner";

const queryClient = new QueryClient();

function MiniPayAutoConnect() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (!hasInjectedProvider()) return;

    if (isMiniPay() && !isConnected) {
      const injectedConnector = connectors.find((connector) => connector.type === "injected") ?? connectors[0];
      if (injectedConnector) connect({ connector: injectedConnector });
      return;
    }

    if (isConnected && chainId !== celo.id) {
      switchChain(
        { chainId: celo.id },
        {
          onError: () => {
            toast.error("Please switch your wallet to Celo Mainnet.");
          },
        }
      );
    }
  }, [chainId, connect, connectors, isConnected, switchChain]);

  return null;
}

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MiniPayAutoConnect />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fund" element={<Fund />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
