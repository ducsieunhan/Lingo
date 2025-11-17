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


export const allTests = {
  "tests": [
    {
      "id": 1,
      "category": "TOEIC",
      "type": "Listening",
      "title": "TOEIC Listening Part 1 - Photographs",
      "duration": 25,
      "questions": 30,
      "attempts": 950
    },
    {
      "id": 2,
      "category": "TOEIC",
      "type": "Listening",
      "title": "TOEIC Listening Part 2 - Question Response",
      "duration": 30,
      "questions": 25,
      "attempts": 1120
    },
    {
      "id": 3,
      "category": "TOEIC",
      "type": "Listening",
      "title": "TOEIC Listening Part 3 - Conversations",
      "duration": 40,
      "questions": 39,
      "attempts": 875
    },
    {
      "id": 4,
      "category": "TOEIC",
      "type": "Listening",
      "title": "TOEIC Listening Part 4 - Talks",
      "duration": 45,
      "questions": 30,
      "attempts": 1340
    },
    {
      "id": 5,
      "category": "TOEIC",
      "type": "Reading",
      "title": "TOEIC Reading Part 5 - Incomplete Sentences",
      "duration": 35,
      "questions": 40,
      "attempts": 980
    },
    {
      "id": 6,
      "category": "TOEIC",
      "type": "Reading",
      "title": "TOEIC Reading Part 6 - Text Completion",
      "duration": 30,
      "questions": 16,
      "attempts": 765
    },
    {
      "id": 7,
      "category": "TOEIC",
      "type": "Reading",
      "title": "TOEIC Reading Part 7 - Single Passages",
      "duration": 50,
      "questions": 29,
      "attempts": 1420
    },
    {
      "id": 8,
      "category": "TOEIC",
      "type": "Reading",
      "title": "TOEIC Reading Part 7 - Double Passages",
      "duration": 55,
      "questions": 25,
      "attempts": 1105
    },
    {
      "id": 9,
      "category": "IELTS",
      "type": "Listening",
      "title": "IELTS Listening Practice Test 1",
      "duration": 60,
      "questions": 40,
      "attempts": 2030
    },
    {
      "id": 10,
      "category": "IELTS",
      "type": "Reading",
      "title": "IELTS Reading Academic Test 1",
      "duration": 60,
      "questions": 40,
      "attempts": 1875
    },
    {
      "id": 11,
      "category": "IELTS",
      "type": "Reading",
      "title": "IELTS Reading Academic Test 11",
      "duration": 60,
      "questions": 40,
      "attempts": 1875
    }
  ]
};

