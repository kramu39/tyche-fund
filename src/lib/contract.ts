export const TYCHE_CONTRACT_ADDRESS = "0x5A24e90D1eF4554A0104e76DB87A24D90961A6B3" as const;

export const TYCHE_ABI = [
  { inputs: [], name: "NativeTransferFailed", type: "error" },
  { inputs: [], name: "TipAmountTooLow", type: "error" },
  { inputs: [], name: "ZeroRecipient", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "TipSent",
    type: "event",
  },
  {
    inputs: [],
    name: "MIN_TIP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address payable", name: "recipient", type: "address" }],
    name: "tip",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const;
