export const categories = [
  {
    slug: 'brand-videos',
    title: 'Brand Videos',
    blurb: 'Brand films, product spots, and social content for businesses.',
  },
  {
    slug: 'sports',
    title: 'Sports',
    blurb: 'Game day coverage, athlete features, and highlight reels.',
  },
  {
    slug: 'miscellaneous',
    title: 'Miscellaneous',
    blurb: 'Experiments, personal projects, and everything in between.',
  },
];

export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}
