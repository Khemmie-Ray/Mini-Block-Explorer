"use client";

import { useStacks } from "@/hooks/use-stacks";
import { redirect } from "next/navigation";
import { isConnected } from "@stacks/connect";

export default function Home() {
  const { address } = useStacks();
  const connected = isConnected()
  console.log(connected)

  if (!address) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <span>Connect your wallet or search for an address</span>
      </main>
    );
  }

  redirect(`/${address}`);
}
