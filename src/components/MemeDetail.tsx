import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Download, ImageIcon, Loader2, Video } from 'lucide-react';
import { fetchMemeById } from '@/lib/api';
import type { Meme } from '@/types';
import { formatDate } from '@/utils/format';
import { downloadMedia, fileNameFromUrl } from '@/utils/download';
import { ModalCloseButton } from './Header';
import { XIcon } from './XIcon';

interface MemeDetailProps {
  memeId: string;
  onClose: () => void;
}

const actionBtn =
  'flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-bold transition-colors';

export function MemeDetail({ memeId, onClose }: MemeDetailProps) {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const m = await fetchMemeById(memeId);
      if (cancelled) return;
      setMeme(m);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [memeId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 border border-fb-border bg-white py-24">
        <Loader2 className="h-5 w-5 animate-spin text-fb-textLight" />
        <p className="text-[11px] text-fb-textMuted">Loading meme...</p>
      </div>
    );
  }

  if (!meme) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 border border-fb-border bg-white py-24 text-center">
        <p className="text-[11px] text-fb-textMuted">This meme could not be found.</p>
        <button
          onClick={onClose}
          className="border border-fb-borderStrong bg-fb-panel px-3 py-1.5 text-[11px] font-bold text-fb-text hover:bg-fb-panelHover"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  const hasCredit = Boolean(meme.credit_name && meme.credit_url);

  return (
    <div className="animate-fade-in border border-fb-border bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-fb-border bg-fb-panel px-3 py-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-[11px] font-bold text-fb-blue hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Gallery
        </button>
        <ModalCloseButton onClose={onClose} />
      </div>

      {/* Media */}
      <div className="relative border-b border-fb-border bg-fb-panel p-3">
        {meme.media_type === 'video' ? (
          <video
            src={meme.media_url}
            controls
            autoPlay
            className="mx-auto max-h-[55vh] w-full object-contain"
          />
        ) : (
          <img
            src={meme.media_url}
            alt={meme.name}
            className="mx-auto max-h-[55vh] w-full object-contain"
          />
        )}

        {/* Download */}
        <button
          onClick={() => void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url))}
          className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center border border-fb-border bg-white text-fb-textMuted hover:border-fb-blue hover:text-fb-blue"
          aria-label={`Download ${meme.name}`}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 border border-fb-border bg-fb-panel px-1.5 py-[1px] text-[10px] font-bold uppercase tracking-wide text-fb-textMuted">
            {meme.media_type === 'video' ? (
              <Video className="h-2.5 w-2.5" />
            ) : (
              <ImageIcon className="h-2.5 w-2.5" />
            )}
            {meme.media_type}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-fb-textLight">
            <Calendar className="h-2.5 w-2.5" />
            {formatDate(meme.created_at)}
          </span>
          {hasCredit && (
            <a
              href={meme.credit_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 border border-fb-borderStrong bg-fb-panel px-1.5 py-[1px] text-[10px] font-bold text-fb-blue hover:bg-fb-panelHover hover:underline"
            >
              <XIcon className="h-2.5 w-2.5" />
              {meme.credit_name}
            </a>
          )}
        </div>
        <h2 className="text-[15px] font-bold text-fb-textDark">{meme.name}</h2>

        {/* Actions */}
        <div className="mt-3 border-t border-fb-border pt-3">
          <button
            onClick={() => void downloadMedia(meme.media_url, fileNameFromUrl(meme.media_url))}
            className={`${actionBtn} border-fb-borderStrong bg-fb-panel text-fb-text hover:bg-fb-panelHover hover:text-fb-blue`}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>

        {meme.description && (
          <p className="mt-3 text-[12px] leading-[1.5] text-fb-text">{meme.description}</p>
        )}
      </div>
    </div>
  );
}
