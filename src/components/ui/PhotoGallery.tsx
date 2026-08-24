"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Camera, X, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  title?: string;
}

// Curated Unsplash images for demo Spiti Valley gallery
const SPITI_DEMO_GALLERY: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=85",
    alt: "Spiti Valley mountain landscape",
    caption: "The Spiti River Valley at 4000m — pure, raw, and humbling.",
  },
  {
    src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=85",
    alt: "Key Monastery, Spiti",
    caption: "Key Monastery (Ki Gompa) — 1000 years of Buddhist history on a rocky hill.",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85",
    alt: "Himalayan mountain road",
    caption: "The road to Kaza — where the asphalt ends and the adventure begins.",
  },
  {
    src: "https://images.unsplash.com/photo-1531761535209-180857e0e7b7?w=1200&q=85",
    alt: "Prayer flags in mountains",
    caption: "Tibetan prayer flags flutter above Kibber village, the world's highest motorable village.",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85",
    alt: "Mountain campsite",
    caption: "Camping under 4 billion stars — no light pollution at 4500m.",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
    alt: "Chandratal Lake",
    caption: "Chandratal — the Moon Lake at 4300m. Words fail.",
  },
];

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Use demo images if none provided
  const galleryImages = images.length > 0 ? images : SPITI_DEMO_GALLERY;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const slides = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt || "",
    description: img.caption,
  }));

  return (
    <div>
      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <Camera size={20} style={{ color: "var(--accent-gold)" }} />
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.4rem",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h3>
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              background: "var(--bg-card)",
              padding: "0.2rem 0.6rem",
              borderRadius: "100px",
              border: "1px solid var(--border)",
            }}
          >
            {galleryImages.length} photos
          </span>
        </div>
      )}

      {/* Masonry-style grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            id={`gallery-img-${index}`}
            aria-label={`View photo: ${image.alt || `Photo ${index + 1}`}`}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              border: "none",
              padding: 0,
              background: "var(--bg-card)",
              // Varying heights for a masonry-like feel
              aspectRatio: index % 5 === 0 ? "4/5" : index % 3 === 0 ? "16/9" : "4/3",
              display: "block",
              width: "100%",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt || `Gallery photo ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              sizes="(max-width: 768px) 50vw, 33vw"
              onMouseEnter={(e) =>
                ((e.target as HTMLImageElement).style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLImageElement).style.transform = "scale(1)")
              }
            />

            {/* Hover overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0)")
              }
            >
              <ZoomIn
                size={28}
                style={{
                  color: "white",
                  opacity: 0,
                  transform: "scale(0.8)",
                  transition: "all 0.3s ease",
                }}
                className="gallery-zoom-icon"
              />
            </div>

            {/* Caption */}
            {image.caption && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1rem 0.75rem 0.75rem",
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
                  color: "white",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                  textAlign: "left",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="gallery-caption"
              >
                {image.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />

      <style>{`
        button:hover .gallery-zoom-icon {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        button:hover .gallery-caption {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
