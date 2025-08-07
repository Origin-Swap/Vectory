import React from "react";
import { useAccount } from "wagmi";
import products from "../../data/mockProducts";
import mockUser from "../../data/mockUser";
import Banner from "./Banner";
import UserInfo from "./UserInfo";
import WalletSection from "./WalletSection";
import OrderHistory from "./OrderHistory";
import MyProducts from "./MyProducts";

const ProfilePortfolio = () => {
  const { isConnected, address } = useAccount();
  const userWallet = mockUser.wallet;

  const profile = {
    username: "UserName",
    wallet: "0xA12b...F9C7",
    avatar: "/images/avatar2.png",
    points: 860,
    balances: {
      SUPRA: 120.5,
      KT: 540.3,
      USDT: 82.75,
      USDC: 102.4,
    },
    orders: [
      {
        id: "ORD-001",
        product: "Digital Art - Glitch Portrait",
        date: "2025-07-26",
        price: "0.8 USDC",
        status: "Completed",
      },
      {
        id: "ORD-002",
        product: "Synthwave Music Pack",
        date: "2025-07-20",
        price: "1.2 USDC",
        status: "Completed",
      },
    ],
  };

  const userProducts = products.filter((p) => p.owner === userWallet);

  const tokenData = {
    SUPRA: { logo: "/images/tokens/supra.webp", price: 0.25 },
    KT: { logo: "/images/tokens/kt.png", price: 0.1 },
    USDT: { logo: "/images/tokens/tether-1.svg", price: 1 },
    USDC: { logo: "/images/tokens/usdc.png", price: 1 },
  };

  return (
    <div className="max-w-6xl mt-14 md:mt-16 mx-auto px-4 py-2">
      <Banner />
      <UserInfo profile={profile} />
      {isConnected && address && (
        <>
          <WalletSection balances={profile.balances} tokenData={tokenData} />
          <OrderHistory orders={profile.orders} products={products} />
        </>
      )}
      <MyProducts products={userProducts} />
    </div>
  );
};

export default ProfilePortfolio;
