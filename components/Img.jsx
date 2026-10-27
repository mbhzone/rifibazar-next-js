/* Shows the photo, or a labelled placeholder when no image is set yet. */
export default function Img({ src, alt = '', label = 'Photo', className = '', style }) {
  if (!src) {
    return (
      <div className={`ph ${className}`} style={style} role="img" aria-label={alt || label}>
        {label}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={`im ${className}`} style={style} />;
}
