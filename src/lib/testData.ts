export interface TestQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const testQuestions: TestQuestion[] = [
  {
    id: 1,
    question: "How often do you feel overwhelmed by your daily responsibilities?",
    options: [
      { text: "Never", score: 5 },
      { text: "Rarely", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 2 },
      { text: "Always", score: 1 }
    ]
  },
  {
    id: 2,
    question: "How would you rate your sleep quality?",
    options: [
      { text: "Excellent", score: 5 },
      { text: "Good", score: 4 },
      { text: "Fair", score: 3 },
      { text: "Poor", score: 2 },
      { text: "Very Poor", score: 1 }
    ]
  },
  {
    id: 3,
    question: "How often do you feel anxious or worried?",
    options: [
      { text: "Never", score: 5 },
      { text: "Rarely", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Often", score: 2 },
      { text: "Always", score: 1 }
    ]
  },
  {
    id: 4,
    question: "How well can you concentrate on tasks?",
    options: [
      { text: "Very well", score: 5 },
      { text: "Well", score: 4 },
      { text: "Moderately", score: 3 },
      { text: "Poorly", score: 2 },
      { text: "Very poorly", score: 1 }
    ]
  },
  {
    id: 5,
    question: "How often do you feel satisfied with your life?",
    options: [
      { text: "Always", score: 5 },
      { text: "Often", score: 4 },
      { text: "Sometimes", score: 3 },
      { text: "Rarely", score: 2 },
      { text: "Never", score: 1 }
    ]
  }
];

export const getTestResult = (score: number) => {
  const maxScore = testQuestions.length * 5;
  const percentage = (score / maxScore) * 100;

  if (percentage >= 80) {
    return {
      status: "Excellent",
      message: "Your mental well-being appears to be very good. Keep maintaining your healthy habits!",
      color: "text-green-600"
    };
  } else if (percentage >= 60) {
    return {
      status: "Good",
      message: "Your mental health is generally good, but there might be some areas for improvement.",
      color: "text-blue-600"
    };
  } else if (percentage >= 40) {
    return {
      status: "Fair",
      message: "You might benefit from some support and self-care strategies. Consider talking to a professional.",
      color: "text-yellow-600"
    };
  } else {
    return {
      status: "Needs Attention",
      message: "It would be beneficial to speak with a mental health professional for support and guidance.",
      color: "text-red-600"
    };
  }
};