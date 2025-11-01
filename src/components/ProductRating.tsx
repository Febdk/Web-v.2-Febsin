import { Star, StarHalf } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProductRating({
  rating,
  reviewCount,
  showCount = true,
  size = "md",
  className = "",
}: ProductRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={sizeClasses[size]}
          fill="#facc15"
          stroke="#facc15"
          strokeWidth={1}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className={sizeClasses[size]}
          fill="#facc15"
          stroke="#facc15"
          strokeWidth={1}
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={sizeClasses[size]}
          fill="none"
          stroke="#d1d5db"
          strokeWidth={1}
        />
      );
    }

    return stars;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">{renderStars()}</div>
      <span
        className={`${textSizeClasses[size]} text-gray-700 dark:text-gray-300`}
      >
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span
          className={`${textSizeClasses[size]} text-gray-500 dark:text-gray-400`}
        >
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
