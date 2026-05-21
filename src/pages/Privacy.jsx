import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Commitment to Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Kraftera, your privacy is our priority. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our Web3 digital marketplace.
              Being a blockchain-based platform, we operate differently from traditional websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Information We Collect
            </h2>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              Public Blockchain Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you connect your wallet to Kraftera, we can see your public wallet address,
              transaction history, and on-chain activities. This information is inherently public
              on the blockchain and cannot be deleted.
            </p>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              Information You Provide
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Creator profile information (username, bio, avatar)</li>
              <li>Product listings and descriptions</li>
              <li>Email address (if you choose to provide it for notifications)</li>
              <li>Social media handles (optional)</li>
              <li>Support inquiries and communications</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
              <li>Wallet connection timestamps</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Process transactions and smart contract executions</li>
              <li>Calculate and distribute rewards and royalties</li>
              <li>Verify ownership and authenticity of digital assets</li>
              <li>Prevent fraud and detect suspicious activities</li>
              <li>Improve platform performance and user experience</li>
              <li>Send important updates about your account or listings</li>
              <li>Analyze platform usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Blockchain Transparency
          </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Kraftera is built on blockchain technology, which means:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>All transactions are permanent and publicly viewable</li>
              <li>We cannot delete or modify blockchain records</li>
              <li>Your wallet address is visible to other users</li>
              <li>Smart contract interactions are traceable</li>
              <li>Consider using a dedicated wallet for privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Cookies and Tracking
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Remember your wallet connection preferences</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Personalize your experience</li>
              <li>Enable referral tracking</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              You can control cookie settings through your browser. However, disabling cookies may
              affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security audits</li>
              <li>Secure API endpoints</li>
              <li>Access controls and monitoring</li>
              <li>Smart contract security reviews</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              However, no method of transmission over the internet is 100% secure. You use Kraftera
              at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Kraftera integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Cryptocurrency wallets (MetaMask, WalletConnect, etc.)</li>
              <li>Blockchain nodes and RPC providers</li>
              <li>Analytics services (Google Analytics, etc.)</li>
              <li>IPFS/Arweave for metadata storage</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Your Rights and Choices
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of off-chain data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              Note that blockchain data cannot be deleted due to the immutable nature of the technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Kraftera is not intended for individuals under 18 years of age. We do not knowingly
              collect personal information from minors. If you believe a minor has provided us with
              personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              As a global Web3 platform, your information may be transferred to and processed in
              countries other than your own. Blockchain networks are decentralized and operate
              across multiple jurisdictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page
              with an updated revision date. Significant changes will be announced via our official
              Telegram (@kraftera_ann) and X (Twitter) channel (@kraftera_market).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For privacy-related questions or concerns:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1 mt-2">
              <li>🌐 Website: <a href="https://kraftera.xyz" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">kraftera.xyz</a></li>
              <li>🐦 X: <a href="https://x.com/kraftera_market" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@kraftera_market</a></li>
              <li>📱 Telegram: <a href="https://t.me/kraftera_ann" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@kraftera_ann</a></li>
              <li>📧 Email: privacy@kraftera.xyz</li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 Kraftera. Your privacy matters in the Web3 world.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
