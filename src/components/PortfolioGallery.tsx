"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  gallery,
  galleryFilters,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/images";

type FilterId = "all" | GalleryCategory;

function spanClass(span?: GalleryItem["span"]) {
  switch (span) {
    case "feature":
      return "md:col-span-2 md:row-span-2";
    case "tall":
      return "md:row-span-2";
    case "wide":
      return "md:col-span-2";
    default:
      return "";
  }
}

function aspectClass(span?: GalleryItem["span"]) {
  switch (span) {
    case "feature":
      return "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[36rem]";
    case "tall":
      return "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[28rem]";
    case "wide":
      return "aspect-[4/5] md:aspect-[16/10]";
    default:
      return "aspect-[3/4]";
  }
}

export function PortfolioGallery() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const [lightboxKey, setLightboxKey] = useState(0);
  const [headerIn, setHeaderIn] = useState(false);
  const [animTick, setAnimTick] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const items =
    filter === "all" ? gallery : gallery.filter((item) => item.category === filter);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const header = root.querySelector("[data-gallery-header]");
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHeaderIn(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    if (header) headerObserver.observe(header);

    return () => headerObserver.disconnect();
  }, []);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-gallery-item]"));
    nodes.forEach((node) => node.classList.remove("is-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );

    // Stagger via CSS custom property; force reflow so filter changes re-animate
    nodes.forEach((node, index) => {
      node.style.setProperty("--gallery-delay", `${Math.min(index, 10) * 70}ms`);
      observer.observe(node);
    });

    // Reveal anything already in viewport on filter change
    requestAnimationFrame(() => {
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      });
    });

    return () => observer.disconnect();
  }, [filter, animTick, items.length]);

  useEffect(() => {
    if (active === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, items.length]);

  function go(delta: number) {
    setSlideDir(delta > 0 ? "next" : "prev");
    setLightboxKey((k) => k + 1);
    setActive((i) => {
      if (i === null) return i;
      return (i + delta + items.length) % items.length;
    });
  }

  function changeFilter(next: FilterId) {
    if (next === filter) {
      setAnimTick((t) => t + 1);
      return;
    }
    setFilter(next);
    setActive(null);
    setAnimTick((t) => t + 1);
  }

  const activeItem = active !== null ? items[active] : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-margin-mobile py-space-3xl lg:px-margin-desktop"
      id="portfolio"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(254,214,172,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(208,196,191,0.35),transparent_50%)]"
      />

      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-xl">
        <div
          className={`gallery-header flex flex-col justify-between gap-space-lg md:flex-row md:items-end ${
            headerIn ? "is-in" : ""
          }`}
          data-gallery-header
        >
          <div className="max-w-xl space-y-space-xs">
            <div className="gallery-header-line flex items-center gap-space-xs">
              <span className="h-px w-6 origin-left bg-secondary" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                Recent looks
              </span>
            </div>
            <h2 className="gallery-header-title font-headline-lg text-headline-lg-mobile text-on-surface lg:text-headline-lg">
              Gallery
            </h2>
            <p className="gallery-header-copy font-body-md text-body-md text-on-surface-variant">
              Bridal mornings, traditional ceremony glam, and soft evening looks —
              finished across Kumasi.
            </p>
          </div>

          <div
            aria-labelledby={labelId}
            className="gallery-header-tabs flex flex-wrap items-center gap-x-space-md gap-y-space-xs border-b border-outline-variant/40 pb-space-xs"
            role="tablist"
          >
            <span className="sr-only" id={labelId}>
              Filter gallery
            </span>
            {galleryFilters.map((tab) => {
              const selected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  aria-selected={selected}
                  className={`relative font-label-caps text-label-caps uppercase tracking-[0.18em] transition-colors duration-300 ${
                    selected
                      ? "text-on-surface"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  role="tab"
                  type="button"
                  onClick={() => changeFilter(tab.id)}
                >
                  {tab.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-space-xs left-0 h-px w-full origin-left bg-secondary transition-transform duration-500 ease-out ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[12rem] md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {items.map((item, index) => (
            <button
              key={`${filter}-${animTick}-${item.src}`}
              className={`gallery-mosaic-item group relative overflow-hidden bg-surface-container text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${spanClass(item.span)}`}
              data-gallery-item
              type="button"
              onClick={() => {
                setSlideDir("next");
                setLightboxKey((k) => k + 1);
                setActive(index);
              }}
            >
              <div className={`gallery-mosaic-frame relative w-full overflow-hidden ${aspectClass(item.span)}`}>
                <img
                  alt={item.alt}
                  className="gallery-mosaic-img h-full w-full object-cover object-center will-change-transform"
                  loading={index < 4 ? "eager" : "lazy"}
                  src={item.src}
                />
                <div className="gallery-mosaic-veil pointer-events-none absolute inset-0" />
                <div className="gallery-mosaic-shine pointer-events-none absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-space-sm p-space-md text-on-primary">
                  <div className="gallery-mosaic-meta space-y-1">
                    <span className="block font-label-caps text-[10px] uppercase tracking-[0.2em] text-secondary-fixed">
                      {item.category}
                    </span>
                    <span className="block font-title-editorial text-title-editorial">
                      {item.title}
                    </span>
                  </div>
                  <span className="gallery-mosaic-icon material-symbols-outlined shrink-0 text-[18px]">
                    open_in_full
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <p className="font-body-md text-body-md text-on-surface-variant">
            No looks in this collection yet.
          </p>
        )}
      </div>

      {activeItem && active !== null && (
        <div
          aria-label="Gallery lightbox"
          aria-modal="true"
          className="gallery-lightbox fixed inset-0 z-[80] flex items-center justify-center bg-primary/92 px-4 py-8 backdrop-blur-md"
          role="dialog"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close gallery"
            className="gallery-lightbox-chrome absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center text-on-primary/80 transition-colors hover:text-on-primary md:right-8 md:top-8"
            type="button"
            onClick={() => setActive(null)}
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>

          <button
            aria-label="Previous image"
            className="gallery-lightbox-chrome absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-on-primary/70 transition-colors hover:text-on-primary sm:inline-flex md:left-6"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
          >
            <span className="material-symbols-outlined text-[32px]">chevron_left</span>
          </button>

          <figure
            key={lightboxKey}
            className={`gallery-lightbox-figure gallery-lightbox-slide-${slideDir} relative flex max-h-[88vh] w-full max-w-5xl flex-col items-center gap-space-md`}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              alt={activeItem.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              src={activeItem.src}
            />
            <figcaption className="gallery-lightbox-caption flex w-full max-w-3xl items-end justify-between gap-space-md px-1 text-on-primary">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-secondary-fixed">
                  {activeItem.category}
                </p>
                <p className="font-title-editorial text-title-editorial">{activeItem.title}</p>
              </div>
              <p className="font-label-caps text-[11px] uppercase tracking-widest text-on-primary/60">
                {active + 1} / {items.length}
              </p>
            </figcaption>
          </figure>

          <button
            aria-label="Next image"
            className="gallery-lightbox-chrome absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-on-primary/70 transition-colors hover:text-on-primary sm:inline-flex md:right-6"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
          >
            <span className="material-symbols-outlined text-[32px]">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  );
}
