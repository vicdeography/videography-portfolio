export const categories = [
  {
    slug: 'sports',
    title: 'Sports',
    blurb: 'Game day coverage, athlete features, and highlight reels.',
  },
  {
    slug: 'promotional',
    title: 'Promotional',
    blurb: 'Brand films, product spots, and social content for businesses.',
  },
  {
    slug: 'short-film',
    title: 'Short Film',
    blurb: 'Narrative and documentary shorts.',
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
