interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        transition: 'all var(--transition-normal)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <span style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text)' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

const features = [
  { icon: '▦', title: 'Generate QR Codes', description: 'Create QR codes for URLs, text, Wi-Fi networks, contacts, emails, and phone numbers.' },
  { icon: '📷', title: 'Scan from Images', description: 'Upload an image containing a QR code and decode it instantly.' },
  { icon: '📶', title: 'Wi-Fi QR', description: 'Generate QR codes that share Wi-Fi credentials with a single scan.' },
  { icon: '👤', title: 'Contact QR', description: 'Encode contact information as a vCard for easy sharing.' },
  { icon: '🔗', title: 'URL QR', description: 'Shorten the path to your website or link with a scannable QR code.' },
  { icon: '📦', title: 'Export PNG/SVG', description: 'Download your QR codes in PNG or SVG format at any size.' },
];

export function HomePage() {
  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, var(--color-primary), #a78bfa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <path d="M3 14h7v7H3z" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, var(--color-primary), #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        QRFlow
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '48px',
        }}
      >
        QR Code Utility
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
          width: '100%',
          maxWidth: '720px',
          textAlign: 'left',
        }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </div>
  );
}
