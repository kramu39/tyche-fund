import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ArrowRight, Link2, Send, Share2, ShieldCheck, Zap, Globe } from "lucide-react";
import { Footer } from "@/components/Footer";

const features = [
  { icon: Link2, title: "Create a Link", desc: "Generate a personal Tyche funding link tied to your Celo wallet instantly." },
  { icon: Share2, title: "Share Anywhere", desc: "Share your link on social media, in your bio, or anywhere on the web." },
  { icon: Send, title: "Get Funded", desc: "Receive CELO funds directly to your wallet without intermediaries." },
];

const benefits = [
  { icon: Zap, title: "Lightning Fast", desc: "Transactions on Celo settle in seconds, bringing you immediate liquidity." },
  { icon: ShieldCheck, title: "Non-Custodial", desc: "Your keys, your crypto. We never hold your funds, ensuring maximum security." },
  { icon: Globe, title: "Global Reach", desc: "Accessible from anywhere in the world. Anyone with a wallet can support you." },
];

export default function Home() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 py-24 sm:py-32 relative z-10 container mx-auto max-w-6xl gap-12 lg:gap-16">
        <div className="flex-1 text-left animate-slide-up flex flex-col items-start w-full">
          <div className="mb-8 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/10 shadow-xl p-4">
            <img src="/logo.png" alt="Tyche Logo" className="w-full h-full object-contain drop-shadow-md rounded-full" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            The Premier <br className="hidden sm:block" /><span className="text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]">Web3 Funding</span>
            <br />
            Platform on Celo
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl mb-12 max-w-xl leading-relaxed">
            Create your decentralized funding link in seconds. No sign-ups, zero platform fees, and instant global settlements via the Celo blockchain.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate(isConnected ? "/dashboard" : "/dashboard")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 sm:py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_40px_hsla(51,100%,50%,0.2)] hover:shadow-[0_0_60px_hsla(51,100%,50%,0.4)] hover:-translate-y-1"
            >
              Launch App
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="https://minipay.opera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 sm:py-5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground font-medium text-lg border border-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm"
            >
              Learn about MiniPay
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg mt-8 md:mt-0 relative animate-slide-up" style={{ animationDelay: "150ms" }}>
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <img 
            src="https://i.pinimg.com/736x/bb/77/72/bb7772074ede4af7dd24a843856c691a.jpg" 
            alt="Platform UI" 
            className="w-full h-auto rounded-[2.5rem] border-r-4 border-r-white/80 border-t border-t-white/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-10 object-cover" 
          />
        </div>
      </section>

      {/* Stats/Social Proof (Placeholder) */}
      <section className="py-12 border-y border-border bg-secondary/10 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-24 opacity-70">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">Sub-second</span>
              <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Transactions</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">0%</span>
              <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Platform Fees</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">100%</span>
              <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Non-Custodial</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 relative z-10">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frictionless Funding</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Getting started with Tyche takes less than a minute. Just connect your wallet and generate your link.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-24 px-4 relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-background pointer-events-none" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative order-2 lg:order-1 flex justify-center mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
              <img 
                src="https://i.pinimg.com/1200x/4b/63/b1/4b63b1fde6409f354bffafc03420a2ed.jpg" 
                alt="Crypto Abstract Visual" 
                className="w-full max-w-[400px] h-auto object-cover rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10" 
              />
              
              {/* Mock UI Representation */}
              <div className="absolute -bottom-8 lg:bottom-12 -right-2 sm:-right-8 lg:-right-16 w-full max-w-[280px] bg-background/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-6 z-20 animate-slide-up">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center p-2 border border-primary/20">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground font-mono">0x1234...abcd</div>
                    <div className="text-xs font-semibold text-primary">Tyche Link Active</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-secondary/50 rounded-lg w-full flex items-center px-4 overflow-hidden border border-white/5">
                     <span className="text-muted-foreground text-xs font-mono truncate">tyche.fi/fund/0x12...</span>
                  </div>
                  <div className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg text-center shadow-md cursor-pointer hover:bg-primary/90 transition-colors text-sm">
                    Share Link
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight">Designed for the <br /><span className="text-white/80">decentralized web</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Tyche leverages the power of Celo to provide a seamless, mobile-first experience. Whether your supporters are using MiniPay or any standard Web3 wallet, they can send tokens with incredible ease.
              </p>
              <ul className="space-y-6">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                      <benefit.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xl mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