export const realData = [
  {
    "quizId": 1,
    "quizInfo": {
      "title": "IELTS Academic Reading Practice Test 1",
      "details": "40 câu hỏi",
    },
    "score": 8.5,
    "timeTaken": 3600,
    "submittedAt": "2025-10-06T06:20:39.384+00:00",
    "type": "IELTS",
    "sectionResults": [
      {
        "type": "Reading",
        "correctAnswers": 34,
        "totalQuestions": 40,
        "sectionScore": 8.5,
        "maxPossibleScore": 9.0
      }
    ],
  },
  {
    "quizId": 2,
    "quizInfo": {
      "title": "TOEIC Listening & Reading Test A",
      "details": "200 câu hỏi",
    },
    "score": 650,
    "timeTaken": 7200,
    "submittedAt": "2025-09-20T08:30:00.000+00:00",
    "type": "TOEIC",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 70,
        "totalQuestions": 100,
        "sectionScore": 350,
        "maxPossibleScore": 495
      },
      {
        "type": "Reading",
        "correctAnswers": 60,
        "totalQuestions": 100,
        "sectionScore": 300,
        "maxPossibleScore": 495
      }
    ],
  },
  {
    "quizId": 3,
    "quizInfo": {
      "title": "IELTS Academic Listening Practice Test 2",
      "details": "40 câu hỏi",
    },
    "score": 7.0,
    "timeTaken": 2500,
    "submittedAt": "2025-08-15T09:00:00.000+00:00",
    "type": "IELTS",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 28,
        "totalQuestions": 40,
        "sectionScore": 7.0,
        "maxPossibleScore": 9.0
      }
    ],
  },
  {
    "quizId": 4,
    "quizInfo": {
      "title": "TOEIC Practice Test B",
      "details": "200 câu hỏi ",
    },
    "score": 820,
    "timeTaken": 7100,
    "submittedAt": "2025-07-10T14:00:00.000+00:00",
    "type": "TOEIC",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 85,
        "totalQuestions": 100,
        "sectionScore": 420,
        "maxPossibleScore": 495
      },
      {
        "type": "Reading",
        "correctAnswers": 75,
        "totalQuestions": 100,
        "sectionScore": 400,
        "maxPossibleScore": 495
      }
    ],
  },
  {
    "quizId": 5,
    "quizInfo": {
      "title": "IELTS General Writing Practice Test",
      "details": "2 task ",
    },
    "score": 6.5,
    "timeTaken": 3600,
    "submittedAt": "2025-06-05T09:45:00.000+00:00",
    "type": "IELTS",
    "sectionResults": [
      {
        "type": "Writing Task 1",
        "correctAnswers": 0,
        "totalQuestions": 1,
        "sectionScore": 6.0,
        "maxPossibleScore": 9.0
      },
      {
        "type": "Writing Task 2",
        "correctAnswers": 0,
        "totalQuestions": 1,
        "sectionScore": 7.0,
        "maxPossibleScore": 9.0
      }
    ],
  },
  {
    "quizId": 6,
    "quizInfo": {
      "title": "TOEIC Listening Practice Test C",
      "details": "100 câu hỏi",
    },
    "score": 400,
    "timeTaken": 2800,
    "submittedAt": "2025-05-12T11:20:00.000+00:00",
    "type": "TOEIC",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 50,
        "totalQuestions": 100,
        "sectionScore": 200,
        "maxPossibleScore": 495
      },
      {
        "type": "Reading",
        "correctAnswers": 40,
        "totalQuestions": 100,
        "sectionScore": 200,
        "maxPossibleScore": 495
      }
    ],
  },
  {
    "quizId": 7,
    "quizInfo": {
      "title": "IELTS Academic Speaking Test",
      "details": "3 part ",
    },
    "score": 7.5,
    "timeTaken": 900,
    "submittedAt": "2025-04-18T13:00:00.000+00:00",
    "type": "IELTS",
    "sectionResults": [
      {
        "type": "Speaking",
        "correctAnswers": 0,
        "totalQuestions": 1,
        "sectionScore": 7.5,
        "maxPossibleScore": 9.0
      }
    ],
  },
  {
    "quizId": 8,
    "quizInfo": {
      "title": "TOEIC Reading Practice Test D",
      "details": "100 câu hỏi ",
    },
    "score": 550,
    "timeTaken": 4500,
    "submittedAt": "2025-03-22T15:30:00.000+00:00",
    "type": "TOEIC",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 55,
        "totalQuestions": 100,
        "sectionScore": 275,
        "maxPossibleScore": 495
      },
      {
        "type": "Reading",
        "correctAnswers": 55,
        "totalQuestions": 100,
        "sectionScore": 275,
        "maxPossibleScore": 495
      }
    ],
  },
  {
    "quizId": 9,
    "quizInfo": {
      "title": "IELTS Academic Reading Practice Test 3",
      "details": "40 câu hỏi",
    },
    "score": 5.5,
    "timeTaken": 3500,
    "submittedAt": "2025-02-14T08:00:00.000+00:00",
    "type": "IELTS",
    "sectionResults": [
      {
        "type": "Reading",
        "correctAnswers": 22,
        "totalQuestions": 40,
        "sectionScore": 5.5,
        "maxPossibleScore": 9.0
      }
    ],
  },
  {
    "quizId": 10,
    "quizInfo": {
      "title": "TOEIC Full Test E",
      "details": "200 câu hỏi ",
    },
    "score": 900,
    "timeTaken": 7100,
    "submittedAt": "2025-01-10T10:00:00.000+00:00",
    "type": "TOEIC",
    "sectionResults": [
      {
        "type": "Listening",
        "correctAnswers": 90,
        "totalQuestions": 100,
        "sectionScore": 450,
        "maxPossibleScore": 495
      },
      {
        "type": "Reading",
        "correctAnswers": 90,
        "totalQuestions": 100,
        "sectionScore": 450,
        "maxPossibleScore": 495
      }
    ],
  }
];

