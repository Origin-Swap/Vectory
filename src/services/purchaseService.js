import { API_URL } from "../config/ApiUrl";
import { toBaseUnit } from "../utils/formatToken";
import { HexString, BCS } from "supra-l1-sdk";

const SUPRA_TOKEN_DECIMALS = 8;
const SUPRA_COIN_TYPE = "0x1::supra::SUPRA";

const TESTNET_RPC = "https://rpc-testnet.supra.com";

/**
 * Checkout cart items + transfer token ke seller
 * @param {object} account - wallet account dari Supra SDK
 * @param {string} buyerAddress - wallet user pembeli
 * @param {Array} items - [{ id, quantity, price, sellerAddress }]
 */
 export async function purchaseItems(account, buyerAddress, items, currentBalance) {
  try {
    if (!account) throw new Error("Wallet not connected");
    if (!items || items.length === 0) throw new Error("No items to purchase");

    const txHashes = [];

    for (const item of items) {
      const totalCost = item.price * item.quantity;
      const amountBase = toBaseUnit(totalCost, SUPRA_TOKEN_DECIMALS);

      if (currentBalance < amountBase) {
        throw new Error(
          `Insufficient SUPRA balance: need ${amountBase}, have ${currentBalance}`
        );
      }

      const txExpiryTime = Math.ceil(Date.now() / 1000) + 30;
      const optionalTransactionPayloadArgs = { txExpiryTime };

      const rawTxPayload = [
        buyerAddress,
        0,
        "0000000000000000000000000000000000000000000000000000000000000001",
        "supra_account",
        "transfer",
        [],
        [
          new HexString(item.sellerAddress).toUint8Array(),
          BCS.bcsSerializeUint64(amountBase),
        ],
        optionalTransactionPayloadArgs,
      ];

      const data = await account.createRawTransactionData(rawTxPayload);
      if (!data) throw new Error("Failed to create transaction data");

      const txHash = await account.sendTransaction({ data });
      if (!txHash) throw new Error("No txHash returned from wallet");

      console.log(`✅ Sent ${totalCost} SUPRA to ${item.sellerAddress}, tx: ${txHash}`);
      txHashes.push(txHash);
    }

    // Simpan order ke backend
    const res = await fetch(`${API_URL}/api/cart/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAddress: buyerAddress,
        items,
        txHashes, // ✅ simpan juga ke backend kalau mau
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to record order" };
    }

    // ✅ return txHashes supaya frontend bisa pakai
    return { success: true, txHashes, data };
  } catch (err) {
    console.error("Error in purchaseItems:", err);
    return { success: false, error: err.message };
  }
}
