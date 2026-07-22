import type { QRGenerationOptions } from '../services/qrService';
import { ExportOptions } from './ExportOptions';

interface QRCodeDisplayProps {
  dataUrl: string | null;
  svgString: string | null;
  options: QRGenerationOptions;
  onOptionChange: <K extends keyof QRGenerationOptions>(key: K, value: QRGenerationOptions[K]) => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  padding: '24px',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-xl)',
  border: '1px solid var(--color-border)',
};

const imageStyle = (size: number): React.CSSProperties => ({
  width: `${Math.min(size, 400)}px`,
  height: `${Math.min(size, 400)}px`,
  imageRendering: 'pixelated',
  borderRadius: 'var(--radius-md)',
  background: '#fff',
  padding: '8px',
  boxShadow: 'var(--shadow-md)',
});

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
};

const controlGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.8rem',
  background: 'var(--color-surface-secondary)',
  color: 'var(--color-text)',
  cursor: 'pointer',
  outline: 'none',
};

const emptyStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 24px',
  color: 'var(--color-text-tertiary)',
  textAlign: 'center',
  gap: '8px',
};

const SIZE_OPTIONS = [200, 300, 400, 500, 600];
const EC_OPTIONS = [
  { value: 'L', label: 'Low (L)' },
  { value: 'M', label: 'Medium (M)' },
  { value: 'Q', label: 'Quartile (Q)' },
  { value: 'H', label: 'High (H)' },
];

export function QRCodeDisplay({ dataUrl, svgString, options, onOptionChange }: QRCodeDisplayProps) {
  if (!dataUrl) {
    return (
      <div style={containerStyle}>
        <div style={emptyStyle}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM17 14h-2v2h-2v-2" />
            <path d="M14 17v-3h2" />
          </svg>
          <p style={{ fontSize: '0.9rem' }}>Configure and generate your QR code</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className="animate-fade-in">
      <div style={controlRowStyle}>
        <div style={controlGroupStyle}>
          <span style={labelStyle}>Size</span>
          <select
            style={selectStyle}
            value={options.width}
            onChange={(e) => onOptionChange('width', Number(e.target.value))}
          >
            {SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}px</option>
            ))}
          </select>
        </div>
        <div style={controlGroupStyle}>
          <span style={labelStyle}>Error Correction</span>
          <select
            style={selectStyle}
            value={options.errorCorrectionLevel}
            onChange={(e) => onOptionChange('errorCorrectionLevel', e.target.value as QRGenerationOptions['errorCorrectionLevel'])}
          >
            {EC_OPTIONS.map((ec) => (
              <option key={ec.value} value={ec.value}>{ec.label}</option>
            ))}
          </select>
        </div>
      </div>

      <img
        src={dataUrl}
        alt="Generated QR Code"
        style={imageStyle(options.width)}
      />

      <ExportOptions dataUrl={dataUrl} svgString={svgString} />
    </div>
  );
}
