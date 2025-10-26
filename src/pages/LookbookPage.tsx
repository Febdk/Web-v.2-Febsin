import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

interface LookbookImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  likes: number;
}

export default function LookbookPage() {
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState<LookbookImage | null>(null);
  const [likedImages, setLikedImages] = useState<string[]>([]);

  const lookbookImages: LookbookImage[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1576790807856-b9205fb5703f?w=800',
      title: 'Urban Essentials',
      description: 'Classic black tee dengan relaxed denim untuk daily look yang effortless',
      category: 'Casual',
      likes: 142
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1635715226585-004fef5a55a4?w=800',
      title: 'Street Ready',
      description: 'Oversized hoodie pairing dengan cargo pants - perfect for weekend vibes',
      category: 'Streetwear',
      likes: 198
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1617152623457-4c9b639926d7?w=800',
      title: 'Minimalist Style',
      description: 'Clean lines and neutral tones untuk sophisticated look',
      category: 'Minimal',
      likes: 156
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1718802323158-b32c0330ad4a?w=800',
      title: 'Bold Statement',
      description: 'Mix and match patterns dengan confidence',
      category: 'Bold',
      likes: 173
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1666358085449-a10a39f33942?w=800',
      title: 'Monochrome Magic',
      description: 'All black everything - timeless and powerful',
      category: 'Monochrome',
      likes: 201
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      title: 'Layering Game',
      description: 'Master the art of layering untuk transitional weather',
      category: 'Layered',
      likes: 187
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
      title: 'Summer Vibes',
      description: 'Light and breezy untuk sunny days',
      category: 'Summer',
      likes: 164
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      title: 'Athleisure',
      description: 'Comfort meets style dalam sporty aesthetic',
      category: 'Sports',
      likes: 149
    }
  ];

  const handleLike = (imageId: string) => {
    if (!isAuthenticated) {
      toast.error('Silakan login untuk like gambar');
      return;
    }

    if (likedImages.includes(imageId)) {
      setLikedImages(likedImages.filter(id => id !== imageId));
      toast.success('Unlike');
    } else {
      setLikedImages([...likedImages, imageId]);
      toast.success('Liked!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4">Lookbook</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Inspirasi styling dan koleksi terbaru Febsin. Tag <span className="text-red-700 dark:text-red-500">#febsinstyle</span> untuk kesempatan di-feature!
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid - Masonry Style */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {lookbookImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid group relative cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{image.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      {image.category}
                    </span>
                    <span className="text-sm">{image.likes + (likedImages.includes(image.id) ? 1 : 0)} likes</span>
                  </div>
                </div>
              </div>

              {/* Like Button */}
              {isAuthenticated && (
                <Button
                  size="icon"
                  variant="secondary"
                  className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                    likedImages.includes(image.id) ? 'bg-red-700 hover:bg-red-800 text-white' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(image.id);
                  }}
                >
                  <Heart className={`w-4 h-4 ${likedImages.includes(image.id) ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="secondary"
                className="absolute -top-12 right-0"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="aspect-square lg:aspect-auto">
                  <ImageWithFallback
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 flex flex-col">
                  <div className="mb-4">
                    <span className="text-sm text-red-700 dark:text-red-500 mb-2 block">
                      {selectedImage.category}
                    </span>
                    <h2 className="text-3xl mb-3">{selectedImage.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedImage.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    {isAuthenticated && (
                      <Button
                        variant={likedImages.includes(selectedImage.id) ? "default" : "outline"}
                        onClick={() => handleLike(selectedImage.id)}
                        className={likedImages.includes(selectedImage.id) ? "bg-red-700 hover:bg-red-800" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${likedImages.includes(selectedImage.id) ? 'fill-current' : ''}`} />
                        {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)} Likes
                      </Button>
                    )}
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Suka dengan style ini? Shop koleksi serupa:
                    </p>
                    <Button className="w-full bg-red-700 hover:bg-red-800">
                      Shop This Look
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center bg-gray-50 dark:bg-gray-950 py-12 rounded-lg"
      >
        <h2 className="text-3xl mb-4">Share Your Style</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Post foto kamu dengan produk Febsin di Instagram dan tag <span className="text-red-700 dark:text-red-500">#febsinstyle</span> untuk kesempatan di-feature di lookbook kami!
        </p>
        <Button size="lg" className="bg-red-700 hover:bg-red-800">
          Follow @febsin.id
        </Button>
      </motion.div>
    </div>
  );
}
