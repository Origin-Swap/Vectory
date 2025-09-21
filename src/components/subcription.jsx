import React, { useState } from "react";
import axios from "axios";
import { API_URL } from '../config/ApiUrl';
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAccountSupra } from "../context/account";
import { toBaseUnit } from "../utils/formatToken";
import { HexString, TxnBuilderTypes, BCS } from "supra-l1-sdk";

const TREASURY_ADDRESS = "0xac021c90cd694f0d6f0008e3874abab7e387c50bb17cc350f2f90b418e963b2e"; // ganti address treasury kamu
const SUPRA_TOKEN_DECIMALS = 8; // decimals token SUPRA
const SUPRA_COIN_TYPE = "0x1::supra::SUPRA";

export default function SubscriptionPage() {
  const { address, account } = useAccountSupra();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("bronze");
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "bronze",
      name: "Bronze",
      price: "Free",
      subtitle: "Basic access",
      costToken: 0,
      discount: 0, // tidak ada diskon
      features: [
        "Social Media Interactions",
        "Get 10 Points",
        "Buy Items",
        "Get 1 Point by Like a Post",
        "Get 2 Point by Comment a Post",
        "Farm points — max 100 points"
      ],
    },
    {
      id: "silver",
      name: "Silver",
      price: 1000, // harga asli
      subtitle: "Power up your activity",
      costToken: 1000, // harga asli (nanti dihitung diskon)
      discount: 25, // 25%
      features: [
        "Everything in Bronze",
        "Get 2,500 Points",
        "Create Post",
        "Get 2 Point by Like a Post",
        "Get 5 Point by Comment a Post",
        "Farm points — max 2,500 points",
      ],
    },
    {
      id: "gold",
      name: "Gold",
      price: 2000,
      subtitle: "Full creator toolkit",
      costToken: 2000,
      discount: 30, // 30%
      features: [
        "Everything in Bronze & Silver",
        "Get 5,000 Points",
        "Sell Items",
        "Get 5 Point by Like a Post",
        "Get 10 Point by Comment a Post",
        "Farm points — max 10,000 points",
      ],
    },
  ];

  const handleSubscribe = async (plan) => {
    if (!address) {
      alert("Connect your Supra wallet first.");
      return;
    }

    if (plan.costToken === 0) {
      // Bronze Plan (Free)
      try {
        setLoading(true);
        await axios.post(`${API_URL}/api/user/upgrade`, { address, plan: plan.id });
        alert("Successfully upgraded to Bronze!");
        setSelected(plan.id);
      } catch (err) {
        console.error("❌ Bronze upgrade error:", err);
        alert("Upgrade failed.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Silver / Gold Plan (Paid)
    try {
      setLoading(true);

      // convert to base unit
      const amountBase = toBaseUnit(plan.costToken, SUPRA_TOKEN_DECIMALS);

      console.log("Wallet:", address);
      console.log("Plan:", plan.id, "Cost SUPRA:", plan.costToken);
      console.log("Cost in base unit:", amountBase.toString());

      // cek balance wallet dulu
      const bal = await account.balance();
      console.log("Wallet balance:", bal);
      if (bal.balance < amountBase) {
        alert("Insufficient SUPRA balance!");
        setLoading(false);
        return;
      }

      // hitung expiry (30 detik)
      const txExpiryTime = Math.ceil(Date.now() / 1000) + 30;
      const optionalTransactionPayloadArgs = { txExpiryTime };

      const rawTxPayload = [
        address,
        0,
        "0000000000000000000000000000000000000000000000000000000000000001",
        "supra_account",
        "transfer",
        [],
        [
          new HexString(TREASURY_ADDRESS).toUint8Array(),
          BCS.bcsSerializeUint64(amountBase),
        ],
        optionalTransactionPayloadArgs,
      ];

      const data = await account.createRawTransactionData(rawTxPayload);
      if (!data) throw new Error("Failed to create transaction data");

      const txHash = await account.sendTransaction({ data });
      if (!txHash) throw new Error("No txHash returned from wallet");

      const res = await axios.post(`${API_BASE}/upgrade`, {
        address,
        plan: plan.id,
        txHash,
      });

      if (res.data && res.data.level) {
        alert(`Successfully subscribed to ${plan.name}! tx: ${txHash}`);
      } else {
        alert("Subscription succeeded but backend verification failed. Check server logs.");
      }
    } catch (err) {
      console.error("❌ Subscription error:", err);
      alert(err.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };


  const handleBack = () => navigate("/dashboard");

  return (
      <div className="mt-8 min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p
            onClick={handleBack}
            className="flex items-center gap-1 mt-2 mb-4 cursor-pointer"
          >
            <IoIosArrowRoundBack className="w-6 h-6" /> Back To Dashboard
          </p>

          <header className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Choose your subscription
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Pick a plan that fits how you want to interact with the platform.
            </p>
          </header>

          <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => {
              const finalPrice =
                plan.discount > 0
                  ? plan.costToken - (plan.costToken * plan.discount) / 100
                  : plan.costToken;

              return (
                <article
                  key={plan.id}
                  className="relative rounded-2xl border p-6 flex flex-col justify-between shadow-sm"
                >
                  {plan.discount > 0 && (
                    <div className="absolute -top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {plan.discount}% OFF
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.subtitle}</p>
                    </div>
                    <div className="text-right">
                      {plan.discount > 0 ? (
                        <>
                          <div className="text-sm text-gray-400 line-through">
                            {plan.price} Supra
                          </div>
                          <div className="text-2xl font-extrabold text-indigo-600">
                            {finalPrice} Supra
                          </div>
                        </>
                      ) : (
                        <div className="text-2xl font-extrabold text-indigo-600">
                          {plan.price}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">one-time</div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        ✅ <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <button
                      onClick={() =>
                        handleSubscribe({ ...plan, costToken: finalPrice })
                      }
                      disabled={loading}
                      className="w-full py-2 rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      {loading
                        ? "Processing..."
                        : plan.costToken > 0
                        ? `Subscribe — ${finalPrice} Supra`
                        : "Get Started"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    );
  }
