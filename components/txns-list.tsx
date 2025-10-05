"use client";

import React, { useEffect, useState } from "react";
import { TransactionDetail } from "./txn-details";
import { useStacks } from "@/hooks/use-stacks";
import { fetchMainnetTransactions, fetchTestnetTransactions } from "@/lib/fetch-address-transactions";
import { FetchTransactionsResponse } from "@/lib/fetch-address-transactions";

interface TransactionsListProps {
  address: string;
  transactions: any; 
}

export function TransactionsList({ address }: TransactionsListProps) {
  const { network } = useStacks();
  const [transactions, setTransactions] = useState<FetchTransactionsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTxns() {
      try {
        setLoading(true);
        const data =
          network === "mainnet"
            ? await fetchMainnetTransactions(address)
            : await fetchTestnetTransactions(address);
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTxns();
  }, [address, network]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        {network === "mainnet" ? (
          <div className="flex items-center">
            <div className="bg-green-700 rounded-full w-[20px] h-[20px]" />
            <p className="ml-3">Mainnet</p>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-full w-[20px] h-[20px]" />
            <p className="ml-3">Testnet</p>
          </div>
        )}
      </div>

      {loading && <div className="text-gray-500 text-center">Loading...</div>}

      {!loading && transactions && (
        <div className="flex flex-col border rounded-md divide-y border-gray-800 divide-gray-800">
          {transactions.results?.length ? (
            transactions.results.map((tx, index) => (
              <div key={index}>
                <TransactionDetail result={tx} />
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500 text-center">No transactions found</div>
          )}
        </div>
      )}
    </div>
  );
}
