import { SupraClient } from "supra-l1-sdk";

const RPC_URL = "https://rpc-testnet.supra.com";
export const client = new SupraClient(RPC_URL);

const CONTRACT_ADDR = "0x349523e3e27758a9889f84542f35bd288e31f0828629a08e0b9e17de8cbded89";
const MODULE = `${CONTRACT_ADDR}::Escrow`;

/**
 * Init Escrow for a wallet (must be called once per account)
 */
export async function initEscrowOnChain(provider) {
  try {
    const payload = {
      function: `${MODULE}::init`,
      type_arguments: [],
      arguments: [],
      gas_unit_price: "1",
      max_gas_amount: "20000",
      expiration_timestamp_secs: Math.floor(Date.now() / 1000) + 600,
    };

    const txHash = await provider.sendTransaction(payload);
    console.log("initEscrow txHash:", txHash);

    return { txHash, success: !!txHash };
  } catch (err) {
    console.error("❌ initEscrowOnChain error:", err);
    return { txHash: null, success: false };
  }
}

/**
 * Create product in Escrow
 */
export async function createProductOnChain(provider, price, tokenAddr, qtyOption) {
  try {
    const accounts = await provider.account();
    const sender = Array.isArray(accounts) ? accounts[0] : accounts.address;

    // qtyOption = { some: true/false, value: "10" }
    const payload = {
      sender,
      function: `${MODULE}::create_product`,
      type_arguments: [],
      arguments: [String(price), tokenAddr, qtyOption],
      gas_unit_price: "1",
      max_gas_amount: "20000",
      expiration_timestamp_secs: Math.floor(Date.now() / 1000) + 600,
    };

    console.log("create_product payload:", payload);

    const txHash = await provider.sendTransaction(payload);
    console.log("create_product txHash:", txHash);

    return { txHash, success: !!txHash };
  } catch (err) {
    console.error("❌ createProductOnChain error:", err);
    return { txHash: null, success: false };
  }
}
