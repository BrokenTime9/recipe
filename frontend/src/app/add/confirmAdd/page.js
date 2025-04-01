"use client";
import axios from "axios";

export default function ConfirmAdd({
  title,
  setTitle,
  description,
  setDescription,
  ingredients,
  setIngredients,
  steps,
  setSteps,
  setMessage,
  setForm,
}) {
  const onsubmit = async () => {
    const data = { title, description, ingredients, steps };
    const api = [
      "https://recipe-dpvf.onrender.com/api/recipes",
      "http://localhost:5000/api/recipes",
    ];

    try {
      const response = await axios.post(api[0], data);

      setMessage({
        type: "success",
        text: `recipe ${title} added successfully!`,
      });

      // reset state manually
      setTitle("");
      setDescription("");
      setIngredients([]);
      setSteps([]);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "failed to submit recipe",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 max-w-full">
        <h2 className="text-xl font-bold text-center">{title}</h2>
        <p className="text-gray-600 text-center">{description}</p>

        <div className="mt-4">
          <h3 className="font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside text-sm">
            {ingredients?.map((e, i) => (
              <li key={i} className="mt-1">
                <strong>{i + 1}:</strong> {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Steps:</h3>
          <ul className="list-decimal list-inside text-sm">
            {steps?.map((e, i) => (
              <li key={i} className="mt-1">
                <strong>Step {i + 1}:</strong> {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onsubmit}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Upload
          </button>
          <button
            onClick={() => setForm((prev) => !prev)}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
