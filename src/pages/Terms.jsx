import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Welcome to Kraftera
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Kraftera – The Web3 Digital Marketplace. By accessing or using our platform,
              you agree to be bound by these Terms of Service. Kraftera is a next-gen Web3 marketplace
              where creators and collectors can buy, sell, and collect digital assets including digital art,
              music & sound packs, ebooks & courses, templates & creative files, signatures, and unique NFTs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Eligibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To use Kraftera, you must be at least 18 years old and capable of forming a binding contract
              with us. By connecting your wallet and using our platform, you confirm that you meet these
              requirements and that all information you provide is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Digital Asset Transactions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Kraftera facilitates peer-to-peer transactions of digital assets powered by blockchain technology.
              Key points:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>All transactions are recorded on the blockchain</li>
              <li>Smart contracts execute trades automatically</li>
              <li>NFT royalties are paid automatically to creators</li>
              <li>License terms are specified by each creator</li>
              <li>Buyers receive proof of ownership via NFT</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Creator Responsibilities
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              As a creator on Kraftera, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>You own all intellectual property rights to your digital assets</li>
              <li>Your content does not infringe on third-party rights</li>
              <li>You will provide accurate descriptions and license terms</li>
              <li>You are responsible for any taxes owed on your sales</li>
              <li>You will honor all licenses and royalties as specified</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Fees and Payments
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Kraftera charges low fees with no middlemen. Our fee structure:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>2.5% transaction fee on each sale</li>
              <li>Creators receive 95% of sale price</li>
              <li>2.5% goes to referral rewards</li>
              <li>NFT royalties are separate and set by creators (5-10% typical)</li>
              <li>Gas fees are paid by the user initiating the transaction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Prohibited Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The following content is strictly prohibited on Kraftera:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Illegal content or materials promoting illegal activities</li>
              <li>Hate speech, harassment, or violent content</li>
              <li>Copyright-infringing or plagiarized works</li>
              <li>Scams, phishing, or fraudulent listings</li>
              <li>NSFW or adult content without proper labeling</li>
              <li>Misleading or false information about assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Wallet Connection & Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You are responsible for securing your cryptocurrency wallet. Kraftera:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Never has access to your private keys</li>
              <li>Uses industry-standard security practices</li>
              <li>Recommends using hardware wallets for large holdings</li>
              <li>Is not responsible for unauthorized wallet access</li>
              <li>Offers daily rewards for connected wallets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms,
              engage in fraudulent activity, or harm the Kraftera community. Users may close their
              accounts at any time by ceasing platform use and withdrawing funds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Kraftera is provided "as is" without warranties. We are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Blockchain network issues or delays</li>
              <li>Smart contract vulnerabilities</li>
              <li>Loss of value due to market volatility</li>
              <li>Disputes between buyers and sellers</li>
              <li>Third-party integrations or wallets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update these terms periodically. Continued use of Kraftera after changes
              constitutes acceptance of new terms. Major changes will be announced via our
              Telegram channel (@kraftera_ann) and X (Twitter) account (@kraftera_market).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Questions about these Terms? Contact us:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1 mt-2">
              <li>🌐 Website: <a href="https://kraftera.xyz" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">kraftera.xyz</a></li>
              <li>🐦 X (Twitter): <a href="https://x.com/kraftera_market" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@kraftera_market</a></li>
              <li>📱 Telegram: <a href="https://t.me/kraftera_ann" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@kraftera_ann</a></li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 Kraftera. All rights reserved. Built on multichain Web3 technology.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
