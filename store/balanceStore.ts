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

export const useBalanceStore = create<BalanceState>()(
  persist((set, get) => ({
    transactions: [],
    runTransaction: (transaction: Transaction) => {
      set((state) => ({ transactions: [ ...state.transactions, transaction ]}))
    },
    balance: () => get().transactions.reduce((oldValue, tra) => oldValue + tra.amount, 0),
    clearTransactions: () => { set({ transactions: [] }) }
  }), {
    name: 'balance',
    storage: createJSONStorage(() => zustandStorage),
  })
)