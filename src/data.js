export const initialData = {
  columns: {
    applied: {
      id: "applied",
      title: "Applied",
      cards: [
        {
          id: "1",
          company: "Google",
          role: "Frontend Developer",
          dateApplied: "2025-08-01",
          status: "Applied",
        },
        {
          id: "2",
          company: "Microsoft",
          role: "Backend Engineer",
          dateApplied: "2025-08-03",
          status: "Applied",
        },
      ],
    },
    interviewing: {
      id: "interviewing",
      title: "Interviewing",
      cards: [
        {
          id: "3",
          company: "Amazon",
          role: "Full Stack Developer",
          dateApplied: "2025-07-28",
          status: "Interviewing",
        },
      ],
    },
    offer: {
      id: "offer",
      title: "Offer",
      cards: [],
    },
    rejected: {
      id: "rejected",
      title: "Rejected",
      cards: [],
    },
  },
  columnOrder: ["applied", "interviewing", "offer", "rejected"],
};
