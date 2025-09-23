export const attempt = {
  "attempt_id": 12345,
  "user_id": 6789,
  "quiz_id": 100,
  "submitted_at": "2025-09-17T19:55:00Z",
  "score": 2,
  "total_questions": 3,
  "time_spent": 120,
  answers: Array.from({ length: 200 }, (_, i) => ({
    question_id: i + 1,
    user_answer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)], // random A-D
    correct_answer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
    is_correct: false
  }))
};

export const questionOfTest =
  [
    {
      "id": 1,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "explanationResourceContent": null,
      "part": "Part 1",
      "testId": 1,
      "questionNumber": 1,
      "answers": [
        {
          "id": 1,
          "content": "A. A. answer_A",
          "correct": "false"
        },
        {
          "id": 2,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 3,
          "content": "C. They're sitting at a table.",
          "correct": "true"
        },
        {
          "id": 4,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 2,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 1",
      "testId": 1,
      "questionNumber": 2,
      "answers": [
        {
          "id": 5,
          "content": "A. They're standing near a counter.",
          "correct": "false"
        },
        {
          "id": 6,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 7,
          "content": "C. They're sitting at a table.",
          "correct": "false"
        },
        {
          "id": 8,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": 2
    },
    {
      "id": 3,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 1",
      "testId": 1,
      "questionNumber": 3,

      "answers": [
        {
          "id": 9,
          "content": "A. They're standing near a counter.",
          "correct": "false"
        },
        {
          "id": 10,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 11,
          "content": "C. They're sitting at a table.",
          "correct": "false"
        },
        {
          "id": 12,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": 3
    },
    {
      "id": 4,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 1",
      "testId": 1,
      "questionNumber": 4,

      "answers": [
        {
          "id": 13,
          "content": "A. They're standing near a counter.",
          "correct": "false"
        },
        {
          "id": 14,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 15,
          "content": "C. They're sitting at a table.",
          "correct": "false"
        },
        {
          "id": 16,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": 4
    },
    {
      "id": 5,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 1",
      "testId": 1,
      "questionNumber": 5,
      "answers": [
        {
          "id": 17,
          "content": "A. They're standing near a counter.",
          "correct": "false"
        },
        {
          "id": 18,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 19,
          "content": "C. They're sitting at a table.",
          "correct": "false"
        },
        {
          "id": 20,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": 5
    },
    {
      "id": 6,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 1",
      "testId": 1, "questionNumber": 6,
      "answers": [
        {
          "id": 21,
          "content": "A. They're standing near a counter.",
          "correct": "false"
        },
        {
          "id": 22,
          "content": "B. They're looking at a document.",
          "correct": "false"
        },
        {
          "id": 23,
          "content": "C. They're sitting at a table.",
          "correct": "false"
        },
        {
          "id": 24,
          "content": "D. They're entering a building.",
          "correct": "false"
        }
      ],
      "resourceContent": 6
    },
    {
      "id": 7,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 7,
      "answers": [
        {
          "id": 25,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 26,
          "content": "B. I'll call you back later.",
          "correct": "true"
        },
        {
          "id": 27,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 28,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 7
    },
    {
      "id": 8,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 8,
      "answers": [
        {
          "id": 29,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 30,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 31,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 32,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 8
    },
    {
      "id": 9,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 9,
      "answers": [
        {
          "id": 33,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 34,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 35,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 36,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 9
    },
    {
      "id": 10,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 10,
      "answers": [
        {
          "id": 37,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 38,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 39,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 40,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 10
    },
    {
      "id": 11,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 11,
      "answers": [
        {
          "id": 41,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 42,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 43,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 44,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 11
    },
    {
      "id": 12,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 45,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 46,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 47,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 48,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 12
    },
    {
      "id": 13,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 49,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 50,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 51,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 52,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 13
    },
    {
      "id": 14,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 53,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 54,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 55,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 56,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 14
    },
    {
      "id": 15,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 57,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 58,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 59,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 60,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 15
    },
    {
      "id": 16,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 61,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 62,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 63,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 64,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 16
    },
    {
      "id": 17,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 65,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 66,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 67,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 68,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 17
    },
    {
      "id": 18,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 69,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 70,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 71,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 72,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 18
    },
    {
      "id": 19,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 73,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 74,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 75,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 76,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 19
    },
    {
      "id": 20,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 77,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 78,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 79,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 80,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 20
    },
    {
      "id": 21,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 81,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 82,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 83,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 84,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 21
    },
    {
      "id": 22,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 85,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 86,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 87,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 88,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 22
    },
    {
      "id": 23,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 89,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 90,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 91,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 92,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 23
    },
    {
      "id": 24,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 93,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 94,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 95,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 96,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 24
    },
    {
      "id": 25,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 97,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 98,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 99,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 100,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 25
    },
    {
      "id": 26,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 101,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 102,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 103,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 104,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 26
    },
    {
      "id": 27,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 105,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 106,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 107,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 108,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 27
    },
    {
      "id": 28,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 109,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 110,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 111,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 112,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 28
    },
    {
      "id": 29,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 113,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 114,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 115,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 116,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 29
    },
    {
      "id": 30,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "answers": [
        {
          "id": 117,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 118,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 119,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 120,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": 30
    },
    {
      "id": 31,
      "title": null,
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 2",
      "testId": 1,
      "questionNumber": 31,
      "answers": [
        {
          "id": 121,
          "content": "A. Yes, it's on the second floor.",
          "correct": "false"
        },
        {
          "id": 122,
          "content": "B. I'll call you back later.",
          "correct": "false"
        },
        {
          "id": 123,
          "content": "C. No, I haven't seen it.",
          "correct": "false"
        },
        {
          "id": 124,
          "content": null,
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 32,
      "title": "What event does the woman mention?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "questionNumber": 32,
      "answers": [
        {
          "id": 125,
          "content": "A. A job fair",
          "correct": "false"
        },
        {
          "id": 126,
          "content": "B. A cooking class",
          "correct": "false"
        },
        {
          "id": 127,
          "content": "C. A fund-raiser",
          "correct": "true"
        },
        {
          "id": 128,
          "content": "D. A company picnic",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 33,
      "title": "What does the woman ask for?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "questionNumber": 33,
      "answers": [
        {
          "id": 129,
          "content": "A. A guest list",
          "correct": "false"
        },
        {
          "id": 130,
          "content": "B. A dessert recipe",
          "correct": "false"
        },
        {
          "id": 131,
          "content": "C. A business card",
          "correct": "false"
        },
        {
          "id": 132,
          "content": "D. A promotional code",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 34,
      "title": "What does the man recommend doing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 133,
          "content": "A. Returning some merchandise",
          "correct": "false"
        },
        {
          "id": 134,
          "content": "B. Watching a video",
          "correct": "true"
        },
        {
          "id": 135,
          "content": "C. Creating an account",
          "correct": "false"
        },
        {
          "id": 136,
          "content": "D. Reading a review",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 35,
      "title": "What department do the speakers most likely work in?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 137,
          "content": "A. Accounting",
          "correct": "false"
        },
        {
          "id": 138,
          "content": "B. Research and development",
          "correct": "false"
        },
        {
          "id": 139,
          "content": "C. Maintenance",
          "correct": "false"
        },
        {
          "id": 140,
          "content": "D. Marketing",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 36,
      "title": "What problem does the woman mention?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 141,
          "content": "A. A report has not been submitted.",
          "correct": "false"
        },
        {
          "id": 142,
          "content": "B. An invoice is not accurate.",
          "correct": "true"
        },
        {
          "id": 143,
          "content": "C. A policy has not been followed.",
          "correct": "false"
        },
        {
          "id": 144,
          "content": "D. An order has not been delivered.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 37,
      "title": "What does the man say he will do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 145,
          "content": "A. Delete an electronic file",
          "correct": "false"
        },
        {
          "id": 146,
          "content": "B. Authorize a reimbursement",
          "correct": "false"
        },
        {
          "id": 147,
          "content": "C. Set up a sales meeting",
          "correct": "false"
        },
        {
          "id": 148,
          "content": "D. Review a spreadsheet",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 38,
      "title": "What industry do the speakers most likely work in?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 149,
          "content": "A. Shipping",
          "correct": "false"
        },
        {
          "id": 150,
          "content": "B. Manufacturing",
          "correct": "true"
        },
        {
          "id": 151,
          "content": "C. Hospitality",
          "correct": "false"
        },
        {
          "id": 152,
          "content": "D. Meteorology",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 39,
      "title": "What is the reason for a delay?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 153,
          "content": "A. A schedule was written incorrectly.",
          "correct": "false"
        },
        {
          "id": 154,
          "content": "B. Some equipment is not properly set up.",
          "correct": "false"
        },
        {
          "id": 155,
          "content": "C. Weather conditions are poor.",
          "correct": "true"
        },
        {
          "id": 156,
          "content": "D. Several staff members are absent.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 40,
      "title": "What does the man say he will do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 157,
          "content": "A. Update a shift schedule",
          "correct": "false"
        },
        {
          "id": 158,
          "content": "B. Clear a work space",
          "correct": "false"
        },
        {
          "id": 159,
          "content": "C. Complete a checklist",
          "correct": "false"
        },
        {
          "id": 160,
          "content": "D. Place a call",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 41,
      "title": "Why is the woman at the restaurant?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 161,
          "content": "A. To celebrate a retirement",
          "correct": "false"
        },
        {
          "id": 162,
          "content": "B. To perform an inspection",
          "correct": "false"
        },
        {
          "id": 163,
          "content": "C. To meet with some clients",
          "correct": "true"
        },
        {
          "id": 164,
          "content": "D. To write an article",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 42,
      "title": "What does the woman mean when she says, \"it's very hot today\"?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 165,
          "content": "A. She is unable to accept an invitation.",
          "correct": "false"
        },
        {
          "id": 166,
          "content": "B. A cooling system is not working.",
          "correct": "false"
        },
        {
          "id": 167,
          "content": "C. A meeting will end soon.",
          "correct": "false"
        },
        {
          "id": 168,
          "content": "D. She wants to change a seating request.",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 43,
      "title": "What does the man say about a parking garage?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 169,
          "content": "A. It is free for customers.",
          "correct": "true"
        },
        {
          "id": 170,
          "content": "B. It is under construction.",
          "correct": "false"
        },
        {
          "id": 171,
          "content": "C. It closes soon.",
          "correct": "false"
        },
        {
          "id": 172,
          "content": "D. It offers monthly contracts.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 44,
      "title": "Where does the woman most likely work?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 173,
          "content": "A. At a university",
          "correct": "true"
        },
        {
          "id": 174,
          "content": "B. At a publishing company",
          "correct": "false"
        },
        {
          "id": 175,
          "content": "C. At an electronics store",
          "correct": "false"
        },
        {
          "id": 176,
          "content": "D. At a grocery store",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 45,
      "title": "What does Murat ask about?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 177,
          "content": "A. How much an item costs",
          "correct": "false"
        },
        {
          "id": 178,
          "content": "B. When an event will begin",
          "correct": "true"
        },
        {
          "id": 179,
          "content": "C. How many people will participate",
          "correct": "false"
        },
        {
          "id": 180,
          "content": "D. Where to set up some equipment",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 46,
      "title": "What does the woman suggest doing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 181,
          "content": "A. Offering a discount",
          "correct": "false"
        },
        {
          "id": 182,
          "content": "B. Displaying informational materials",
          "correct": "true"
        },
        {
          "id": 183,
          "content": "C. Holding a contest",
          "correct": "false"
        },
        {
          "id": 184,
          "content": "D. Visiting a registration table",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 47,
      "title": "What type of industry do the speakers most likely work in?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 185,
          "content": "A. Textile manufacturing",
          "correct": "false"
        },
        {
          "id": 186,
          "content": "B. Food production",
          "correct": "true"
        },
        {
          "id": 187,
          "content": "C. Health care",
          "correct": "false"
        },
        {
          "id": 188,
          "content": "D. Hospitality",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 48,
      "title": "What business challenge are the speakers discussing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 189,
          "content": "A. Lack of qualified personnel",
          "correct": "false"
        },
        {
          "id": 190,
          "content": "B. Rising production costs",
          "correct": "true"
        },
        {
          "id": 191,
          "content": "C. Changes in consumer preferences",
          "correct": "false"
        },
        {
          "id": 192,
          "content": "D. Increased competition",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 49,
      "title": "What does the man say he will do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 193,
          "content": "A. Research more information",
          "correct": "true"
        },
        {
          "id": 194,
          "content": "B. Negotiate a discount",
          "correct": "false"
        },
        {
          "id": 195,
          "content": "C. Upgrade some machinery",
          "correct": "false"
        },
        {
          "id": 196,
          "content": "D. Train a new employee",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 50,
      "title": "Why is the man calling?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 197,
          "content": "A. To explain a business merger",
          "correct": "false"
        },
        {
          "id": 198,
          "content": "B. To describe a new company policy",
          "correct": "false"
        },
        {
          "id": 199,
          "content": "C. To offer the woman a work assignment",
          "correct": "false"
        },
        {
          "id": 200,
          "content": "D. To invite the woman to speak at a conference",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 51,
      "title": "What does the man say a client is interested in doing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 201,
          "content": "A. Purchasing another business",
          "correct": "false"
        },
        {
          "id": 202,
          "content": "B. Finding a new office space",
          "correct": "false"
        },
        {
          "id": 203,
          "content": "C. Revising a budget proposal",
          "correct": "false"
        },
        {
          "id": 204,
          "content": "D. Creating a marketing campaign",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 52,
      "title": "What does the woman ask the man to send?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 205,
          "content": "A. A project description",
          "correct": "true"
        },
        {
          "id": 206,
          "content": "B. An event invitation",
          "correct": "false"
        },
        {
          "id": 207,
          "content": "C. Some social media links",
          "correct": "false"
        },
        {
          "id": 208,
          "content": "D. Some contact information",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 53,
      "title": "What problem does the woman mention?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 209,
          "content": "A. A vehicle is out of service.",
          "correct": "true"
        },
        {
          "id": 210,
          "content": "B. An employee is late.",
          "correct": "false"
        },
        {
          "id": 211,
          "content": "C. A shipment was damaged.",
          "correct": "false"
        },
        {
          "id": 212,
          "content": "D. Traffic is heavy.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 54,
      "title": "Where do the speakers most likely work?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 213,
          "content": "A. At a recording studio",
          "correct": "false"
        },
        {
          "id": 214,
          "content": "B. At a catering company",
          "correct": "true"
        },
        {
          "id": 215,
          "content": "C. At a radio station",
          "correct": "false"
        },
        {
          "id": 216,
          "content": "D. At a car dealership",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 55,
      "title": "What does the man say he will do next?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 217,
          "content": "A. Arrange for a car repair",
          "correct": "false"
        },
        {
          "id": 218,
          "content": "B. Order some kitchen supplies",
          "correct": "false"
        },
        {
          "id": 219,
          "content": "C. Carry some items",
          "correct": "true"
        },
        {
          "id": 220,
          "content": "D. Offer a refund",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 56,
      "title": "Why is the man calling the woman?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 221,
          "content": "A. To plan a company event",
          "correct": "false"
        },
        {
          "id": 222,
          "content": "B. To confirm a work deadline",
          "correct": "false"
        },
        {
          "id": 223,
          "content": "C. To discuss a career path",
          "correct": "true"
        },
        {
          "id": 224,
          "content": "D. To accept a job offer",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 57,
      "title": "Who most likely is the woman?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 225,
          "content": "A. A newspaper editor",
          "correct": "false"
        },
        {
          "id": 226,
          "content": "B. A university professor",
          "correct": "true"
        },
        {
          "id": 227,
          "content": "C. A delivery person",
          "correct": "false"
        },
        {
          "id": 228,
          "content": "D. A professional actor",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 58,
      "title": "What will the woman most likely do next?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 229,
          "content": "A. Negotiate a contract",
          "correct": "false"
        },
        {
          "id": 230,
          "content": "B. Explain an office policy",
          "correct": "false"
        },
        {
          "id": 231,
          "content": "C. Review a résumé",
          "correct": "true"
        },
        {
          "id": 232,
          "content": "D. Describe a work schedule",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 59,
      "title": "What are the speakers mainly discussing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 233,
          "content": "A. A new transportation route",
          "correct": "false"
        },
        {
          "id": 234,
          "content": "B. A company merger",
          "correct": "false"
        },
        {
          "id": 235,
          "content": "C. A public relations initiative",
          "correct": "false"
        },
        {
          "id": 236,
          "content": "D. A medical facility design",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 60,
      "title": "Why does the woman say, \"they also talked about it last year\"?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 237,
          "content": "A. To express doubt",
          "correct": "true"
        },
        {
          "id": 238,
          "content": "B. To explain a process",
          "correct": "false"
        },
        {
          "id": 239,
          "content": "C. To make a recommendation",
          "correct": "false"
        },
        {
          "id": 240,
          "content": "D. To update some information",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 61,
      "title": "What does the woman want to avoid?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 241,
          "content": "A. Paying a certification fee",
          "correct": "false"
        },
        {
          "id": 242,
          "content": "B. Training additional staff",
          "correct": "false"
        },
        {
          "id": 243,
          "content": "C. Upgrading some technology",
          "correct": "false"
        },
        {
          "id": 244,
          "content": "D. Relocating to another city",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 62,
      "title": "Who is a gift for?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 245,
          "content": "A. Donors",
          "correct": "false"
        },
        {
          "id": 246,
          "content": "B. Volunteers",
          "correct": "false"
        },
        {
          "id": 247,
          "content": "C. Employees",
          "correct": "false"
        },
        {
          "id": 248,
          "content": "D. Clients",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 63,
      "title": "Look at the graphic. What is the price of the item the man recommends?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 249,
          "content": "A. 21",
          "correct": "false"
        },
        {
          "id": 250,
          "content": "B. 18",
          "correct": "true"
        },
        {
          "id": 251,
          "content": "C. 24",
          "correct": "false"
        },
        {
          "id": 252,
          "content": "D. 15",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 64,
      "title": "What is the woman going to send to the man?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 253,
          "content": "A. A graphic file",
          "correct": "false"
        },
        {
          "id": 254,
          "content": "B. A list of names",
          "correct": "true"
        },
        {
          "id": 255,
          "content": "C. A delivery address",
          "correct": "false"
        },
        {
          "id": 256,
          "content": "D. An account number",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 65,
      "title": "What type of art will be displayed in an exhibit?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 257,
          "content": "A. Clay sculptures",
          "correct": "false"
        },
        {
          "id": 258,
          "content": "B. Oil paintings",
          "correct": "false"
        },
        {
          "id": 259,
          "content": "C. Black-and-white photographs",
          "correct": "true"
        },
        {
          "id": 260,
          "content": "D. Pencil drawings",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 66,
      "title": "Look at the graphic. Which piece of artwork will no longer be included?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 261,
          "content": "A. A Careful Glance",
          "correct": "false"
        },
        {
          "id": 262,
          "content": "B. Promises",
          "correct": "false"
        },
        {
          "id": 263,
          "content": "C. Stormy Sea",
          "correct": "true"
        },
        {
          "id": 264,
          "content": "D. The Moment",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 67,
      "title": "What does the woman say she will do right away?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 265,
          "content": "A. Speak with an artist",
          "correct": "false"
        },
        {
          "id": 266,
          "content": "B. Edit a recording",
          "correct": "false"
        },
        {
          "id": 267,
          "content": "C. Clean a gallery space",
          "correct": "false"
        },
        {
          "id": 268,
          "content": "D. Greet some visitors",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 68,
      "title": "Who most likely are the speakers?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 269,
          "content": "A. Urban planners",
          "correct": "false"
        },
        {
          "id": 270,
          "content": "B. Journalists",
          "correct": "false"
        },
        {
          "id": 271,
          "content": "C. Engineers",
          "correct": "false"
        },
        {
          "id": 272,
          "content": "D. Environmental scientists",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 69,
      "title": "Look at the graphic. Which site has already been completed?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 273,
          "content": "A. Site A",
          "correct": "true"
        },
        {
          "id": 274,
          "content": "B. Site B",
          "correct": "false"
        },
        {
          "id": 275,
          "content": "C. Site C",
          "correct": "false"
        },
        {
          "id": 276,
          "content": "D. Site D",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 70,
      "title": "What does the man suggest focusing on?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 277,
          "content": "A. Work opportunities",
          "correct": "false"
        },
        {
          "id": 278,
          "content": "B. Wind turbine costs",
          "correct": "false"
        },
        {
          "id": 279,
          "content": "C. Supply chain issues",
          "correct": "false"
        },
        {
          "id": 280,
          "content": "D. Power capacity",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 71,
      "title": "Who has recorded the message?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 281,
          "content": "A. A city mayor's office",
          "correct": "false"
        },
        {
          "id": 282,
          "content": "B. A maintenance department",
          "correct": "false"
        },
        {
          "id": 283,
          "content": "C. An automobile dealership",
          "correct": "false"
        },
        {
          "id": 284,
          "content": "D. A building management office",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 72,
      "title": "What are the listeners asked to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 285,
          "content": "A. Move their vehicles",
          "correct": "true"
        },
        {
          "id": 286,
          "content": "B. Pay their parking fines",
          "correct": "false"
        },
        {
          "id": 287,
          "content": "C. Use an alternate entrance",
          "correct": "false"
        },
        {
          "id": 288,
          "content": "D. Participate in a meeting",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 73,
      "title": "What does the speaker say was mailed last week?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 289,
          "content": "A. An election ballot",
          "correct": "false"
        },
        {
          "id": 290,
          "content": "B. A maintenance plan",
          "correct": "false"
        },
        {
          "id": 291,
          "content": "C. A map",
          "correct": "true"
        },
        {
          "id": 292,
          "content": "D. A coupon",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 74,
      "title": "What is the topic of the episode?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 293,
          "content": "A. Garden landscaping",
          "correct": "false"
        },
        {
          "id": 294,
          "content": "B. Window installation",
          "correct": "false"
        },
        {
          "id": 295,
          "content": "C. Roof maintenance",
          "correct": "true"
        },
        {
          "id": 296,
          "content": "D. Kitchen renovations",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 75,
      "title": "What does the speaker emphasize about some tools?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 297,
          "content": "A. They should be cleaned regularly.",
          "correct": "false"
        },
        {
          "id": 298,
          "content": "B. They should be of high quality.",
          "correct": "true"
        },
        {
          "id": 299,
          "content": "C. They were recently invented.",
          "correct": "false"
        },
        {
          "id": 300,
          "content": "D. They can be easily stored.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 76,
      "title": "What does the speaker recommend doing every year?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 301,
          "content": "A. Treating some wood",
          "correct": "true"
        },
        {
          "id": 302,
          "content": "B. Consulting an electrician",
          "correct": "false"
        },
        {
          "id": 303,
          "content": "C. Taking some photos",
          "correct": "false"
        },
        {
          "id": 304,
          "content": "D. Draining some water",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 77,
      "title": "Who most likely is the speaker?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 305,
          "content": "A. A radio show host",
          "correct": "false"
        },
        {
          "id": 306,
          "content": "B. A tour guide",
          "correct": "true"
        },
        {
          "id": 307,
          "content": "C. A sales associate",
          "correct": "false"
        },
        {
          "id": 308,
          "content": "D. A professor",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 78,
      "title": "What will happen at two o'clock?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 309,
          "content": "A. A lecture will begin.",
          "correct": "false"
        },
        {
          "id": 310,
          "content": "B. A demonstration will be given.",
          "correct": "true"
        },
        {
          "id": 311,
          "content": "C. An interview will be conducted.",
          "correct": "false"
        },
        {
          "id": 312,
          "content": "D. A park will close.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 79,
      "title": "What is Orchid Caretakers?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 313,
          "content": "A. A book",
          "correct": "false"
        },
        {
          "id": 314,
          "content": "B. An album",
          "correct": "false"
        },
        {
          "id": 315,
          "content": "C. A film",
          "correct": "false"
        },
        {
          "id": 316,
          "content": "D. A magazine",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 80,
      "title": "What event is taking place?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 317,
          "content": "A. A fund-raising concert",
          "correct": "true"
        },
        {
          "id": 318,
          "content": "B. A sports competition",
          "correct": "false"
        },
        {
          "id": 319,
          "content": "C. A play rehearsal",
          "correct": "false"
        },
        {
          "id": 320,
          "content": "D. An awards ceremony",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 81,
      "title": "What does the organization plan to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 321,
          "content": "A. Change a policy",
          "correct": "false"
        },
        {
          "id": 322,
          "content": "B. Repair a building",
          "correct": "false"
        },
        {
          "id": 323,
          "content": "C. Select a winner",
          "correct": "false"
        },
        {
          "id": 324,
          "content": "D. Sponsor a team",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 82,
      "title": "What does the speaker encourage the listeners to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 325,
          "content": "A. Order tickets early",
          "correct": "true"
        },
        {
          "id": 326,
          "content": "B. Visit a community center",
          "correct": "false"
        },
        {
          "id": 327,
          "content": "C. Purchase refreshments",
          "correct": "false"
        },
        {
          "id": 328,
          "content": "D. Donate clothing",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 83,
      "title": "What is the topic of the workshop?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 329,
          "content": "A. Time management",
          "correct": "false"
        },
        {
          "id": 330,
          "content": "B. Public speaking",
          "correct": "false"
        },
        {
          "id": 331,
          "content": "C. Leadership skills",
          "correct": "true"
        },
        {
          "id": 332,
          "content": "D. Professional networking",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 84,
      "title": "What does the speaker imply when he says, \"Erina's at the back of the room\"?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 333,
          "content": "A. A guest speaker has just arrived.",
          "correct": "false"
        },
        {
          "id": 334,
          "content": "B. Assistance is available.",
          "correct": "true"
        },
        {
          "id": 335,
          "content": "C. Attendees should speak clearly and loudly.",
          "correct": "false"
        },
        {
          "id": 336,
          "content": "D. An extra chair should be provided.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 85,
      "title": "What will the listeners do next?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 337,
          "content": "A. Sign their names on a list",
          "correct": "false"
        },
        {
          "id": 338,
          "content": "B. Take a break",
          "correct": "false"
        },
        {
          "id": 339,
          "content": "C. Participate in an introductory activity",
          "correct": "true"
        },
        {
          "id": 340,
          "content": "D. Fill out a questionnaire",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 86,
      "title": "What is a historical site famous for?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 341,
          "content": "A. Its defensive walls",
          "correct": "false"
        },
        {
          "id": 342,
          "content": "B. Its royal inhabitants",
          "correct": "false"
        },
        {
          "id": 343,
          "content": "C. An event that happened there",
          "correct": "true"
        },
        {
          "id": 344,
          "content": "D. Some artwork",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 87,
      "title": "Why does the speaker apologize?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 345,
          "content": "A. The listeners cannot take pictures.",
          "correct": "false"
        },
        {
          "id": 346,
          "content": "B. An area is closed to the listeners.",
          "correct": "true"
        },
        {
          "id": 347,
          "content": "C. There is no gift shop.",
          "correct": "false"
        },
        {
          "id": 348,
          "content": "D. A tour started late.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 88,
      "title": "What does the speaker ask the listeners to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 349,
          "content": "A. Show their tickets",
          "correct": "false"
        },
        {
          "id": 350,
          "content": "B. Put on protective clothing",
          "correct": "true"
        },
        {
          "id": 351,
          "content": "C. Use some handrails",
          "correct": "false"
        },
        {
          "id": 352,
          "content": "D. Speak quietly",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 89,
      "title": "What is the speaker mainly discussing?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 353,
          "content": "A. An advertising campaign",
          "correct": "true"
        },
        {
          "id": 354,
          "content": "B. A market expansion",
          "correct": "false"
        },
        {
          "id": 355,
          "content": "C. Some contract negotiations",
          "correct": "false"
        },
        {
          "id": 356,
          "content": "D. Some audit procedures",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 90,
      "title": "What does the speaker imply when he says, \"this is a priority\"?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 357,
          "content": "A. Overtime pay has been approved.",
          "correct": "false"
        },
        {
          "id": 358,
          "content": "B. A deadline must be met.",
          "correct": "true"
        },
        {
          "id": 359,
          "content": "C. A client expressed concern.",
          "correct": "false"
        },
        {
          "id": 360,
          "content": "D. A supervisor will be observing closely.",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 91,
      "title": "What will the listeners do next?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 361,
          "content": "A. View a presentation",
          "correct": "true"
        },
        {
          "id": 362,
          "content": "B. Review a budget",
          "correct": "false"
        },
        {
          "id": 363,
          "content": "C. Revise some work",
          "correct": "false"
        },
        {
          "id": 364,
          "content": "D. Do some research",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 92,
      "title": "Where do the listeners most likely work?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 365,
          "content": "A. At a hospital",
          "correct": "false"
        },
        {
          "id": 366,
          "content": "B. At a restaurant",
          "correct": "false"
        },
        {
          "id": 367,
          "content": "C. At a grocery store",
          "correct": "true"
        },
        {
          "id": 368,
          "content": "D. At an electronics store",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 93,
      "title": "What is the main purpose of the talk?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 369,
          "content": "A. To make a request",
          "correct": "false"
        },
        {
          "id": 370,
          "content": "B. To address staff complaints",
          "correct": "false"
        },
        {
          "id": 371,
          "content": "C. To present a new schedule",
          "correct": "true"
        },
        {
          "id": 372,
          "content": "D. To explain a technical process",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 94,
      "title": "What does the speaker imply when she says, \"That will require management approval\"?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 373,
          "content": "A. A process has not been followed.",
          "correct": "false"
        },
        {
          "id": 374,
          "content": "B. The listeners may be asked to work extra shifts.",
          "correct": "false"
        },
        {
          "id": 375,
          "content": "C. The listeners should contact a manager.",
          "correct": "false"
        },
        {
          "id": 376,
          "content": "D. A change will not be immediate.",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 95,
      "title": "According to the speaker, what was recently completed?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 377,
          "content": "A. A company reorganization",
          "correct": "false"
        },
        {
          "id": 378,
          "content": "B. A park renovation",
          "correct": "true"
        },
        {
          "id": 379,
          "content": "C. A volunteer training",
          "correct": "false"
        },
        {
          "id": 380,
          "content": "D. A conservation project",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 96,
      "title": "Look at the graphic. Where does the speaker say refreshments will be served?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 381,
          "content": "A. Location 1",
          "correct": "false"
        },
        {
          "id": 382,
          "content": "B. Location 2",
          "correct": "false"
        },
        {
          "id": 383,
          "content": "C. Location 3",
          "correct": "true"
        },
        {
          "id": 384,
          "content": "D. Location 4",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 97,
      "title": "What are the listeners reminded to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 385,
          "content": "A. Complete a survey",
          "correct": "true"
        },
        {
          "id": 386,
          "content": "B. Donate some money",
          "correct": "false"
        },
        {
          "id": 387,
          "content": "C. Join an organization",
          "correct": "false"
        },
        {
          "id": 388,
          "content": "D. Post some photographs",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 98,
      "title": "What is the topic of today's lecture?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 389,
          "content": "A. When to harvest crops",
          "correct": "true"
        },
        {
          "id": 390,
          "content": "B. Where to plant trees",
          "correct": "false"
        },
        {
          "id": 391,
          "content": "C. How to grow vegetables",
          "correct": "false"
        },
        {
          "id": 392,
          "content": "D. Which flowers need more sun",
          "correct": "false"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 99,
      "title": "Look at the graphic. At what depth should samples be collected this month?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 393,
          "content": "A. 12 inches",
          "correct": "false"
        },
        {
          "id": 394,
          "content": "B. 4 inches",
          "correct": "false"
        },
        {
          "id": 395,
          "content": "C. 6 inches",
          "correct": "false"
        },
        {
          "id": 396,
          "content": "D. 8 inches",
          "correct": "true"
        }
      ],
      "resourceContent": null
    },
    {
      "id": 100,
      "title": "What does the speaker encourage the listeners to do?",
      "point": 0,
      "answerKey": 0,
      "explanation": null,
      "part": "Part 3",
      "testId": 1,
      "answers": [
        {
          "id": 397,
          "content": "A. Turn off mobile phones",
          "correct": "true"
        },
        {
          "id": 398,
          "content": "B. Have some refreshments",
          "correct": "false"
        },
        {
          "id": 399,
          "content": "C. Purchase some seeds",
          "correct": "false"
        },
        {
          "id": 400,
          "content": "D. Sign up for a mailing list",
          "correct": "false"
        }
      ],
      "resourceContent": null
    }
  ]
  ;
