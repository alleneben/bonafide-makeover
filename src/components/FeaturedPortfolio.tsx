"use client";

import { useState } from "react";
import { images } from "@/lib/images";

type PortfolioFilter = "all" | "editorial" | "bridal" | "glow";

export function FeaturedPortfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const visible = (item: Exclude<PortfolioFilter, "all">) =>
    filter === "all" || filter === item;
  const stackedVisible = visible("bridal") || visible("glow");

  return (
    <section
      className="w-full px-margin-mobile py-space-3xl lg:px-margin-desktop"
      id="portfolio"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col space-y-space-xl">
        <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div className="max-w-xl space-y-space-xxs">
            <div className="flex items-center gap-space-xs">
              <span className="h-px w-6 bg-secondary" />
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                Recent Looks
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface lg:text-headline-lg">
              Portfolio
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Soft bridal glow, traditional ceremony glam, and evening looks finished across
              Kumasi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs rounded-lg bg-surface-container-low p-1.5 shadow-sm">
            {(
              [
                ["all", "All Looks"],
                ["editorial", "Soft Glam"],
                ["bridal", "Bridal"],
                ["glow", "Evening Glow"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                className={`gallery-tab rounded px-space-md py-space-xs font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
                  filter === id
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                type="button"
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-space-lg md:grid-cols-12">
          <div
            className={`gallery-card group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg transition-all duration-500 hover:shadow-2xl md:col-span-7 ${
              visible("editorial") ? "" : "hidden"
            }`}
            id="editorial"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
              <img
                alt="High fashion editorial featuring graphic gold eye makeup"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                src={images.editorial}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <span className="absolute left-space-md top-space-md rounded-full bg-surface/90 px-space-sm py-space-xxs font-label-caps text-[10px] uppercase tracking-widest text-on-surface shadow-sm backdrop-blur-md">
                Soft Glam
              </span>
              <div className="absolute bottom-0 left-0 right-0 flex translate-y-2 flex-col space-y-space-xs p-space-lg text-on-primary transition-transform group-hover:translate-y-0">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary-fixed">
                  Kumasi studio
                </span>
                <h3 className="font-headline-md text-headline-md leading-tight">
                  Gold Hour Soft Glam
                </h3>
                <p className="max-w-lg font-body-sm text-body-sm text-surface-container-high opacity-90">
                  Sculpted waves, warm gold lids, and a clean glossy lip — made for portraits,
                  dinners, and evening photo calls across Kumasi.
                </p>
                <div className="flex flex-wrap items-center gap-space-xs pt-space-xs font-label-caps text-[11px] uppercase text-primary-fixed">
                  <span className="rounded bg-primary/60 px-2 py-0.5">Heat-set skin</span>
                  <span className="rounded bg-primary/60 px-2 py-0.5">Defined eyes</span>
                  <span className="rounded bg-primary/60 px-2 py-0.5">Soft highlight</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col space-y-space-lg md:col-span-5 ${
              stackedVisible ? "" : "hidden"
            }`}
          >
            <div
              className={`gallery-card group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg transition-all duration-500 hover:shadow-2xl ${
                visible("bridal") ? "" : "hidden"
              }`}
              id="bridal-suite"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  alt="Romantic bridal makeup with sculpted updo and luminous skin"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  src={images.bridal}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <span className="absolute left-space-md top-space-md rounded-full bg-surface/90 px-space-sm py-space-xxs font-label-caps text-[10px] uppercase tracking-widest text-on-surface shadow-sm backdrop-blur-md">
                  Bridal
                </span>
                <div className="absolute bottom-0 left-0 right-0 space-y-space-xxs p-space-md text-on-primary lg:p-space-lg">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary-container">
                    Bridal morning · near KNUST
                  </span>
                  <h3 className="font-headline-sm text-headline-sm leading-snug">
                    Soft Kumasi Bride
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high opacity-90">
                    A luminous bridal face with petal blush and a lasting finish — from
                    getting-ready photos to the last dance.
                  </p>
                  <div className="pt-space-xxs font-title-editorial text-body-sm italic text-secondary-fixed">
                    “She came to the house and stayed until the last photo. Nothing moved.”
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`gallery-card group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg transition-all duration-500 hover:shadow-2xl ${
                visible("glow") ? "" : "hidden"
              }`}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-surface-container">
                <img
                  alt="Dewy glass skin and sculpted bridal hair"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  src={images.glass}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <span className="absolute left-space-md top-space-md rounded-full bg-surface/90 px-space-sm py-space-xxs font-label-caps text-[10px] uppercase tracking-widest text-on-surface shadow-sm backdrop-blur-md">
                  Evening
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary-fixed">
                    Reception · Kumasi
                  </span>
                  <h4 className="font-title-editorial text-title-editorial font-medium">
                    Clean Glow for Night Photos
                  </h4>
                  <p className="font-body-sm text-body-sm text-surface-dim">
                    Dewy skin that still photographs clean under reception lights — finished at
                    the studio, touched up at the venue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`gallery-card group relative mt-space-md overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg transition-all duration-500 hover:shadow-2xl md:col-span-12 ${
              visible("glow") ? "" : "hidden"
            }`}
          >
            <div className="grid grid-cols-1 items-center lg:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container lg:col-span-7">
                <img
                  alt="Pearl and gold evening glam with luminous skin"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  src={images.glow}
                />
                <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-surface-container-lowest lg:block" />
              </div>
              <div className="flex flex-col space-y-space-sm bg-surface-container-lowest p-space-lg lg:col-span-5 lg:p-space-xl">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    wb_twilight
                  </span>
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                    Outdoor ceremony
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Late Afternoon Gold
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Warm bronze and pearl for outdoor Kumasi ceremonies — soft enough for
                  daylight, defined enough for the evening programme.
                </p>
                <div className="space-y-space-xxs pt-space-xs">
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">
                    What stays on:
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    Skin prepped for humidity, brows set, and a light gold wash that still reads
                    on camera after the drive to the venue.
                  </p>
                </div>
                <div className="pt-space-sm">
                  <a
                    className="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-secondary transition-colors hover:text-on-surface"
                    href="#book"
                  >
                    <span>Book this look</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
