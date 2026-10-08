import './globals.css';
import SiteNav from './SiteNav';

export const metadata = {
  title: 'Vic Deography | Cinematography Portfolio',
  description: 'Rough draft portfolio website for videography and cinematography work.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
