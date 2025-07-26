import { formatEther } from 'viem';

const NativeBalance = ({ balance, price }) => {
  const balanceValue = parseFloat(formatEther(balance.value));
  const usdValue = (balanceValue * price).toFixed(2);

  return (
    <div className="mb-3 p-3 bg-white dark:bg-gray-600 rounded-md shadow-sm">
      <div className="flex justify-between">
        <span className="font-medium">ETH</span>
        <span>{balanceValue.toFixed(6)}</span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        ${usdValue}
      </div>
    </div>
  );
};

export default NativeBalance;
