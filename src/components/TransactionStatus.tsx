import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { MINIPAY_ADD_CASH_URL, isMiniPay } from "@/lib/helpers";

interface Props {
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
  hash?: `0x${string}`;
}

export function TransactionStatus({ isPending, isConfirming, isSuccess, error, hash }: Props) {
  const miniPay = isMiniPay();

  if (!isPending && !isConfirming && !isSuccess && !error) return null;

  return (
    <div className="mt-4 rounded-lg p-4 glass animate-slide-up">
      {isPending && (
        <div className="flex items-center gap-3 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Confirm in wallet…</span>
        </div>
      )}
      {isConfirming && (
        <div className="flex items-center gap-3 text-accent">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Confirming on chain…</span>
        </div>
      )}
      {isSuccess && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-accent">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">Funding sent successfully! 🎉</span>
          </div>
          {hash && (
            <a
              href={`https://celoscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              View on CeloScan →
            </a>
          )}
        </div>
      )}
      {error && (
        <div className="flex flex-col gap-2 text-destructive">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5" />
            <span className="text-sm">{error.message.includes("TipAmountTooLow") ? "Funding amount is too low." : error.message.includes("ZeroRecipient") ? "Invalid recipient address." : "Transaction failed. Please try again."}</span>
          </div>
          {miniPay && (
            <a
              href={MINIPAY_ADD_CASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs underline hover:opacity-80"
            >
              Open MiniPay Add Cash
            </a>
          )}
        </div>
      )}
    </div>
  );
}
