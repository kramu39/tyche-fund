import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Share2 } from "lucide-react";
import { buildFundingUrl } from "@/lib/helpers";
import { toast } from "sonner";

interface Props {
  address: string;
}

export function CreateLinkCard({ address }: Props) {
  const [recipient, setRecipient] = useState(address);
  const [amount, setAmount] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!recipient) {
      toast.error("Please enter a recipient address");
      return;
    }
    setLink(buildFundingUrl(recipient, amount || undefined));
    toast.success("Funding link created!");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Support me with CELO! ${link}`)}`, "_blank");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Support me with CELO! ${link}`)}`, "_blank");
  };

  return (
    <div className="glass-glow rounded-xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6">Create Funding Link</h3>

      <label className="block text-sm text-muted-foreground mb-1">Recipient Address</label>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="0x..."
        className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground font-mono text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      <label className="block text-sm text-muted-foreground mb-1">Default Amount (optional)</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 5"
        type="number"
        min="0"
        step="any"
        className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      <button
        onClick={generate}
        className="w-full py-3 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all"
      >
        Generate Link
      </button>

      {link && (
        <div className="mt-6 space-y-4 animate-slide-up">
          <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
            <p className="flex-1 text-xs text-foreground font-mono break-all">{link}</p>
            <button onClick={copy} className="shrink-0 text-primary hover:text-primary/80">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex gap-3">
            <button onClick={shareX} className="flex-1 py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" /> Share on X
            </button>
            <button onClick={shareWhatsApp} className="flex-1 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:brightness-110 flex items-center justify-center gap-2">
              <Share2 className="h-4 w-4" /> WhatsApp
            </button>
          </div>

          <div className="flex justify-center p-4 bg-foreground rounded-xl">
            <QRCodeSVG value={link} size={180} bgColor="#ffffff" fgColor="#000000" />
          </div>
        </div>
      )}
    </div>
  );
}
