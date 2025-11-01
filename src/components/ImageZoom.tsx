import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ImageZoomProps {
  images: string[];
  alt: string;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ImageZoom({
  images,
  alt,
  selectedIndex,
  onIndexChange,
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div>
      {/* Main Image with Zoom */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 mb-4 overflow-hidden group">
        <motion.div
          className="w-full h-full cursor-zoom-in"
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
          whileHover={{ scale: isZoomed ? 1 : 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              scale: isZoomed ? 2 : 1,
              x: isZoomed ? `${(50 - mousePosition.x) * 0.5}%` : 0,
              y: isZoomed ? `${(50 - mousePosition.y) * 0.5}%` : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ImageWithFallback
              src={images[selectedIndex]}
              alt={alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
          <span className="text-sm">Click to zoom</span>
        </div>

        {/* Zoomed State Indicator */}
        {isZoomed && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg flex items-center gap-2">
            <span className="text-sm">Move mouse to pan</span>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden border-2 transition-all hover:border-red-500 ${
              selectedIndex === index
                ? "border-red-700 dark:border-red-600 ring-2 ring-red-700 dark:ring-red-600"
                : "border-transparent"
            }`}
          >
            <ImageWithFallback
              src={img}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
              <motion.img
                src={images[selectedIndex]}
                alt={alt}
                className="max-w-full max-h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Navigation Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onIndexChange(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedIndex === index
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
