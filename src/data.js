// src/data.js
export const initialData = {
  columns: {
    applied: { id: "applied", title: "Applied", cards: [] },
    interviewing: { id: "interviewing", title: "Interviewing", cards: [] },
    offer: { id: "offer", title: "Offer", cards: [] },
    rejected: { id: "rejected", title: "Rejected", cards: [] },
  },
  columnOrder: ["applied", "interviewing", "offer", "rejected"],
};
