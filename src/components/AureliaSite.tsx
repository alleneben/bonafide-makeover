"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { nav, services, site, testimonials } from "@/lib/content";
import { images } from "@/lib/images";
import { PortfolioGallery } from "@/components/PortfolioGallery";

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
      href={site.instagramUrl}
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onReserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(32,26,23,0.03)]">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-margin-mobile lg:px-margin-desktop">
          <a className="flex min-w-0 items-center gap-2 sm:gap-space-sm" href="#about" onClick={closeMenu}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary font-title-editorial text-sm italic text-on-primary">
              BM
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-title-editorial text-[17px] leading-none tracking-tight text-on-surface sm:text-title-editorial">
                Bonafide Makeover
              </span>
              <span className="mt-space-xxs hidden truncate font-label-caps text-[10px] uppercase tracking-widest text-secondary sm:block sm:text-label-caps">
                {site.tagline}
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-space-lg xl:flex">
            {nav.map((link) => (
              <a
                key={link.label}
                aria-current={"current" in link && link.current ? "page" : undefined}
                className={
                  "current" in link && link.current
                    ? "relative py-space-xs uppercase text-primary font-medium after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-secondary after:transition-all"
                    : "relative py-space-xs font-label-caps text-label-caps uppercase text-on-surface-variant transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:transition-all hover:text-on-surface hover:after:w-full"
                }
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-space-md">
            <a
              className="hidden items-center gap-space-xxs font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary xl:flex"
              href={site.instagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              <span>{site.instagram}</span>
            </a>
            <a
              className="hidden items-center justify-center rounded-lg bg-primary px-space-md py-space-xs font-label-caps text-label-caps uppercase tracking-wider text-on-primary shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-[1px] hover:bg-inverse-surface hover:text-inverse-on-surface xl:inline-flex"
              href="#book"
            >
              Book Now
            </a>
            <img
              alt="Bonafide Makeover"
              className="hidden h-8 w-8 rounded-full object-cover shadow-[0_0_0_1px_rgba(118,89,55,0.2)] sm:block"
              src={images.portrait}
            />
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-on-surface xl:hidden"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="material-symbols-outlined text-[28px]">{menuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-outline-variant/40 bg-surface px-4 py-4 xl:hidden">
            <div className="flex flex-col">
              {nav.map((link) => (
                <a
                  key={link.label}
                  className="border-b border-outline-variant/30 py-4 font-label-caps text-label-caps uppercase tracking-widest text-on-surface"
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              className="mt-4 flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant"
              href={site.instagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              <span>{site.instagram}</span>
            </a>
            <a
              className="mt-3 inline-flex font-body-sm text-on-surface-variant"
              href={site.phoneHref}
            >
              {site.phone}
            </a>
            <a
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-space-md py-4 font-label-caps text-label-caps uppercase tracking-wider text-on-primary"
              href="#book"
              onClick={closeMenu}
            >
              Book Now
            </a>
          </nav>
        )}
      </header>

      <main className="w-full bg-surface pt-16 sm:pt-20 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full selection:bg-secondary-container selection:text-on-secondary-container overflow-hidden">
          <section className="relative w-full px-margin-mobile lg:px-margin-desktop pt-space-xl lg:pt-space-2xl pb-space-3xl" id="about">
            <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-secondary-fixed-dim/20 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-10 w-[540px] h-[540px] bg-tertiary-fixed/30 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 space-y-space-lg">
                <div className="inline-flex max-w-full items-center gap-space-xs self-start rounded-full bg-surface-container-high/70 px-space-sm py-space-xxs shadow-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  <span className="font-label-caps text-[10px] uppercase leading-snug tracking-widest text-on-surface-variant sm:text-label-caps">
                    Kumasi · Near KNUST
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary">
                    Bonafide Makeover
                  </p>
                  <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl tracking-tight text-on-surface leading-[1.04]">
                    Soft glam that <br className="hidden sm:inline" />
                    lasts from <span className="italic font-normal text-secondary">vow</span> to reception.
                  </h1>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Bridal, traditional, and occasion makeup for Kumasi women who want polished skin, defined eyes, and a finish that holds through heat, tears, and every photo.
                </p>
                <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                  <a
                    className="inline-flex items-center justify-center px-space-xl py-space-sm bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider rounded-lg shadow-md hover:bg-inverse-surface hover:text-inverse-on-surface transform hover:-translate-y-[2px] transition-all"
                    href="#book"
                  >
                    Book Your Date
                  </a>
                  <a
                    className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container text-on-surface font-label-caps text-label-caps uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-all"
                    href="#portfolio"
                  >
                    <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[16px]">photo_library</span>
                    </span>
                    <span>View Portfolio</span>
                  </a>
                </div>
                <div className="pt-space-lg grid grid-cols-3 gap-space-md max-w-lg">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Bridal</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      White wedding mornings
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Kente</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      Traditional ceremony glam
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Home</span>
                    <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider mt-1">
                      Studio or home bridal calls
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
                    <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary-fixed">Makeup Artist · Kumasi</span>
                    <p className="font-title-editorial text-title-editorial italic leading-tight">Bonafide Makeover</p>
                    <span className="font-body-sm text-body-sm text-surface-dim">Kumasi studio · near KNUST</span>
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
                      <span className="font-label-caps text-[10px] uppercase tracking-widest">Signature Look</span>
                    </div>
                    <p className="font-title-editorial text-body-sm font-medium text-on-surface leading-snug">Soft Bridal Glow</p>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Heat-set for Kumasi days</span>
                  </div>
                </div>
                <div className="absolute -top-4 right-2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-secondary-container/90 text-on-secondary-container shadow-md rotate-12 backdrop-blur-md sm:-right-4 sm:-top-6 sm:h-20 sm:w-20">
                  <span className="font-label-caps text-[8px] uppercase tracking-widest leading-none">Bridal</span>
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
                    <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest">Studio Playlist</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-label-caps uppercase bg-secondary-container text-on-secondary-container">
                      Soft Instrumental
                    </span>
                  </div>
                  <span className="font-title-editorial text-title-editorial text-on-surface">Healing In His Presence</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Christian piano for a calm bridal chair
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-end md:gap-space-lg">
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
                  <span className="hidden sm:inline">{playing ? "Playing" : "Paused"}</span>
                  <span className="sm:hidden">{playing ? "On" : "Play"}</span>
                </button>
              </div>
            </div>
          </section>

          <PortfolioGallery />

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl" id="services">
            <div className="max-w-[1360px] mx-auto flex flex-col space-y-space-xl">
              <div className="max-w-2xl space-y-space-xxs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-6 h-[1px] bg-secondary" />
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">What you can book</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface">Services</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Clear offerings for wedding mornings, traditional ceremonies, and portrait days — at the Kumasi studio or in your home.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-space-lg sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex flex-col gap-space-sm border border-outline-variant/50 bg-surface-container-lowest p-space-lg rounded-xl"
                  >
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{service.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{service.description}</p>
                    <span className="font-label-caps text-[10px] uppercase tracking-widest text-secondary pt-space-xs">
                      {service.detail}
                    </span>
                  </div>
                ))}
              </div>
              <a
                className="self-start inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-wider text-secondary hover:text-on-surface transition-colors"
                href="#book"
              >
                <span>Check your date</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-2xl bg-surface-container-low">
            <div className="max-w-[1360px] mx-auto flex flex-col space-y-space-xl">
              <div className="text-center max-w-2xl mx-auto space-y-space-xxs">
                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-[0.2em]">Client notes</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Loved by Kumasi brides</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Real mornings in Kumasi — soft glam that still looks fresh when the photos come back.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {testimonials.map((item) => (
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
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">On Instagram</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">{site.instagram}</h2>
                </div>
                <a
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-xs bg-surface-container text-on-surface rounded-lg font-label-caps text-label-caps uppercase tracking-wider hover:bg-surface-container-high transition-all shadow-sm"
                  href={site.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Follow for bridal looks</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                <InstagramCard
                  alt="Kumasi studio prep"
                  caption="Morning prep in the Kumasi studio: hydrated skin first, then soft contour for the light."
                  comments="48"
                  icon="photo_camera"
                  label="Studio Prep"
                  likes="1.2K"
                  src={images.portrait}
                />
                <InstagramCard
                  alt="Bridal morning reveal"
                  caption="Bridal morning near KNUST. Soft champagne tones, hair set, ready before family arrives."
                  comments="96"
                  icon="favorite"
                  label="Bridal Morning"
                  likes="2.4K"
                  src={images.bridal}
                />
                <InstagramCard
                  alt="Kumasi evening glam"
                  caption="Gold lid and a clean wing for a portrait sitting — finished at the Kumasi studio."
                  comments="71"
                  icon="videocam"
                  label="Soft Glam"
                  likes="1.8K"
                  src={images.editorial}
                />
                <InstagramCard
                  alt="Kumasi afternoon glow"
                  caption="Late sun over Kumasi: less powder, more glow — perfect for garden parties."
                  comments="53"
                  icon="wb_sunny"
                  label="Day Glow"
                  likes="1.5K"
                  src={images.glass}
                />
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl" id="location">
            <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <div className="lg:col-span-5 space-y-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Find the studio</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface leading-tight">
                  Kumasi — near KNUST
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Easy to reach from campus and the wider city. Come to the studio for portraits and bridal trials, or book a home call for wedding mornings across Kumasi.
                </p>
                <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface">
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px]">home_pin</span>
                    <span>{site.address}</span>
                  </div>
                  <div className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px]">call</span>
                    <a className="hover:text-secondary transition-colors" href={site.phoneHref}>
                      {site.phone}
                    </a>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-wider text-secondary hover:text-on-surface transition-colors"
                  href={site.mapsLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Open in Google Maps</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
              <div className="lg:col-span-7 overflow-hidden rounded-xl shadow-md border border-outline-variant/40 bg-surface-container">
                <iframe
                  title="Bonafide Makeover studio location — Kumasi near KNUST"
                  src={site.mapsEmbed}
                  className="h-[280px] w-full border-0 sm:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <section className="w-full px-margin-mobile lg:px-margin-desktop py-space-3xl" id="book">
            <div className="max-w-[1360px] mx-auto bg-surface-container-high/60 rounded-2xl p-space-xl lg:p-space-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/30 rounded-full blur-[90px] pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start relative z-10">
                <div className="lg:col-span-5 space-y-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
                    <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Bookings</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface leading-tight">
                    Secure your bridal morning
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Weekend dates fill quickly. Send your event date, venue, and look preference — you will get a confirmation call on {site.phone}.
                  </p>
                  <div className="space-y-space-xs pt-space-xs font-body-sm text-body-sm text-on-surface">
                    {[
                      "Studio sittings in Kumasi most weekdays",
                      "Home bridal calls across Kumasi",
                      "Touch-up kit available for long ceremony days",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px]">done_all</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-space-md bg-surface-container-lowest/80 backdrop-blur rounded-xl shadow-sm">
                    <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest">Studio contact</span>
                    <p className="font-body-md text-on-surface font-medium mt-1">{site.address}</p>
                    <a className="font-body-sm text-[12px] text-on-surface-variant hover:text-secondary transition-colors" href={site.phoneHref}>
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-md">
                  {submitted ? (
                    <p className="font-title-editorial text-title-editorial italic text-on-surface">
                      Thank you. Your booking request is with Bonafide Makeover. Expect a confirmation call soon.
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
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Phone Number *</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="055 000 0000"
                            required
                            type="tel"
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
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Venue in Kumasi</label>
                          <input
                            className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                            placeholder="Home, church, or hotel"
                            type="text"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Service</label>
                          <select className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary">
                            <option>Bridal makeup</option>
                            <option>Bridal party</option>
                            <option>Traditional ceremony</option>
                            <option>Engagement / portraits</option>
                            <option>Occasion / soft glam</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-caps text-label-caps uppercase text-on-surface-variant">Look notes</label>
                        <textarea
                          className="w-full bg-surface-container-low px-space-md py-space-sm rounded font-body-md text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                          placeholder="Share gown or kente colours, preferred finish (soft / glam), and whether you need the studio or a home call..."
                          rows={3}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-4 border-t border-outline-variant/40 pt-4">
                        <div className="flex items-center gap-2">
                          <input className="rounded accent-secondary" id="ndaCheck" type="checkbox" />
                          <label className="font-body-sm text-[12px] text-on-surface-variant" htmlFor="ndaCheck">
                            I need a home call in Kumasi
                          </label>
                        </div>
                        <button
                          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 font-label-caps text-[10px] uppercase tracking-[0.16em] text-on-primary shadow-[0_1px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-inverse-surface"
                          type="submit"
                        >
                          Submit request
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

      <aside className="fixed bottom-3 left-3 right-3 z-40 flex max-w-full items-center gap-2 rounded-full bg-surface-container-low/90 px-3 py-2 shadow-[0_16px_36px_rgba(32,26,23,0.08)] backdrop-blur-xl sm:bottom-space-lg sm:left-auto sm:right-space-lg sm:w-auto sm:gap-space-sm sm:px-space-md">
        <div className={`w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container ${playing ? "animate-spin-slow" : ""}`}>
          <span className="material-symbols-outlined text-[14px]">album</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col sm:flex-none">
          <span className="font-label-caps text-[9px] uppercase tracking-wider text-secondary">Now Playing</span>
          <span className="max-w-[9.5rem] truncate font-body-sm text-[11px] text-on-surface sm:max-w-none">Healing In His Presence</span>
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
                Bridal glam · Kumasi
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-space-xl font-headline-sm text-headline-sm text-on-surface opacity-75">
              <span className="italic">Bridal</span>
              <span className="font-serif tracking-tighter">TRADITIONAL</span>
              <span className="font-serif tracking-widest text-title-editorial">SOFT GLAM</span>
              <span className="font-serif italic text-title-editorial">PORTRAITS</span>
              <span className="font-serif tracking-widest text-title-editorial">HOME CALLS</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl">
            <div className="md:col-span-4 flex flex-col gap-space-sm">
              <span className="font-headline-md text-headline-md text-on-surface">Bonafide Makeover</span>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Bridal, traditional, and occasion makeup in Kumasi — near KNUST. Studio sittings and home bridal calls.
              </p>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">Kumasi studio</span>
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Studio</span>
              <div className="space-y-space-xxs font-body-md text-body-md text-on-surface-variant">
                <p>{site.address}</p>
                <a className="block hover:text-secondary transition-colors" href={site.mapsLink} rel="noopener noreferrer" target="_blank">
                  View on Google Maps
                </a>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Explore</span>
              <div className="flex flex-col space-y-space-xxs">
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#portfolio">
                  Portfolio
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#services">
                  Services
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#location">
                  Location
                </a>
                <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#book">
                  Book
                </a>
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-widest">Contact</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Call or send your date to reserve a bridal morning.
              </p>
              <div className="flex flex-col gap-space-xs pt-space-xxs">
                <a className="font-body-md text-body-md text-on-surface hover:text-secondary transition-colors underline decoration-secondary-container" href={site.emailHref}>
                  {site.email}
                </a>
                <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary transition-colors" href={site.phoneHref}>
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="pt-space-2xl mt-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant">
            <span className="font-body-sm text-body-sm">© 2026 Bonafide Makeover. All rights reserved.</span>
            <div className="flex items-center gap-space-lg">
              <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors" href={site.instagramUrl} rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
              <a className="font-label-caps text-label-caps uppercase text-secondary hover:text-on-surface transition-colors" href="#book">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
