// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import TopBarPCMenu from './components/Menu/SidebarMenu';
import Sidebar from './components/Menu/Sidebar';
import Topbar from './components/Menu/TopBar';
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

import { LayoutProvider, useLayoutContext } from './context/LayoutContext';
import { AccountProvider } from './context/account'; // 🔹 Context untuk Supra Move account

// Layout Component
// Layout Component
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
    <>
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
        </Routes>
        <Footer />
      </div>

      {/* Bottom menu untuk mobile */}
      <BottomMenu />
    </>
  );
};


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutProvider>
      <AccountProvider> {/* 🔹 Bungkus semua komponen dengan Supra Move Account Context */}
        <Router>
          {isLoading ? <LoadingScreen /> : <Layout />}
        </Router>
      </AccountProvider>
    </LayoutProvider>
  );
};

export default App;
