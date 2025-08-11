import React from "react";

export default function Jobcard({ job }) {
  const statusColors = {
    Applied: "bg-blue-200 text-blue-800",
    Interviewing: "bg-orange-200 text-orange-800",
    Offer: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return (
    <div className="bg-white rounded-md shadow p-3 mb-3">
      <h4 className="text-base font-semibold">{job.company}</h4>
      <p className="text-gray-600 text-sm">{job.role}</p>
      <small className="block text-gray-500 mt-1 text-xs">
        Date Applied: {job.dateApplied}
      </small>
      <span
        className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}
      >
        {job.status}
      </span>
    </div>
  );
}
