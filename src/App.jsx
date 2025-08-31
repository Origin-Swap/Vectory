// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import SidebarMenu from './components/Menu/SidebarMenu';
import Topbar from './components/Menu/TopBar';
import BottomMenu from './components/Menu/BottomMenu';
import Dashboard from './components/Dashboard';
import Checkin from './components/Dashboard/dailypoint';
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
import ChatPage from './pages/chat';
import Statistics from './components/stats';
import Upgrade from './components/subcription';
import Footer from "./pages/Footer";

import { LayoutProvider, useLayoutContext } from './context/LayoutContext';
import { AccountProvider } from './context/account'; // 🔹 Context untuk Supra Move account

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
        <SidebarMenu />
      </div>
      <div className="block lg:hidden">
        <Topbar />
      </div>

      {/* Main content area */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-items" element={<CreateItem />} />
          <Route path="/details/:title" element={<ItemDetails />} />
          <Route path="/details/:title/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />               {/* profile sendiri */}
          <Route path="/profile/:address" element={<Profile />} />      {/* profile orang lain */}
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/notification" element={<NotifPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/socialfi" element={<SocialFiIndex />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/chat/*" element={<ChatPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/level-upgrade" element={<Upgrade />} />
          <Route path="/point-exchange" element={<SwapPage />} />
        </Routes>
        <Footer />
      </div>
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
