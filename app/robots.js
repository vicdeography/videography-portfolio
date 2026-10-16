// Lets search engines crawl the whole site and points them to the sitemap.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.vicdeography.com/sitemap.xml',
  };
}
