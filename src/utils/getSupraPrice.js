import axios from "axios";

/**
 * Ambil harga SUPRA dari CoinGecko
 * @returns {Promise<number>} harga SUPRA dalam USD
 */
export const getSupraPrice = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "supra", // ✅ pastikan ID sesuai listing CoinGecko
          vs_currencies: "usd",
        },
      }
    );

    return res.data["supra"]?.usd || 0;
  } catch (err) {
    console.error("❌ Gagal ambil harga SUPRA dari CoinGecko:", err);
    return 0;
  }
};
