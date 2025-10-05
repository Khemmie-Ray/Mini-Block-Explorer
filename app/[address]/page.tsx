import { TransactionsList } from "@/components/txns-list";
import { fetchMainnetTransactions, fetchTestnetTransactions } from "@/lib/fetch-address-transactions";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default async function Activity({
  params,
}: {
  params: { address: string }; 
}) {
  const { address } = params;
  const network = address.startsWith("SP") ? "mainnet" : "testnet";
  const initialTransactions =
    network === "mainnet"
      ? await fetchMainnetTransactions(address)
      : await fetchTestnetTransactions(address);

  return (
    <main className="flex flex-col p-8 gap-8 min-h-[100vh]">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold break-all">{address}</h1>

        <Link
          href={`https://explorer.hiro.so/address/${address}`}
          target="_blank"
          className="rounded-lg flex gap-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ExternalLinkIcon className="h-4 w-4" />
          View on Hiro
        </Link>
      </div>

      <TransactionsList address={address} transactions={initialTransactions} />
    </main>
  );
}
