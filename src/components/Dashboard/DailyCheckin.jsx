// src/components/Dashboard/DailyCheckin.jsx
import React from "react";
import { PiCalendarCheckDuotone } from "react-icons/pi";

const DailyCheckin = ({ rewards = [], checkedInDays = [], todayIndex, onCheckIn, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="flex gap-x-2 text-xl font-bold mb-6 text-gray-800 dark:text-white justify-center items-center">
          <PiCalendarCheckDuotone className="w-6 h-6" /> Daily Reward
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {rewards.map((points, index) => {
            const isChecked = checkedInDays.includes(index);
            const isToday = index === todayIndex;

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 shadow-md transition-transform transform hover:scale-105 ${
                  isChecked
                    ? "bg-green-100 dark:bg-green-900 border-green-500"
                    : isToday
                    ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                    : "bg-gray-100 dark:bg-gray-700 border-gray-300"
                } ${index === rewards.length - 1 ? "col-span-3" : ""}`}
              >
                <div className="text-lg font-bold mb-1">{`Day ${index + 1}`}</div>
                <div className="flex items-center gap-x-1 text-sm">
                  {points}
                  <img src="/images/point-image.png" className="w-5 h-5" />
                </div>
                <button
                  disabled={isChecked || !isToday}
                  onClick={() => onCheckIn(index)}
                  className={`mt-3 px-3 py-1 rounded text-xs font-medium shadow ${
                    isChecked
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : isToday
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  {isChecked ? "Checked In" : isToday ? "Check In" : "Locked"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;
