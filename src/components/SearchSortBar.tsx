import { Search } from 'lucide-react';

interface SearchSortBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchSortBar({ search, onSearchChange }: SearchSortBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fb-textLight" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search memes..."
        className="w-full border border-fb-borderStrong bg-white py-1.5 pl-8 pr-2.5 text-[11px] text-fb-textDark placeholder-fb-textLight outline-none focus:border-fb-blue"
      />
    </div>
  );
}
