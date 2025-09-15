import React, { useEffect, useRef, useState } from "react";

/**
 * LazyImage
 * - Defers setting `src` until in/near viewport using IntersectionObserver
 * - Uses native loading="lazy" and decoding="async"
 * - Shows a subtle blur + fade while loading; removes on load
 * - Preserves layout via width/height or CSS aspect-ratio (preferred)
 */
const FALLBACK_IMAGE = process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/assets/ShopSmart.PNG' : '/assets/ShopSmart.PNG';
const LazyImage = ({
  src,
  alt,
  className = "",
  style,
  width,
  height,
  sizes,
  fetchPriority,
  srcSet,
  onClick,
  placeholderColor = "#2a2f36",
  rootMargin = "250px",
}) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Warn in development if src is missing
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !src) {
      // eslint-disable-next-line no-console
      console.warn('LazyImage: missing src prop');
    }
  }, [src]);

  return (
    <div
      className={`lazy-image-wrapper ${loaded ? "loaded" : "loading"}`}
      style={{ backgroundColor: placeholderColor, ...style }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        ref={imgRef}
        className={`lazy-image ${className}`}
        src={isVisible ? (error || !src ? FALLBACK_IMAGE : src) : undefined}
        alt={alt || 'Image'}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        srcSet={srcSet}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(true); setError(true); }}
        style={error ? { ...style, objectFit: 'contain', filter: 'grayscale(1)' } : style}
      />
      {error && (
        <div style={{ color: '#fff', background: '#b00', padding: '2px 6px', fontSize: 12, position: 'absolute', top: 4, right: 4, borderRadius: 3 }}>
          Image not available
        </div>
      )}
    </div>
  );
};

export default LazyImage;
