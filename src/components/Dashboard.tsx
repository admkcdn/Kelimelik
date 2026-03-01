
import { Word } from '../data/vocabulary';
import { BookOpen, BrainCircuit, Trophy, Star } from 'lucide-react';

interface DashboardProps {
  weeks: number[];
  onSelectWeek: (week: number) => void;
}

export default function Dashboard({ weeks, onSelectWeek }: DashboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Kelime Detoksu
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master 750 words in 5 weeks. Select a week to start your journey.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => onSelectWeek(week)}
            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-black text-indigo-900">{week}</span>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <BookOpen className="text-indigo-600 group-hover:text-white transition-colors duration-300" size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Week {week}</h3>
              <p className="text-sm text-gray-500 mb-6">
                Focus on high-frequency nouns, verbs, and adjectives.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:translate-x-1 transition-transform duration-300">
                Start Learning <span className="text-lg">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-indigo-50 rounded-2xl">
          <BrainCircuit className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-900 mb-2">Smart Flashcards</h4>
          <p className="text-sm text-gray-600">Spaced repetition system to maximize retention.</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-2xl">
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-900 mb-2">Gamified Quizzes</h4>
          <p className="text-sm text-gray-600">Test your knowledge and track your progress.</p>
        </div>
        <div className="p-6 bg-amber-50 rounded-2xl">
          <Star className="w-8 h-8 text-amber-600 mx-auto mb-4" />
          <h4 className="font-bold text-gray-900 mb-2">Progress Tracking</h4>
          <p className="text-sm text-gray-600">See how many words you've mastered over time.</p>
        </div>
      </div>
    </div>
  );
}
