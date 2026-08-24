// Fixed option lists for the enquiry form's country and timeline
// selects. Plain arrays — edit directly.

// Not an exhaustive country list on purpose — this is a curated set of
// where your actual buyers come from, not a geography reference. `top`
// gets its own group at the top of the dropdown; `rest` is everything
// else worth listing. Add/remove/reorder either freely.
export const countries = {
  top: ['Tanzania', 'Uganda', 'Kenya', 'United States', 'United Kingdom'],
  rest: [
    'South Africa',
    'Nigeria',
    'Ghana',
    'Ethiopia',
    'Zambia',
    'Rwanda',
    'Mozambique',
    'DR Congo',
    'Egypt',
    'United Arab Emirates',
    'Saudi Arabia',
    'Germany',
    'Netherlands',
    'Australia',
    'Canada',
    'Bangladesh',
    'Sri Lanka',
    'Vietnam',
    'Indonesia',
    'Other',
  ],
};

// A qualifying field, not a formality — "Immediate" has to be an option
// since it's the single most useful signal a buyer can give.
export const timelineOptions = [
  'Immediate',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Just researching, no fixed timeline',
];
