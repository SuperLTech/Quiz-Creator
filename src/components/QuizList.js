import React, { useState } from 'react';

function QuizList({ quizzes }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const handleAnswerSelection = (quizId, questionIndex, answerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [quizId]: {
        ...prevSelectedAnswers[quizId],
        [questionIndex]: answerIndex,
      },
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    for (const quizId in selectedAnswers) {
      const quiz = quizzes.find((quiz) => quiz.id === parseInt(quizId, 10));
      if (quiz) {
        for (const questionIndex in selectedAnswers[quizId]) {
          const selectedAnswerIndex = selectedAnswers[quizId][questionIndex];
          if (
            selectedAnswerIndex !== undefined &&
            quiz.questions_answers[questionIndex].answers[selectedAnswerIndex].is_true
          ) {
            correct++;
          }
        }
      }
    }
    setTotalCorrect(correct);
    setShowFeedback(true);
  };

  return (
    <div>
      <h2>Quiz List</h2>
      {quizzes.length &&
        quizzes.map((quiz) => (
          <div key={quiz.id}>
            <h1>Title: {quiz.title}</h1>
            <p>Description: {quiz.description}</p>
            <p>Final Score: {quiz.final_score ? quiz.final_score : totalCorrect}</p>
            <p>
              Link: <a href={quiz.url}>{quiz.url}</a>
            </p>
            <h2>Questions</h2>
            <ul>
              {quiz.questions_answers?.map((question, questionIndex) => (
                <li key={questionIndex}>
                  <strong>Question {questionIndex + 1}:</strong> {question.text}
                  <h4>Answers</h4>
                  <ul>
                    {question.answers.map((answer, answerIndex) => (
                      <li key={answerIndex}>
                        <input
                          type="radio"
                          name={`quiz_${quiz.id}_question_${questionIndex}`}
                          checked={
                            selectedAnswers[quiz.id] &&
                            selectedAnswers[quiz.id][questionIndex] === answerIndex
                          }
                          onChange={() =>
                            handleAnswerSelection(quiz.id, questionIndex, answerIndex)
                          }
                        />
                        {answer.is_true ? 'Correct Answer' : 'Incorrect Answer'}: {answer.text}
                      </li>
                    ))}
                  </ul>
                  {showFeedback && (
                    <p>
                      {selectedAnswers[quiz.id] &&
                      selectedAnswers[quiz.id][questionIndex] !== undefined ? (
                        question.answers[
                          selectedAnswers[quiz.id][questionIndex]
                        ].is_true ? (
                          <span style={{ color: 'green' }}>
                            {question.feedback_true}
                          </span>
                        ) : (
                          <span style={{ color: 'red' }}>
                            {question.feedback_false}
                          </span>
                        )
                      ) : (
                        'Select an answer'
                      )}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={calculateScore}>Submit</button>
          </div>
        ))}
    </div>
  );
}

export default QuizList;
