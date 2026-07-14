"use client";

import { useEffect, useState } from "react";

export default function BulletinsPage() {
  const [bulletins, setBulletins] = useState([]);

  useEffect(() => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => setBulletins(data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Latest Bulletins
      </h1>

      {bulletins.length === 0 ? (
        <p>No Bulletins Found</p>
      ) : (
        bulletins.map((item: any) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-lg p-5 mb-4"
          >
            <h2 className="text-xl font-bold text-black">
              {item.title}
            </h2>

            <p className="text-blue-600">
              {item.category}
            </p>

            <p className="text-gray-700 mt-2">
              {item.description}
            </p>

            <p className="text-gray-500 mt-2">
              Date: {item.date}
            </p>
          </div>
        ))
      )}
    </div>
  );
}