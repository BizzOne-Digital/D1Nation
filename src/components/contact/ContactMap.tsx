type ContactMapProps = {
  mapQuery: string;
};

export function ContactMap({ mapQuery }: ContactMapProps) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="mt-4 w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-neutral-200">
      <iframe
        title={`Map showing ${mapQuery}`}
        src={src}
        className="block h-48 w-full max-w-full border-0 grayscale-[30%] contrast-[1.05] md:h-52"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
