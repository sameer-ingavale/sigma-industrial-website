'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

// Simplest possible search: filters the given product list in the browser
// as the person types, matching against name and part numbers. No
// pagination, no debounce, no server round-trip — the catalog is small
// enough that this is instant. Swap in a real search index later if the
// catalog grows large enough to need one.
export default function ProductSearch({ products }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const haystack = [p.name, ...p.partNumbers].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [products, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by product name or part number…"
        className="w-full border border-gray-300 rounded-md px-3 py-2.5 mb-8 focus:border-navy outline-none"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-700">No matches — try a different term, or send us the spec directly.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
