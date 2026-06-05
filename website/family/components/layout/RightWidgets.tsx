export default function RightWidgets() {
  return (
    <aside className="hidden 2xl:block 2xl:w-80">
      <div className="sticky top-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-card p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Suggested connections
          </h3>
          <p className="text-xs text-slate-600 mt-2">
            People you may know from your extended family.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-card p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            Story highlights
          </h3>
          <p className="text-xs text-slate-600 mt-2">
            Recent family stories and memories.
          </p>
        </div>
      </div>
    </aside>
  );
}
