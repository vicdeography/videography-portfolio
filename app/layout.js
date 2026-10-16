import './globals.css';
import PageTransitions from './PageTransitions';
import SiteNav from './SiteNav';

const DESCRIPTION = 'Victor Pereira-Leite\u2019s Video Portfolio';

// The tab title, the line under the link in search results, and the title, text and image shown
// when the site's link is shared in messages and on social media. The icon and preview image come
// from icon.png, apple-icon.png and opengraph-image.png in this folder.
export const metadata = {
  metadataBase: new URL('https://www.vicdeography.com'),
  title: 'Vicdeography | Victor Pereira-Leite',
  description: DESCRIPTION,
  openGraph: {
    title: 'Vicdeography',
    description: DESCRIPTION,
    url: '/',
    siteName: 'Vicdeography',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicdeography',
    description: DESCRIPTION,
  },
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
