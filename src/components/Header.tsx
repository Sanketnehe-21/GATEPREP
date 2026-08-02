// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Zap, Target, Clock, TrendingUp } from 'lucide-react';
import { useAppContext } from '../store';

const GATE_DATE = new Date('2027-02-01T09:00:00');

const PHASES = [
  { id: 1, label: 'Phase 1', subtitle: 'Foundation Core', weeks: 'Wk 1–4', color: '#6366F1', bg: 'rgba(99,102,241,0.15)' },
  { id: 2, label: 'Phase 2', subtitle: 'Programming & Theory', weeks: 'Wk 5–12', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  { id: 3, label: 'Phase 3', subtitle: 'Systems Architecture', weeks: 'Wk 13–20', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { id: 4, label: 'Phase 4', subtitle: 'Mock Marathon', weeks: 'Wk 21–24', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
];

export const Header = ({ activePhase, setActivePhase }: { activePhase: number; setActivePhase: (p: number) => void }) => {
  const { state } = useAppContext();
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = GATE_DATE.getTime() - Date.now();
      setDaysLeft(Math.max(0, Math.ceil(diff / 86400000)));
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  const allTasks = state.weeks.flatMap((w) => w.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pyqPct = Math.min(100, Math.round((state.stats.totalPyqsSolved / state.stats.targetPyqs) * 100));

  return (
    <header style={{ background: 'linear-gradient(180deg, #0F172A 0%, #0B0F17 100%)', borderBottom: '1px solid #334155' }}>
      {/* Top bar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={20} color="#fff" />
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#F1F5F9', letterSpacing: '-0.5px' }}>GATE CS 2027</h1>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Execution Engine & Syllabus Tracker</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* Countdown */}
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', padding: '10px 16px', textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#6366F1', fontFamily: 'monospace', lineHeight: 1 }}>{daysLeft}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <Clock size={10} /> DAYS LEFT
              </div>
            </div>

            {/* PYQ Counter */}
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '12px', padding: '10px 16px', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', fontFamily: 'monospace', lineHeight: 1 }}>
                {state.stats.totalPyqsSolved}<span style={{ fontSize: '14px', color: '#64748B' }}>/{state.stats.targetPyqs}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <Target size={10} /> PYQs SOLVED
              </div>
              <div style={{ marginTop: '4px', background: '#1E293B', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pyqPct}%`, background: '#F59E0B', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Tasks Progress */}
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '10px 16px', textAlign: 'center', minWidth: '120px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', fontFamily: 'monospace', lineHeight: 1 }}>
                {completedTasks}<span style={{ fontSize: '14px', color: '#64748B' }}>/{totalTasks}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <TrendingUp size={10} /> TASKS DONE
              </div>
              <div style={{ marginTop: '4px', background: '#1E293B', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progressPct}%`, background: '#10B981', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Progress</span>
            <span style={{ fontSize: '13px', color: '#6366F1', fontWeight: 700 }}>{progressPct}%</span>
          </div>
          <div style={{ background: '#1E293B', borderRadius: '8px', height: '8px', overflow: 'hidden', border: '1px solid #334155' }}>
            <div style={{
              height: '100%', width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #6366F1, #10B981)',
              borderRadius: '8px',
              transition: 'width 0.6s ease',
              boxShadow: '0 0 12px rgba(99,102,241,0.5)',
            }} />
          </div>
        </div>

        {/* Phase Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {PHASES.map((p) => {
            const isActive = activePhase === p.id;
            const phaseWeeks = state.weeks.filter((w) => w.phaseId === p.id);
            const phaseTasks = phaseWeeks.flatMap((w) => w.tasks);
            const phaseDone = phaseTasks.filter((t) => t.completed).length;
            const phasePct = phaseTasks.length > 0 ? Math.round((phaseDone / phaseTasks.length) * 100) : 0;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                style={{
                  flex: '0 0 auto',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? p.color : '#334155'}`,
                  background: isActive ? p.bg : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  minWidth: '140px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, color: isActive ? p.color : '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.label}</div>
                <div style={{ fontSize: '12px', color: isActive ? '#F1F5F9' : '#94A3B8', marginTop: '2px' }}>{p.subtitle}</div>
                <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>{p.weeks}</div>
                <div style={{ marginTop: '6px', background: '#0B0F17', borderRadius: '4px', height: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${phasePct}%`, background: p.color, borderRadius: '4px' }} />
                </div>
                <div style={{ fontSize: '10px', color: p.color, marginTop: '2px', fontFamily: 'monospace' }}>{phasePct}%</div>
              </button>
            );
          })}
          <button
            onClick={() => setActivePhase(0)}
            style={{
              flex: '0 0 auto',
              padding: '10px 16px',
              borderRadius: '10px',
              border: `1px solid ${activePhase === 0 ? '#6366F1' : '#334155'}`,
              background: activePhase === 0 ? 'rgba(99,102,241,0.1)' : 'transparent',
              cursor: 'pointer',
              fontSize: '12px',
              color: activePhase === 0 ? '#6366F1' : '#64748B',
              fontWeight: 600,
            }}
          >
            All Phases
          </button>
        </div>
      </div>
    </header>
  );
};
