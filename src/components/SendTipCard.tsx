import { useState } from "react";
import { isAddress, type Address } from "viem";
import { useTip } from "@/hooks/useTip";
import { TransactionStatus } from "@/components/TransactionStatus";
import { toast } from "sonner";

export function SendTipCard() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { sendTip, isPending, isConfirming, isSuccess, error, hash } = useTip();

  const handleSend = () => {
    if (!isAddress(recipient)) {
      toast.error("Invalid address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    sendTip(recipient as Address, amount);
  };

  return (
    <div className="glass-glow-secondary rounded-xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">Send Funding</h3>

      <label className="block text-sm text-muted-foreground mb-1">Recipient Address</label>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="0x..."
        className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-accent/50"
      />

      <label className="block text-sm text-muted-foreground mb-1">Amount (CELO)</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 1.5"
        type="number"
        min="0"
        step="any"
        className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-accent/50"
      />

      <button
        onClick={handleSend}
        disabled={isPending || isConfirming}
        className="w-full py-3 rounded-full bg-accent text-accent-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50"
      >
        {isPending ? "Confirming…" : isConfirming ? "Sending…" : "Send Funding"}
      </button>

      <TransactionStatus
        isPending={isPending}
        isConfirming={isConfirming}
        isSuccess={isSuccess}
        error={error}
        hash={hash}
      />
    </div>
  );
}
