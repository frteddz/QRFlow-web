import { useState, lazy, Suspense, type ComponentType } from 'react';
import { useTheme } from './hooks/useTheme';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const GeneratePage = lazy(() => import('./pages/GeneratePage').then((m) => ({ default: m.GeneratePage })));
const ScanPage = lazy(() => import('./pages/ScanPage').then((m) => ({ default: m.ScanPage })));

type Page = 'home' | 'generate' | 'scan';

const PAGES: { key: Page; label: string; icon: React.ReactNode }[] = [
  { key: 'home', label: 'Home', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { key: 'generate', label: 'Generate', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><path d="M3 14h7v7H3z" /></svg> },
  { key: 'scan', label: 'Scan', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l-7 7 7 7" /></svg> },
];

const SIDEBAR_WIDTH = 240;

const sidebarStyle: React.CSSProperties = {
  width: SIDEBAR_WIDTH,
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--color-surface)',
  borderRight: '1px solid var(--color-border)',
  zIndex: 100,
};

const mainStyle: React.CSSProperties = {
  marginLeft: SIDEBAR_WIDTH,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const logoArea: React.CSSProperties = {
  padding: '24px 20px',
  borderBottom: '1px solid var(--color-border)',
};

const logoText: React.CSSProperties = {
  fontSize: '1.3rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, var(--color-primary), #a78bfa)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const navStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const navItemBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 14px',
  borderRadius: 'var(--radius-md)',
  border: 'none',
  background: 'transparent',
  color: 'var(--color-text-secondary)',
  fontSize: '0.9rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  width: '100%',
  textAlign: 'left',
};

const navItemActive: React.CSSProperties = {
  ...navItemBase,
  background: 'var(--color-primary-light)',
  color: 'var(--color-primary)',
};

const sidebarBottom: React.CSSProperties = {
  padding: '12px',
  borderTop: '1px solid var(--color-border)',
};

const themeBtn: React.CSSProperties = {
  ...navItemBase,
  width: '100%',
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: '0',
};

const loadingContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  padding: '60px',
  color: 'var(--color-text-tertiary)',
};

const PAGE_COMPONENTS: Record<Page, ComponentType> = {
  home: HomePage,
  generate: GeneratePage,
  scan: ScanPage,
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const { isDark, toggle } = useTheme();

  const PageComponent = PAGE_COMPONENTS[page];

  return (
    <>
      <aside style={sidebarStyle}>
        <div style={logoArea}>
          <span style={logoText}>QRFlow</span>
        </div>

        <nav style={navStyle}>
          {PAGES.map((p) => (
            <button
              key={p.key}
              style={page === p.key ? navItemActive : navItemBase}
              onClick={() => setPage(p.key)}
              onMouseEnter={(e) => {
                if (page !== p.key) {
                  (e.target as HTMLButtonElement).style.background = 'var(--color-surface-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== p.key) {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {p.icon}
              {p.label}
            </button>
          ))}
        </nav>

        <div style={sidebarBottom}>
          <button
            style={themeBtn}
            onClick={toggle}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--color-surface-secondary)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isDark ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </>
              )}
            </svg>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </aside>

      <main style={mainStyle}>
        <div style={contentStyle}>
          <Suspense
            fallback={
              <div style={loadingContainer}>
                <div style={{ width: '24px', height: '24px', border: '2px solid var(--color-border)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              </div>
            }
          >
            <PageComponent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
