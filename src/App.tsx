import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import { TaskHistory } from './components/TaskHistory';
import { TabNavigation } from './components/TabNavigation';
import { Brain } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <Calendar />;
      case 'history':
        return <TaskHistory />;
      default:
        return <TaskList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain size={40} className="text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Focus Flow</h1>
          </div>
          <p className="text-gray-600">Stay productive with the Pomodoro Technique</p>
        </header>

        <div className="max-w-4xl mx-auto">
          <Timer />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}