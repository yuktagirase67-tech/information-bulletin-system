"use client";

import { useState } from "react";

export default function AddBulletin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

const handleSubmit = async () => {
  if (!title || !category || !description || !date) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("/api/bulletins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        description,
        date,
      }),
    });

    if (response.ok) {
      alert("Bulletin Added Successfully!");

      setTitle("");
      setCategory("");
      setDescription("");
      setDate("");
    } else {
      alert("Failed to add bulletins");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Add Bulletin
        </h1>

        {/* Bulletin Title */}
        <label className="block text-gray-700 font-semibold mb-1">
          Bulletin Title
        </label>
        <input
          type="text"
          placeholder="Enter Bulletin Title"
          className="border p-2 w-full mb-4 rounded text-black placeholder-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category */}
        <label className="block text-gray-700 font-semibold mb-1">
          Category
        </label>
        <input
          type="text"
          placeholder="Enter Category"
          className="border p-2 w-full mb-4 rounded text-black placeholder-gray-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Description */}
        <label className="block text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter Description"
          className="border p-2 w-full mb-4 rounded text-black placeholder-gray-500"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Date */}
        <label className="block text-gray-700 font-semibold mb-1">
          Date
        </label>
        <input
          type="date"
          className="border p-2 w-full mb-6 rounded text-black"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-900 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold"
        >
          Submit Bulletin
        </button>

      </div>
    </div>
  );
}