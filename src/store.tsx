// src/store.tsx
import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import type { AppState } from './types';
import { loadState, saveState } from './storage';
import { seedWeeks } from './data/seed';

const DEFAULT_STATE: AppState = {
  weeks: seedWeeks,
  stats: { totalPyqsSolved: 0, targetPyqs: 1260, streakDays: 0, lastActiveDate: '' },
};

type Action =
  | { type: 'INIT'; payload: AppState }
  | { type: 'TOGGLE_TASK'; weekNumber: number; taskId: string }
  | { type: 'UPDATE_NOTE'; weekNumber: number; taskId: string; notes: string }
  | { type: 'IMPORT'; payload: AppState };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'IMPORT':
      return action.payload;
    case 'TOGGLE_TASK': {
      const weeks = state.weeks.map((w) => {
        if (w.weekNumber !== action.weekNumber) return w;
        return {
          ...w,
          tasks: w.tasks.map((t) => {
            if (t.id !== action.taskId) return t;
            const completed = !t.completed;
            return { ...t, completed, completedAt: completed ? new Date().toISOString() : undefined };
          }),
        };
      });
      const allTasks = weeks.flatMap((w) => w.tasks);
      const totalPyqsSolved = allTasks.filter((t) => t.completed && t.pyqTarget).reduce((acc, t) => acc + (t.pyqTarget ?? 0), 0);
      return { ...state, weeks, stats: { ...state.stats, totalPyqsSolved, lastActiveDate: new Date().toISOString().split('T')[0] } };
    }
    case 'UPDATE_NOTE': {
      const weeks = state.weeks.map((w) => {
        if (w.weekNumber !== action.weekNumber) return w;
        return { ...w, tasks: w.tasks.map((t) => (t.id === action.taskId ? { ...t, notes: action.notes } : t)) };
      });
      return { ...state, weeks };
    }
    default:
      return state;
  }
}

interface CtxVal { state: AppState; dispatch: React.Dispatch<Action> }
const AppContext = createContext<CtxVal | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  useEffect(() => {
    const saved = loadState<AppState>();
    if (saved && saved.weeks && saved.weeks.length > 0) {
      dispatch({ type: 'INIT', payload: saved });
    }
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
};

export type { Action };
