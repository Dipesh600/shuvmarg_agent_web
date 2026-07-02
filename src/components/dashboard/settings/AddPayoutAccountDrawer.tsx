import React, { useState, useEffect } from "react";
import { X, Building, Landmark, CheckCircle2 } from "lucide-react";

interface AddPayoutAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editAccount?: any | null;
}

export function AddPayoutAccountDrawer({ isOpen, onClose, editAccount }: AddPayoutAccountDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [accountType, setAccountType] = useState<"bank" | "wallet">("bank");
  const [isPrimary, setIsPrimary] = useState(false);
  const [provider, setProvider] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editAccount) {
      setAccountType(editAccount.type);
      setIsPrimary(editAccount.isPrimary);
      let mappedProvider = "";
      if (editAccount.provider === "Nabil Bank Limited") mappedProvider = "nabil";
      else if (editAccount.provider === "eSewa") mappedProvider = "esewa";
      else if (editAccount.provider === "Khalti") mappedProvider = "khalti";
      setProvider(mappedProvider);
      setAccountName(editAccount.accountName);
      setAccountNumber(editAccount.accountNumber);
    } else {
      setAccountType("bank");
      setIsPrimary(false);
      setProvider("");
      setAccountName("");
      setAccountNumber("");
    }
  }, [editAccount, isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100]" 
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out forwards' }}
      />
      
      {/* Drawer */}
      <div 
        className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[101] flex flex-col border-l border-neutral-200"
        style={{ animation: 'slideInFromRight 0.3s ease-out forwards' }}
      >
        <style>{`
          @keyframes slideInFromRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        {/* Header */}
        <div className="h-16 border-b border-neutral-200 px-6 flex items-center justify-between bg-white flex-shrink-0">
          <h2 className="text-[18px] font-bold text-neutral-900">
            {editAccount ? "Edit Payout Account" : "Add Payout Account"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-[14px] text-neutral-500 mb-6">
            {editAccount ? "Update your payout account details." : "Add a new bank account or digital wallet to receive your earnings."}
          </p>

          <div className="space-y-6">
            {/* Account Type Selection */}
            <div>
              <label className="block text-[13px] font-bold text-neutral-700 mb-3">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAccountType("bank")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    accountType === "bank"
                      ? "border-[#7A1D1B] bg-[#7A1D1B]/5"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <Landmark className={`w-6 h-6 mb-2 ${accountType === "bank" ? "text-[#7A1D1B]" : "text-neutral-400"}`} />
                  <span className={`text-[14px] font-bold ${accountType === "bank" ? "text-[#7A1D1B]" : "text-neutral-700"}`}>
                    Bank Transfer
                  </span>
                </button>
                <button
                  onClick={() => setAccountType("wallet")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    accountType === "wallet"
                      ? "border-[#7A1D1B] bg-[#7A1D1B]/5"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <Building className={`w-6 h-6 mb-2 ${accountType === "wallet" ? "text-[#7A1D1B]" : "text-neutral-400"}`} />
                  <span className={`text-[14px] font-bold ${accountType === "wallet" ? "text-[#7A1D1B]" : "text-neutral-700"}`}>
                    Digital Wallet
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Form Fields */}
            {accountType === "bank" ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Bank Name *</label>
                  <select 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a bank</option>
                    <option value="adbl">Agricultural Development Bank Limited</option>
                    <option value="citizens">Citizens Bank International Limited</option>
                    <option value="everest">Everest Bank Limited</option>
                    <option value="global">Global IME Bank Limited</option>
                    <option value="himalayan">Himalayan Bank Limited</option>
                    <option value="kumari">Kumari Bank Limited</option>
                    <option value="laxmi_sunrise">Laxmi Sunrise Bank Limited</option>
                    <option value="machhapuchchhre">Machhapuchchhre Bank Limited</option>
                    <option value="nabil">Nabil Bank Limited</option>
                    <option value="nepal_bank">Nepal Bank Limited</option>
                    <option value="nimbl">Nepal Investment Mega Bank Limited</option>
                    <option value="sbi">Nepal SBI Bank Limited</option>
                    <option value="nic_asia">NIC ASIA Bank Limited</option>
                    <option value="nmb">NMB Bank Limited</option>
                    <option value="prabhu">Prabhu Bank Limited</option>
                    <option value="prime">Prime Commercial Bank Limited</option>
                    <option value="rbb">Rastriya Banijya Bank Limited</option>
                    <option value="sanima">Sanima Bank Limited</option>
                    <option value="siddhartha">Siddhartha Bank Limited</option>
                    <option value="standard_chartered">Standard Chartered Bank Nepal Limited</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Branch Name (Optional)</label>
                  <input type="text" className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent" placeholder="e.g. Thamel Branch" />
                </div>

                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Account Holder Name *</label>
                  <input 
                    type="text" 
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent" 
                    placeholder="Exact name on account" 
                  />
                </div>

                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Account Number *</label>
                  <input 
                    type="text" 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent font-mono" 
                    placeholder="0000000000000" 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Wallet Provider *</label>
                  <select 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select provider</option>
                    <option value="esewa">eSewa</option>
                    <option value="khalti">Khalti</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Registered Name *</label>
                  <input 
                    type="text" 
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent" 
                    placeholder="Exact name on wallet" 
                  />
                </div>

                <div className="relative rounded-xl border border-neutral-300 focus-within:border-[#7A1D1B] focus-within:ring-1 focus-within:ring-[#7A1D1B] overflow-hidden bg-white h-14 transition-colors">
                  <label className="absolute left-4 top-2 text-[11px] font-medium text-neutral-500">Mobile Number *</label>
                  <input 
                    type="tel" 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full pt-6 pb-2 px-4 outline-none text-[14px] font-bold text-neutral-900 bg-transparent font-mono" 
                    placeholder="98XXXXXXXX" 
                  />
                </div>
              </div>
            )}

            {/* Set as Primary */}
            <div className="pt-4 border-t border-neutral-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center pt-0.5">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                  />
                  <div className="w-5 h-5 border-2 border-neutral-300 rounded transition-colors peer-checked:border-[#7A1D1B] peer-checked:bg-[#7A1D1B] group-hover:border-[#7A1D1B]"></div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white absolute top-1 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-neutral-900">Set as Primary Payout Account</h4>
                  <p className="text-[13px] text-neutral-500 mt-0.5">Your earnings will be automatically deposited to this account.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-neutral-200 bg-white">
          <button 
            className="w-full h-12 bg-[#7A1D1B] hover:bg-[#641715] text-white rounded-xl text-[15px] font-bold transition-colors shadow-sm"
            onClick={onClose}
          >
            {editAccount ? "Save Changes" : "Add Account"}
          </button>
        </div>
      </div>
    </>
  );
}
