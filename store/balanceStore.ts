import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@/store/mmkv-storage";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

export const useBalacenStore = create<BalanceState>()(
  persist((set, get) => ({
    transactions: [],
    runTransaction: (transaction: Transaction) => {
      set({ transactions: [ ...get().transactions, transaction ]})
    },
    balance: () => 0,
    clearTransactions: () => { set({ transactions: [] }) }
  }), {
    name: 'balance',
    getStorage: createJSONStorage(() => zustandStorage),
  })
)