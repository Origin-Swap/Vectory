import React from "react";

const ReferralCard = ({ invites, address }) => {
  const referralLink = `https://kraftera.xyz/?ref=${address}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("✅ Referral link copied!");
  };

  return (
    <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl shadow-md shadow-orange-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Referral Program
      </h3>

      {/* Jumlah Referral */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {invites}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Successful Invites
          </p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Your Referral Link
        </p>
        <div className="flex">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-lg"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
