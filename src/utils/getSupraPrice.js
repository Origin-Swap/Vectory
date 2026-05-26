/**
 * Ambil harga SUPRA dari CoinGecko
 * @returns {Promise<number>} harga SUPRA dalam USD
 */
 import axios from "axios";

 /**
  * Ambil harga ETH dari CoinGecko
  * @returns {Promise<number>} harga ETH dalam USD
  */
 export const getEthPrice = async () => {
   try {
     const res = await axios.get(
       "https://api.coingecko.com/api/v3/simple/price",
       {
         params: {
           ids: "ethereum",
           vs_currencies: "usd",
         },
       }
     );

     return res.data["ethereum"]?.usd || 0;
   } catch (err) {
     console.error("❌ Gagal ambil harga ETH dari CoinGecko:", err);
     return 0;
   }
 };
