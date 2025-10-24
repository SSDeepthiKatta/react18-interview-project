import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FoodTable, { FoodItem } from "./components/FoodTable";
import EditFood from "./pages/EditFood";
import * as Api from "./services/Api";

function FoodsPage() {
  const [foods, setFoods] = useState<FoodItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Api.getFoods()
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  const handleEdit = (index: number) => {
    navigate(`/edit/${index}`);
  };

  const handleDelete = async (index: number) => {
    if (!foods) return;
    const ok = window.confirm("Are you sure you want to delete this item?");
    if (!ok) return;
    try {
      const updated = await Api.deleteFood(index);
      // If API returned updated array, use it; otherwise refetch
      if (Array.isArray(updated)) {
        setFoods(updated);
      } else {
        const fresh = await Api.getFoods();
        setFoods(fresh);
      }
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <h1>Food Table</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {foods && (
        <FoodTable foods={foods} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodsPage />} />
      <Route path="/edit/:id" element={<EditFood />} />
    </Routes>
  );
}