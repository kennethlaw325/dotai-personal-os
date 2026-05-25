import { useEffect, useState } from "react";
import { fetchJson } from "../lib/fetchJson";
import type { ContentDraft, DraftStatus } from "../lib/types";

const STATUS_ORDER: DraftStatus[] = ["idea", "drafting", "review", "published"];

const STATUS_COLOR: Record<DraftStatus, string> = {
  idea: "bg-line text-ink",
  drafting: "bg-amber-100 text-amber-700",
  review: "bg-brand text-white",
  published: "bg-emerald-100 text-emerald-700"
};

const PLATFORM_LABEL: Record<ContentDraft["platform"], string> = {
  techpulse: "TechPulse",
  threads: "Threads",
  x: "X",
  ig: "IG",
  xhs: "XHS"
};

export default function ContentPipelineView() {
  const [drafts, setDrafts] = useState<ContentDraft[] | null>(null);

  useEffect(() => {
    fetchJson<ContentDraft[]>("/data/content-drafts.json", []).then(setDrafts);
  }, []);

  if (drafts === null) return <div className="text-muted text-sm">Loading…</div>;

  if (drafts.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Content Pipeline</h1>
        <p className="text-muted text-sm">
          冇 draft。Vault 嘅 <code className="bg-line px-1 rounded">_drafts/</code> folder 寫 frontmatter <code className="bg-line px-1 rounded">platform</code> + <code className="bg-line px-1 rounded">status</code> 然後 sync。
        </p>
      </div>
    );
  }

  const byStatus = STATUS_ORDER.map((s) => ({
    status: s,
    items: drafts.filter((d) => d.status === s)
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Content Pipeline</h1>
      <p className="text-muted text-sm mb-6">{drafts.length} 個 draft 跨 5 platform</p>

      <div className="grid grid-cols-4 gap-4">
        {byStatus.map(({ status, items }) => (
          <div key={status} className="bg-panel border border-line rounded-xl p-3 min-h-[300px]">
            <header className="flex items-center justify-between mb-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-medium ${STATUS_COLOR[status]}`}
              >
                {status}
              </span>
              <span className="text-xs text-muted">{items.length}</span>
            </header>
            <ul className="space-y-2">
              {items.map((d) => (
                <li key={d.id} className="text-sm">
                  <div className="font-medium leading-tight">{d.title}</div>
                  <div className="text-xs text-muted mt-1">
                    {PLATFORM_LABEL[d.platform]} · {d.updatedAt.slice(0, 10)}
                  </div>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-xs text-muted italic">empty</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
