export default function TagChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-0.5 text-xs text-slate-600">
      {label}
    </span>
  );
}
