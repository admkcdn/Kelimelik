
import { useState, useEffect, useMemo } from 'react';
import { Word } from '../data/vocabulary';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

interface QuizProps {
  words: Word[];
  onFinish: (score: number, total: number) => void;
  onExit: () => void;
}

export default function Quiz({ words, onFinish, onExit }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  // Shuffle the words on mount
  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, [words]);

  const currentWord = shuffledWords[currentIndex];

  // Generate options
  const options = useMemo(() => {
    if (!currentWord) return [];
    
    const distractors = words
      .filter((w) => w.en !== currentWord.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => w.tr);

    const allOptions = [currentWord.tr, ...distractors];
    return allOptions.sort(() => Math.random() - 0.5);
  }, [currentWord, words]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    const correct = answer === currentWord.tr;
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
    }

    // Auto advance after delay
    setTimeout(() => {
      if (currentIndex < shuffledWords.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onFinish(score + (correct ? 1 : 0), shuffledWords.length);
      }
    }, 1500);
  };

  if (!currentWord) return <div className="p-8 text-center">Loading quiz...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          Question {currentIndex + 1} of {shuffledWords.length}
        </span>
        <span className="text-sm font-medium text-indigo-600">
          Score: {score}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center border border-gray-100">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          What is the meaning of
        </span>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{currentWord.en}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode='wait'>
          {options.map((option, idx) => {
            let stateClass = "bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
            
            if (selectedAnswer) {
              if (option === currentWord.tr) {
                stateClass = "bg-green-100 border-green-500 text-green-800";
              } else if (option === selectedAnswer) {
                stateClass = "bg-red-100 border-red-500 text-red-800";
              } else {
                stateClass = "bg-gray-50 border-gray-200 opacity-50";
              }
            }

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center justify-between ${stateClass}`}
              >
                <span>{option}</span>
                {selectedAnswer && option === currentWord.tr && (
                  <CheckCircle className="text-green-600" size={20} />
                )}
                {selectedAnswer && option === selectedAnswer && option !== currentWord.tr && (
                  <XCircle className="text-red-600" size={20} />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onExit}
          className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-2 transition-colors"
        >
          Exit Quiz
        </button>
      </div>
    </div>
  );
}
