import { createContext, useContext, useState, useEffect } from "react";

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

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      if (!provider) {
        // Redirect ke app kalau tidak ada wallet
        window.location.href = "starkey://connect?dapp=https://kraftera.xyz";
        return null;
      }

      const accounts = await provider.connect();
      if (!accounts?.length) {
        throw new Error("No accounts returned from StarKey Wallet");
      }

      setAddress(accounts[0]);
      setIsConnected(true);

      console.log("✅ Connected to StarKey Wallet:", accounts[0]);

      // Ambil balance langsung dari provider
      const bal = await provider.balance();
      const formatted = bal?.balance ? bal.balance / 1e8 : 0;

      setBalance(formatted);
      console.log("💰 SUPRA Balance (StarKey):", {
        raw: bal,
        formatted,
      });

      return accounts[0];
    } catch (err) {
      console.error("❌ Failed to connect wallet:", err);
      return null;
    }
  };

  const refreshBalance = async () => {
    try {
      const provider = getProvider();
      if (!provider || !address) return;

      const bal = await provider.balance();
      const formatted = bal?.balance ? bal.balance / 1e8 : 0;

      setBalance(formatted);
      return formatted;
    } catch (err) {
      console.error("❌ Failed to refresh balance:", err);
      return 0;
    }
  };

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
    console.log("🔌 Disconnected from StarKey Wallet");
  };

  return (
    <AccountContext.Provider
      value={{
        address,
        balance,
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
