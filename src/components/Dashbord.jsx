import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { initialData } from "../data";
import Column from "../components/Column";

export default function Dashboard() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("kanbanJobs");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    dateApplied: "",
    status: "Applied",
  });

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem("kanbanJobs", JSON.stringify(data));
  }, [data]);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const updated = Array.from(start.cards);
      const [moved] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, moved);
      setData({
        ...data,
        columns: { ...data.columns, [start.id]: { ...start, cards: updated } },
      });
    } else {
      const startCards = Array.from(start.cards);
      const [moved] = startCards.splice(source.index, 1);
      moved.status = finish.title;
      const finishCards = Array.from(finish.cards);
      finishCards.splice(destination.index, 0, moved);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [start.id]: { ...start, cards: startCards },
          [finish.id]: { ...finish, cards: finishCards },
        },
      });
    }
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    const id = Date.now().toString();
    const colId = Object.keys(data.columns).find(
      (key) =>
        data.columns[key].title.toLowerCase() === newJob.status.toLowerCase()
    );
    setData({
      ...data,
      columns: {
        ...data.columns,
        [colId]: {
          ...data.columns[colId],
          cards: [...data.columns[colId].cards, { id, ...newJob }],
        },
      },
    });
    setNewJob({ company: "", role: "", dateApplied: "", status: "Applied" });
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

  const isEmptyBoard = Object.values(data.columns).every(
    (col) => col.cards.length === 0
  );

  return (
    <div className='p-4 sm:p-6'>
      {/* Header */}
      <header className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6'>
        <h1 className='text-xl sm:text-2xl font-bold'>
          Job Application Tracker
        </h1>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
          <input
            type='text'
            placeholder='Search applications...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border border-gray-300 rounded px-3 py-2 text-sm flex-1'
          />
          <button
            onClick={() => setShowForm(true)}
            className='bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 text-sm'
          >
            + Add Job
          </button>
        </div>
      </header>{" "}
      {/* Empty State Message */}
      {isEmptyBoard && (
        <div className='text-center text-gray-500 py-8 w-full'>
          <p className='mb-2'>Welcome! Your board is empty.</p>
          <p>
            Click <span className='font-semibold'>+ Add Job</span> to get
            started.
          </p>
        </div>
      )}
      {/* Drag and Drop Board */}
     <DragDropContext onDragEnd={onDragEnd}>
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {data.columnOrder.map((colId) => (
      <Column
        key={colId}
        column={filteredColumns[colId]}
        cards={filteredColumns[colId].cards}
      />
    ))}
  </div>
</DragDropContext>

      {/* Add Job Form */}
      {showForm && (
        <div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-lg sm:text-xl font-bold mb-4'>Add New Job</h2>
            <form onSubmit={handleAddJob} className='space-y-4'>
              <input
                type='text'
                value={newJob.company}
                onChange={(e) =>
                  setNewJob({ ...newJob, company: e.target.value })
                }
                placeholder='Company Name'
                className='w-full border p-2 rounded text-sm'
                required
              />
              <input
                type='text'
                value={newJob.role}
                onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                placeholder='Role'
                className='w-full border p-2 rounded text-sm'
                required
              />
              <input
                type='date'
                value={newJob.dateApplied}
                onChange={(e) =>
                  setNewJob({ ...newJob, dateApplied: e.target.value })
                }
                className='w-full border p-2 rounded text-sm'
                required
              />
              <select
                value={newJob.status}
                onChange={(e) =>
                  setNewJob({ ...newJob, status: e.target.value })
                }
                className='w-full border p-2 rounded text-sm'
              >
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <div className='flex flex-col sm:flex-row justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setShowForm(false)}
                  className='px-4 cursor-pointer py-2 border rounded text-sm w-full sm:w-auto'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 cursor-pointer bg-blue-600 text-white rounded text-sm w-full sm:w-auto'
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <footer className='fixed bottom-0 backdrop-filter backdrop-blur-sm bg-white/50 p-4 text-center w-full'>
        <p className='text-base text-gray-500'>
          &copy; {new Date().getFullYear()} [<i>Danesh</i>]
        </p>
      </footer>
    </div>
  );
}
