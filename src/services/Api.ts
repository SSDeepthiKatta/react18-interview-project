export {};

import type { FoodItem } from "../components/FoodTable";

const API_BASE = "http://localhost:3001/api";

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json().catch(() => null);
}

// Read data from the Vite public folder (served at /foods.json)
export async function getFoods(): Promise<FoodItem[]> {
  const res = await fetch("/foods.json");
  return handleRes(res);
}

// Get single item by index from the public JSON
export async function getFood(id: number): Promise<FoodItem> {
  const res = await fetch("/foods.json");
  const arr = (await handleRes(res)) as FoodItem[];
  if (!Array.isArray(arr) || isNaN(id) || id < 0 || id >= arr.length) {
    throw new Error("Not found");
  }
  return arr[id];
}

// Update single item via API server (persist to public/foods.json)
export async function updateFood(id: number, item: FoodItem): Promise<FoodItem> {
  const res = await fetch(`${API_BASE}/foods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return handleRes(res);
}

// Replace entire array via API server (used previously for delete-from-array)
export async function replaceFoods(items: FoodItem[]): Promise<FoodItem[]> {
  const res = await fetch(`${API_BASE}/foods`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
  return handleRes(res);
}

// Delete single item via API server. Server returns updated array.
export async function deleteFood(id: number): Promise<FoodItem[]> {
  const res = await fetch(`${API_BASE}/foods/${id}`, {
    method: "DELETE",
  });
  return handleRes(res);
}