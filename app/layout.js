import './globals.css';
import PageTransitions from './PageTransitions';
import SiteNav from './SiteNav';

export const metadata = {
  title: 'Victor Pereira-Leite | Cinematography - Videography',
  description:
    'Portfolio of Victor Pereira-Leite, a Chicago-based videographer and cinematographer creating brand videos, sports, events, short films and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageTransitions />
        {/* The header lives here, outside the pages, so it stays in place while pages change. */}
        <div className="site-frame">
          <div className="page-shell header-shell">
            <SiteNav />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
