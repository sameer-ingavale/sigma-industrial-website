// Structured data (JSON-LD) generators. These produce the schema.org
// objects that get embedded as <script type="application/ld+json"> on
// each page — this is what Google's rich results and AI answer engines
// read to understand a page beyond its plain text.
//
// Kept as plain functions returning plain objects. If you're not familiar
// with JSON-LD: it's just a JS object describing the page in a vocabulary
// search engines agree on. See schema.org/Product, schema.org/FAQPage, etc.

import { siteConfig } from './site-config';
import { getCategoryBySlug } from './products';
import { getBrandBySlug } from './brands';
import { assetUrl } from './assets';

// Builds the `metadata` object's openGraph/twitter fields so that pasting
// a link into WhatsApp, iMessage, LinkedIn, or Twitter shows a title,
// description, and image instead of a bare link. Used by every page
// that's meant to be shared — product, category, brand, blog post.
// `path` is the page's path (e.g. "/products/foo"); `image` is a
// public-relative path like "/products/foo.jpg" or null.
export function shareMetadata({ title, description, path, image }) {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: image ? [{ url: `${siteConfig.url}${assetUrl(image)}` }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [`${siteConfig.url}${assetUrl(image)}`] : undefined,
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.addressLocality,
      addressRegion: siteConfig.location.addressRegion,
      postalCode: siteConfig.location.postalCode,
      addressCountry: siteConfig.location.addressCountry,
    },
    email: siteConfig.contactEmail,
    telephone: siteConfig.phone,
    areaServed: 'Worldwide',
  };
}

export function productJsonLd(product) {
  const categoryNames = product.categories
    .map((slug) => getCategoryBySlug(slug)?.name)
    .filter(Boolean);
  const brand = getBrandBySlug(product.brand);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.application,
    sku: product.partNumbers?.[0] || product.modelNumber || undefined,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    // Using the shared brand name directly is fine here — the "Sigma
    // Verified Manufacturer" brand already reads as generic/anonymized
    // by its own name, no separate lookup needed.
    brand: { '@type': 'Brand', name: brand ? brand.name : undefined },
    category: categoryNames.join(', '),
    countryOfOrigin: product.countryOfOrigin,
    offers: {
      '@type': 'Offer',
      // Neither status means physical stock on hand — both are variants
      // of "we source this against your order", so schema.org's
      // MadeToOrder/PreOrder availability types both fit better than
      // InStock ever would.
      availability:
        product.status === 'made-to-order'
          ? 'https://schema.org/MadeToOrder'
          : 'https://schema.org/PreOrder',
      areaServed: 'Worldwide',
      priceCurrency: siteConfig.shipping.currency,
      // No fixed price — this is a quote-on-enquiry model.
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: product.indicativePrice
          ? `${product.indicativePrice} (EXW, indicative) — final price quoted per enquiry in ${siteConfig.shipping.currency}.`
          : `Quoted per enquiry in ${siteConfig.shipping.currency}.`,
      },
      seller: { '@id': `${siteConfig.url}/#organization` },
    },
    additionalProperty: product.specifications.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function faqJsonLd(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
