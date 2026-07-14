"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Bulletin {
  _id: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

export default function EditBulletin() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const getBulletin = async () => {
      try {
        const response = await fetch("/api/bulletins");

        const data: Bulletin[] = await response.json();

        const bulletin = data.find((item) => item._id === id);

        if (bulletin) {
          setTitle(bulletin.title);
          setCategory(bulletin.category);
          setDescription(bulletin.description);
          setDate(bulletin.date);
        }
      } catch (error) {
        console.log("Error fetching bulletin:", error);
      }
    };

    if (id) {
      getBulletin();
    }
  }, [id]);

  const updateBulletin = async () => {
    try {
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
    } catch (error) {
      console.log("Update error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px] text-black">

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Bulletin
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black"
        />

        <textarea
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 text-black"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-6 text-black"
        />

        <button
          onClick={updateBulletin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Update Bulletin
        </button>

      </div>
    </div>
  );
}