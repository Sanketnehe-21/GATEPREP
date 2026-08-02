// src/main.tsx
import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Scrapbook App:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('gate_cs_2027_tracker_data');
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#F5EEDC',
          color: '#2C1E16',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          textAlign: 'center'
        }}>
          <div style={{
            background: '#F9F3EB',
            border: '3px solid #2C1E16',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            boxShadow: '6px 6px 0px #C4B292'
          }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📜</span>
            <h1 style={{ color: '#8C4A27', margin: '0 0 12px 0', fontSize: '22px' }}>
              Scrapbook Storage Recovery
            </h1>
            <p style={{ fontSize: '14px', color: '#664A38', marginBottom: '20px', lineHeight: 1.5 }}>
              A previous session saved conflicting data in browser storage. Click below to clear corrupt storage and restore your 24-week GATE CS 2027 tracker.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 24px',
                background: '#8C4A27',
                color: '#FFF8EA',
                border: '2px solid #2C1E16',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '3px 3px 0px #2C1E16'
              }}
            >
              🔄 Reset Scrapbook &amp; Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
