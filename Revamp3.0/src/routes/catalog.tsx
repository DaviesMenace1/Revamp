import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATALOG, CATEGORIES, MANUFACTURERS, type Category, type Manufacturer } from "@/data/catalog";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Collections — The Revamp UG" },
      {
        name: "description",
        content:
          "Browse our curated catalog of luxury furniture and lighting. Filter by category or by maison — Boca do Lobo, Fendi Casa, Dolce & Gabbana Casa, Versace Home and more.",
      },
      { property: "og:title", content: "Collections — The Revamp UG" },
      {
        property: "og:description",
        content: "Curated pieces from the world's most storied design houses.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [category, setCategory] = useState<Category>("All Artifacts");
  const [manufacturer, setManufacturer] = useState<Manufacturer>("All Ateliers");

  const items = useMemo(
    () =>
      CATALOG.filter(
        (i) =>
          (category === "All Artifacts" || i.category === category) &&
          (manufacturer === "All Ateliers" || i.manufacturer === manufacturer),
      ),
    [category, manufacturer],
  );

  return (
    <>
      <section className="pt-16 pb-12 px-6 lg:px-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gilded" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gilded">
              The Archive
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.05] text-balance max-w-4xl">
            Every piece, <span className="italic">individually</span> sourced.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg">
            A rotating selection from our atelier partners across Italy, Portugal and France.
            Each item is available to commission, import, and install.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Filters */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="sticky top-28 space-y-12">
              <div className="space-y-5">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gilded">
                  By Category
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-3">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`text-sm text-left transition-colors ${
                        category === c
                          ? "text-foreground font-medium border-b-2 border-gilded pb-0.5 self-start"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gilded">
                  The Ateliers
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-3">
                  {MANUFACTURERS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setManufacturer(m)}
                      className={`text-sm text-left transition-colors ${
                        manufacturer === m
                          ? "text-foreground font-medium border-b-2 border-gilded pb-0.5 self-start"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              {(category !== "All Artifacts" || manufacturer !== "All Ateliers") && (
                <button
                  onClick={() => {
                    setCategory("All Artifacts");
                    setManufacturer("All Ateliers");
                  }}
                  className="text-[11px] uppercase tracking-[0.2em] text-gilded hover:text-foreground transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-10 border-b border-border pb-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {items.length} piece{items.length === 1 ? "" : "s"}
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {category} <span className="text-gilded">/</span> {manufacturer}
              </p>
            </div>

            {items.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-serif text-3xl italic mb-3">Nothing matches that pairing.</p>
                <p className="text-muted-foreground text-sm">
                  Try clearing a filter, or request a bespoke source.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {items.map((item) => (
                  <article key={item.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden mb-6 rounded-md bg-muted">
                      <img
                        src={item.image}
                        alt={`${item.name} by ${item.manufacturer}`}
                        width={800}
                        height={1000}
                        loading="lazy"
                        className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-canvas/95 backdrop-blur px-3 py-1 text-[9px] font-semibold uppercase tracking-widest ring-1 ring-border">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gilded mb-1.5">
                          {item.manufacturer}
                        </p>
                        <h3 className="font-serif text-xl font-medium leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {item.blurb}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                        {item.category}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
