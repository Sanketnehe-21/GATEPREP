// src/components/ScratchpadModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';
import type { Task } from '../types';
import { useAppContext } from '../store';

interface Props {
  task: Task;
  weekNumber: number;
  onClose: () => void;
}

export const ScratchpadModal = ({ task, weekNumber, onClose }: Props) => {
  const { dispatch } = useAppContext();
  const [notes, setNotes] = useState(task.notes ?? '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const save = () => {
    dispatch({ type: 'UPDATE_NOTE', weekNumber, taskId: task.id, notes });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '560px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #334155', background: 'rgba(99,102,241,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="#6366F1" />
            <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '15px' }}>Focus Scratchpad</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Task title */}
        <div style={{ padding: '12px 20px', background: '#0B0F17', borderBottom: '1px solid #334155' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>Task: <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{task.title}</span></p>
        </div>

        {/* Textarea */}
        <div style={{ padding: '16px 20px' }}>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="📝 Write equations, formulas, key insights, or quick notes here..."
            autoFocus
            style={{
              width: '100%', minHeight: '200px', background: '#0B0F17', border: '1px solid #334155',
              borderRadius: '8px', padding: '12px', color: '#F1F5F9', fontSize: '14px',
              lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
            onFocus={e => { e.target.style.borderColor = '#6366F1'; }}
            onBlur={e => { e.target.style.borderColor = '#334155'; }}
          />
          <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#475569' }}>Auto-saved to this task when you click Save.</p>
        </div>

        {/* Actions */}
        <div style={{ padding: '0 20px 16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #334155', background: 'transparent', color: '#94A3B8', cursor: 'pointer', fontSize: '13px' }}
          >
            Cancel
          </button>
          <button
            onClick={save}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={14} /> Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};
