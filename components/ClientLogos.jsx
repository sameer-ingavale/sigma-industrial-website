import Image from 'next/image';
import { assetUrl } from '@/lib/assets';

// Trust grid for the homepage. Logos shown at full color always — no
// grayscale/hover effect. Falls back to a plain text tile if a logo file
// hasn't been added yet (see lib/clients.js). Not a link (these aren't
// clickable), so no pointer cursor here on purpose.
export default function ClientLogos({ clients }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {clients.map((client, i) => (
        <div
          key={i}
          className="aspect-[3/2] border border-gray-200 rounded-md flex items-center justify-center"
        >
          {client.logo ? (
            <Image
              src={assetUrl(client.logo)}
              alt={client.name}
              width={100}
              height={50}
              className="object-contain"
            />
          ) : (
            <span className="text-xs text-gray-400">{client.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
