import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Timer } from 'lucide-react';
import { useStore } from '../store';
import { DateStats, Task } from '../types';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const getTasksByDate = useStore((state) => state.getTasksByDate);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDateStats = (date: Date): DateStats => {
    const tasks = getTasksByDate(date);
    return {
      completedTasks: tasks.filter((t) => t.completed).length,
      totalPomodoros: tasks.reduce((acc, t) => acc + t.completedPomodoros, 0),
    };
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const days = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const selectedTasks: Task[] = selectedDate ? getTasksByDate(selectedDate) : [];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Productivity Calendar</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-semibold">
              {monthName} {year}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {Array.from({ length: days }).map((_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            const stats = getDateStats(date);
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square p-2 border rounded-lg transition-colors ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : isToday
                    ? 'border-indigo-500'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium mb-1">{i + 1}</div>
                {stats.completedTasks > 0 && (
                  <div className="text-xs text-gray-600">
                    ✓ {stats.completedTasks}
                  </div>
                )}
                {stats.totalPomodoros > 0 && (
                  <div className="text-xs text-indigo-600">
                    🍅 {stats.totalPomodoros}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">{formatDate(selectedDate)}</h3>
          <div className="space-y-4">
            {selectedTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No tasks for this day
              </p>
            ) : (
              selectedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className={task.completed ? 'text-green-500' : 'text-gray-300'}
                      size={24}
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Timer size={16} />
                    <span>
                      {task.completedPomodoros}/{task.pomodoros}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}