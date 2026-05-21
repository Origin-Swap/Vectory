import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../config/ApiUrl";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";
import { TbCalendarCheck } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";
import AddToCartButton from "./AddToCartButton";
import ItemCard from "./ItemCard";
import { useAccount } from "wagmi";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { title } = useParams();

  const [item, setItem] = useState(null);
  const [otherItems, setOtherItems] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/api/items`);
        const data = await res.json();

        const found = data.find(
          (p) => p.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
        );
        if (!mounted) return;
        console.log("Found item:", found);

        setItem(found || null);

        if (found && found.userAddress) {
          // ambil produk lain dari seller yang sama
          const sellerItems = data.filter(
            (p) => p.userAddress === found.userAddress && p.title !== found.title
          );
          setOtherItems(sellerItems);

          // fetch info seller dari backend
          // fetch info seller dari backend
          try {
            const resUser = await fetch(`${API_URL}/api/user/${found.userAddress}`);
            if (resUser.ok) {
              const userData = await resUser.json();
              setSeller(userData.data); // <-- ambil dari "data"
            }
          } catch (err) {
            console.error("Gagal ambil user:", err);
          }
        }
      } catch (err) {
        console.error("Gagal ambil item:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchItems();
    return () => {
      mounted = false;
    };
  }, [title]);

  const handlePrev = () => {
    if (!item?.images?.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!item?.images?.length) return;
    setCurrentIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!item) return <div className="p-4">Item not found.</div>;

  const paymentLogos = {
    SUPRA: "/images/tokens/supra.webp",
    KT: "/images/tokens/kt.png",
    USDT: "/images/tokens/tether-1.svg",
    USDC: "/images/tokens/usdc.png",
  };

  const mainImage =
    Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : "/images/avatar-image.png";

  const handleBuyNow = () => {
    const cart = JSON.parse(localStorage.getItem("checkout") || "[]");
    const exists = cart.find((i) => i && i.title === item.title);
    if (!exists) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("checkout", JSON.stringify(cart));
    }
    navigate(`/my-cart`);
  };

  const handleBack = () => navigate("/");

  return (
    <div className="md:p-4 p-2 mt-16 bg-gray-100 mx-auto font-sans">
      <p onClick={handleBack} className="flex items-center gap-1 mt-2 mb-4 cursor-pointer">
        <IoIosArrowRoundBack className="w-6 h-6" /> Back To Market
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Produk */}
        <div className="md:w-4/6 w-full bg-white rounded-lg shadow p-4 md:p-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 w-full relative ">
          {item.images && item.images.length > 0 ? (
            <div className="relative">
              <img
                src={item.images[currentIndex]}
                alt={`${item.title} ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-2xl border"
              />

              {/* Tombol Prev */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                  >
                    ‹
                  </button>
                  {/* Tombol Next */}
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          ) : (
            <img
              src="/images/placeholder.png"
              alt="Placeholder"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}

          {/* Thumbnail kecil */}
          {item.images?.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {item.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-12 h-12 object-cover rounded cursor-pointer border ${
                    idx === currentIndex ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>


          <div className="md:w-2/3 w-full flex flex-col justify-between">
            <div className="space-y-2">
              <h1 className="md:text-2xl text-lg font-bold text-gray-800">
                [{item.category}] {item.title}
              </h1>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <div className="md:text-3xl text-xl my-text text-red-500 my-6 flex items-center gap-2">
                  <span>${item.price || 0}</span>
                  {paymentLogos[item.paymentMethod] ? (
                    <img
                      src={paymentLogos[item.paymentMethod]}
                      alt={item.paymentMethod}
                      className="w-6 h-6 inline-block"
                    />
                  ) : (
                    <span>{item.paymentMethod || ""}</span>
                  )}
                </div>
                <p className="flex items-center gap-1">
                  <BsBagCheck /> <strong>Available:</strong> {item.quantity} items
                </p>
                <p className="flex items-center gap-1">
                  <BsCartCheck /> <strong>Sold:</strong> {item.sold || 0} items
                </p>
                <p className="flex items-center gap-1">
                  <TbCalendarCheck /> <strong>Last Updates:</strong>{" "}
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              {address?.toLowerCase() !== item.userAddress?.toLowerCase() && (
                <div className="flex flex-col md:flex-row gap-3">
                  <AddToCartButton item={item} userAddress={address} />
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-yellow-400 hover:bg-green-600 text-black py-2 rounded-lg text-lg transition"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Seller Info */}
        {seller && (
          <div className="mt-2 md:w-2/6 w-full bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-sm my-text text-gray-800 mb-3 border-b pb-2">
              Seller Info
            </h2>

            <div className="flex flex-col items-center text-center">
              <img
                src={seller.avatar || "/images/avatar-image.png"}
                alt="Seller Avatar"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <p className="text-lg font-bold">{seller.username}</p>
              <p className="text-sm text-gray-600">{seller.bio}</p>

              <div className="flex gap-6 mt-2 text-sm text-gray-700">
                <div>
                  <span className="font-bold">{seller.followers || 0}</span> Followers
                </div>
                <div>
                  <span className="font-bold">{seller.following || 0}</span> Following
                </div>
              </div>

              <div className="flex gap-3 mt-4 w-full">
                <button className="w-1/2 text-gray-800 py-2 px-4 rounded-lg text-sm transition">
                  Chat
                </button>
                <button className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg text-sm font-semibold transition">
                  Follow
                </button>
                <button className="w-1/2 text-black py-2 px-4 rounded-lg text-sm font-semibold transition">
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {item.about && (
        <div className="mt-2 bg-white p-4 md:p-6 rounded-xl shadow">
          <h2 className="md:text-xl text-lg my-text font-semibold text-gray-800 mb-2 border-b-2">
            About Product
          </h2>
          <div
            className="text-gray-700 text-md leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.about }}
          />
        </div>
      )}

      {otherItems.length > 0 && (
        <div className="mt-6 bg-white p-4 md:p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            More from this Seller
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-4">
            {otherItems.map((p) => (
              <ItemCard key={p.title} item={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
