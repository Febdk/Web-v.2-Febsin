import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Truck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ProductCard from '../components/ProductCard';
import { products, testimonials } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-black">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1576790807856-b9205fb5703f?w=1920"
          alt="Febsin Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl mb-6">
                FEBSIN
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Streetwear lokal yang menghadirkan gaya modern dengan kualitas premium
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-[rgb(238,135,33)] border-white hover:bg-white hover:text-black">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Highlight */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 dark:bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">Kualitas Premium</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Material berkualitas tinggi yang nyaman dan tahan lama
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 dark:bg-red-600 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gratis ongkir untuk pembelian minimal Rp 500.000
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 dark:bg-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">Desain Eksklusif</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Koleksi limited edition dengan desain khas lokal
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Koleksi Terbaru</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our latest collection featuring premium streetwear designs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-red-700 dark:bg-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-4">Jadi Member Febsin Club!</h2>
            <p className="text-xl mb-6 opacity-90">
              Dapatkan harga spesial, poin reward, dan akses early bird koleksi terbaru
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Join Now - It's Free!
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Apa Kata Mereka</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Testimoni dari customer yang puas dengan produk Febsin
            </p>
          </motion.div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4>{testimonial.name}</h4>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        "{testimonial.comment}"
                      </p>
                      <p className="text-xs text-gray-400">
                        {testimonial.product} • {testimonial.date}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Instagram Feed Mockup */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Follow Us @febsin.id</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tag #febsinstyle untuk kesempatan di-repost!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1718802323158-b32c0330ad4a?w=500',
              'https://images.unsplash.com/photo-1617152623457-4c9b639926d7?w=500',
              'https://images.unsplash.com/photo-1635715226585-004fef5a55a4?w=500',
              'https://images.unsplash.com/photo-1666358085449-a10a39f33942?w=500'
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="aspect-square overflow-hidden cursor-pointer"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
