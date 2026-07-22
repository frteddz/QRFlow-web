import type { QRCodeType } from '../utils/qrUtils';

interface QRFormProps {
  type: QRCodeType;
  formData: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.9rem',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color var(--transition-fast)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '100px',
  fontFamily: 'var(--font-sans)',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export function QRForm({ type, formData, onFieldChange }: QRFormProps) {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onFieldChange(field, e.target.value);
  };

  switch (type) {
    case 'url':
      return (
        <Field label="URL">
          <input
            style={inputStyle}
            type="url"
            placeholder="https://example.com"
            value={formData.url || ''}
            onChange={handleChange('url')}
          />
        </Field>
      );

    case 'text':
      return (
        <Field label="Text">
          <textarea
            style={textareaStyle}
            placeholder="Enter text to encode..."
            value={formData.text || ''}
            onChange={handleChange('text')}
          />
        </Field>
      );

    case 'wifi':
      return (
        <>
          <Field label="Network Name (SSID)">
            <input
              style={inputStyle}
              type="text"
              placeholder="MyWiFi"
              value={formData.ssid || ''}
              onChange={handleChange('ssid')}
            />
          </Field>
          <Field label="Password">
            <input
              style={inputStyle}
              type="text"
              placeholder="Wi-Fi password"
              value={formData.password || ''}
              onChange={handleChange('password')}
            />
          </Field>
          <Field label="Encryption">
            <select
              style={selectStyle}
              value={formData.encryption || 'WPA'}
              onChange={handleChange('encryption')}
            >
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="None">None (Open)</option>
            </select>
          </Field>
          <Field label="Hidden Network">
            <select
              style={selectStyle}
              value={formData.hidden || 'false'}
              onChange={handleChange('hidden')}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </Field>
        </>
      );

    case 'contact':
      return (
        <>
          <Field label="Full Name">
            <input
              style={inputStyle}
              type="text"
              placeholder="John Doe"
              value={formData.name || ''}
              onChange={handleChange('name')}
            />
          </Field>
          <Field label="Phone">
            <input
              style={inputStyle}
              type="tel"
              placeholder="+1 555-0123"
              value={formData.phone || ''}
              onChange={handleChange('phone')}
            />
          </Field>
          <Field label="Email">
            <input
              style={inputStyle}
              type="email"
              placeholder="john@example.com"
              value={formData.email || ''}
              onChange={handleChange('email')}
            />
          </Field>
          <Field label="Organization">
            <input
              style={inputStyle}
              type="text"
              placeholder="Acme Inc."
              value={formData.org || ''}
              onChange={handleChange('org')}
            />
          </Field>
        </>
      );

    case 'email':
      return (
        <>
          <Field label="To">
            <input
              style={inputStyle}
              type="email"
              placeholder="recipient@example.com"
              value={formData.to || ''}
              onChange={handleChange('to')}
            />
          </Field>
          <Field label="Subject">
            <input
              style={inputStyle}
              type="text"
              placeholder="Email subject"
              value={formData.subject || ''}
              onChange={handleChange('subject')}
            />
          </Field>
          <Field label="Body">
            <textarea
              style={textareaStyle}
              placeholder="Email body text..."
              value={formData.body || ''}
              onChange={handleChange('body')}
            />
          </Field>
        </>
      );

    case 'phone':
      return (
        <Field label="Phone Number">
          <input
            style={inputStyle}
            type="tel"
            placeholder="+1 555-0123"
            value={formData.number || ''}
            onChange={handleChange('number')}
          />
        </Field>
      );
  }
}
