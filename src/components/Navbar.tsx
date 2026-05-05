import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { MINIPAY_ADD_CASH_URL, hasInjectedProvider, isMiniPay, shortenAddress } from "@/lib/helpers";

export function Navbar() {
  const [showWallets, setShowWallets] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const miniPay = isMiniPay();
  const providerReady = hasInjectedProvider();
  const connectorName = useAccount().connector?.name;

  const handleConnect = (index = 0) => {
    const connector = connectors[index];
    if (connector) connect({ connector });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Tyche" className="h-8 w-8 object-contain rounded-full" />
          <span className="text-xl font-bold tracking-tight text-foreground">Tyche</span>
        </a>
        {!miniPay && (
          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                {balance && (
                  <span className="hidden sm:inline text-sm text-primary font-semibold">
                    {parseFloat(balance.formatted).toFixed(3)} CELO
                  </span>
                )}
                <div className="relative">
                  <button
                    onClick={() => setShowWallets((prev) => !prev)}
                    className="px-4 py-2 rounded-full bg-muted text-foreground text-sm font-mono hover:bg-muted/80 transition-colors"
                  >
                    {shortenAddress(address!)}
                    {connectorName && (
                      <span className="ml-2 text-[10px] font-semibold text-muted-foreground">
                        {connectorName}
                      </span>
                    )}
                  </button>
                  {showWallets && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-xl p-2 z-50">
                      <p className="px-2 py-1 text-xs text-muted-foreground">Switch wallet</p>
                      <div className="flex flex-col gap-1">
                        {connectors.map((connector, index) => (
                          <button
                            key={connector.id}
                            onClick={() => {
                              connect({ connector });
                              setShowWallets(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-sm hover:bg-muted"
                          >
                            {connector.name}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          disconnect();
                          setShowWallets(false);
                        }}
                        className="mt-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-destructive hover:bg-muted"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowWallets((prev) => !prev)}
                  className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
                >
                  Connect Wallet
                </button>
                {showWallets && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-xl p-2 z-50">
                    <p className="px-2 py-1 text-xs text-muted-foreground">Choose wallet</p>
                    <div className="flex flex-col gap-1">
                      {connectors.map((connector, index) => (
                        <button
                          key={connector.id}
                          onClick={() => {
                            handleConnect(index);
                            setShowWallets(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-sm hover:bg-muted"
                        >
                          {connector.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {miniPay && (
          <div className="flex items-center gap-2">
            {!providerReady && (
              <span className="hidden sm:inline text-xs text-destructive">MiniPay provider not detected</span>
            )}
            {providerReady && isConnected && address && (
              <span className="text-xs text-primary font-semibold">MiniPay {shortenAddress(address)}</span>
            )}
            <a
              href={MINIPAY_ADD_CASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Add Cash
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
