import React from "react";

export type FoodItem = {
  name: string;
  category: string;
};

type Props = {
  foods: FoodItem[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function FoodTable({ foods, onEdit, onDelete }: Props) {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        maxWidth: 900
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>#</th>
          <th style={thStyle}>Food Name</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {foods.map((f, idx) => (
          <tr key={idx} style={idx % 2 ? rowAltStyle : undefined}>
            <td style={tdStyle}>{idx + 1}</td>
            <td style={tdStyle}>{f.name}</td>
            <td style={tdStyle}>{f.category}</td>
            <td style={tdStyle}>
              <button onClick={() => onEdit(idx)} style={btnStyle}>
                Edit
              </button>
              <button
                onClick={() => onDelete(idx)}
                style={{ ...btnStyle, marginLeft: 8 }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  background: "#f4f4f4"
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px"
};

const rowAltStyle: React.CSSProperties = {
  background: "#fafafa"
};

const btnStyle: React.CSSProperties = {
  padding: "6px 10px",
  cursor: "pointer"
};