"use client";

import { useStacks } from "@/hooks/use-stacks";
import { redirect } from "next/navigation";

export default function Home() {
  const { address } = useStacks();

  if (!address) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <span>Connect your wallet or search for an address</span>
      </main>
    );
  }

  redirect(`/${address}`);
}
