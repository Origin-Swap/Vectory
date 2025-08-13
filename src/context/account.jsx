import { createContext, useContext, useState } from "react";
import { SupraClient } from "supra-l1-sdk";
import { Buffer } from "buffer";

// Buffer polyfill untuk browser
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      // 1️⃣ Init Supra Client
      const supraClient = await SupraClient.init("https://rpc-testnet.supra.com/");

      // 2️⃣ Dapatkan provider dari StarKey Wallet
      const provider = window.starkey?.supra;
      if (!provider || typeof provider.connect !== "function") {
        throw new Error("StarKey Wallet extension not found. Please install it first.");
      }

      // 3️⃣ Connect ke wallet
      const accounts = await provider.connect();
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from StarKey Wallet");
      }

      // 4️⃣ Simpan ke state
      setClient(supraClient);
      setAddress(accounts[0]);
      setIsConnected(true);

      console.log("✅ Connected to StarKey Wallet:", accounts[0]);

      // 5️⃣ Listen untuk perubahan account
      provider.on("accountChanged", (newAccounts) => {
        if (newAccounts.length > 0) {
          setAddress(newAccounts[0]);
          console.log("🔄 Account changed to:", newAccounts[0]);
        }
      });

      return accounts[0];
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      return null;
    }
  };

  const disconnectWallet = () => {
    setClient(null);
    setAddress(null);
    setIsConnected(false);
    console.log("Disconnected from StarKey Wallet");
  };

  return (
    <AccountContext.Provider
      value={{ address, client, isConnected, connectWallet, disconnectWallet }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountSupra = () => useContext(AccountContext);
