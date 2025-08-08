import { useState } from 'react';
import TokenStaking from './Token';
import PointStaking from './Point';

const StakingIndex = () => {
  const [activeTab, setActiveTab] = useState('token');

  return (
    <div className="mt-14 min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Earn Rewards</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Grow your assets through staking and point farming
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={() => setActiveTab('token')}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'token'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Token Staking
          </button>
          <button
            onClick={() => setActiveTab('point')}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'point'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Point Farming
          </button>
        </div>

        {/* Render Active Tab */}
        {activeTab === 'token' ? <TokenStaking /> : <PointStaking />}
      </div>
    </div>
  );
};

export default StakingIndex;
