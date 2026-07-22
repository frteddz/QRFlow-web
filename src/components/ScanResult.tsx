import type { ScanResult } from '../hooks/useQRScan';
import { downloadDataURL } from '../services/qrService';

interface ScanResultProps {
  result: ScanResult;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  border: '1px solid var(--color-border)',
  padding: '20px',
  animation: 'fadeIn 0.3s ease forwards',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '2px 10px',
  borderRadius: '999px',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  background: 'var(--color-primary-light)',
  color: 'var(--color-primary)',
};

const textStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--color-text)',
  wordBreak: 'break-all',
  lineHeight: 1.6,
  padding: '12px',
  background: 'var(--color-surface-secondary)',
  borderRadius: 'var(--radius-md)',
  marginBottom: '16px',
  fontFamily: 'var(--font-mono)',
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '8px 16px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
};

const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: 'var(--color-primary)',
  color: '#fff',
  border: 'none',
};

const btnSuccess: React.CSSProperties = {
  ...btnBase,
  background: 'var(--color-success)',
  color: '#fff',
  border: 'none',
};

const iconSvg = (d: string): React.ReactNode => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function ScanResultDisplay({ result }: ScanResultProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.text);
    } catch {
      //
    }
  };

  const handleOpenURL = () => {
    window.open(result.text, '_blank');
  };

  const handleSaveContact = () => {
    const blob = new Blob([result.text], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    downloadDataURL(url, 'contact.vcf');
    URL.revokeObjectURL(url);
  };

  const typeLabel = result.type === 'vcard' ? 'Contact' : result.type.toUpperCase();

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span style={badgeStyle}>{typeLabel}</span>
      </div>
      <div style={textStyle}>{result.text}</div>
      <div style={actionsStyle}>
        <button
          style={btnBase}
          onClick={handleCopy}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--color-surface-secondary)'; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--color-surface)'; }}
        >
          {iconSvg('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2')}
          Copy
        </button>
        {result.type === 'url' && (
          <button
            style={btnPrimary}
            onClick={handleOpenURL}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = '0.9'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
          >
            {iconSvg('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3')}
            Open URL
          </button>
        )}
        {result.type === 'vcard' && (
          <button
            style={btnSuccess}
            onClick={handleSaveContact}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = '0.9'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
          >
            {iconSvg('M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z')}
            Save Contact
          </button>
        )}
      </div>
    </div>
  );
}
