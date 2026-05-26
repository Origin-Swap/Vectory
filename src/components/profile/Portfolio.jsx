import React, { useState, useEffect } from "react";
import products from "../../data/mockProducts";
import mockUser from "../../data/mockUser";
import Banner from "./Banner";
import UserInfo from "./UserInfo";
import WalletSection from "./WalletSection";
import OrderHistory from "./OrderHistory";
import MyProducts from "./MyProducts";
import { useAccount } from "wagmi";
import { getEthPrice } from "../../utils/getSupraPrice";
import { useParams } from "react-router-dom";

const ProfilePortfolio = () => {
  const { address, isConnected, balance } = useAccount();
  const { address: paramAddress } = useParams();
  const targetAddress = paramAddress || address;

  const [profile, setProfile] = useState({
    username: "UserName",
    wallet: "0xA12b...F9C7",
    avatar: "/images/avatar2.png",
    email: "user@example.com",
    bio: "Digital creator & blockchain enthusiast.",
    points: 860,
    balances: {
      ETH: 0,
    },
    orders: [/* ... */],
  });

  const [ethPrice, setEthPrice] = useState(0);

  const userProducts = products.filter((p) => p.owner === profile.wallet);

  const tokenData = {
    ETH: { logo: "/images/tokens/ETH.png", price: ethPrice },
    KT: { logo: "/images/tokens/kt.png", price: 0.1, address: "0xKTTokenAddress" },
    USDT: { logo: "/images/tokens/tether-1.svg", price: 1, address: "0xUsdtTokenAddress" },
    USDC: { logo: "/images/tokens/usdc.png", price: 1, address: "0xUsdcTokenAddress" },
  };

  // Update balance & wallet tergantung targetAddress
  useEffect(() => {
    if (!targetAddress) return;

    setProfile((prev) => ({
      ...prev,
      wallet: targetAddress,
      balances: {
        ETH: paramAddress ? 0 : (balance || 0),
        KT: 0,      // 👈 bisa diisi dengan balance token KT dari contract
        USDT: 0,    // 👈 bisa diisi dengan balance token USDT dari contract
        USDC: 0     // 👈 bisa diisi dengan balance token USDC dari contract
      },
    }));
  }, [targetAddress, balance, paramAddress]);

  // fetch harga ETH sekali saat load
  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getEthPrice();
      setEthPrice(price);
    };
    fetchPrice();
  }, []);

  // cek apakah ini profil milik connected wallet
  const isSelfProfile =
    isConnected &&
    (!paramAddress || paramAddress.toLowerCase() === address?.toLowerCase());

  return (
    <div className="max-w-6xl mt-14 md:mt-16 mx-auto md:px-4 md:py-2 px-2 py-2">
      <Banner />
      <UserInfo profile={profile} onProfileUpdate={() => {}} />

      {isSelfProfile && (
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
