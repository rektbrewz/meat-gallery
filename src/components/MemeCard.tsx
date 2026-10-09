import { Download, ImageIcon, Play } from 'lucide-react';
import type { Meme } from '@/types';
import { formatDate } from '@/utils/format';
import { downloadMedia, fileNameFromUrl } from '@/utils/download';
import { XIcon } from './XIcon';

interface MemeCardProps {
  meme: Meme;
  onClick: () => void;
}

const iconBtn =
  'flex h-6 w-6 items-center justify-center border border-fb-borderStrong bg-white text-fb-textMuted hover:border-fb-blue hover:text-fb-blue';

export function MemeCard({ meme, onClick }: MemeCardProps) {
  const hasCredit = Boolean(meme.credit_name && meme.credit_url);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border border-fb-border bg-white transition-colors hover:border-fb-borderStrong"
    >
      {/* Media */}
      <div className="relative aspect-square overflow-hidden border-b border-fb-border bg-fb-panel">
        {meme.media_type === 'video' ? (
          <>
            <video
              src={meme.media_url}
              className="h-full w-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center border border-fb-border bg-white/90">
                <Play className="h-4 w-4 fill-fb-blue text-fb-blue" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={meme.media_url}
            alt={meme.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        {/* Type badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 border border-fb-border bg-white px-1.5 py-[1px] text-[10px] font-bold uppercase tracking-wide text-fb-textMuted">
          {meme.media_type === 'video' ? (
            <Play className="h-2.5 w-2.5 fill-fb-textMuted" />
          ) : (
            <ImageIcon className="h-2.5 w-2.5" />
          )}
          {meme.media_type}
        </div>

        {/* Download button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url));
          }}
          className={`${iconBtn} absolute right-2 top-2`}
          aria-label={`Download ${meme.name}`}
          title="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Info */}
      <div className="px-3 py-2.5">
        <h3 className="truncate text-[13px] font-bold text-fb-textDark">{meme.name}</h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-[1.4] text-fb-textMuted">{meme.description}</p>

        {/* Credit */}
        {hasCredit && (
          <a
            href={meme.credit_url as string}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-fb-blue hover:underline"
          >
            <XIcon className="h-3 w-3" />
            {meme.credit_name}
          </a>
        )}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between border-t border-fb-border bg-fb-panel px-3 py-1.5">
        <span className="text-[10px] text-fb-textLight">{formatDate(meme.created_at)}</span>
      </div>
    </div>
  );
}
