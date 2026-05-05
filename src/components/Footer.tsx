import { Github, Twitter, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 pt-16 pb-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Tyche Logo" className="w-10 h-10 object-contain rounded-full" />
              <span className="text-2xl font-bold tracking-tight text-foreground">Tyche</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              The premier decentralized funding platform. Empowering creators and communities globally with instant, free microtransactions on the Celo network.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-6">Platform</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Start Funding</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Explore Creators</a></li>
              <li><a href="https://minipay.opera.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MiniPay Wallet</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-6">Developers</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brand Assets</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Tyche Protocol. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
