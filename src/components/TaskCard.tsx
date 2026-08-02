// src/components/TaskCard.tsx
import React, { useState } from 'react';
import { Moon, Briefcase, Sword, BookOpen, CheckCircle, Circle, Target } from 'lucide-react';
import type { Task, TaskCategory } from '../types';
import { useAppContext } from '../store';
import { ScratchpadModal } from './ScratchpadModal';

const ZONE_CONFIG: Record<TaskCategory, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  night_deep_focus: { icon: <Moon size={14} />, color: '#6366F1', bg: 'rgba(99,102,241,0.12)', label: 'Night Focus' },
  office_micro_learning: { icon: <Briefcase size={14} />, color: '#10B981', bg: 'rgba(16,185,129,0.12)', label: 'Office Micro' },
  weekend_war: { icon: <Sword size={14} />, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'Weekend War' },
};

interface Props {
  task: Task;
  weekNumber: number;
}

export const TaskCard = ({ task, weekNumber }: Props) => {
  const { dispatch } = useAppContext();
  const [showScratchpad, setShowScratchpad] = useState(false);
  const zone = ZONE_CONFIG[task.category];

  const toggle = () => dispatch({ type: 'TOGGLE_TASK', weekNumber, taskId: task.id });

  return (
    <>
      <div
        style={{
          background: task.completed ? 'rgba(16,185,129,0.05)' : '#1E293B',
          border: `1px solid ${task.completed ? 'rgba(16,185,129,0.3)' : '#334155'}`,
          borderRadius: '10px',
          padding: '14px 16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          transition: 'all 0.2s ease',
          opacity: task.completed ? 0.75 : 1,
        }}
      >
        {/* Checkbox */}
        <button
          onClick={toggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: task.completed ? '#10B981' : '#475569', flexShrink: 0, marginTop: '2px' }}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '14px', fontWeight: 600, color: task.completed ? '#64748B' : '#F1F5F9',
              textDecoration: task.completed ? 'line-through' : 'none',
              flex: 1,
            }}>
              {task.title}
            </span>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0, flexWrap: 'wrap' }}>
              {/* Zone badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '2px 8px', borderRadius: '20px',
                background: zone.bg, color: zone.color,
                fontSize: '11px', fontWeight: 600, border: `1px solid ${zone.color}40`,
              }}>
                {zone.icon} {zone.label}
              </span>
              {/* PYQ badge */}
              {task.pyqTarget && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '2px 8px', borderRadius: '20px',
                  background: 'rgba(245,158,11,0.1)', color: '#F59E0B',
                  fontSize: '11px', fontWeight: 600, border: '1px solid rgba(245,158,11,0.3)',
                }}>
                  <Target size={10} /> {task.pyqTarget} PYQs
                </span>
              )}
            </div>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
            {task.description}
          </p>
          {/* Notes preview */}
          {task.notes && (
            <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#475569', fontStyle: 'italic', background: '#0B0F17', padding: '4px 8px', borderRadius: '6px', borderLeft: '2px solid #334155' }}>
              📝 {task.notes.slice(0, 80)}{task.notes.length > 80 ? '…' : ''}
            </p>
          )}
          {/* Scratchpad button */}
          <button
            onClick={() => setShowScratchpad(true)}
            style={{
              marginTop: '8px', background: 'none', border: '1px solid #334155',
              color: '#64748B', cursor: 'pointer', padding: '3px 10px', borderRadius: '6px',
              fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#6366F1'; (e.target as HTMLElement).style.color = '#6366F1'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#334155'; (e.target as HTMLElement).style.color = '#64748B'; }}
          >
            <BookOpen size={11} /> {task.notes ? 'Edit Notes' : 'Add Notes'}
          </button>
          {task.completedAt && (
            <span style={{ fontSize: '10px', color: '#10B981', marginLeft: '8px' }}>
              ✓ {new Date(task.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {showScratchpad && (
        <ScratchpadModal task={task} weekNumber={weekNumber} onClose={() => setShowScratchpad(false)} />
      )}
    </>
  );
};
