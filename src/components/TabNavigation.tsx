import React from 'react';
import { Calendar as CalendarIcon, CheckSquare, History } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-gray-200 rounded-lg p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-6 py-2 rounded-md transition-colors ${
              activeTab === id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}