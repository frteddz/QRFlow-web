import { ImageUpload } from '../components/ImageUpload';
import { ScanResultDisplay } from '../components/ScanResult';
import { useQRScan } from '../hooks/useQRScan';

const pageStyle: React.CSSProperties = {
  padding: '32px 24px',
  maxWidth: '640px',
  margin: '0 auto',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '32px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--color-text)',
  marginBottom: '4px',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--color-text-secondary)',
};

const scanBtnStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 24px',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  background: 'var(--color-primary)',
  color: '#fff',
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '24px',
  textAlign: 'center',
};

const spinnerStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  border: '3px solid var(--color-border)',
  borderTopColor: 'var(--color-primary)',
  borderRadius: '50%',
  animation: 'spin 0.6s linear infinite',
};

const errorStyle: React.CSSProperties = {
  padding: '16px 20px',
  background: 'var(--color-error-light)',
  color: 'var(--color-error)',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.85rem',
  border: '1px solid var(--color-error)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const emptyStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '40px 24px',
  color: 'var(--color-text-tertiary)',
};

export function ScanPage() {
  const {
    imageFile,
    imagePreview,
    setFile,
    result,
    loading,
    error,
    scan,
    reset,
  } = useQRScan();

  return (
    <div style={pageStyle} className="animate-fade-in">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Scan QR Code</h1>
        <p style={subtitleStyle}>Upload an image containing a QR code to decode it</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ImageUpload
          imagePreview={imagePreview}
          onFileChange={setFile}
        />

        {imageFile && !result && !loading && (
          <button
            style={scanBtnStyle}
            onClick={scan}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = '0.9'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
          >
            Scan QR Code
          </button>
        )}

        {loading && (
          <div style={loadingStyle}>
            <div style={spinnerStyle} />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Scanning for QR code...
            </p>
          </div>
        )}

        {error && (
          <div style={errorStyle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && <ScanResultDisplay result={result} />}

        {!imageFile && !result && !error && (
          <div style={emptyStyle}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, marginBottom: '12px' }}>
              <rect x="2" y="2" width="8" height="8" />
              <rect x="14" y="2" width="8" height="8" />
              <rect x="14" y="14" width="8" height="8" />
              <path d="M2 14h8v8H2z" />
              <path d="M6 6v.01M18 6v.01M6 18v.01" />
            </svg>
            <p style={{ fontSize: '0.9rem' }}>Upload an image to get started</p>
          </div>
        )}

        {result && (
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--color-surface-secondary)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--color-surface)'; }}
          >
            Scan Another
          </button>
        )}
      </div>
    </div>
  );
}
