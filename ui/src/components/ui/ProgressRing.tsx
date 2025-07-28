import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressRing = forwardRef<SVGSVGElement, ProgressRingProps>(
  ({ progress, size = 80, strokeWidth = 8, className }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const getColor = (progress: number) => {
      if (progress >= 90) return 'stroke-success-500';
      if (progress >= 70) return 'stroke-warning-500';
      return 'stroke-error-500';
    };

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        className={cn('transform -rotate-90', className)}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-neutral-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-out', getColor(progress))}
        />
      </svg>
    );
  }
);

ProgressRing.displayName = 'ProgressRing'; 