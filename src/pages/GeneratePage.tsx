import { QRTypeSelector } from '../components/QRTypeSelector';
import { QRForm } from '../components/QRForm';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { useQR } from '../hooks/useQR';

const pageStyle: React.CSSProperties = {
  padding: '32px 24px',
  maxWidth: '960px',
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

const layoutStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  alignItems: 'start',
};

const panelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const generateBtnStyle: React.CSSProperties = {
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

const generateBtnDisabled: React.CSSProperties = {
  ...generateBtnStyle,
  opacity: 0.5,
  cursor: 'not-allowed',
};

const errorStyle: React.CSSProperties = {
  padding: '12px 16px',
  background: 'var(--color-error-light)',
  color: 'var(--color-error)',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.85rem',
  border: '1px solid var(--color-error)',
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '14px',
  color: 'var(--color-text-secondary)',
  fontSize: '0.9rem',
};

const spinnerStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid var(--color-border)',
  borderTopColor: 'var(--color-primary)',
  borderRadius: '50%',
  animation: 'spin 0.6s linear infinite',
};

export function GeneratePage() {
  const {
    type,
    setType,
    formData,
    updateFormField,
    options,
    updateOption,
    dataUrl,
    svgString,
    loading,
    error,
    generate,
  } = useQR();

  return (
    <div style={pageStyle} className="animate-fade-in">
      <div style={headerStyle}>
        <h1 style={titleStyle}>Generate QR Code</h1>
        <p style={subtitleStyle}>Choose a type, fill in the details, and generate your QR code</p>
      </div>

      <QRTypeSelector value={type} onChange={setType} />

      <div style={{ ...layoutStyle, marginTop: '24px' }}>
        <div style={panelStyle}>
          <QRForm
            type={type}
            formData={formData}
            onFieldChange={updateFormField}
          />

          <button
            style={loading ? generateBtnDisabled : generateBtnStyle}
            onClick={generate}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.opacity = '1';
            }}
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>

          {loading && (
            <div style={loadingStyle}>
              <div style={spinnerStyle} />
              Generating...
            </div>
          )}

          {error && <div style={errorStyle}>{error}</div>}
        </div>

        <div>
          <QRCodeDisplay
            dataUrl={dataUrl}
            svgString={svgString}
            options={options}
            onOptionChange={updateOption}
          />
        </div>
      </div>
    </div>
  );
}
