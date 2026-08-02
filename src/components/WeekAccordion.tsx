// src/components/WeekAccordion.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Flame, Ban, Filter, Moon, Briefcase, Sword } from 'lucide-react';
import { useAppContext } from '../store';
import { TaskCard } from './TaskCard';
import type { TaskCategory, WeekPlan } from '../types';

const PHASE_COLORS: Record<number, string> = {
  1: '#6366F1', 2: '#10B981', 3: '#F59E0B', 4: '#EF4444',
};
const PHASE_LABELS: Record<number, string> = {
  1: 'Phase 1 · Foundation Core',
  2: 'Phase 2 · Programming & Theory',
  3: 'Phase 3 · Systems Architecture',
  4: 'Phase 4 · Mock Marathon',
};

type ZoneFilter = 'all' | TaskCategory;
type StatusFilter = 'all' | 'pending' | 'completed';

interface Props {
  activePhase: number;
}

export const WeekAccordion = ({ activePhase }: Props) => {
  const { state } = useAppContext();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const weeks = activePhase === 0 ? state.weeks : state.weeks.filter((w) => w.phaseId === activePhase);

  const filterTasks = (week: WeekPlan) => {
    return week.tasks.filter((t) => {
      const zoneOk = zoneFilter === 'all' || t.category === zoneFilter;
      const statusOk = statusFilter === 'all' || (statusFilter === 'completed' ? t.completed : !t.completed);
      return zoneOk && statusOk;
    });
  };

  const toggle = (n: number) => setExpanded(expanded === n ? null : n);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '13px' }}>
          <Filter size={14} /> Filters:
        </div>
        {/* Zone */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {([
            { val: 'all', label: 'All Zones', icon: null, color: '#6366F1' },
            { val: 'night_deep_focus', label: 'Night Focus', icon: <Moon size={12} />, color: '#6366F1' },
            { val: 'office_micro_learning', label: 'Office Micro', icon: <Briefcase size={12} />, color: '#10B981' },
            { val: 'weekend_war', label: 'Weekend War', icon: <Sword size={12} />, color: '#F59E0B' },
          ] as const).map((opt) => (
            <button
              key={opt.val}
              onClick={() => setZoneFilter(opt.val as ZoneFilter)}
              style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
                border: `1px solid ${zoneFilter === opt.val ? opt.color : '#334155'}`,
                background: zoneFilter === opt.val ? `${opt.color}20` : 'transparent',
                color: zoneFilter === opt.val ? opt.color : '#64748B',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
        {/* Status */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'pending', 'completed'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
                border: `1px solid ${statusFilter === s ? '#6366F1' : '#334155'}`,
                background: statusFilter === s ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: statusFilter === s ? '#6366F1' : '#64748B',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Week Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {weeks.map((week) => {
          const isOpen = expanded === week.weekNumber;
          const filteredTasks = filterTasks(week);
          const totalTasks = week.tasks.length;
          const doneTasks = week.tasks.filter((t) => t.completed).length;
          const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
          const phaseColor = PHASE_COLORS[week.phaseId] ?? '#6366F1';
          const isCurrentWeek = new Date() >= new Date(week.startDate) && new Date() <= new Date(week.endDate);

          return (
            <div
              key={week.weekNumber}
              style={{
                background: '#1E293B',
                border: `1px solid ${isCurrentWeek ? phaseColor : '#334155'}`,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: isCurrentWeek ? `0 0 0 1px ${phaseColor}40` : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggle(week.weekNumber)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Week number pill */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                  background: `${phaseColor}20`, border: `1px solid ${phaseColor}40`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '10px', color: phaseColor, fontWeight: 600, textTransform: 'uppercase' }}>Wk</span>
                  <span style={{ fontSize: '18px', color: phaseColor, fontWeight: 800, lineHeight: 1, fontFamily: 'monospace' }}>{week.weekNumber}</span>
                </div>

                {/* Title block */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#F1F5F9' }}>{week.title}</span>
                    {isCurrentWeek && (
                      <span style={{ padding: '1px 8px', borderRadius: '20px', background: `${phaseColor}20`, color: phaseColor, fontSize: '10px', fontWeight: 700, border: `1px solid ${phaseColor}50` }}>
                        ⚡ CURRENT WEEK
                      </span>
                    )}
                    {week.iitMadrasPivots && week.iitMadrasPivots.length > 0 && (
                      <span style={{ padding: '1px 8px', borderRadius: '20px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '10px', fontWeight: 700, border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        🔥 IIT Madras Pivot
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={11} />
                    {week.startDate} → {week.endDate}
                    <span style={{ color: '#334155' }}>·</span>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>{PHASE_LABELS[week.phaseId]}</span>
                  </div>
                  {/* Mini progress */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <div style={{ flex: 1, background: '#0B0F17', borderRadius: '4px', height: '4px', overflow: 'hidden', maxWidth: '120px' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: phaseColor, borderRadius: '4px', transition: 'width 0.3s ease' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>{doneTasks}/{totalTasks}</span>
                  </div>
                </div>

                {/* Chevron */}
                <div style={{ color: '#475569', flexShrink: 0 }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #334155' }}>
                  {/* Mission + Syllabus */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px', marginTop: '16px' }}>
                    <div style={{ flex: 1, minWidth: '200px', background: '#0B0F17', borderRadius: '8px', padding: '12px', border: '1px solid #334155' }}>
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: phaseColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Mission Objective</p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8' }}>{week.missionObjective}</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px', background: '#0B0F17', borderRadius: '8px', padding: '12px', border: '1px solid #334155' }}>
                      <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Syllabus Focus</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {week.syllabusFocus.map((s) => (
                          <span key={s} style={{ padding: '2px 8px', borderRadius: '20px', background: '#1E293B', color: '#94A3B8', fontSize: '11px', border: '1px solid #334155' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pivot / Deprioritized badges */}
                  {week.iitMadrasPivots && week.iitMadrasPivots.length > 0 && (
                    <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <Flame size={13} color="#EF4444" />
                      <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>IIT Madras Pivots:</span>
                      {week.iitMadrasPivots.map((p) => (
                        <span key={p} style={{ padding: '2px 8px', borderRadius: '20px', background: 'rgba(239,68,68,0.08)', color: '#EF4444', fontSize: '11px', border: '1px solid rgba(239,68,68,0.25)' }}>🔥 {p}</span>
                      ))}
                    </div>
                  )}
                  {week.deprioritizedTopics && week.deprioritizedTopics.length > 0 && (
                    <div style={{ marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <Ban size={13} color="#475569" />
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 700 }}>Deprioritized:</span>
                      {week.deprioritizedTopics.map((d) => (
                        <span key={d} style={{ padding: '2px 8px', borderRadius: '20px', background: 'rgba(71,85,105,0.2)', color: '#475569', fontSize: '11px', border: '1px solid #334155', textDecoration: 'line-through' }}>🚫 {d}</span>
                      ))}
                    </div>
                  )}

                  {/* Tasks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredTasks.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#475569', fontSize: '13px', padding: '20px' }}>No tasks match the current filters.</p>
                    ) : (
                      filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} weekNumber={week.weekNumber} />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
