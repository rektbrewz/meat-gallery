import { ExternalLink, Plus, X } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/config';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-fb-active bg-fb-blue">
      <div className="mx-auto flex h-[44px] max-w-[980px] items-center justify-between gap-3 px-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/vite.svg" alt="MEAT Gallery" width={30} height={30} className="h-[40px] w-[40px]" />
          <h1 className="text-[15px] font-bold tracking-tight text-white">
            MEAT <span className="font-normal text-fb-soft">Gallery</span>
          </h1>
        </a>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 border border-white bg-white px-2.5 py-[3px] text-[11px] font-bold text-fb-blue hover:border-fb-light hover:bg-fb-panel active:bg-fb-panelHover"
        >
          <Plus className="h-3 w-3" strokeWidth={3} />
          Add Meme
          <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>
    </header>
  );
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

export function ModalCloseButton({ onClose }: ModalCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="flex h-6 w-6 items-center justify-center border border-transparent text-fb-textMuted hover:border-fb-border hover:text-fb-text"
      aria-label="Close"
    >
      <X className="h-4 w-4" />
    </button>
  );
}
