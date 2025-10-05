"use client"

import { useState, useEffect } from "react";
import { connect, disconnect, isConnected, getLocalStorage, request } from "@stacks/connect";

export function useStacks() {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<"mainnet" | "testnet" | null>(null);

  const inferNetworkFromAddress = (addr?: string): "mainnet" | "testnet" | null => {
    if (!addr) return null;
    if (addr.startsWith("ST")) return "testnet";
    if (addr.startsWith("SP") || addr.startsWith("SM")) return "mainnet";
    return null;
  };

  const fetchNetwork = async () => {
    try {
      const res = await request("stx_getNetworks" as any);
      if (res?.network?.name) {
        setNetwork(res.network.name as "mainnet" | "testnet");
      }
    } catch {
      // fallback to address inference if unsupported
      const data = getLocalStorage();
      const addr = data?.addresses?.stx?.[0]?.address;
      setNetwork(inferNetworkFromAddress(addr));
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      const response = await connect({
        forceWalletSelect: true,
        walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECTID,
      });

      const data = getLocalStorage();
      const stxAddress = data?.addresses?.stx?.[0]?.address || null;
      setAddress(stxAddress);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const disconnectWallet = async () => {
    disconnect();
    setAddress(null);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connected = isConnected();
      if (connected) {
        const data = getLocalStorage();
        const stxAddress = data?.addresses?.stx?.[0]?.address || null;
        setAddress(stxAddress);
        await fetchNetwork()
      }
    };
    checkConnection();
  }, []);

  return {
    address,
    network,
    connectWallet,
    disconnectWallet,
  };
}
