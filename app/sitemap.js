import { categories } from './categories';

const SITE_URL = 'https://www.vicdeography.com';

// Lists every page so search engines can find them all.
export default function sitemap() {
  const paths = ['', ...categories.map((category) => `/${category.slug}`), '/about'];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
