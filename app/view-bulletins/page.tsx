"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bulletin {
  _id: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

export default function ViewBulletins() {
  const router = useRouter();

  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => setBulletins(data));
  }, []);

  const deleteBulletin = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this bulletin?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/bulletins", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setBulletins((prev) => prev.filter((item) => item._id !== id));
      alert("Bulletin Deleted Successfully");
    } else {
      alert("Failed to delete bulletin");
    }
  };

  const filteredBulletins = bulletins.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Latest Bulletins
      </h1>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Title or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredBulletins.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-center">
            No Bulletins Found
          </p>
        </div>
      ) : (
        filteredBulletins.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >
            <h2 className="text-xl font-bold text-black">
              {item.title}
            </h2>

            <p className="text-blue-600 font-semibold mt-1">
              {item.category}
            </p>

            <p className="text-gray-700 mt-2">
              {item.description}
            </p>

            <p className="text-gray-500 mt-2">
              Date : {item.date}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  router.push(`/edit-bulletin/${item._id}`)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                ✏ Edit
              </button>

              <button
                onClick={() => deleteBulletin(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                🗑 Delete
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}