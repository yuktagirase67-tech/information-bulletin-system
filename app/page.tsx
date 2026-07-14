"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

interface Bulletin {
  _id: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

export default function Home() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);

  useEffect(() => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => setBulletins(data.slice(0, 3)));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">
          Information Bulletin System
        </h1>

        <p className="text-lg max-w-2xl mx-auto">
          Stay updated with the latest notices, announcements and important
          information through our Information Bulletin System.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/bulletins"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Bulletins
          </Link>

          <Link
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Admin Login
          </Link>
        </div>
      </div>

      {/* Latest Bulletins */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest Bulletins
        </h2>

        {bulletins.length === 0 ? (
          <p className="text-center text-gray-500">
            No Bulletins Available
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {bulletins.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-blue-600 font-semibold mt-2">
                  {item.category}
                </p>

                <p className="text-gray-600 mt-3">
                  {item.description}
                </p>

                <p className="text-sm text-gray-500 mt-4">
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4">
        © 2026 Information Bulletin System. All Rights Reserved.
      </footer>
    </main>
  );
}