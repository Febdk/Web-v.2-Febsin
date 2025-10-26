import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl mb-4">Artikel tidak ditemukan</h1>
        <Link to="/blog">
          <Button>Kembali ke Blog</Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link artikel disalin!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Blog
      </Link>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl lg:text-5xl mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4 mr-2" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-8 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              {post.excerpt}
            </p>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>{post.content}</p>
              
              <p>
                Fashion streetwear bukan hanya tentang mengikuti tren, tetapi tentang bagaimana kamu mengekspresikan 
                diri melalui pakaian. Febsin percaya bahwa setiap orang memiliki gaya unik mereka sendiri, dan 
                tugas kami adalah menyediakan canvas terbaik untuk ekspresi tersebut.
              </p>

              <h2>Tips Mix & Match</h2>
              <p>
                Salah satu kunci dari streetwear yang baik adalah kemampuan untuk mix and match berbagai pieces 
                dengan percaya diri. Mulailah dengan basic items seperti kaos polos atau hoodie, kemudian tambahkan 
                layer dan accessories yang mencerminkan personality kamu.
              </p>

              <h3>1. Start with Basics</h3>
              <p>
                Koleksi basic Febsin dirancang sebagai foundation yang sempurna. Kaos dengan cutting yang pas, 
                hoodie dengan material premium - semua ini adalah building blocks yang bisa kamu kombinasikan 
                dengan berbagai cara.
              </p>

              <h3>2. Layer with Purpose</h3>
              <p>
                Jangan takut untuk bereksperimen dengan layering. Kombinasikan t-shirt dengan kemeja flanel, 
                atau hoodie dengan bomber jacket. Kuncinya adalah balance antara oversized dan fitted pieces.
              </p>

              <h3>3. Accessories Matter</h3>
              <p>
                Detail kecil seperti topi, belt, atau tote bag bisa completely mengubah vibe dari outfit kamu. 
                Koleksi accessories Febsin dirancang untuk complement koleksi utama kami.
              </p>

              <h2>Kesimpulan</h2>
              <p>
                Gaya adalah perjalanan, bukan destinasi. Terus explore, mix and match, dan yang paling penting - 
                have fun with it! Febsin akan selalu hadir untuk menemani perjalanan fashion kamu.
              </p>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl mb-8">Artikel Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                    <h3 className="mb-2 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {relatedPost.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
