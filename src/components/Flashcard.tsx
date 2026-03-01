
import { useState } from 'react';
import { motion } from 'motion/react';
import { Word } from '../data/vocabulary';
import { Check, X, RotateCw, ChevronRight, ChevronLeft } from 'lucide-react';

interface FlashcardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  onMarkKnown?: () => void;
  onMarkUnknown?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function Flashcard({
  word,
  onNext,
  onPrev,
  onMarkKnown,
  onMarkUnknown,
  isFirst,
  isLast,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Reset flip state when word changes
  if (word.en !== word.en) {
      setIsFlipped(false);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <div className="relative w-full aspect-[4/3] cursor-pointer [perspective:1000px]" onClick={handleFlip}>
        <motion.div
          className="w-full h-full relative [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center [backface-visibility:hidden] p-8">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">{word.type}</span>
            <h2 className="text-4xl font-bold text-gray-800 text-center">{word.en}</h2>
            <p className="absolute bottom-6 text-gray-400 text-sm flex items-center gap-2">
              <RotateCw size={14} /> Tap to flip
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full bg-indigo-600 rounded-2xl shadow-xl flex flex-col items-center justify-center [backface-visibility:hidden] p-8 text-white"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <span className="text-sm font-medium text-indigo-200 uppercase tracking-wider mb-4">Meaning</span>
            <h2 className="text-2xl font-bold text-center leading-relaxed">{word.tr}</h2>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); setIsFlipped(false); }}
          disabled={isFirst}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-4">
          {onMarkUnknown && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkUnknown(); onNext(); setIsFlipped(false); }}
              className="px-6 py-3 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <X size={20} /> Still Learning
            </button>
          )}
          {onMarkKnown && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkKnown(); onNext(); setIsFlipped(false); }}
              className="px-6 py-3 rounded-xl bg-green-100 text-green-600 font-medium hover:bg-green-200 transition-colors flex items-center gap-2"
            >
              <Check size={20} /> Got It
            </button>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); setIsFlipped(false); }}
          disabled={isLast}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
