import { cn } from '@/lib/utils';

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      <svg
        aria-hidden
        className="mx-3 h-4 w-4 text-amber-400"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M12 2l1.902 5.862h6.163l-4.987 3.625 1.902 5.863L12 13.725 6.02 17.35l1.902-5.863L2.935 7.862h6.163L12 2z" />
      </svg>
      <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    </div>
  );
}
