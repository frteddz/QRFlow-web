import type { QRCodeType } from '../utils/qrUtils';

interface QRTypeSelectorProps {
  value: QRCodeType;
  onChange: (type: QRCodeType) => void;
}

const TYPES: { value: QRCodeType; label: string; icon: string }[] = [
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { value: 'contact', label: 'Contact', icon: '👤' },
  { value: 'email', label: 'Email', icon: '✉️' },
  { value: 'phone', label: 'Phone', icon: '📞' },
];

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  flexWrap: 'wrap',
  background: 'var(--color-surface-secondary)',
  padding: '4px',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--color-border)',
};

const buttonBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 16px',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.875rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  flex: 1,
  justifyContent: 'center',
  minWidth: 0,
  background: 'transparent',
  color: 'var(--color-text-secondary)',
};

export function QRTypeSelector({ value, onChange }: QRTypeSelectorProps) {
  return (
    <div style={containerStyle} role="tablist">
      {TYPES.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
          style={{
            ...buttonBase,
            background: value === t.value ? 'var(--color-surface)' : 'transparent',
            color: value === t.value ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            boxShadow: value === t.value ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <span>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
