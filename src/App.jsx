// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import TopBarPCMenu from './components/Menu/evmSidebarMenu';
import Sidebar from './components/Menu/Sidebar';
import Topbar from './components/Menu/evmTopBar';
import BottomMenu from './components/Menu/BottomMenu';
import Dashboard from './components/Dashboard';
import SwapPage from './components/Dashboard/Swap';
import Stake from './components/Staking';
import HomePage from './pages/Home';
import CreateItem from './pages/CreateItem';
import ItemDetails from './pages/ItemDetails';
import Profile from './pages/profile';
import EditProfile from './pages/profile/Create';
import Shop from './pages/shop';
import MyItems from './pages/profile/MyItems';
import MyCart from './components/marketplace/CartView';
import Checkout from './pages/Cart';
import NotifPage from './components/Notif';
import SocialFiIndex from './pages/post/index';
import PostDetailPage from './pages/post/[id]';
import ChatPage from "./pages/chat";
import Statistics from './components/stats';
import Upgrade from './components/subcription';
import SellerBoard from "./components/Dashboard/SellerBoard";
import Footer from "./pages/Footer";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

import { LayoutProvider, useLayoutContext } from './context/LayoutContext';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { supra } from './context/chains';
import { base } from 'viem/chains';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

// Project ID WalletConnect
const projectId = '65e900325f6440b81073eb1b10270843'; //mainweb
// const projectId = '92a84f411cd537d466fbaa048af85b42'; // local

const config = getDefaultConfig({
  appName: 'Vectory',
  projectId: projectId,
  chains: [base],
  ssr: true,
});

// ⬇️ Layout component harus berada DI DALAM LayoutProvider
const Layout = () => {
  const { isSidebarVisible } = useLayoutContext();

  useEffect(() => {
    navigator.serviceWorker.ready
      .then((registration) => registration.sync.register('sync-user-actions'))
      .then(() => {
        console.log('Background Sync registered');
      })
      .catch((error) => {
        console.error('Background Sync registration failed:', error);
      });
  }, []);

  return (
    <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
              theme={lightTheme({
                accentColor: '#837AF5',
                borderRadius: 'large',
              })}
            >
      {/* Sidebar menu untuk desktop */}
      <div className="hidden lg:flex">
        <TopBarPCMenu />
      </div>

      {/* Topbar untuk mobile */}
      <div className="block lg:hidden">
        <Topbar />
      </div>

      {/* Sidebar tambahan (kalau ada) */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="lg:ml-64 flex-1"> {/* ✅ Tambahkan margin-left biar tidak ketimpa sidebar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-items" element={<CreateItem />} />
          <Route path="/details/:title" element={<ItemDetails />} />
          <Route path="/details/:title/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:address" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/notification" element={<NotifPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/socialfi" element={<SocialFiIndex />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatWithAddress" element={<ChatPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/level-upgrade" element={<Upgrade />} />
          <Route path="/point-exchange" element={<SwapPage />} />
          <Route path="/seller-board" element={<SellerBoard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <Footer />
      </div>

      {/* Bottom menu untuk mobile */}
      <BottomMenu />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// ⬇️ Perbaikan: LayoutProvider dan WagmiProvider berada di luar Layout
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulasi waktu loading selama 3 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutProvider>
          <Router>
            {isLoading ? <LoadingScreen /> : <Layout />}
          </Router>
    </LayoutProvider>
  );
};

export default App;
