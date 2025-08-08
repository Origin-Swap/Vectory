import { useState } from 'react';
import { FiInfo, FiChevronDown, FiCheck, FiClock } from 'react-icons/fi';

const PointStaking = () => {
  const [pointAmount, setPointAmount] = useState('');
  const [duration, setDuration] = useState('7');
  const [isFarming, setIsFarming] = useState(false);

  const farmingPlans = [
    { days: 7, multiplier: '1.2x', dailyPoints: 100 },
    { days: 14, multiplier: '1.5x', dailyPoints: 150 },
    { days: 30, multiplier: '2.0x', dailyPoints: 200 }
  ];

  const handleFarm = (e) => {
    e.preventDefault();
    if (pointAmount && duration) {
      setIsFarming(true);
      setTimeout(() => {
        setIsFarming(false);
        setPointAmount('');
      }, 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Farm Your Points</h2>

        {/* Point Amount Input */}
        <div className="mb-6">
          <label htmlFor="pointAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Points to Farm
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="pointAmount"
              value={pointAmount}
              onChange={(e) => setPointAmount(e.target.value)}
              className="block w-full pr-12 pl-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">POINTS</span>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Available: 5,000 points</span>
            <button
              type="button"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              onClick={() => setPointAmount('5000')}
            >
              MAX
            </button>
          </div>
        </div>

        {/* Farming Duration */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Farming Duration
          </label>
          <div className="grid grid-cols-3 gap-4">
            {farmingPlans.map((plan) => (
              <div
                key={plan.days}
                onClick={() => setDuration(plan.days.toString())}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  duration === plan.days.toString()
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{plan.days} days</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{plan.multiplier} multiplier</p>
                  </div>
                  {duration === plan.days.toString() && (
                    <div className="bg-purple-500 text-white p-1 rounded-full">
                      <FiCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                  {plan.dailyPoints} points/day
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Rewards */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Rewards</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Total Points</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {pointAmount ? (parseInt(pointAmount) * 1.5).toLocaleString() : '0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Daily Points</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {farmingPlans.find(p => p.days.toString() === duration)?.dailyPoints || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Farm Button */}
        <button
          onClick={handleFarm}
          disabled={!pointAmount || isFarming}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
            isFarming
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isFarming ? 'Processing...' : 'Start Farming'}
        </button>

        {/* Info Box */}
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex">
            <FiInfo className="flex-shrink-0 text-purple-500 dark:text-purple-400 mt-0.5 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-purple-800 dark:text-purple-200">Point Farming</h4>
              <ul className="mt-1 text-xs text-purple-700 dark:text-purple-300 space-y-1">
                <li>• Points are locked during farming period</li>
                <li>• Earn bonus points based on duration</li>
                <li>• Daily points automatically added to your balance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointStaking;
