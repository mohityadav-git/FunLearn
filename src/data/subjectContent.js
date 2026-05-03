export const LIBRARY_DATA = {
  "Mathematics": [
    { id: "m1", title: "Numbers Up to 9999", modules: ["Understanding Numbers", "Place Value"], icon: "🔢" },
    { id: "m2", title: "Addition", modules: ["Basic Addition", "Word Problems"], icon: "➕" },
    { id: "m3", title: "Subtraction", modules: ["Basic Subtraction", "Word Problems"], icon: "➖" },
    { id: "m4", title: "Multiplication", modules: ["Times Tables", "Long Multiplication"], icon: "✖️" },
    { id: "m5", title: "Division", modules: ["Basic Division", "Remainders"], icon: "➗" },
    { id: "m6", title: "Day, Date and Time", modules: ["Reading the Clock", "Calendars"], icon: "⏰" },
    { id: "m7", title: "Money", modules: ["Counting Coins", "Shopping Problems"], icon: "💰" },
    { id: "m8", title: "Length", modules: ["Measuring Length", "Converting Units"], icon: "📏" },
    { id: "m9", title: "Weight", modules: ["Understanding Mass", "Scales"], icon: "⚖️" },
    { id: "m10", title: "Capacity", modules: ["Volume", "Liters & Milliliters"], icon: "🥛" },
    { id: "m11", title: "Fraction", modules: ["Basic Fractions", "Equivalent Fractions"], icon: "🍕" },
    { id: "m12", title: "Geometry", modules: ["2D Shapes", "3D Shapes"], icon: "📐" }
  ]
};

export const STUDY_PLANS = {
  "Mathematics": [
    {
      id: "ch1",
      chapterTitle: "Core Arithmetic",
      levels: [
        { type: "Foundation", status: "completed", topics: ["Numbers Up to 9999", "Addition"] },
        { type: "Intermediate", status: "current", topics: ["Subtraction", "Multiplication"] },
        { type: "Advanced", status: "locked", topics: ["Division"] }
      ]
    },
    {
      id: "ch2",
      chapterTitle: "Measurement & Time",
      levels: [
        { type: "Foundation", status: "locked", topics: ["Day, Date and Time", "Money"] },
        { type: "Intermediate", status: "locked", topics: ["Length", "Weight"] },
        { type: "Advanced", status: "locked", topics: ["Capacity"] }
      ]
    },
    {
      id: "ch3",
      chapterTitle: "Fractions & Geometry",
      levels: [
        { type: "Foundation", status: "locked", topics: ["Fraction"] },
        { type: "Intermediate", status: "locked", topics: ["Geometry (2D)"] },
        { type: "Advanced", status: "locked", topics: ["Geometry (3D)"] }
      ]
    }
  ]
};

export const QUEST_DATA = {
  "Mathematics": {
    daily: { title: "Daily Math Challenge", questions: 5, reward: 50, status: "available" },
    weekly: { title: "Weekly Arithmetic Mock", duration: "30 mins", reward: 200, status: "available" },
    monthly: { title: "Grand Math Assessment", duration: "60 mins", reward: 500, status: "locked" }
  }
};
