import Image from 'next/image';
import { assetUrl } from '@/lib/assets';

// Shows the product photo if one's been added, otherwise a plain
// placeholder box. Photos are expected to be 4:3 — object-cover with no
// padding, so the image fills the box edge-to-edge.
export default function ProductImage({ image, name }) {
  if (image) {
    return (
      <div className="relative aspect-[4/3] w-full border border-gray-200 rounded-md overflow-hidden bg-white">
        <Image
          src={assetUrl(image)}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center">
      <span className="text-sm text-gray-400">Photo available on request</span>
    </div>
  );
}
