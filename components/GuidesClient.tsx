'use client';

import { useMemo, useState } from 'react';
import FiltersBar from '@/components/FiltersBar';
import GuideList from '@/components/GuideList';
import SearchBar from '@/components/SearchBar';
import type { Guide, GuideType } from '@/types/guide';

function matchesCarFree(guide: Guide): boolean {
  if (!guide.transportOptions) {
    return false;
  }
  const hasCar = guide.transportOptions.includes('car');
  const hasTransit = guide.transportOptions.some((option) => option === 'metro' || option === 'bus');
  return !hasCar && hasTransit;
}

export default function GuidesClient({ guides }: { guides: Guide[] }) {
  const [selectedType, setSelectedType] = useState<GuideType | 'all'>('all');
  const [withKids, setWithKids] = useState(false);
  const [carFree, setCarFree] = useState(false);
  const [query, setQuery] = useState('');

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      if (selectedType !== 'all' && guide.type !== selectedType) {
        return false;
      }

      if (withKids && !guide.kidsAges?.length) {
        return false;
      }

      if (carFree && !matchesCarFree(guide)) {
        return false;
      }

      if (query.trim()) {
        const normalized = query.trim().toLowerCase();
        const haystack = `${guide.title} ${guide.summary} ${guide.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(normalized)) {
          return false;
        }
      }

      return true;
    });
  }, [guides, selectedType, withKids, carFree, query]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} />
      <FiltersBar
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        withKids={withKids}
        onWithKidsChange={setWithKids}
        carFree={carFree}
        onCarFreeChange={setCarFree}
      />
      <GuideList guides={filteredGuides} />
    </div>
  );
}
