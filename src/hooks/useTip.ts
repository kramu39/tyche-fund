import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { parseEther, type Address } from "viem";
import { TYCHE_ABI, TYCHE_CONTRACT_ADDRESS } from "@/lib/contract";

export function useTip() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const sendTip = (recipient: Address, amountInCelo: string) => {
    if (!address) return;
    writeContract({
      address: TYCHE_CONTRACT_ADDRESS,
      abi: TYCHE_ABI,
      functionName: "tip",
      args: [recipient],
      value: parseEther(amountInCelo),
    } as any);
  };

  return { sendTip, hash, isPending, isConfirming, isSuccess, error, reset };
}
