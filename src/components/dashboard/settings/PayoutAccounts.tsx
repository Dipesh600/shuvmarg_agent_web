"use client";

import { useState, useEffect } from "react";
import { Plus, Building, Landmark, CheckCircle2, MoreHorizontal, AlertCircle, Wallet, Star, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { AddPayoutAccountDrawer } from "./AddPayoutAccountDrawer";

// Mock Data
const payoutAccounts = [
  {
    id: "1",
    type: "bank",
    provider: "Nabil Bank Limited",
    accountName: "Shree Travel Agency",
    accountNumber: "xxxx-xxxx-xxxx-4592",
    isPrimary: true,
    status: "verified",
  },
  {
    id: "2",
    type: "esewa",
    provider: "eSewa",
    accountName: "Shree Travel Agency",
    accountNumber: "98xxxxxx42",
    isPrimary: false,
    status: "verified",
  },
  {
    id: "3",
    type: "khalti",
    provider: "Khalti",
    accountName: "Shree Travel Agency",
    accountNumber: "98xxxxxx42",
    isPrimary: false,
    status: "pending",
  },
];

export default function PayoutAccounts() {
  const [accounts, setAccounts] = useState<typeof payoutAccounts>(payoutAccounts);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<any | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.payout-menu-container')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMakePrimary = (accountId: string) => {
    setAccounts(prev => prev.map(acc => ({
      ...acc,
      isPrimary: acc.id === accountId
    })));
    setActiveMenuId(null);
  };

  const handleRemoveAccount = (accountId: string) => {
    if (window.confirm("Are you sure you want to remove this account?")) {
      setAccounts(prev => {
        const newAccounts = prev.filter(acc => acc.id !== accountId);
        if (newAccounts.length > 0 && !newAccounts.some(acc => acc.isPrimary)) {
          newAccounts[0].isPrimary = true;
        }
        return newAccounts;
      });
    }
    setActiveMenuId(null);
  };

  const handleEditDetails = (account: any) => {
    setAccountToEdit(account);
    setIsDrawerOpen(true);
    setActiveMenuId(null);
  };

  return (
    <>
      <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 md:px-8 md:py-6 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-neutral-900">Payout Accounts</h2>
          <p className="text-[13px] text-neutral-500 font-medium mt-1">
            Manage where you receive your booking commissions.
          </p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="h-10 px-4 bg-[#7A1D1B] hover:bg-[#641715] text-white rounded-xl text-[14px] font-bold transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1">
                {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center mb-5">
              <Landmark className="w-8 h-8 text-neutral-300" />
            </div>
            <h3 className="text-[16px] font-bold text-neutral-900 mb-2">No Payout Accounts</h3>
            <p className="text-[14px] text-neutral-500 max-w-sm mx-auto mb-6">
              You haven't added any payout accounts yet. Add a bank account or digital wallet to receive your earnings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {accounts.map((account) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={account.id}
              className={`relative overflow-hidden p-6 rounded-[24px] border transition-all ${
                account.isPrimary
                  ? "border-[#C99A4A]/30 bg-gradient-to-br from-[#FFF9EE]/80 to-white shadow-sm"
                  : "border-neutral-200 bg-white hover:shadow-md"
              }`}
            >
              {/* Subtle Decorative Background Icon */}
              <div className="absolute -right-6 -bottom-6 text-neutral-100/50 pointer-events-none z-0">
                {account.type === 'bank' ? <Landmark className="w-48 h-48" /> : <Wallet className="w-48 h-48" />}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Top Row: Provider & Primary Badge & Actions */}
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1">
                      {account.type === 'bank' ? 'Bank Transfer' : 'Digital Wallet'}
                    </span>
                    <h3 className="text-[18px] font-bold text-neutral-900">{account.provider}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {account.isPrimary && (
                      <div className="px-3 py-1 bg-[#C99A4A]/10 border border-[#C99A4A]/20 rounded-full flex items-center gap-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C99A4A]" />
                        <span className="text-[10px] font-bold text-[#976B18] uppercase tracking-wider">Primary</span>
                      </div>
                    )}
                    <div className="relative payout-menu-container">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === account.id ? null : account.id)}
                        className={`transition-colors w-8 h-8 flex items-center justify-center rounded-full ${
                          activeMenuId === account.id ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>

                      {activeMenuId === account.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-1.5 z-50 origin-top-right"
                        >
                          {!account.isPrimary && (
                            <button 
                              onClick={() => handleMakePrimary(account.id)}
                              className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                            >
                              <Star className="w-4 h-4 text-neutral-400" />
                              Make Primary
                            </button>
                          )}
                          <button 
                            onClick={() => handleEditDetails(account)}
                            className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-neutral-400" />
                            Edit Details
                          </button>
                          <div className="h-px bg-neutral-100 my-1 mx-2" />
                          <button 
                            onClick={() => handleRemoveAccount(account.id)}
                            className="w-full px-4 py-2.5 text-left text-[13px] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            Remove Account
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle Row: Account Number */}
                <div className="mb-8">
                  <p className="font-mono text-[20px] md:text-[22px] tracking-[0.15em] text-neutral-800">
                    {account.accountNumber.replace(/-/g, ' ').toUpperCase()}
                  </p>
                </div>

                {/* Bottom Row: Account Name & Status */}
                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase block mb-1">
                      Account Holder
                    </span>
                    <p className="text-[14px] font-medium text-neutral-900">{account.accountName}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {account.status === 'verified' ? (
                      <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </div>
    <AddPayoutAccountDrawer 
      isOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
        setAccountToEdit(null);
      }}
      editAccount={accountToEdit}
    />
    </>
  );
}
