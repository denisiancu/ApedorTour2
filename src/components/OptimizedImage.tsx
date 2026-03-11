import { useState, useRef, useEffect, type ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
}

export function OptimizedImage({
  priority = false,
  className = '',
  onLoad: externalOnLoad,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <img
      ref={imgRef}
      {...props}
      className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? undefined : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      onLoad={(e) => {
        setLoaded(true);
        externalOnLoad?.(e);
      }}
    />
  );
}
