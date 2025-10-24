import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { FoodItem } from "../components/FoodTable";
import * as Api from "../services/Api";

export default function EditFood() {
  const { id } = useParams();
  const idx = id ? parseInt(id, 10) : NaN;
  const navigate = useNavigate();
  const [food, setFood] = useState<FoodItem>({ name: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(idx)) {
      setError("Invalid id");
      setLoading(false);
      return;
    }
    Api.getFood(idx)
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, [idx]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFood((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number.isNaN(idx)) {
      setError("Invalid id");
      return;
    }
    Api.updateFood(idx, food)
      .then(() => {
        navigate("/");
      })
      .catch((err) => setError(String(err)));
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ color: "red", padding: 20 }}>Error: {error}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif", maxWidth: 600 }}>
      <h2>Edit Food #{idx + 1}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Name
            <input
              name="name"
              value={food.name}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Category
            <input
              name="category"
              value={food.category}
              onChange={handleChange}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{ padding: "8px 12px", marginLeft: 8, cursor: "pointer" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}