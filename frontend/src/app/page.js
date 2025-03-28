"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/input";

export default function Home() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const onSubmit = async () => {
    const data = { title, description, ingredients, steps };
    const api = [
      "https://recipe-dpvf.onrender.com/api/recipes",
      "http://localhost:5000/api/recipes",
    ];

    try {
      const response = await axios.post(api[0], data);
      setMessage({ type: "success", text: "Recipe submitted successfully!" });

      // Reset state manually
      setTitle("");
      setDescription("");
      setIngredients([]);
      setSteps([]);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit recipe",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {message && (
        <div
          className={`p-2 text-sm rounded ${
            message.type === "success"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Input type="text" name="title" value={title} setValue={setTitle} />
        <Input
          type="text"
          name="description"
          value={description}
          setValue={setDescription}
        />
        <Input
          type="text"
          name="ingredients"
          value={ingredients.join(",")}
          setValue={setIngredients}
        />
        <Input
          type="text"
          name="steps"
          value={steps.join(",")}
          setValue={setSteps}
        />

        <button
          onClick={onSubmit}
          className="w-full p-2 rounded font-semibold text-white text-2xl bg-green-500 mb-2 mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
