'use client';

import type { GuideType } from '@/types/guide';

interface FiltersBarProps {
  selectedType: GuideType | 'all';
  onTypeChange: (value: GuideType | 'all') => void;
  withKids: boolean;
  onWithKidsChange: (value: boolean) => void;
  carFree: boolean;
  onCarFreeChange: (value: boolean) => void;
}

const typeOptions: { label: string; value: GuideType | 'all' }[] = [
  { label: 'Все типы', value: 'all' },
  { label: 'Места', value: 'place' },
  { label: 'Районы', value: 'area' },
  { label: 'Маршруты', value: 'itinerary' },
  { label: 'Транспорт', value: 'transport' },
  { label: 'Подборки', value: 'collection' },
];

export default function FiltersBar({
  selectedType,
  onTypeChange,
  withKids,
  onWithKidsChange,
  carFree,
  onCarFreeChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4 text-sm">
      <div className="flex flex-wrap gap-2">
        {typeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onTypeChange(option.value)}
            className={`rounded-full px-3 py-1 font-medium transition ${
              selectedType === option.value
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-slate-600">
        <input
          type="checkbox"
          checked={withKids}
          onChange={(event) => onWithKidsChange(event.target.checked)}
          className="size-4 rounded border-slate-300 text-brand focus:ring-brand"
        />
        С детьми
      </label>
      <label className="flex items-center gap-2 text-slate-600">
        <input
          type="checkbox"
          checked={carFree}
          onChange={(event) => onCarFreeChange(event.target.checked)}
          className="size-4 rounded border-slate-300 text-brand focus:ring-brand"
        />
        Без машины
      </label>
    </div>
  );
}
