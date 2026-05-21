import React, { useState, useEffect } from "react";
import products from "../../data/mockProducts";
import mockUser from "../../data/mockUser";
import Banner from "./Banner";
import UserInfo from "./UserInfo";
import WalletSection from "./WalletSection";
import OrderHistory from "./OrderHistory";
import MyProducts from "./MyProducts";
import { useAccount } from "wagmi";
import { getSupraPrice } from "../../utils/getSupraPrice";
import { useParams } from "react-router-dom"; // 🆕 ambil param

const ProfilePortfolio = () => {
  const { address, isConnected, balance } = useAccount();
  const { address: paramAddress } = useParams(); // 🆕 param di URL
  const targetAddress = paramAddress || address;

  const [profile, setProfile] = useState({
    username: "UserName",
    wallet: "0xA12b...F9C7",
    avatar: "/images/avatar2.png",
    email: "user@example.com",
    bio: "Digital creator & blockchain enthusiast.",
    points: 860,
    balances: {
      SUPRA: 0,
    },
    orders: [/* ... */],
  });

  const [supraPrice, setSupraPrice] = useState(0);

  const userProducts = products.filter((p) => p.owner === profile.wallet);

  const tokenData = {
    SUPRA: { logo: "/images/tokens/supra.webp", price: supraPrice },
    KT: { logo: "/images/tokens/kt.png", price: 0.1, address: "0xKTTokenAddress" },
    USDT: { logo: "/images/tokens/tether-1.svg", price: 1, address: "0xUsdtTokenAddress" },
    USDC: { logo: "/images/tokens/usdc.png", price: 1, address: "0xUsdcTokenAddress" },
  };

  // Update balance ketika connect
  // Update balance & wallet tergantung targetAddress
  useEffect(() => {
    if (!targetAddress) return;

    setProfile((prev) => ({
      ...prev,
      wallet: targetAddress,
      balances: {
        ...prev.balances,
        SUPRA: paramAddress ? 0 : (balance || 0),
        // 👉 kalau lihat profil orang lain, SUPRA = 0
      },
    }));
  }, [targetAddress, balance, paramAddress]);


  // fetch harga SUPRA sekali saat load
  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getSupraPrice();
      setSupraPrice(price);
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
