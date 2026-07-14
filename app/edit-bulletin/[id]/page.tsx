"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBulletin() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => {
        const bulletin = data.find((item: any) => item._id === id);

        if (bulletin) {
          setTitle(bulletin.title);
          setCategory(bulletin.category);
          setDescription(bulletin.description);
          setDate(bulletin.date);
        }
      });
  }, [id]);

  const updateBulletin = async () => {
    const response = await fetch("/api/bulletins", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        category,
        description,
        date,
      }),
    });

    if (response.ok) {
      alert("Bulletin Updated Successfully");
      router.push("/view-bulletins");
    } else {
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px] text-black">

        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Edit Bulletin
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-6 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={updateBulletin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Bulletin
        </button>

      </div>
    </div>
  );
}