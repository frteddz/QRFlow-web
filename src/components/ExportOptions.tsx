import { downloadDataURL, downloadSVG } from '../services/qrService';

interface ExportOptionsProps {
  dataUrl: string | null;
  svgString: string | null;
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 20px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.875rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
};

const btnPrimary: React.CSSProperties = {
  ...btnStyle,
  background: 'var(--color-primary)',
  color: '#fff',
  border: 'none',
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

export function ExportOptions({ dataUrl, svgString }: ExportOptionsProps) {
  const handleDownloadPNG = () => {
    if (dataUrl) {
      downloadDataURL(dataUrl, 'qrcode.png');
    }
  };

  const handleDownloadSVG = () => {
    if (svgString) {
      downloadSVG(svgString, 'qrcode.svg');
    }
  };

  return (
    <div style={containerStyle}>
      <button
        style={btnPrimary}
        onClick={handleDownloadPNG}
        disabled={!dataUrl}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.opacity = '1';
        }}
      >
        Download PNG
      </button>
      <button
        style={btnStyle}
        onClick={handleDownloadSVG}
        disabled={!svgString}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background = 'var(--color-surface-secondary)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = 'var(--color-surface)';
        }}
      >
        Download SVG
      </button>
    </div>
  );
}
