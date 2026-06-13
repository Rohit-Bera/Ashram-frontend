import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'sm' }: StarRatingProps) {
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-500 gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`${cls} ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[11px] font-mono text-amber-800 font-bold">{rating} ({count})</span>
      )}
    </div>
  );
}
