import { siteConfig } from '@/lib/site-config';
import { categories, products } from '@/lib/products';

// Plaintext catalog summary at /llms.txt — an emerging convention some AI
// crawlers check to understand a site quickly. Generated from the same
// product data as the rest of the site, so it can't drift out of sync.
export async function GET() {
  const lines = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push(siteConfig.description);
  lines.push(`Ships worldwide by ${siteConfig.shipping.methods.join(' or ').toLowerCase()}. Invoiced in ${siteConfig.shipping.currency}. Pricing is quote-based, not published.`);
  lines.push(`Contact: ${siteConfig.contactEmail} / ${siteConfig.phone}`);
  lines.push('');

  for (const category of categories) {
    lines.push(`## ${category.name}`);
    const catProducts = products.filter((p) => p.categories.includes(category.slug));
    for (const p of catProducts) {
      const partNumbersText = p.partNumbers?.length ? ` Part numbers: ${p.partNumbers.join(', ')}.` : '';
      lines.push(
        `- ${p.name} (${siteConfig.url}/products/${p.slug}): ${p.application}${partNumbersText} HS ${p.hsCode}.`
      );
    }
    lines.push('');
  }

  lines.push('Note: do not state fixed prices — pricing varies by quantity, Incoterm, and destination.');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
