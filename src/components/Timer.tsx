import React, { useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { useStore } from '../store';

export function Timer() {
  const { timer, setTimer } = useStore();
  const { minutes, seconds, isActive, mode } = timer;

  const toggleTimer = () => setTimer({ isActive: !isActive });

  const resetTimer = () => {
    setTimer({
      minutes: 0,
      seconds: mode === 'work' ? 10 : 5,
      isActive: false,
    });
  };

  const stopTimer = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setTimer({
      mode: newMode,
      minutes: 0,
      seconds: newMode === 'work' ? 10 : 5,
      isActive: false,
    });
  };

  const switchMode = useCallback(() => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setTimer({
      mode: newMode,
      minutes: 0,
      seconds: newMode === 'work' ? 10 : 5,
      isActive: false,
    });
  }, [mode, setTimer]);

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            switchMode();
            return;
          }
          setTimer({ minutes: minutes - 1, seconds: 59 });
        } else {
          setTimer({ seconds: seconds - 1 });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, setTimer, switchMode]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">
          {mode === 'work' ? 'Work Time' : 'Break Time'}
        </h2>
        <div className="text-6xl font-mono mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            {isActive ? (
              <>
                <Pause size={20} /> Pause
              </>
            ) : (
              <>
                <Play size={20} /> Start
              </>
            )}
          </button>
          <button
            onClick={stopTimer}
            className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
          >
            <Square size={20} /> Stop
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={20} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}