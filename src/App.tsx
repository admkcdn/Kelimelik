
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import WeekView from './components/WeekView';
import { BookOpen } from 'lucide-react';

export default function App() {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  // We have data for Weeks 1-5
  const availableWeeks = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
              <BookOpen size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Kelime Detoksu
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentWeek ? (
          <WeekView week={currentWeek} onBack={() => setCurrentWeek(null)} />
        ) : (
          <Dashboard weeks={availableWeeks} onSelectWeek={setCurrentWeek} />
        )}
      </main>
      
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Kelime Detoksu. All rights reserved.</p>
      </footer>
    </div>
  );
}
