import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Timer } from 'lucide-react';
import { useStore } from '../store';

export function TaskList() {
  const { tasks, addTask, toggleTask, incrementPomodoro } = useStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPomodoros, setNewTaskPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), newTaskPomodoros);
      setNewTaskTitle('');
      setNewTaskPomodoros(1);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    toggleTask(taskId);
    incrementPomodoro(taskId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            value={newTaskPomodoros}
            onChange={(e) => setNewTaskPomodoros(Math.max(1, parseInt(e.target.value)))}
            min="1"
            className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTaskToggle(task.id)}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button>
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
        ))}
      </div>
    </div>
  );
}