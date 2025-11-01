import { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit?: (review: any) => void;
}

export default function ReviewForm({
  productId,
  productName,
  onSubmit,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!title.trim() || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newReview = {
        rating,
        title,
        comment,
        productId,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      if (onSubmit) {
        onSubmit(newReview);
      }

      toast.success("Review submitted successfully!");

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg"
    >
      <h3 className="text-xl mb-4">Write a Review</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Share your experience with{" "}
        <span className="font-medium">{productName}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label>Your Rating *</Label>
          <div className="flex items-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {rating} out of 5 stars
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="review-title">Review Title *</Label>
          <Input
            id="review-title"
            type="text"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="mt-2"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {title.length}/100 characters
          </p>
        </div>

        {/* Comment */}
        <div>
          <Label htmlFor="review-comment">Your Review *</Label>
          <Textarea
            id="review-comment"
            placeholder="Tell us what you think about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            maxLength={500}
            className="mt-2"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {comment.length}/500 characters
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2 font-medium">
            💡 Tips for writing a great review:
          </p>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
            <li>Focus on the product's quality, fit, and material</li>
            <li>Mention sizing accuracy (true to size, runs small/large)</li>
            <li>Share how you use the product</li>
            <li>Be honest and constructive</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={
            isSubmitting || rating === 0 || !title.trim() || !comment.trim()
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By submitting a review, you agree to our terms and conditions
        </p>
      </form>
    </motion.div>
  );
}
