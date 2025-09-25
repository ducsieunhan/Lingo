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
