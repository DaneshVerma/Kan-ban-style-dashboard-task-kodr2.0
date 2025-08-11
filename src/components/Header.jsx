import React from "react";

export default function Header() {
  return (
    <>
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
      </header>
    </>
  );
}
