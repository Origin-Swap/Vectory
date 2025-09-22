// src/context/account.jsx
import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

const getProvider = () => {
  if ("starkey" in window) {
    return window.starkey?.supra || null;
  }
  return null;
};

export const AccountProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);

  // ✅ ambil balance dari StarKey
  const getBalance = async (provider) => {
    try {
      const bal = await provider.balance();
      console.log("🔍 Balance from StarKey:", bal);
      return bal?.balance ? Number(bal.balance) / 1e8 : 0; // format ke SUPRA
    } catch (err) {
      console.error("❌ Failed to get balance:", err);
      return 0;
    }
  };

  // 🔌 connect wallet
  const connectWallet = async () => {
    const provider = getProvider();
    if (!provider) {
      window.location.href = "starkey://connect?dapp=https://kraftera.xyz";
      return null;
    }

    const accounts = await provider.connect();
    if (!accounts?.length) throw new Error("No accounts returned");

    setAddress(accounts[0]);
    setAccount(provider);
    setIsConnected(true);

    await provider.changeNetwork({ chainId: "6" });

    // cek chain id (6 = testnet, 8 = mainnet)
    const chainId = await provider.getChainId();
    console.log("🌐 Connected chain:", chainId);

    // ambil balance
    const bal = await getBalance(provider);
    setBalance(bal);

    return accounts[0];
  };

  // 🔄 refresh balance
  const refreshBalance = async () => {
    if (!account || !address) return 0;
    const bal = await getBalance(account);
    setBalance(bal);
    return bal;
  };

  // ❌ disconnect wallet
  const disconnectWallet = async () => {
    try {
      const provider = getProvider();
      if (provider) {
        await provider.disconnect();
      }
    } catch (e) {
      console.warn("⚠️ Error disconnecting:", e);
    }

    setAddress(null);
    setBalance(0);
    setIsConnected(false);
    setAccount(null);

    console.log("🔌 Disconnected from StarKey Wallet");
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        balance,
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountSupra = () => useContext(AccountContext);
