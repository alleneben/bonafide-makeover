"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { images } from "@/lib/images";

const HEALING_TRACK_ID = "f1khMl3MpOY";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe?: () => HTMLIFrameElement;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          height?: string;
          width?: string;
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = Math.floor(seconds % 60);
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

type GalleryFilter = "all" | "editorial" | "bridal" | "glow";

const NAV = [
  { href: "#masterpiece-gallery", label: "Portfolio", current: true },
  { href: "#bridal-suite", label: "Bridal Suite" },
  // { href: "#editorial", label: "Editorial" },
  { href: "#about", label: "About" },
  // { href: "#consultation-desk", label: "Services & Rates" },
  { href: "#consultation-desk", label: "Inquiries" },
] as const;

function SoundBars({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-end ${compact ? "gap-[2px] h-4 px-space-xxs" : "gap-1 h-6 px-space-sm bg-surface-container rounded-lg"}`}>
      <span className={`${compact ? "w-[2px]" : "w-[3px] h-4"} bg-secondary rounded-full wave-bar-1 ${compact ? "" : "h-4"}`} />
      <span className={`${compact ? "w-[2px]" : "w-[3px]"} bg-secondary rounded-full wave-bar-2 ${compact ? "" : "h-2"}`} />
      <span className={`${compact ? "w-[2px]" : "w-[3px]"} bg-secondary rounded-full wave-bar-3 ${compact ? "" : "h-5"}`} />
      <span className={`${compact ? "w-[2px]" : "w-[3px]"} bg-secondary rounded-full wave-bar-4 ${compact ? "" : "h-3"}`} />
      {!compact && (
        <>
          <span className="w-[3px] bg-secondary rounded-full wave-bar-2 h-6" />
          <span className="w-[3px] bg-secondary rounded-full wave-bar-1 h-2" />
          <span className="w-[3px] bg-secondary rounded-full wave-bar-3 h-4" />
        </>
      )}
    </div>
  );
}

function InstagramCard({
  src,
  alt,
  label,
  icon,
  caption,
  likes,
  comments,
}: {
  src: string;
  alt: string;
  label: string;
  icon: string;
  caption: string;
  likes: string;
  comments: string;
}) {
  return (
    <a
      className="group relative aspect-square rounded-xl overflow-hidden bg-surface-container shadow-md"
      href="https://instagram.com/bonafide_makeover"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={src} />
      <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-space-md">
        <div className="flex justify-between items-center text-on-surface-variant">
          <span className="font-label-caps text-[10px] uppercase tracking-widest">{label}</span>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface line-clamp-3">{caption}</p>
        <div className="flex items-center gap-space-md text-secondary font-label-caps text-[11px]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>{" "}
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">chat_bubble</span> {comments}
          </span>
        </div>
      </div>
    </a>
  );
}

export function AureliaSite() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(10863);
  const [submitted, setSubmitted] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const wantsPlay = useRef(true);
  const userPaused = useRef(false);

  function startTrack() {
    const player = playerRef.current;
    if (!player || userPaused.current) return;
    player.unMute();
    player.setVolume(80);
    player.playVideo();
    setPlaying(true);
  }

  useEffect(() => {
    function createPlayer() {
      if (!window.YT || playerRef.current) return;
      playerRef.current = new window.YT.Player("fastcar-player", {
        height: "200",
        width: "200",
        videoId: HEALING_TRACK_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            const iframe = playerRef.current?.getIframe?.();
            iframe?.setAttribute("allow", "autoplay; encrypted-media");
            const length = playerRef.current?.getDuration() ?? 0;
            if (length > 0) setDuration(length);
            startTrack();
          },
          onStateChange: (event) => {
            const isPlaying = event.data === window.YT?.PlayerState.PLAYING;
            if (isPlaying) setPlaying(true);
            if (event.data === window.YT?.PlayerState.ENDED) {
              setPlaying(false);
              setElapsed(0);
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };

      if (!document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }
    }

    function resumeIfBlocked() {
      if (userPaused.current) return;
      startTrack();
    }

    window.addEventListener("pointerdown", resumeIfBlocked);
    window.addEventListener("keydown", resumeIfBlocked);
    return () => {
      window.removeEventListener("pointerdown", resumeIfBlocked);
      window.removeEventListener("keydown", resumeIfBlocked);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const current = playerRef.current?.getCurrentTime() ?? 0;
      const length = playerRef.current?.getDuration() ?? 0;
      setElapsed(current);
      if (length > 0) setDuration(length);
    }, 500);
    return () => window.clearInterval(timer);
  }, [playing]);

  function togglePlayback() {
    const player = playerRef.current;
    if (!player) {
      wantsPlay.current = true;
      setPlaying(true);
      return;
    }
    if (playing) {
      userPaused.current = true;
      wantsPlay.current = false;
      player.pauseVideo();
      setPlaying(false);
      return;
    }
    userPaused.current = false;
    wantsPlay.current = true;
    player.playVideo();
    setPlaying(true);
  }

  const visible = (item: Exclude<GalleryFilter, "all">) => filter === "all" || filter === item;
  const stackedVisible = visible("bridal") || visible("glow");

  function onReserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(32,26,23,0.03)]">
        <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <a className="flex items-center gap-space-sm" href="#about">
              <span className="h-8 w-8 rounded-lg bg-primary text-on-primary font-title-editorial italic flex items-center justify-center text-sm">
                BM
              </span>
              <span className="flex flex-col">
                <span className="font-title-editorial text-title-editorial tracking-tight text-on-surface leading-none">
                  Bonafide Makeover
                </span>
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest mt-space-xxs">
                  Kumasi Studio · Near KNUST
                </span>
              </span>
            </a>
          </div>
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV.map((link) => (
              <a
                key={link.label}
                aria-current={"current" in link && link.current ? "page" : undefined}
                className={
                  "current" in link && link.current
                    ? "relative py-space-xs uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-secondary after:transition-all text-primary font-medium after:w-full"
                    : "relative py-space-xs font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-secondary hover:after:w-full after:transition-all"
                }
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-space-md">
            <a
              className="hidden sm:flex items-center gap-space-xxs font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors"
              href="https://instagram.com/bonafide_makeover"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>@bonafide_makeover</span>
            </a>
            <a
              className="inline-flex items-center justify-center px-space-md py-space-xs bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider rounded-lg hover:bg-inverse-surface hover:text-inverse-on-surface transition-all transform hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
              href="#consultation-desk"
            >
              Reserve Appointment
            </a>
            <div className="flex items-center pl-space-xxs">
              <img
                alt="Bonafide Makeover"
                className="w-8 h-8 rounded-full object-cover shadow-[0_0_0_1px_rgba(118,89,55,0.2)]"
                src={images.portrait}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full selection:bg-secondary-container selection:text-on-secondary-container overflow-hidden">
          <section className="relative w-full px-margin-mobile lg:px-margin-desktop pt-space-xl lg:pt-space-2xl pb-space-3xl" id="about">
            <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-secondary-fixed-dim/20 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-10 w-[540px] h-[540px] bg-tertiary-fixed/30 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 space-y-space-lg">
                <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-space-xxs bg-surface-container-high/70 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                    Mostly in Kumasi · Apemso, near KNUST
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary">
                    Bonafide Makeover
                  </p>
                  <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl tracking-tight text-on-surface leading-[1.04]">
                    The Art of <br className="hidden sm:inline" />
                    <span className="italic font-normal text-secondary">Radiant</span> Perfection.
                  </h1>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Bridal, traditional, and occasion makeup from her chair in Apemso, Kumasi — near KNUST. Most days she is in Kumasi: home calls, studio sittings, and ceremony mornings across the city.
                </p>
                <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                  <a
                    className="inline-flex items-center justify-center px-space-xl py-space-sm bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider rounded-lg shadow-md hover:bg-inverse-surface hover:text-inverse-on-surface transform hover:-translate-y-[2px] transition-all"
                    href="#masterpiece-gallery"
                  >
                    Explore Selected Works
                  </a>
                  <button
                    className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container text-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-all"
                    type="button"
                    onClick={() => document.getElementById("masterpiece-gallery")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[16px] ml-0.5">play_arrow</span>
                    </span>
                    <span>Watch Backstage Reel</span>
                  </button>
                </div>
                <div className="pt-space-lg grid grid-cols-3 gap-space-md max-w-lg">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Kumasi</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      Home studio in Apemso, near KNUST
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Apemso</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      Studio sittings most days
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Glam</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      Bridal, traditional &amp; portrait
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 relative">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                  <img
                    alt="Bonafide Makeover editorial makeup portrait"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    src={images.portrait}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80 pointer-events-none" />
                  <div className="absolute bottom-space-md left-space-md right-space-md text-on-primary">
                    <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary-fixed">Kumasi Studio Artist</span>
                    <p className="font-title-editorial text-title-editorial italic leading-tight">Bonafide Makeover</p>
                    <span className="font-body-sm text-body-sm text-surface-dim">Mostly at the Apemso chair, near KNUST</span>
                  </div>
                </div>
                <div className="hidden sm:flex absolute -bottom-8 -left-10 bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-xl shadow-xl max-w-xs items-center gap-space-sm -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                    <img alt="Radiant beauty detail" className="w-full h-full object-cover" src={images.glow} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-secondary">
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-label-caps text-[10px] uppercase tracking-widest">Iconic Radiance</span>
                    </div>
                    <p className="font-title-editorial text-body-sm font-medium text-on-surface leading-snug">Kumasi Evening Dew</p>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Soft glow for Kumasi evenings</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-4 w-20 h-20 rounded-full bg-secondary-container/90 backdrop-blur-md flex flex-col items-center justify-center text-on-secondary-container shadow-md rotate-12">
                  <span className="font-label-caps text-[8px] uppercase tracking-widest leading-none">Couture</span>
                  <span className="font-title-editorial text-base italic leading-tight">BM</span>
                  <span className="font-label-caps text-[7px] uppercase tracking-tighter text-on-secondary-fixed-variant">Kumasi</span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-xs">
            <div className="max-w-[1360px] mx-auto bg-surface-container-low rounded-xl p-space-md lg:p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md w-full md:w-auto">
                <div className="relative w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-[26px]">graphic_eq</span>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest">Acoustic Atmosphere</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-label-caps uppercase bg-secondary-container text-on-secondary-container">
                      Master Ambient
                    </span>
                  </div>
                  <span className="font-title-editorial text-title-editorial text-on-surface">Healing In His Presence</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Christian piano instrumental · Prayer &amp; healing
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-lg w-full md:w-auto justify-between md:justify-end">
                <div className={playing ? "" : "opacity-30 wave-paused"}>
                  <SoundBars />
                </div>
                <span className="font-label-caps text-[11px] text-on-surface-variant font-mono">
                  {formatTime(elapsed)} / {formatTime(duration)}
                </span>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-primary text-on-primary rounded-lg font-label-caps text-label-caps uppercase tracking-wider hover:bg-inverse-surface transition-all shadow-sm"
                  type="button"
                  onClick={togglePlayback}
                >
                  <span className="material-symbols-outlined text-[16px]">{playing ? "pause" : "play_arrow"}</span>
                  <span>{playing ? "Background Ambience: ON" : "Background Ambience: PAUSED"}</span>
                </button>
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl" id="masterpiece-gallery">
            <div className="max-w-[1360px] mx-auto flex flex-col space-y-space-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="space-y-space-xxs max-w-xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-6 h-[1px] bg-secondary" />
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Portfolio Archive</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface">Curated Masterpieces</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    White weddings, traditional ceremonies, and portraits — almost all of them done in Kumasi, from the Apemso studio and nearby homes.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-lg shadow-sm">
                  {(
                    [
                      ["all", "All Works"],
                      ["editorial", "High Fashion"],
                      ["bridal", "Bridal Couture"],
                      ["glow", "Bronze & Glass Skin"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      className={`gallery-tab px-space-md py-space-xs rounded font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
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

              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-start">
                <div
                  className={`gallery-card md:col-span-7 group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl ${visible("editorial") ? "" : "hidden"}`}
                  id="editorial"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                    <img
                      alt="High fashion editorial featuring graphic gold eye makeup"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      src={images.editorial}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <span className="absolute top-space-md left-space-md px-space-sm py-space-xxs bg-surface/90 backdrop-blur-md rounded-full font-label-caps text-[10px] uppercase text-on-surface tracking-widest shadow-sm">
                      Kumasi Editorial
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-space-lg text-on-primary flex flex-col space-y-space-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span className="font-label-caps text-[10px] text-secondary-fixed uppercase tracking-widest">Apemso studio · Kumasi</span>
                      <h3 className="font-headline-md text-headline-md leading-tight">Gold Hour — Kumasi Studio Glam</h3>
                      <p className="font-body-sm text-body-sm text-surface-container-high opacity-90 max-w-lg">
                        Sculpted waves, a molten gold lid, and a finish set for Kumasi light — portrait sittings, dinner, and evening photo calls in the city.
                      </p>
                      <div className="pt-space-xs flex flex-wrap items-center gap-space-xs text-[11px] font-label-caps uppercase text-primary-fixed">
                        <span className="bg-primary/60 px-2 py-0.5 rounded">Apemso chair</span>
                        <span className="bg-primary/60 px-2 py-0.5 rounded">Kumasi light</span>
                        <span className="bg-primary/60 px-2 py-0.5 rounded">Heat-proof setting</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`md:col-span-5 flex flex-col space-y-space-lg ${stackedVisible ? "" : "hidden"}`}>
                  <div className={`gallery-card group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl ${visible("bridal") ? "" : "hidden"}`} id="bridal-suite">
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                      <img
                        alt="Romantic bridal makeup with sculpted updo and luminous skin"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={images.bridal}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                      <span className="absolute top-space-md left-space-md px-space-sm py-space-xxs bg-surface/90 backdrop-blur-md rounded-full font-label-caps text-[10px] uppercase text-on-surface tracking-widest shadow-sm">
                        Bridal Suite
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-space-md lg:p-space-lg text-on-primary space-y-space-xxs">
                        <span className="font-label-caps text-[10px] text-secondary-container uppercase tracking-widest">KNUST area · Kumasi bridal morning</span>
                        <h3 className="font-headline-sm text-headline-sm leading-snug">Soft Kumasi Bride</h3>
                        <p className="font-body-sm text-body-sm text-surface-container-high opacity-90">
                          A quiet, luminous bridal face for a Kumasi ceremony — sculpted updo, petal blush, and a finish that holds from the house to the reception.
                        </p>
                        <div className="pt-space-xxs text-secondary-fixed text-body-sm italic font-title-editorial">
                          “She came to the house in Apemso and stayed until the last photo. Nothing moved.”
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`gallery-card group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl ${visible("glow") ? "" : "hidden"}`}>
                    <div className="relative aspect-[16/11] overflow-hidden bg-surface-container">
                      <img
                        alt="Dewy glass skin and sculpted bridal hair"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={images.glass}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                      <span className="absolute top-space-md left-space-md px-space-sm py-space-xxs bg-surface/90 backdrop-blur-md rounded-full font-label-caps text-[10px] uppercase text-on-surface tracking-widest shadow-sm">
                        Kumasi Reception
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-space-md text-on-primary">
                        <span className="font-label-caps text-[10px] text-secondary-fixed uppercase tracking-widest">Garden reception · Kumasi</span>
                        <h4 className="font-title-editorial text-title-editorial font-medium">Glass Skin for the Evening</h4>
                        <p className="font-body-sm text-body-sm text-surface-dim">
                          Dew that still photographs clean under Kumasi reception lights — done in Apemso, touched up at the venue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`gallery-card md:col-span-12 group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl mt-space-md ${visible("glow") ? "" : "hidden"}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-surface-container">
                      <img
                        alt="Pearl and gold evening glam with luminous skin"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={images.glow}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface-container-lowest lg:block hidden" />
                    </div>
                    <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col space-y-space-sm bg-surface-container-lowest">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px]">wb_twilight</span>
                        <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Kumasi garden day</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">Garden Party — Late Afternoon Gold</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        A warm bronze and pearl look for outdoor ceremonies around Kumasi — soft enough for daylight, defined enough for the evening programme.
                      </p>
                      <div className="space-y-space-xxs pt-space-xs">
                        <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider">Studio notes:</span>
                        <p className="font-body-sm text-body-sm text-on-surface">
                          Skin prepped against Kumasi humidity, brows set, and a light gold wash that still reads on camera after the short drive from Apemso.
                        </p>
                      </div>
                      <div className="pt-space-sm">
                        <a
                          className="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-secondary hover:text-on-surface transition-colors"
                          href="#consultation-desk"
                        >
                          <span>Book the Kumasi studio</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-2xl bg-surface-container-low">
            <div className="max-w-[1360px] mx-auto flex flex-col space-y-space-xl">
              <div className="text-center max-w-2xl mx-auto space-y-space-xxs">
                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-[0.2em]">Words of Acclaim</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">The Kumasi chair</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Notes from brides and portrait clients who sat with her in Kumasi — mostly in Apemso, near KNUST.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  {
                    quote:
                      "She is usually in Kumasi, and that is where we found her. Calm hands, no rush, and she listened to the kente colours first.",
                    name: "Akosua M.",
                    role: "Traditional & white wedding · Kumasi",
                  },
                  {
                    quote:
                      "Our bridal party met her in Apemso before dawn. By the time the KNUST guests arrived, every sister looked like herself — only clearer.",
                    name: "Efua A.",
                    role: "Bridal party · Apemso, Kumasi",
                  },
                  {
                    quote:
                      "I booked the Apemso studio for an engagement sitting. She stayed in Kumasi with us until the last frame, then sent me home with a small touch-up kit.",
                    name: "Nana Yaa B.",
                    role: "Engagement portraits · Kumasi",
                  },
                ].map((item) => (
                  <div key={item.name} className="bg-surface p-space-xl rounded-xl shadow-sm flex flex-col justify-between space-y-space-md">
                    <span className="font-headline-lg text-secondary opacity-30 leading-none">“</span>
                    <p className="font-title-editorial text-title-editorial italic text-on-surface leading-relaxed">{item.quote}</p>
                    <div className="pt-space-xs">
                      <p className="font-label-caps text-label-caps uppercase text-on-surface">{item.name}</p>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">{item.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl">
            <div className="max-w-[1360px] mx-auto flex flex-col space-y-space-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-xs">
                <div className="space-y-space-xxs">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-secondary" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">From the Kumasi chair</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">@bonafide_makeover</h2>
                </div>
                <a
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-xs bg-surface-container text-on-surface rounded-lg font-label-caps text-label-caps uppercase tracking-wider hover:bg-surface-container-high transition-all shadow-sm"
                  href="https://instagram.com/bonafide_makeover"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Follow looks from the Kumasi studio</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <InstagramCard
                  alt="Kumasi studio prep"
                  caption="“Morning prep in Apemso: skin first, then the Kumasi light. Most days this is where she works.”"
                  comments="412"
                  icon="photo_camera"
                  label="Kumasi Reel"
                  likes="18.4K"
                  src={images.portrait}
                />
                <InstagramCard
                  alt="Bridal suite reveal"
                  caption="“Bridal morning near KNUST. Soft champagne tones, hair set, ready before the family arrives.”"
                  comments="689"
                  icon="favorite"
                  label="Bridal Reveal"
                  likes="24.2K"
                  src={images.bridal}
                />
                <InstagramCard
                  alt="Kumasi evening glam"
                  caption="“Gold lid and a clean wing for a Kumasi portrait sitting. Done at the Apemso chair.”"
                  comments="1,104"
                  icon="videocam"
                  label="Kumasi Glam"
                  likes="31.9K"
                  src={images.editorial}
                />
                <InstagramCard
                  alt="Kumasi afternoon glow"
                  caption="“Late sun over Kumasi: less powder, more glow. This is the face for garden parties in the city.”"
                  comments="516"
                  icon="wb_sunny"
                  label="Sun Ritual"
                  likes="22.8K"
                  src={images.glass}
                />
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl" id="consultation-desk">
            <div className="max-w-[1360px] mx-auto bg-surface-container-high/60 rounded-2xl p-space-xl lg:p-space-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/30 rounded-full blur-[90px] pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
                <div className="lg:col-span-5 space-y-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Private Reservation Desk</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface leading-tight">
                    Book the Kumasi studio
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    She is mostly in Kumasi. The chair is in Apemso, near KNUST — studio sittings and home bridal calls around the city come first. Send the date and the venue in Kumasi.
                  </p>
                  <div className="space-y-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                    {[
                      "Studio sittings in Apemso, most days",
                      "Home bridal calls across Kumasi",
                      "Traditional ceremony and white-wedding glam",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px]">done_all</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-space-md bg-surface-container-lowest/80 backdrop-blur rounded-xl shadow-sm">
                    <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest">Studio &amp; calls</span>
                    <p className="font-body-md text-on-surface font-medium mt-1">Apemso, Kumasi Near KNUST</p>
                    <a className="font-body-sm text-[12px] text-on-surface-variant hover:text-secondary transition-colors" href="tel:+233554435360">
                      +233 554435360
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-md">
                  {submitted ? (
                    <p className="font-title-editorial text-title-editorial italic text-on-surface">
                      Thank you. Your booking note is with Bonafide Makeover in Kumasi. She will confirm by phone.
                    </p>
                  ) : (
                    <form className="space-y-space-md" onSubmit={onReserve}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Full Name *</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="Ama Serwaa"
                            required
                            type="text"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Email Address *</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="ama@email.com"
                            required
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Event Date *</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            required
                            type="date"
                            defaultValue="2025-06-21"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Destination / Venue</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="Apemso, Kumasi"
                            type="text"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Service Type</label>
                          <select className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary">
                            <option>Kumasi bridal morning</option>
                            <option>Kumasi bridal party</option>
                            <option>Kumasi engagement or portrait</option>
                            <option>Traditional ceremony glam</option>
                            <option>Portrait or photoshoot</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Aesthetic Vision &amp; Notes</label>
                        <textarea
                          className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                          placeholder="Tell us the Kumasi venue, the gown or kente, and whether you need the Apemso studio or a home call..."
                          rows={3}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                        <div className="flex items-center gap-2">
                          <input className="rounded accent-secondary" id="ndaCheck" type="checkbox" />
                          <label className="font-body-sm text-[12px] text-on-surface-variant" htmlFor="ndaCheck">
                            I need a home call in Kumasi
                          </label>
                        </div>
                        <button
                          className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-space-sm bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider rounded-lg shadow-md hover:bg-inverse-surface hover:text-inverse-on-surface transform hover:-translate-y-[1px] transition-all"
                          type="submit"
                        >
                          Submit Reservation Request
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="pointer-events-none fixed -left-[9999px] top-0 h-[200px] w-[200px]" aria-hidden>
        <div id="fastcar-player" />
      </div>

      <aside className="fixed bottom-space-lg right-space-lg z-40 bg-surface-container-low/90 backdrop-blur-xl rounded-full px-space-md py-space-xs shadow-[0_16px_36px_rgba(32,26,23,0.08)] flex items-center gap-space-sm">
        <div className={`w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container ${playing ? "animate-spin-slow" : ""}`}>
          <span className="material-symbols-outlined text-[14px]">album</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-[9px] uppercase tracking-wider text-secondary">Now Playing</span>
          <span className="font-body-sm text-[11px] text-on-surface whitespace-nowrap">Healing In His Presence</span>
        </div>
        <div className={playing ? "" : "opacity-30 wave-paused"}>
          <SoundBars compact />
        </div>
        <button
          aria-label="Soundtrack playback control"
          className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-inverse-surface hover:text-inverse-on-surface transition-colors"
          type="button"
          onClick={togglePlayback}
        >
          <span className="material-symbols-outlined text-[15px]">{playing ? "pause" : "play_arrow"}</span>
        </button>
        <div className="hidden md:flex items-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">volume_up</span>
        </div>
      </aside>

      <footer className="w-full bg-surface-container-low mt-space-3xl">
        <div className="w-full bg-surface-container py-space-md overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[18px]">stars</span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                Mostly in Kumasi
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-space-xl font-headline-sm text-headline-sm text-on-surface opacity-75">
              <span className="italic">Kumasi</span>
              <span className="font-serif tracking-tighter">APEMSO</span>
              <span className="font-serif tracking-widest text-title-editorial">KNUST</span>
              <span className="font-serif italic text-title-editorial">BRIDAL</span>
              <span className="font-serif tracking-widest text-title-editorial">KENTE</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl">
            <div className="md:col-span-4 flex flex-col gap-space-sm">
              <span className="font-headline-md text-headline-md text-on-surface">Bonafide Makeover</span>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Bridal and occasion makeup from Apemso, Kumasi — near KNUST. She is mostly in Kumasi.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Mostly in Kumasi</span>
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Studio Location</span>
              <div className="space-y-space-xxs font-body-md text-body-md text-on-surface-variant">
                <p>
                  <span className="font-medium text-on-surface">Studio:</span> Apemso, Kumasi, near KNUST
                </p>
                <p>
                  <span className="font-medium text-on-surface">Usually:</span> in Kumasi, at the studio
                </p>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Navigation</span>
              <div className="flex flex-col space-y-space-xxs">
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#masterpiece-gallery">
                  Portfolio Archive
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#bridal-suite">
                  Bridal Suites
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#editorial">
                  Editorial looks
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#consultation-desk">
                  Tariffs &amp; Services
                </a>
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Consultation Desk</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Kumasi studio bookings and home calls. Call or send the date.
              </p>
              <div className="flex flex-col gap-space-xs pt-space-xxs">
                <a className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors underline decoration-secondary-container" href="mailto:dianawalter@bonafidemakeover.com">
                  dianawalter@bonafidemakeover.com
                </a>
                <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors" href="tel:+233554435360">
                  +233 554435360
                </a>
              </div>
            </div>
          </div>
          <div className="pt-space-2xl mt-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant">
            <span className="font-body-sm text-body-sm">© 2026 Bonafide Makeover. All rights reserved.</span>
            <div className="flex items-center gap-space-lg">
              <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors" href="#consultation-desk">
                Client Terms
              </a>
              <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors" href="#consultation-desk">
                Privacy Charter
              </a>
              <a className="font-label-caps text-label-caps uppercase text-secondary hover:text-on-surface transition-colors" href="#consultation-desk">
                Private Reservations
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
