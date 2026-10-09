import { ExternalLink, ImageIcon, Loader2 } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/config';

const primaryBtn =
  'border border-fb-blue bg-fb-blue px-3 py-1.5 text-[11px] font-bold text-white hover:bg-fb-hover active:bg-fb-active';
const secondaryBtn =
  'border border-fb-borderStrong bg-fb-panel px-3 py-1.5 text-[11px] font-bold text-fb-text hover:bg-fb-panelHover';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-fb-border bg-white py-16">
      <Loader2 className="h-5 w-5 animate-spin text-fb-textLight" />
      <p className="text-[11px] text-fb-textMuted">Loading fresh memes...</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-3 border border-fb-border bg-white px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-fb-border bg-fb-panel">
        <ImageIcon className="h-6 w-6 text-fb-textLight" />
      </div>
      <div>
        <h3 className="text-[13px] font-bold text-fb-textDark">No memes yet</h3>
        <p className="mt-1 text-[11px] text-fb-textMuted">Be the first to drop a meme on MEAT Gallery.</p>
      </div>
      <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} inline-flex items-center gap-1`}>
        Add Your First Meme
        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
      </a>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-3 border border-fb-redBorder bg-fb-redBg px-6 py-12 text-center">
      <div>
        <h3 className="text-[13px] font-bold text-fb-red">Something went wrong</h3>
        <p className="mt-1 text-[11px] text-fb-red">{message}</p>
      </div>
      <button onClick={onRetry} className={secondaryBtn}>
        Try Again
      </button>
    </div>
  );
}

export function NoResultsState({ query }: { query: string }) {
  return (
    <div className="flex animate-fade-in flex-col items-center justify-center gap-1 border border-fb-border bg-white py-14 text-center">
      <h3 className="text-[13px] font-bold text-fb-textDark">No memes found</h3>
      <p className="text-[11px] text-fb-textMuted">
        Nothing matches {query ? <>&ldquo;{query}&rdquo;</> : 'the current filter'}. Try a different search or filter.
      </p>
    </div>
  );
}
