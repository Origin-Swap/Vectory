import React, { useState, useEffect } from "react";

const DailyCheckIn = () => {
  const [checkedInDays, setCheckedInDays] = useState([]);
  const [todayIndex, setTodayIndex] = useState(null);

  const rewards = [10, 20, 30, 40, 50, 60, 100];

  // Load data dari localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("checkedInDays")) || [];
    setCheckedInDays(savedData);

    const today = new Date().toISOString().split("T")[0];
    const startDate =
      JSON.parse(localStorage.getItem("checkInStartDate")) || today;

    // Simpan start date jika belum ada
    if (!localStorage.getItem("checkInStartDate")) {
      localStorage.setItem("checkInStartDate", JSON.stringify(today));
    }

    const diffDays =
      Math.floor(
        (new Date(today) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) % 7;

    setTodayIndex(diffDays);
  }, []);

  const handleCheckIn = (dayIndex) => {
    if (checkedInDays.includes(dayIndex)) return;

    const updated = [...checkedInDays, dayIndex];
    setCheckedInDays(updated);
    localStorage.setItem("checkedInDays", JSON.stringify(updated));

    alert(`✅ Check-in berhasil! +${rewards[dayIndex]} points`);
  };

  return (
    <div className="mt-14 min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Daily Check-In (7 Days)
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {rewards.map((points, index) => {
            const isChecked = checkedInDays.includes(index);
            const isToday = index === todayIndex;
            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  isChecked
                    ? "bg-green-100 dark:bg-green-900 border-green-500"
                    : isToday
                    ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
                    : "bg-gray-100 dark:bg-gray-700 border-gray-300"
                }`}
              >
                <div className="text-lg font-bold mb-1 text-gray-800 dark:text-white">
                  Day {index + 1}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300">
                  {points} pts
                </div>
                <button
                  disabled={isChecked || !isToday}
                  onClick={() => handleCheckIn(index)}
                  className={`mt-3 px-3 py-1 rounded text-sm font-medium ${
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

export default DailyCheckIn;
