type ValueSkeletonProps = {
  className?: string;
};

export function ValueSkeleton({ className = '' }: ValueSkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton-shimmer inline-block align-middle rounded-md ${className}`.trim()}
    />
  );
}
