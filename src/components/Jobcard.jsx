import React from 'react';

export default function JobCard({ job }) {
  const statusColors = {
    Applied: "bg-blue-200 text-blue-800",
    Interviewing: "bg-orange-200 text-orange-800",
    Offer: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h4 className="text-lg font-semibold">{job.company}</h4>
      <p className="text-gray-700">{job.role}</p>
      <small className="text-gray-500 block">Date Applied: {job.dateApplied}</small>
      <span className={`inline-block mt-2 px-2 py-1 text-sm rounded ${statusColors[job.status]}`}>
        {job.status}
      </span>
    </div>
  );
}
