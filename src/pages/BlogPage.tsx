import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4">Febsin Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tips fashion, behind the scene, dan cerita dari komunitas Febsin
          </p>
        </motion.div>
      </div>

      {/* Featured Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto">
              <ImageWithFallback
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-red-700 hover:bg-red-800">Featured</Badge>
              <Badge variant="secondary" className="w-fit mb-4">{featuredPost.category}</Badge>
              <h2 className="text-3xl mb-4">{featuredPost.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <User className="w-4 h-4 mr-2" />
                <span className="mr-4">{featuredPost.author}</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{featuredPost.date}</span>
              </div>
              <Link to={`/blog/${featuredPost.slug}`}>
                <Button className="bg-red-700 hover:bg-red-800">
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      {/* Other Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 0.1 }}
          >
            <Link to={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                  <h3 className="mb-3 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <User className="w-3 h-3 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center bg-red-700 dark:bg-red-800 text-white py-12 rounded-lg"
      >
        <h2 className="text-3xl mb-4">Jangan Lewatkan Update Terbaru</h2>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
          Subscribe newsletter kami untuk mendapatkan tips fashion, promo eksklusif, dan artikel terbaru langsung di inbox kamu
        </p>
        <Button size="lg" variant="secondary">
          Subscribe Newsletter
        </Button>
      </motion.div>
    </div>
  );
}
