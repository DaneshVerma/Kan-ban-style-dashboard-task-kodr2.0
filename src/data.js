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
          company: "Spotify",
          role: "React Engineer",
          dateApplied: "2025-08-05",
          status: "Applied",
        },
      ],
    },
    interviewing: {
      id: "interviewing",
      title: "Interviewing",
      cards: [
        
        {
          id: "9",
          company: "Meta",
          role: "Product Manager",
          dateApplied: "2025-06-10",
          status: "Interviewing",
        },
      ],
    },
    offer: {
      id: "offer",
      title: "Offer",
      cards: [
        {
          id: "8",
          company: "Airbnb",
          role: "Frontend Developer",
          dateApplied: "2025-06-15",
          status: "Offer",
        },

        {
          id: "10",
          company: "Slack",
          role: "React Developer",
          dateApplied: "2025-05-28",
          status: "Offer",
        },
      ],
    },
    rejected: {
      id: "rejected",
      title: "Rejected",
      cards: [
        {
          id: "7",
          company: "Netflix",
          role: "UI/UX Designer",
          dateApplied: "2025-06-20",
          status: "Rejected",
        },
      ],
    },
  },
  columnOrder: ["applied", "interviewing", "offer", "rejected"],
};
