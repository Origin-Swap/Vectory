import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white space-y-4">
      <img src="/images/logo2.png" alt="Kraftera Logo" className="w-16 h-16 animate-bounce" />
      <p className="text-gray-600 text-sm">Loading Kraftera...</p>
    </div>
  );
};

export default LoadingScreen;
