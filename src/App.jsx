// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import SidebarMenu from './components/Menu/SidebarMenu';
import BottomMenu from './components/Menu/BottomMenu';
import HomePage from './pages/Home';
import CreateItem from './pages/CreateItem';
import ItemDetails from './pages/ItemDetails';
import Dashboard from './pages/profile';
import MyItems from './pages/profile/MyItems';
import Checkout from './pages/Cart';

import { LayoutProvider, useLayoutContext } from './context/LayoutContext';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supra } from './context/chains';
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
         <SidebarMenu />
       </div>

      {/* Main content area */}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-items" element={<CreateItem />} />
          <Route path="/details/:id" element={<ItemDetails />} />
          <Route path="/details/:id/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-items" element={<MyItems />} />
        </Routes>
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
