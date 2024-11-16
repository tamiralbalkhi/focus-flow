import React from 'react';
import { CheckCircle2, Timer } from 'lucide-react';
import { useStore } from '../store';

export function TaskHistory() {
  const completedTasks = useStore((state) => state.getCompletedTasks());

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Task History</h2>
      
      <div className="space-y-4">
        {completedTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No completed tasks yet. Start working on your tasks!
          </p>
        ) : (
          completedTasks
            .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0))
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <div>
                    <span className="font-medium">{task.title}</span>
                    <div className="text-sm text-gray-500">
                      Completed: {formatDate(task.completedAt!)}
                    </div>
                  </div>
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
  );
}