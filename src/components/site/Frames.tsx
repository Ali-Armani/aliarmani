export function BrowserFrame({ src, url, alt, className = "" }: { src: string; url: string; alt: string; className?: string }) {
  return (
    <figure className={`frame-browser ${className}`}>
      <div className="flex items-center gap-2 border-b border-current/15 px-3 py-2">
        <span aria-hidden className="flex gap-1.5"><i className="dot" /><i className="dot" /><i className="dot" /></span>
        <span className="label-mono truncate opacity-70">{url.replace(/^https?:\/\//, "")}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </figure>
  );
}

export function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`frame-phone ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block aspect-[1/2] w-full object-cover object-top" />
    </figure>
  );
}
