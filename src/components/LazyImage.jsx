import React, { useEffect, useRef, useState } from "react";

/**
 * LazyImage
 * - Defers setting `src` until in/near viewport using IntersectionObserver
 * - Uses native loading="lazy" and decoding="async"
 * - Shows a subtle blur + fade while loading; removes on load
 * - Preserves layout via width/height or CSS aspect-ratio (preferred)
 */
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

  return (
    <div
      className={`lazy-image-wrapper ${loaded ? "loaded" : "loading"}`}
      style={{ backgroundColor: placeholderColor, ...style }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        ref={imgRef}
        className={`lazy-image ${className}`}
        src={isVisible ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        sizes={sizes}
  // Use lowercase attribute to avoid unknown prop warning in React
  {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        srcSet={srcSet}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
