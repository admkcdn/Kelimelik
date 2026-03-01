
import { useState } from 'react';
import { Word, vocabulary } from '../data/vocabulary';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import { ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react';

interface WeekViewProps {
  week: number;
  onBack: () => void;
}

export default function WeekView({ week, onBack }: WeekViewProps) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  const words = vocabulary.filter((w) => w.week === week);

  const handleNextCard = () => {
    if (currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleQuizFinish = (score: number, total: number) => {
    setQuizScore({ score, total });
  };

  const resetQuiz = () => {
    setQuizScore(null);
    setMode('quiz');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Weeks
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Week {week}</h2>
        <div className="w-24"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setMode('learn')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'learn'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} /> Learn
            </div>
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'quiz'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <BrainCircuit size={16} /> Quiz
            </div>
          </button>
        </div>
      </div>

      {mode === 'learn' && (
        <div className="flex flex-col items-center">
          <div className="mb-4 text-sm text-gray-500">
            Card {currentCardIndex + 1} of {words.length}
          </div>
          <Flashcard
            word={words[currentCardIndex]}
            onNext={handleNextCard}
            onPrev={handlePrevCard}
            isFirst={currentCardIndex === 0}
            isLast={currentCardIndex === words.length - 1}
          />
        </div>
      )}

      {mode === 'quiz' && !quizScore && (
        <Quiz
          words={words}
          onFinish={handleQuizFinish}
          onExit={() => setMode('learn')}
        />
      )}

      {mode === 'quiz' && quizScore && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h3>
          <div className="text-6xl font-black text-indigo-600 mb-6">
            {Math.round((quizScore.score / quizScore.total) * 100)}%
          </div>
          <p className="text-gray-600 mb-8">
            You got {quizScore.score} out of {quizScore.total} correct.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => setMode('learn')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Review Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
