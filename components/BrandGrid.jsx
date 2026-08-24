import Link from 'next/link';
import Image from 'next/image';
import { assetUrl } from '@/lib/assets';

// Brand tiles linking to each brand's own page (/brands/<slug>). Logos
// show at full color always — no grayscale/hover effect, just the image
// as provided.
export default function BrandGrid({ brands }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/brands/${brand.slug}`}
          className="aspect-[3/2] border border-gray-200 rounded-md flex items-center justify-center hover:border-navy transition-colors p-2 relative cursor-pointer"
        >
          {brand.origin === 'verified' && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-trust" aria-hidden="true" title="Verified" />
          )}
          {brand.logo ? (
            <Image
              src={assetUrl(brand.logo)}
              alt={brand.name}
              width={100}
              height={50}
              className="object-contain"
            />
          ) : (
            <span className="text-xs text-center text-gray-500">
              {brand.name}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
