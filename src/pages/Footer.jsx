import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaDiscord, FaTelegramPlane, FaMedium } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="py-16 mt-8 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
            <p className="flex items-center text-lg text-black dark:text-gray-700 font-semibold">
            <img
              src="/images/logo2.png"
              alt="Project Logo"
              className="h-10 mr-1 dark:hidden"
            />
             Kraftera
            </p>
            </div>
            <p className="text-gray-600">
              Your trusted marketplace for high-quality digital and physical products.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#socialfi" className="text-gray-700">Marketplace</a></li>
              <li><a href="#launchpad" className="text-gray-700">Shop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="text-md text-gray-700">Documentation</a></li>
              <li><a href="#" className="text-gray-700">Whitepaper</a></li>
              <li><a href="#" className="text-gray-700">Blog</a></li>
              <li><a href="#faq" className="text-gray-700">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="flex space-x-4 items-center">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-orange-500" aria-label="Twitter">
                  <FaTwitter className="text-xl" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-indigo-500" aria-label="Discord">
                  <FaDiscord className="text-xl" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-blue-400" aria-label="Telegram">
                  <FaTelegramPlane className="text-xl" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-black" aria-label="Medium">
                  <FaMedium className="text-xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Kraftera. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 text-gray-700">Terms</a>
            <a href="#" className="text-gray-400 text-gray-700">Privacy</a>
            <a href="#" className="text-gray-400 text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
