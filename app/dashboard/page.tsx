"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [count, setCount] = useState(0);

  const loadBulletins = () => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.length);
      });
  };

  useEffect(() => {
    loadBulletins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-900 text-white p-5 shadow-lg">
        <h1 className="text-3xl font-bold">
          Information Bulletin System
        </h1>
        <p className="mt-1 text-gray-200">
          Welcome Admin 👋
        </p>
      </div>

      {/* Dashboard */}
      <div className="p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h2>

          <button
            onClick={loadBulletins}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap mb-8">

          <button
            onClick={() => router.push("/add-bulletin")}
            className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            ➕ Add Bulletin
          </button>

          <button
            onClick={() => router.push("/view-bulletins")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
          >
            📋 View Bulletins
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow"
          >
            🚪 Logout
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              📢 Total Bulletins
            </h3>

            <p className="text-5xl font-bold text-blue-700 mt-4">
              {count}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              👨‍🎓 Students
            </h3>

            <p className="text-5xl font-bold text-green-600 mt-4">
              250
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              👨‍🏫 Faculty
            </h3>

            <p className="text-5xl font-bold text-red-600 mt-4">
              40
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}