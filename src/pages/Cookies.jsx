import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cookies = () => {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  });

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved!');
  };

  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      setCookieSettings(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. They help
              us remember your preferences, analyze site traffic, and improve your experience on
              Kraftera – The Web3 Digital Marketplace.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              How We Use Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Kraftera, we use cookies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Remember your wallet connection preferences</li>
              <li>Keep you logged in to your creator dashboard</li>
              <li>Track referral program activities</li>
              <li>Analyze platform usage and performance</li>
              <li>Personalize your marketplace experience</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Types of Cookies We Use
            </h2>

            <div className="space-y-4 mt-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Necessary Cookies (Always Active)
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Essential for platform functionality. Cannot be disabled.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Wallet connection state</li>
                  <li>Security tokens and CSRF protection</li>
                  <li>Network status and blockchain RPC selection</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Functional Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Enhance platform performance and remember your preferences.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>UI theme preferences (dark/light mode)</li>
                  <li>Language and region settings</li>
                  <li>Recently viewed items</li>
                  <li>Saved filters and search preferences</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Analytics Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Help us understand how users interact with Kraftera.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on platform</li>
                  <li>Popular listings and categories</li>
                  <li>User journey and conversion tracking</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Marketing Cookies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Used for promotional and referral tracking.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 list-disc list-inside">
                  <li>Referral program attribution</li>
                  <li>Campaign performance tracking</li>
                  <li>Retargeting for abandoned listings</li>
                  <li>Newsletter subscription status</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Manage Your Cookie Preferences
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You can customize your cookie preferences below. Necessary cookies cannot be disabled
              as they are required for platform functionality.
            </p>

            <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">Necessary Cookies</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Always enabled</p>
                </div>
                <input type="checkbox" checked disabled className="toggle toggle-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">Functional Cookies</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remember your preferences</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.functional}
                  onChange={(e) => setCookieSettings({...cookieSettings, functional: e.target.checked})}
                  className="toggle toggle-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">Analytics Cookies</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Help us improve Kraftera</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.analytics}
                  onChange={(e) => setCookieSettings({...cookieSettings, analytics: e.target.checked})}
                  className="toggle toggle-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">Marketing Cookies</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Referral and campaign tracking</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookieSettings.marketing}
                  onChange={(e) => setCookieSettings({...cookieSettings, marketing: e.target.checked})}
                  className="toggle toggle-primary"
                />
              </div>

              <button
                onClick={savePreferences}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Third-Party Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Some cookies are set by third-party services integrated with Kraftera:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li><strong>Google Analytics:</strong> Platform usage analytics</li>
              <li><strong>WalletConnect:</strong> Wallet connection management</li>
              <li><strong>IPFS Gateways:</strong> Content delivery and caching</li>
              <li><strong>Social Media:</strong> Share buttons and embeds (X/Twitter, Telegram)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Browser Settings
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-2">
              <li>Delete all cookies</li>
              <li>Block third-party cookies</li>
              <li>Block all cookies</li>
              <li>Set preferences for specific websites</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              However, disabling cookies may affect platform functionality, especially wallet
              connection and creator dashboard features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update our Cookie Policy as technology and regulations evolve. Changes will
              be posted here with an updated revision date. Major changes will be announced via
              our official channels:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1 mt-2">
              <li>🐦 X: <a href="https://x.com/kraftera_market" className="text-blue-600 dark:text-blue-400 hover:underline">@kraftera_market</a></li>
              <li>📱 Telegram: <a href="https://t.me/kraftera_ann" className="text-blue-600 dark:text-blue-400 hover:underline">@kraftera_ann</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions about our Cookie Policy? Reach out to us:
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1 mt-2">
              <li>🌐 Website: <a href="https://kraftera.xyz" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">kraftera.xyz</a></li>
              <li>📧 Email: legal@kraftera.xyz</li>
              <li>💬 Telegram: <a href="https://t.me/kraftera_ann" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">@kraftera_ann</a></li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 Kraftera. Transparent cookies for a better Web3 experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
