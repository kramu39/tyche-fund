import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function buildFundingUrl(to: string, amount?: string): string {
  const base = `${window.location.origin}/fund?to=${to}`;
  return amount ? `${base}&amount=${amount}` : base;
}

export function isMiniPay(): boolean {
  return typeof window !== "undefined" && !!(window as any).ethereum?.isMiniPay;
}
