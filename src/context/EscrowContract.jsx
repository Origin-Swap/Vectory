import { SupraClient } from "supra-l1-sdk";

const client = new SupraClient("https://rpc-testnet.supra.com");

const CONTRACT_ADDR = "0x349523e3e27758a9889f84542f35bd288e31f0828629a08e0b9e17de8cbded89";
const MODULE = `${CONTRACT_ADDR}::Escrow`;

export async function createProductOnChain(provider, price, tokenAddr, qty) {
  try {
    // 🔑 Ambil alamat user dari wallet
    const account = await provider.account();  // <-- bukan provider.account langsung

    // 1️⃣ Buat payload untuk fungsi Move
    const payload = {
      sender: account.address,   // string address
      function: `${MODULE}::create_product`,
      type_arguments: [],
      arguments: [
        price.toString(),
        tokenAddr,
        qty.toString(),
      ],
      gas_unit_price: "1",
      max_gas_amount: "20000",
      expiration_timestamp_secs: Math.floor(Date.now() / 1000) + 600,
    };

    // 2️⃣ Build raw transaction
    const rawTx = await provider.createRawTransactionData(payload);

    // 3️⃣ Kirim transaksi ke wallet
    const txHash = await provider.sendTransaction(rawTx);

    // 4️⃣ Tunggu hasil konfirmasi
    const result = await client.waitForTransaction(txHash);

    return { txHash, success: result.success };
  } catch (err) {
    console.error("❌ createProductOnChain error:", err);
    return { txHash: null, success: false };
  }
}


 /**
  * Buyer creates order (deposit funds to escrow)
  */
 export async function createOrderOnChain(account, productOwner, productId, amount) {
   const payload = {
     function: `${MODULE}::create_order`,
     type_arguments: [],
     arguments: [
       productOwner,       // address penjual
       productId.toString(),
       amount.toString()
     ]
   };

   const tx = await client.signAndSubmitTransaction(account, payload);
   const result = await client.waitForTransaction(tx.hash);
   return { txHash: tx.hash, success: result.success };
 }

 /**
  * Release funds to seller after buyer confirms receipt
  */
 export async function releaseFundsOnChain(account, productOwner, orderId) {
   const payload = {
     function: `${MODULE}::release_funds`,
     type_arguments: [],
     arguments: [
       productOwner,
       orderId.toString()
     ]
   };

   const tx = await client.signAndSubmitTransaction(account, payload);
   const result = await client.waitForTransaction(tx.hash);
   return { txHash: tx.hash, success: result.success };
 }

 /**
  * Buyer cancels order (refund) if rules allow
  */
 export async function cancelOrderOnChain(account, productOwner, orderId) {
   const payload = {
     function: `${MODULE}::cancel_order_by_buyer`,
     type_arguments: [],
     arguments: [
       productOwner,
       orderId.toString()
     ]
   };

   const tx = await client.signAndSubmitTransaction(account, payload);
   const result = await client.waitForTransaction(tx.hash);
   return { txHash: tx.hash, success: result.success };
 }

 /**
  * Optional: initialize Escrow for seller (harus dipanggil sebelum create_product)
  */
 export async function initEscrow(account) {
   const payload = {
     function: `${MODULE}::init`,
     type_arguments: [],
     arguments: []
   };

   const tx = await client.signAndSubmitTransaction(account, payload);
   const result = await client.waitForTransaction(tx.hash);
   return { txHash: tx.hash, success: result.success };
 }
