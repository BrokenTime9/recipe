"use client";

import { useEffect } from "react";
import { useRecipeStore } from "../../store/store";
import { useRouter, useParams } from "next/navigation";

export default function SingleRecipePage() {
  const { singleRecipe, fetchSingleRecipe } = useRecipeStore();
  const router = useRouter();
  const params = useParams(); // Correct way to get params

  useEffect(() => {
    async function fetchParams() {
      const { id } = await params; // Unwrap Promise
      if (id) {
        fetchSingleRecipe(id);
      }
    }

    fetchParams();
  }, [params]);

  if (!singleRecipe) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 px-3 py-1 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold">{singleRecipe.title}</h1>
      <p className="text-gray-700 mt-2">{singleRecipe.description}</p>

      <h2 className="text-xl font-semibold mt-4">📝 Ingredients</h2>
      <ul className="list-disc ml-5">
        {singleRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">👨 Steps</h2>
      <ol className="list-decimal ml-5">
        {singleRecipe.steps.map((step, index) => (
          <li key={index} className="mt-1">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
