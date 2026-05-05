import { useState } from "react";
import { useAccount, useBalance, useChainId, useConnect, useSwitchChain } from "wagmi";
import { celo } from "wagmi/chains";
import { Link2, Send } from "lucide-react";
import { hasInjectedProvider, isMiniPay } from "@/lib/helpers";
import { shortenAddress } from "@/lib/helpers";
import { CreateLinkCard } from "@/components/CreateLinkCard";
import { SendTipCard } from "@/components/SendTipCard";
import { Footer } from "@/components/Footer";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const [activeTab, setActiveTab] = useState<"create" | "send" | null>(null);
  const miniPay = isMiniPay();
  const providerReady = hasInjectedProvider();
  const onCelo = chainId === celo.id;

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-16 px-4">
        <h2 className="text-2xl font-bold text-foreground">Connect your wallet to continue</h2>
        {miniPay && providerReady && (
          <p className="text-sm text-muted-foreground text-center max-w-md">
            MiniPay should connect automatically. If it does not, reopen this page from MiniPay Site Tester.
          </p>
        )}
        {miniPay && !providerReady && (
          <p className="text-sm text-destructive text-center max-w-md">
            MiniPay provider was not detected. Open this app inside MiniPay to continue.
          </p>
        )}
        {!miniPay && (
          <button
            onClick={() => connectors[0] && connect({ connector: connectors[0] })}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <div className="container py-6">
        <div className="glass rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Connected as</p>
            <p className="font-mono text-foreground">{shortenAddress(address!)}</p>
            {miniPay && <p className="text-xs text-primary mt-1">Connected via MiniPay</p>}
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="font-bold text-primary text-lg">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} CELO` : "—"}
            </p>
          </div>
        </div>
        {!onCelo && (
          <div className="mt-4 glass rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-destructive">
              You are connected to the wrong network. Switch to Celo Mainnet to send CELO.
            </p>
            <button
              onClick={() => switchChain({ chainId: celo.id })}
              disabled={isSwitchingChain}
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isSwitchingChain ? "Switching..." : "Switch to Celo"}
            </button>
          </div>
        )}
      </div>

      <div className="container flex-1 pb-12">
        {!activeTab && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto animate-slide-up">
            <button
              onClick={() => setActiveTab("create")}
              className="glass-glow rounded-xl p-8 text-left hover:border-primary/50 transition-all group"
            >
              <Link2 className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-foreground mb-2">Create Funding Link</h3>
              <p className="text-sm text-muted-foreground">Generate a shareable link to receive CELO funding.</p>
            </button>
            <button
              onClick={() => setActiveTab("send")}
              className="glass-glow-secondary rounded-xl p-8 text-left hover:border-accent/50 transition-all group"
            >
              <Send className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-foreground mb-2">Send Funding</h3>
              <p className="text-sm text-muted-foreground">Quickly send CELO to any address.</p>
            </button>
          </div>
        )}

        {activeTab === "create" && (
          <div className="max-w-lg mx-auto animate-slide-up">
            <button onClick={() => setActiveTab(null)} className="text-sm text-muted-foreground mb-4 hover:text-foreground">
              ← Back
            </button>
            <CreateLinkCard address={address!} />
          </div>
        )}

        {activeTab === "send" && (
          <div className="max-w-lg mx-auto animate-slide-up">
            <button onClick={() => setActiveTab(null)} className="text-sm text-muted-foreground mb-4 hover:text-foreground">
              ← Back
            </button>
            <SendTipCard />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
