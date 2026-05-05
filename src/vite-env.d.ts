/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    isMiniPay?: boolean;
    [key: string]: any;
  };
}
