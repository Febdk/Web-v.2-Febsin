import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Truck, Shield, RefreshCw, ChevronLeft } from 'lucide-react';
import { products } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { isAuthenticated } = useAuth();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl mb-4">Produk tidak ditemukan</h1>
        <Link to="/shop">
          <Button>Kembali ke Shop</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const displayPrice = isAuthenticated ? product.memberPrice : product.price;
  const hasDiscount = isAuthenticated && product.memberPrice < product.price;
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Pilih ukuran terlebih dahulu');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        memberPrice: isAuthenticated ? product.memberPrice : undefined,
        image: product.image,
        size: selectedSize
      });
    }
    
    toast.success(`${quantity} item ditambahkan ke keranjang`);
  };

  const handleWishlist = () => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link to="/shop" className="hover:text-red-700 dark:hover:text-red-500 flex items-center">
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-gray-100 dark:bg-gray-900 mb-4 overflow-hidden"
          >
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-red-700 dark:border-red-600'
                    : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-4">
            {product.featured && (
              <Badge className="bg-red-700 hover:bg-red-800 mb-2">Featured</Badge>
            )}
            <h1 className="text-4xl mb-2">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{product.category}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl text-red-700 dark:text-red-500">
                Rp {displayPrice.toLocaleString('id-ID')}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <Badge variant="secondary">Member Price</Badge>
                </>
              )}
            </div>
            {!isAuthenticated && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Login untuk mendapatkan harga member
              </p>
            )}
          </div>

          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3>Pilih Ukuran</h3>
              <button className="text-sm text-red-700 dark:text-red-500 hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 border-2 transition-colors ${
                    selectedSize === size
                      ? 'border-red-700 dark:border-red-600 bg-red-50 dark:bg-red-950'
                      : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-3">Jumlah</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stok tersedia: {product.stock}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              size="lg"
              className="flex-1 bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlist}
              className={inWishlist ? 'border-red-700 text-red-700' : ''}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Product Info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Shield className="w-5 h-5 mr-3" />
              <span>100% Original & Berkualitas</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Truck className="w-5 h-5 mr-3" />
              <span>Gratis Ongkir min. Rp 500.000</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <RefreshCw className="w-5 h-5 mr-3" />
              <span>7 Hari Pengembalian</span>
            </div>
          </div>

          {/* Material Info */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900">
            <h3 className="mb-2">Material</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{product.material}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl mb-8">Produk Serupa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
