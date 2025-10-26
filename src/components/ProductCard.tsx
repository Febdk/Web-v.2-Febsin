import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Dihapus dari wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Ditambahkan ke wishlist');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      memberPrice: isAuthenticated ? product.memberPrice : undefined,
      image: product.image,
      size: product.sizes[0]
    });
    toast.success('Ditambahkan ke keranjang');
  };

  const displayPrice = isAuthenticated ? product.memberPrice : product.price;
  const hasDiscount = isAuthenticated && product.memberPrice < product.price;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-square mb-3">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-red-700 hover:bg-red-800">Featured</Badge>
            )}
            {hasDiscount && (
              <Badge variant="secondary">Member Price</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {isAuthenticated && (
              <Button
                size="icon"
                variant={inWishlist ? "default" : "secondary"}
                onClick={handleWishlist}
                className={inWishlist ? "bg-red-700 hover:bg-red-800" : ""}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            )}
            <Button
              size="icon"
              variant="secondary"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>

          {/* Stock indicator */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="destructive">Stok tinggal {product.stock}</Badge>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Sold Out</Badge>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
          <h3 className="mb-2 group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-red-700 dark:text-red-500">
              Rp {displayPrice.toLocaleString('id-ID')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
