"use client";

import { useState } from "react";
import axios from "axios";
import { Input, input } from "@/components/input";
import ConfirmAdd from "./confirmAdd/page";

export default function Add() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const onsubmit = async () => {
    setForm((prevForm) => !prevForm);
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
          onClick={onsubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Upload
        </button>
        {form && (
          <ConfirmAdd
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            ingredients={ingredients}
            setIngredients={setIngredients}
            steps={steps}
            setSteps={setSteps}
            setMessage={setMessage}
            setForm={setForm}
          />
        )}
      </div>
    </div>
  );
}
