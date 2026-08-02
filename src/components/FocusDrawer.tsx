// src/components/FocusDrawer.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, ChevronUp, ChevronDown, Moon, Briefcase } from 'lucide-react';

interface TimerPreset {
  label: string;
  seconds: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const PRESETS: TimerPreset[] = [
  { label: '3-Hour Deep Work', seconds: 10800, color: '#6366F1', icon: <Moon size={14} />, description: '10:30 PM – 1:30 AM Night Zone' },
  { label: '15-Min Micro Sprint', seconds: 900, color: '#10B981', icon: <Briefcase size={14} />, description: 'Office micro-learning burst' },
  { label: '25-Min Pomodoro', seconds: 1500, color: '#F59E0B', icon: <Timer size={14} />, description: 'Classic Pomodoro session' },
];

function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const FocusDrawer = () => {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const preset = PRESETS[selectedPreset];
  const pct = ((preset.seconds - timeLeft) / preset.seconds) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(PRESETS[selectedPreset].seconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [selectedPreset]);

  useEffect(() => {
    reset();
  }, [selectedPreset, reset]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  return (
    <div style={{
      position: 'fixed', bottom: 0, right: '24px', zIndex: 500,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
    }}>
      {/* Drawer panel */}
      {open && (
        <div style={{
          background: '#1E293B', border: '1px solid #334155', borderRadius: '16px 16px 0 0',
          width: '320px', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}>
          {/* Preset Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPreset(i)}
                style={{
                  flex: 1, padding: '10px 4px', fontSize: '10px', fontWeight: 600,
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                  background: selectedPreset === i ? `${p.color}15` : 'transparent',
                  color: selectedPreset === i ? p.color : '#475569',
                  borderBottom: `2px solid ${selectedPreset === i ? p.color : 'transparent'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                }}
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>

          {/* Timer display */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* SVG Ring */}
            <div style={{ position: 'relative', width: '140px', height: '140px' }}>
              <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#0B0F17" strokeWidth="10" />
                <circle
                  cx="70" cy="70" r={radius} fill="none"
                  stroke={preset.color} strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 8px ${preset.color})` }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '26px', fontWeight: 800, color: preset.color, letterSpacing: '2px' }}>
                  {formatTime(timeLeft)}
                </span>
                <span style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                  {Math.round(pct)}% done
                </span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '11px', color: '#64748B', textAlign: 'center' }}>{preset.description}</p>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={reset}
                style={{ padding: '8px', borderRadius: '8px', border: '1px solid #334155', background: 'transparent', cursor: 'pointer', color: '#64748B' }}
                title="Reset"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setRunning((r) => !r)}
                style={{
                  padding: '10px 24px', borderRadius: '10px', border: 'none',
                  background: running ? 'rgba(239,68,68,0.2)' : `linear-gradient(135deg, ${preset.color}, ${preset.color}cc)`,
                  color: running ? '#EF4444' : '#fff',
                  cursor: 'pointer', fontWeight: 700, fontSize: '14px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: running ? 'none' : `0 4px 16px ${preset.color}50`,
                  border: running ? '1px solid rgba(239,68,68,0.3)' : 'none',
                }}
              >
                {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}
              </button>
            </div>

            {timeLeft === 0 && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '8px 16px', color: '#10B981', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                🎉 Session Complete! Great work!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle tab */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px', borderRadius: open ? '0 0 12px 12px' : '12px 12px 0 0',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', border: 'none',
          color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '13px',
          boxShadow: '0 -4px 20px rgba(99,102,241,0.4)',
        }}
      >
        <Timer size={16} />
        Focus Timer
        {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
};
