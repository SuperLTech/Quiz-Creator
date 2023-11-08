import React, { useState } from 'react';

function QuizForm({ quiz, onSaveQuiz }) {
  const initialQuestion = {
    text: '',
    answers: [],
  };

  const initialAnswer = {
    text: '',
    is_true: false,
  };

  const [editedQuiz, setEditedQuiz] = useState(quiz || null);
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);

  const addQuestion = () => {
    const tempQuestionId = `temp_question_${Math.floor(Math.random() * 100000)}`;
    setEditedQuiz({
      ...editedQuiz,
      questions_answers: [
        ...(editedQuiz.questions_answers || []),
        { ...question, id: tempQuestionId },
      ],
    });
    setQuestion(initialQuestion);
  };

  const addAnswer = () => {
    const tempAnswerId = `temp_answer_${Math.floor(Math.random() * 100000)}`;
    setQuestion({
      ...question,
      answers: [...question.answers, { ...answer, id: tempAnswerId }],
    });
    setAnswer(initialAnswer);
  };

  const handleSave = () => {
    if (editedQuiz) {
      const sanitizedQuiz = {
        ...editedQuiz,
        id: null,
        questions_answers: (editedQuiz.questions_answers || []).map((qa) => {
          const sanitizedQA = { ...qa, id: null };
          if (qa.answers) {
            sanitizedQA.answers = qa.answers.map((a) => ({ ...a, id: null }));
          }
          return sanitizedQA;
        }),
      };
      onSaveQuiz(sanitizedQuiz);
    }
  };

  const handleTitleChange = (e) => {
    if (!editedQuiz) {
      setEditedQuiz({
        title: e.target.value,
        questions_answers: [],
      });
    } else {
      setEditedQuiz({
        ...editedQuiz,
        title: e.target.value,
      });
    }
  };

  return (
    <div>
      <h2>{quiz ? 'Edit Quiz' : 'Create Quiz'}</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          value={editedQuiz ? editedQuiz.title : ''}
          onChange={handleTitleChange}
        />
        {/* Other quiz details (description, url) */}
        <label>Questions:</label>
        <input
          type="text"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
        />
        <button onClick={addQuestion}>Add Question</button>
        <ul>
          {editedQuiz &&
            editedQuiz.questions_answers &&
            editedQuiz.questions_answers.map((q, index) => (
              <li key={q.id || index}>{q.text}</li>
            ))}
          </ul>
          <label>Answers:</label>
          <input
            type="text"
            value={answer.text}
            onChange={(e) => setAnswer({ ...answer, text: e.target.value })}
          />
          <label>Is True:</label>
          <input
            type="checkbox"
            checked={answer.is_true}
            onChange={(e) => setAnswer({ ...answer, is_true: e.target.checked })}
          />
          <button onClick={addAnswer}>Add Answer</button>
          <ul>
            {question &&
              question.answers &&
              question.answers.map((ans, index) => (
                <li key={ans.id || index}>
                  {ans.text} (Is True: {ans.is_true ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
        <button onClick={handleSave}>Save Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;
