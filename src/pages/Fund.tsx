import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import { celo } from "wagmi/chains";
import { isAddress, type Address } from "viem";
import { useTip } from "@/hooks/useTip";
import { TransactionStatus } from "@/components/TransactionStatus";
import {
  MINIPAY_ADD_CASH_URL,
  hasInjectedProvider,
  isMiniPay,
  shortenAddress,
} from "@/lib/helpers";
import { Footer } from "@/components/Footer";

export default function Fund() {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to") || "";
  const urlAmount = searchParams.get("amount") || "";
  const [amount, setAmount] = useState(urlAmount);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { connect, connectors } = useConnect();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { sendTip, isPending, isConfirming, isSuccess, error, hash } = useTip();

  const miniPay = isMiniPay();
  const providerReady = hasInjectedProvider();
  const validAddress = isAddress(to);
  const onCelo = chainId === celo.id;

  useEffect(() => {
    if (urlAmount) setAmount(urlAmount);
  }, [urlAmount]);

  const handleFund = () => {
    if (!validAddress) return;
    sendTip(to as Address, amount);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="glass-glow rounded-xl p-8 w-full max-w-md animate-slide-up">
          {!validAddress ? (
            <div className="text-center">
              <h2 className="text-xl font-bold text-destructive mb-2">Invalid Link</h2>
              <p className="text-muted-foreground text-sm">No valid recipient address found in the URL.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground mb-1">Send CELO to</p>
                <p className="text-lg font-mono font-bold text-foreground">{shortenAddress(to)}</p>
              </div>

              {urlAmount ? (
                <div className="text-center mb-8">
                  <p className="text-5xl font-extrabold text-primary">{urlAmount}</p>
                  <p className="text-muted-foreground mt-1">CELO</p>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm text-muted-foreground mb-1">Amount (CELO)</label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    type="number"
                    min="0"
                    step="any"
                    className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-lg text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}

              {!isConnected ? (
                <div className="flex justify-center">
                  {!miniPay && (
                    <button
                      onClick={() => connectors[0] && connect({ connector: connectors[0] })}
                      className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all"
                    >
                      Connect Wallet
                    </button>
                  )}

                  {miniPay && providerReady && (
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      MiniPay should connect automatically. If not, reload this link inside MiniPay Site Tester.
                    </p>
                  )}

                  {miniPay && !providerReady && (
                    <p className="text-sm text-destructive text-center max-w-sm">
                      MiniPay provider not detected. Open this URL directly inside MiniPay.
                    </p>
                  )}
                </div>
              ) : !onCelo ? (
                <div className="space-y-3">
                  <p className="text-sm text-destructive text-center">
                    Please switch your wallet to Celo Mainnet to fund this link.
                  </p>
                  <button
                    onClick={() => switchChain({ chainId: celo.id })}
                    disabled={isSwitchingChain}
                    className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {isSwitchingChain ? "Switching..." : "Switch to Celo Mainnet"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleFund}
                    disabled={isPending || isConfirming || !amount || parseFloat(amount) <= 0}
                    className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50 shadow-[0_0_30px_hsla(51,100%,50%,0.3)]"
                  >
                    {isPending ? "Confirming..." : isConfirming ? "Sending..." : `Fund ${amount || "-"} CELO`}
                  </button>

                  {miniPay && (
                    <a
                      href={MINIPAY_ADD_CASH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-xs text-muted-foreground underline hover:text-foreground"
                    >
                      Need funds first? Open MiniPay Add Cash
                    </a>
                  )}
                </div>
              )}

              <TransactionStatus
                isPending={isPending}
                isConfirming={isConfirming}
                isSuccess={isSuccess}
                error={error}
                hash={hash}
              />
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
