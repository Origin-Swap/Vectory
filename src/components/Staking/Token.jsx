import { useState } from 'react';
import { FiInfo, FiLock, FiChevronDown, FiCheck } from 'react-icons/fi';

const TokenStaking = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('30');
  const [isStaked, setIsStaked] = useState(false);

  const stakingPlans = [
    { days: 30, apy: '12%', bonus: '5%' },
    { days: 60, apy: '18%', bonus: '10%' },
    { days: 90, apy: '25%', bonus: '15%' }
  ];

  const handleStake = (e) => {
    e.preventDefault();
    if (amount && duration) {
      setIsStaked(true);
      setTimeout(() => {
        setIsStaked(false);
        setAmount('');
      }, 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Stake Your Tokens</h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount to Stake
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">TOKEN</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                type="button"
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={() => setAmount((1000 * percent / 100).toString())}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Staking Duration */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Staking Duration
          </label>
          <div className="grid grid-cols-3 gap-4">
            {stakingPlans.map((plan) => (
              <div
                key={plan.days}
                onClick={() => setDuration(plan.days.toString())}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  duration === plan.days.toString()
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{plan.days} days</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">APY: {plan.apy}</p>
                  </div>
                  {duration === plan.days.toString() && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <FiCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  +{plan.bonus} bonus
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stake Button */}
        <button
          onClick={handleStake}
          disabled={!amount || isStaked}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isStaked
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isStaked ? 'Processing...' : 'Stake Tokens'}
        </button>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex">
            <FiInfo className="flex-shrink-0 text-blue-500 dark:text-blue-400 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Staking Information</h4>
              <ul className="mt-1 text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Tokens will be locked for selected duration</li>
                <li>• Rewards distributed daily</li>
                <li>• Early unstaking penalty applies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenStaking;
