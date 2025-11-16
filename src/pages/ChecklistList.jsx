import React, { useEffect, useState } from "react";
import { getChecklists, deleteChecklist } from "../api";
import { Link } from "react-router-dom";

export default function ChecklistList() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    try {
      const data = await getChecklists();
      setList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = list.filter((c) =>
    c.flight_number?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Preflight Checklists
        </h1>

        <Link
          to="/new"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow font-medium transition"
        >
          + New Checklist
        </Link>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by flight number…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-10 text-center text-gray-500 border">
          <div className="text-4xl mb-2">✈️</div>
          <p className="text-lg">No checklists found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden border">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
            <div>Flight Number</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Rows */}
          {filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 px-6 py-4 items-center border-t hover:bg-gray-50 transition"
            >
              <div className="font-medium text-gray-800">
                {item.flight_number}
              </div>

              <div className="text-gray-500">{item.date || "—"}</div>

              <div className="flex justify-end gap-4">

                {/* View (Red) */}
                <Link
                  to={`/${item.id}`}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  View
                </Link>

                {/* Edit (Red) */}
                <Link
                  to={`/${item.id}/edit`}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Edit
                </Link>

                {/* Delete (Red) */}
                <button
                  onClick={async () => {
                    if (confirm("Are you sure you want to delete this checklist?")) {
                      await deleteChecklist(item.id);
                      load();
                    }
                  }}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