export const SPEAKING_QUESTIONS = [
  // Part 1
  { type: "Part 1", text: "What is your full name?" },
  { type: "Part 1", text: "Can I see your ID?" },
  { type: "Part 1", text: "Where are you from?" },
  { type: "Part 1", text: "Do you work or are you a student?" },
  { type: "Part 1", text: "What subjects are you studying?" },
  // Part 2
  {
    type: "Part 2",
    text: "Describe a website you often visit.\n\nYou should say:\n- What it is about\n- How you found it\n- How often you visit it\n- And explain why you find it useful.",
  },
  // Part 3
  {
    type: "Part 3",
    text: "What are the advantages and disadvantages of the internet?",
  },
  {
    type: "Part 3",
    text: "Do you think older people and younger people use the internet differently?",
  },
  {
    type: "Part 3",
    text: "How much has the internet changed people's lives?",
  },
  {
    type: "Part 3",
    text: "Should the government control the information available on the internet?",
  },
  {
    type: "Part 3",
    text: "What will be the next big development online?",
  },
];


export const MOCK_ASSESSMENT_DATA = {
  submission_id: "GyrCkqnqntmnJVitatmZD3",
  user_id: "user123",
  status: "COMPLETED",
  topic_prompt: "wedding",
  transcript:
    "I'm a wedding planner. My job brings me a lot of pleasure. Today is an amazing day. I am planning my sister's wedding. She will wear a beautiful white dress. I also get to wear a lovely dress. After the wedding, all the guests will have a nice dinner and will dance for hours. In the evening, my sister and her new husband will cut a cake that I designed. I hope they like it a lot.",
  scores: {
    fluency: 8.0,
    pronunciation: 5.0,
    task_response: 6.0,
    grammar: 6.0,
    vocabulary: 5.5,
    overall: 6.1,
  },
  feedback: {
    task_response:
      "The candidate addresses the topic directly and maintains relevance throughout. The ideas are logically connected, providing a clear narrative flow (job description → current task → specific wedding events). The response is coherent, with clear sequencing (e.g., 'After the wedding,' 'In the evening'). However, the response is brief, limiting the opportunity to fully develop complex points or demonstrate sustained discourse. For higher scores, the candidate would need to extend the response, perhaps by elaborating on the challenges of planning or the emotional significance of the event, rather than just listing activities.",
    grammar:
      "Grammatical accuracy is very high; there are virtually no errors in this sample. The candidate controls simple tenses (simple present: 'brings,' 'am planning') and the simple future ('will wear,' 'will dance') effectively. However, the range is limited. The response consists primarily of simple, short sentences connected by basic coordination. There is a lack of complex grammatical structures, such as subordinate clauses, passive voice, or varied relative clauses, which is necessary to achieve scores of 7.0 and above. The candidate needs to practice embedding ideas using complex structures to demonstrate flexibility.",
    vocabulary:
      "The candidate uses adequate vocabulary for the topic, including 'wedding planner' and specific terms like 'designed' (the cake). However, the vocabulary tends to be basic and common, relying heavily on simple adjectives such as 'amazing,' 'beautiful,' 'lovely,' and 'nice.' There is no evidence of sophisticated or low-frequency vocabulary, precise collocations, or idiomatic language (e.g., 'tying the knot,' 'a momentous occasion'). To improve, the candidate should aim to replace vague adjectives (like 'nice') with more precise descriptive language and incorporate a wider range of academic or specialized terminology.",
    overall:
      "The candidate delivers a clear, accurate, and relevant response. The main strength is the high level of accuracy in basic grammar. The primary limitation is the lack of complexity and extension across all criteria. To reach a higher band, the candidate must actively practice extending their answers using a variety of complex sentence structures and demonstrating a broader, more nuanced vocabulary repertoire. The response is currently too short and structurally simple for advanced levels.",
    fluency:
      "Fluency is strong, with speech delivered at a natural pace. There is minimal hesitation.",
    pronunciation:
      "Pronunciation has some inaccuracies with certain vowel sounds and word stress, which occasionally impacts clarity.",
  },
};