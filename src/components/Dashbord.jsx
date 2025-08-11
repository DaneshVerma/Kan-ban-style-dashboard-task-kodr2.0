import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { initialData } from "../data";
import Column from "../components/Column";

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    dateApplied: new Date().toISOString().slice(0, 10),
    status: "Applied",
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newCards = Array.from(startColumn.cards);
      const [moved] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, moved);

      const newColumn = { ...startColumn, cards: newCards };
      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      }));
    } else {
      const startCards = Array.from(startColumn.cards);
      const [moved] = startCards.splice(source.index, 1);
      moved.status = endColumn.title;

      const endCards = Array.from(endColumn.cards);
      endCards.splice(destination.index, 0, moved);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [startColumn.id]: { ...startColumn, cards: startCards },
          [endColumn.id]: { ...endColumn, cards: endCards },
        },
      }));
    }
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now().toString(),
      company: formData.company,
      role: formData.role,
      dateApplied: formData.dateApplied,
      status: "Applied",
    };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        applied: {
          ...prev.columns.applied,
          cards: [...prev.columns.applied.cards, newJob],
        },
      },
    }));

    // Reset and close modal
    setFormData({
      company: "",
      role: "",
      dateApplied: new Date().toISOString().slice(0, 10),
      status: "Applied",
    });
    setShowForm(false);
  };

  const filteredColumns = {};
  for (let key of data.columnOrder) {
    filteredColumns[key] = {
      ...data.columns[key],
      cards: data.columns[key].cards.filter(
        (card) =>
          card.company.toLowerCase().includes(search.toLowerCase()) ||
          card.role.toLowerCase().includes(search.toLowerCase())
      ),
    };
  }

  return (
    <div className="p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Job
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full gap-4 overflow-x-auto pb-4">
          {data.columnOrder.map((colId) => (
            <Column
              key={colId}
              column={filteredColumns[colId]}
              cards={filteredColumns[colId].cards}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Add Job Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add New Job</h2>
            <form onSubmit={handleAddJob} className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="date"
                value={formData.dateApplied}
                onChange={(e) =>
                  setFormData({ ...formData, dateApplied: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <footer>
        <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} [<i>Danesh</i>]</p>
      </footer>
    </div>
  );
}
