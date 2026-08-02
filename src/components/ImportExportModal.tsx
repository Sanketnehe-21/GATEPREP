// src/components/ImportExportModal.tsx
import React, { useRef } from 'react';
import { Upload, Download } from 'lucide-react';
import { useAppContext } from '../store';
import type { AppState } from '../types';
import { exportStateAsJson, importStateFromFile } from '../storage';

export const ImportExportModal = () => {
  const { state, dispatch } = useAppContext();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importStateFromFile<AppState>(file);
      dispatch({ type: 'IMPORT', payload: data });
      alert('✅ Progress imported successfully!');
    } catch {
      alert('❌ Failed to import. Please check the file format.');
    }
    e.target.value = '';
  };

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: '24px', zIndex: 500,
      display: 'flex', gap: '8px', padding: '0 0 16px',
    }}>
      <button
        onClick={() => exportStateAsJson(state)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '10px',
          background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
          color: '#10B981', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
          transition: 'all 0.15s ease',
        }}
        title="Export progress as JSON"
      >
        <Download size={14} /> Export JSON
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '10px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          color: '#6366F1', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
          transition: 'all 0.15s ease',
        }}
        title="Import progress from JSON"
      >
        <Upload size={14} /> Import JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </div>
  );
};
