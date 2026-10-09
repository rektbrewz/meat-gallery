import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Image as ImageIcon, LayoutGrid, Video } from 'lucide-react';
import { Header } from './Header';
import { MemeCard } from './MemeCard';
import { SearchSortBar } from './SearchSortBar';
import { MemeDetail } from './MemeDetail';
import { LoadingState, EmptyState, ErrorState, NoResultsState } from './States';
import { fetchMemes } from '@/lib/api';
import { GOOGLE_FORM_URL } from '@/config';
import type { MediaFilter, Meme } from '@/types';

type View = 'gallery' | 'detail';

const FILTERS: { value: MediaFilter; label: string; icon: typeof LayoutGrid }[] = [
  { value: 'all', label: 'All Memes', icon: LayoutGrid },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'photo', label: 'Photos', icon: ImageIcon },
];

function countLabel(filter: MediaFilter, count: number): string {
  if (filter === 'video') return `${count} ${count === 1 ? 'video' : 'videos'} on the grill`;
  if (filter === 'photo') return `${count} ${count === 1 ? 'photo' : 'photos'} on the grill`;
  return `${count} ${count === 1 ? 'meme' : 'memes'} on the grill`;
}

export function Gallery() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MediaFilter>('all');
  const [view, setView] = useState<View>('gallery');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadMemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMemes({ search, filter });
      setMemes(data);
    } catch {
      setError('Failed to load memes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    void loadMemes();
  }, [loadMemes]);

  const handleCardClick = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBackToGallery = () => {
    setView('gallery');
    setSelectedId(null);
    void loadMemes();
  };

  return (
    <div className="flex h-dvh flex-col bg-fb-bg text-fb-text">
      <Header />

      <main className="flex-1 overflow-hidden">
        <div className="mx-auto h-full max-w-[980px] px-4 py-4">
        {view === 'gallery' && (
          <div className="flex h-full flex-col gap-4 lg:flex-row">
            {/* Left column -- tidak ikut scroll */}
            <aside className="w-full flex-shrink-0 lg:w-[180px] lg:overflow-y-auto">
              <nav className="border border-fb-border bg-white">
                <div className="border-b border-fb-border bg-fb-panel px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-fb-textMuted">
                  Menu
                </div>
                <ul className="divide-y divide-fb-border">
                  {FILTERS.map(({ value, label, icon: Icon }) => (
                    <li key={value}>
                      <button
                        onClick={() => setFilter(value)}
                        aria-pressed={filter === value}
                        className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-[12px] ${
                          filter === value
                            ? 'font-bold text-fb-blue'
                            : 'text-fb-text hover:bg-fb-panel hover:text-fb-blue'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5" />
                          {label}
                        </span>
                        {filter === value && <span aria-hidden="true">&#9656;</span>}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-fb-border p-2">
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1 border border-fb-borderStrong bg-fb-panel px-2 py-1.5 text-[11px] font-bold text-fb-text hover:bg-fb-panelHover"
                  >
                    + Submit a Meme
                    <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                  </a>
                </div>
              </nav>
              <div className="mt-3 hidden border border-fb-border bg-white px-3 py-2 lg:block">
                <p className="text-[10px] font-bold uppercase tracking-wide text-fb-textMuted">How it works</p>
                <p className="mt-1 text-[10px] leading-[1.5] text-fb-textLight">
                  Anyone can submit a meme with the Add Meme button -- it opens a short Google Form.
                </p>
              </div>
            </aside>

            {/* Main feed -- area ini yang scroll */}
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
              {/* Hero */}
              <div className="mb-3 border border-fb-border border-t-2 border-t-fb-blue bg-white px-4 py-3">
                <h2 className="text-[15px] font-bold text-fb-textDark">The Meat Market</h2>
                <p className="mt-0.5 text-[11px] text-fb-textMuted">
                  {memes.length > 0 ? countLabel(filter, memes.length) : 'Drop your freshest memes'}
                </p>
              </div>

              {/* Search */}
              <div className="mb-3 border border-fb-border bg-white p-3">
                <SearchSortBar search={search} onSearchChange={setSearch} />
              </div>

              {/* Content */}
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} onRetry={() => void loadMemes()} />
              ) : memes.length === 0 && !search && filter === 'all' ? (
                <EmptyState />
              ) : memes.length === 0 ? (
                <NoResultsState query={search} />
              ) : (
                <div className="grid animate-fade-in grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {memes.map((meme) => (
                    <MemeCard
                      key={meme.id}
                      meme={meme}
                      onClick={() => handleCardClick(meme.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'detail' && selectedId && (
          <div className="mx-auto h-full max-w-3xl overflow-y-auto">
            <MemeDetail memeId={selectedId} onClose={handleBackToGallery} />
          </div>
        )}
        </div>
      </main>

      {/* Footer -- always visible, pinned at the bottom */}
      <footer className="border-t border-fb-border bg-white px-4 py-3 text-center">
        <p className="text-[11px] leading-[1.6] text-fb-textMuted">
          MEAT Gallery · A community fan build gallery project for{" "}
          <a
            href="https://feel.cash/meat"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fb-blue underline hover:text-fb-active"
          >
            $MEAT
          </a>{" "}
          (
          <a
            href="https://x.com/MeatMETAc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fb-blue underline hover:text-fb-active"
          >
            @MeatMETAc
          </a>
          ).
        </p>
      </footer>
    </div>
  );
}
