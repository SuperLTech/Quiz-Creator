import { useState } from 'react';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import data from './data.json'

function App() {
  const [quizzes, setQuizzes] = useState([data]);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
  };

  const handleSaveQuiz = (editedQuiz) => {
    if (currentQuiz) {
      const updatedQuizzes = quizzes?.map((quiz) =>
        quiz.id === currentQuiz.id ? editedQuiz : quiz
      );
      setQuizzes(updatedQuizzes);
    } else {
      const newQuiz = { ...editedQuiz, id: Date.now() };
      setQuizzes([...quizzes, newQuiz]);
    }
    setCurrentQuiz(null);
  };

  return (
    <div >
      <QuizList quizzes={quizzes} onEditQuiz={handleEditQuiz} />
      <QuizForm quiz={currentQuiz} onSaveQuiz={handleSaveQuiz} />
    </div>
  );
}

export default App;
