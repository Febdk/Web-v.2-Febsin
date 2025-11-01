import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, CheckCircle, Calendar, ShoppingBag } from "lucide-react";
import { ProductReview } from "../data/mockData";
import ProductRating from "./ProductRating";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
}

export default function ProductReviews({
  reviews,
  averageRating,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<
    "recent" | "helpful" | "highest" | "lowest"
  >("recent");
  const [helpfulVotes, setHelpfulVotes] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Calculate rating distribution
  const actualReviewCount = reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage =
      actualReviewCount > 0 ? (count / actualReviewCount) * 100 : 0;
    // Tambahkan width minimal untuk menghindari bar yang 100% tidak terlihat jika persentasenya sangat kecil
    const minWidth = percentage > 0 && percentage < 5 ? 5 : percentage;

    return { stars, count, percentage, minWidth };
  });

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "helpful":
        return b.helpful - a.helpful;
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl mb-2">{averageRating.toFixed(1)}</div>
            <ProductRating
              rating={averageRating}
              reviewCount={actualReviewCount}
              size="lg"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Based on {actualReviewCount} verified{" "}
              {actualReviewCount === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {ratingDistribution.map(
              ({ stars, count, percentage, minWidth }) => (
                <div key={stars} className="flex items-center gap-3">
                  {/* Bagian Bintang: Diberi warna teks yang tepat */}
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{stars}</span>
                    <span className="text-yellow-400">★</span>
                  </div>

                  {/* Container Bar Abu-abu (Track) */}
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                    {minWidth > 0 && (
                      <motion.div
                        key={`${stars}-${minWidth}`}
                        // HAPUS SEMUA KELAS WARNA TAILWIND DARI SINI
                        className="h-full"
                        // *** TAMBAHKAN WARNA MELALUI STYLE INLINE ***
                        style={{
                          background:
                            "linear-gradient(to right, #FACC15, #EAB308)", // Kode warna Yellow-400 ke Yellow-500
                          width: 0,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${minWidth}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 * (5 - stars),
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </div>

                  {/* Persentase dan Count */}
                  <div className="flex items-center gap-1 w-20 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({count})
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Sort Options */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl">Customer Reviews ({actualReviewCount})</h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("recent")}
          >
            Most Recent
          </Button>
          <Button
            variant={sortBy === "helpful" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("helpful")}
          >
            Most Helpful
          </Button>
          <Button
            variant={sortBy === "highest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("highest")}
          >
            Highest
          </Button>
          <Button
            variant={sortBy === "lowest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("lowest")}
          >
            Lowest
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src={review.userAvatar}
                      alt={review.userName}
                    />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <ProductRating
                      rating={review.rating}
                      showCount={false}
                      size="sm"
                    />
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1 justify-end mb-1">
                    <Calendar className="w-3 h-3" />
                    {review.date}
                  </div>
                  {review.size && (
                    <div className="flex items-center gap-1 justify-end">
                      <ShoppingBag className="w-3 h-3" />
                      Size: {review.size}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div>
                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Review Images (if any) */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Helpful Button */}
              <div className="flex items-center gap-4 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleHelpfulClick(review.id)}
                  className={
                    helpfulVotes[review.id]
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  }
                >
                  <ThumbsUp
                    className={`w-4 h-4 mr-2 ${
                      helpfulVotes[review.id] ? "fill-current" : ""
                    }`}
                  />
                  Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
