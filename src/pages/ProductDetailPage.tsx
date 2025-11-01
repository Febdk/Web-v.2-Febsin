import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Share2,
  MessageCircle,
} from "lucide-react";
import { products, productReviews } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import ProductRating from "../components/ProductRating";
import ImageZoom from "../components/ImageZoom";
import ProductReviews from "../components/ProductReviews";
import ReviewForm from "../components/ReviewForm";

type TabType = "description" | "reviews" | "shipping";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { isAuthenticated } = useAuth();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>("reviews");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl mb-4">
          Produk tidak ditemukan
        </h1>
        <Link to="/shop">
          <Button>Kembali ke Shop</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const displayPrice = isAuthenticated
    ? product.memberPrice
    : product.price;
  const hasDiscount =
    isAuthenticated && product.memberPrice < product.price;
  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category && p.id !== product.id,
    )
    .slice(0, 4);

  // Get reviews for this product
  const reviews = productReviews.filter(
    (r) => r.productId === product.id,
  );
  const averageRating = product.rating || 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Pilih ukuran terlebih dahulu");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        memberPrice: isAuthenticated
          ? product.memberPrice
          : undefined,
        image: product.image,
        size: selectedSize,
      });
    }

    toast.success(`${quantity} item ditambahkan ke keranjang`);
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Silakan login terlebih dahulu");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Dihapus dari wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Ditambahkan ke wishlist");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} from Febsin!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Product shared successfully!");
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          window.location.href,
        );
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-gray-600 dark:text-gray-400">
        <Link
          to="/shop"
          className="hover:text-red-700 dark:hover:text-red-500 flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">
          {product.name}
        </span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images with Zoom */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageZoom
            images={product.images}
            alt={product.name}
            selectedIndex={selectedImage}
            onIndexChange={setSelectedImage}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4">
            {product.featured && (
              <Badge className="bg-red-700 hover:bg-red-800 mb-2">
                Featured
              </Badge>
            )}
            <h1 className="text-4xl mb-2">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {product.category}
            </p>

            {/* Rating */}
            {averageRating > 0 && (
              <ProductRating
                rating={averageRating}
                reviewCount={reviews.length}
                size="md"
                className="mb-4"
              />
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl text-red-700 dark:text-red-500">
                Rp {displayPrice.toLocaleString("id-ID")}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <Badge variant="secondary">
                    Member Price
                  </Badge>
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
            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
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
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 border-2 transition-colors ${
                    selectedSize === size
                      ? "border-red-700 dark:border-red-600 bg-red-50 dark:bg-red-950"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
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
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(product.stock, quantity + 1),
                    )
                  }
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
              {product.stock === 0 ? "Sold Out" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWishlist}
              className={
                inWishlist ? "border-red-700 text-red-700" : ""
              }
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
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
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {product.material}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs - Custom Implementation */}
      <div className="mb-16">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-full">
            <button
              onClick={() => setActiveTab("description")}
              className={`relative px-8 py-3 rounded-full transition-all duration-300 ${
                activeTab === "description"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {activeTab === "description" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-700 dark:bg-red-600 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Description</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`relative px-8 py-3 rounded-full transition-all duration-300 ${
                activeTab === "reviews"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {activeTab === "reviews" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-700 dark:bg-red-600 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Reviews
                {reviews.length > 0 && (
                  <Badge
                    variant="secondary"
                    className={
                      activeTab === "reviews"
                        ? "bg-white/20 text-white border-white/30"
                        : ""
                    }
                  >
                    {reviews.length}
                  </Badge>
                )}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("shipping")}
              className={`relative px-8 py-3 rounded-full transition-all duration-300 ${
                activeTab === "shipping"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {activeTab === "shipping" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-700 dark:bg-red-600 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">Shipping & Returns</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl mb-4">Product Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Details</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex">
                        <dt className="text-gray-600 dark:text-gray-400 w-32">
                          Category:
                        </dt>
                        <dd>{product.category}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 dark:text-gray-400 w-32">
                          Material:
                        </dt>
                        <dd>{product.material}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 dark:text-gray-400 w-32">
                          Gender:
                        </dt>
                        <dd>{product.gender}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 dark:text-gray-400 w-32">
                          Available Colors:
                        </dt>
                        <dd>{product.colors.join(", ")}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-gray-600 dark:text-gray-400 w-32">
                          Available Sizes:
                        </dt>
                        <dd>{product.sizes.join(", ")}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Care Instructions</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Cuci dengan air dingin</li>
                      <li>• Jangan gunakan pemutih</li>
                      <li>• Setrika dengan suhu rendah</li>
                      <li>• Jangan dry clean</li>
                      <li>• Keringkan dengan cara digantung</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Reviews Section */}
              <ProductReviews
                reviews={reviews}
                averageRating={averageRating}
              />

              <Separator />

              {/* Review Form */}
              {isAuthenticated ? (
                <ReviewForm
                  productId={product.id}
                  productName={product.name}
                />
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl mb-2">Want to write a review?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Please login to share your experience with this product
                  </p>
                  <Link to="/login">
                    <Button>Login to Review</Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl mb-4">Shipping Information</h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 mt-1 text-red-700 dark:text-red-500" />
                    <div>
                      <p className="font-medium mb-1">Free Shipping</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gratis ongkir untuk pembelian minimal Rp 500.000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 mt-1 text-red-700 dark:text-red-500" />
                    <div>
                      <p className="font-medium mb-1">Secure Packaging</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Produk dikemas dengan aman dan rapi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 mt-1 text-red-700 dark:text-red-500" />
                    <div>
                      <p className="font-medium mb-1">7 Days Return</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pengembalian gratis dalam 7 hari jika produk tidak
                        sesuai
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <h4 className="font-medium mb-4">Estimated Delivery Time</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• Jakarta & Sekitarnya: 1-2 hari kerja</li>
                  <li>• Jawa & Bali: 2-3 hari kerja</li>
                  <li>• Luar Jawa: 3-5 hari kerja</li>
                  <li>• Indonesia Timur: 5-7 hari kerja</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl mb-8">Produk Serupa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}