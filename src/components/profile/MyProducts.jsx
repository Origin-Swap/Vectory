import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config/ApiUrl";
import ItemCard from '../marketplace/ItemCard';
import { Link, useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useAccount } from "wagmi";

const MyProducts = () => {
  const { address } = useAccount();
  const { address: paramAddress } = useParams();
  const targetAddress = paramAddress || address;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(""); // 🆕 simpan nama user

  // Ambil produk
  useEffect(() => {
    let mounted = true;

    const fetchMyProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/items`);
        const data = await res.json();

        const myItems = data.filter(
          (item) => item.userAddress?.toLowerCase() === targetAddress?.toLowerCase()
        );

        if (mounted) setProducts(myItems);
      } catch (err) {
        console.error("Gagal ambil produk:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (targetAddress) {
      fetchMyProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [targetAddress]);

  // 🆕 Ambil username kalau pakai paramAddress (profil orang lain)
  useEffect(() => {
    const fetchUser = async () => {
      if (paramAddress) {
        try {
          const res = await fetch(`${API_URL}/api/user/${paramAddress}`);
          const data = await res.json();
          setUsername(data?.data?.username || "");
        } catch (err) {
          console.error("Gagal ambil user:", err);
        }
      }
    };
    fetchUser();
  }, [paramAddress]);

  // 🆕 short address helper
  const shortAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";


  return (
    <div className="relative -top-12 bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">
          📦 {paramAddress ? `${username || shortAddress(paramAddress)}'s Products` : "My Products"}
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-center text-sm">⏳ Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-center text-sm">🚫 No product found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
