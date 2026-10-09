"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_SEEN_COOKIE, INTRO_VIDEO_SRC } from "@/lib/brand";

function setIntroSeenCookie() {
  // Session cookie (no Max-Age) — cleared when the browser session ends.
  document.cookie = `${INTRO_SEEN_COOKIE}=1; path=/; SameSite=Lax`;
}

export function IntroLandingPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entering, setEntering] = useState(false);
  /** Shown only when the browser blocks autoplay with sound (common on mobile). */
  const [awaitingTap, setAwaitingTap] = useState(false);

  const enterSite = useCallback(() => {
    if (entering) return;
    setEntering(true);
    setIntroSeenCookie();
    router.push("/");
    router.refresh();
  }, [entering, router]);

  const playWithSound = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return false;

    el.volume = 1;
    el.muted = false;

    try {
      await el.play();
      setAwaitingTap(false);
      return true;
    } catch {
      try {
        el.muted = true;
        await el.play();
        setAwaitingTap(true);
      } catch {
        setAwaitingTap(true);
      }
      return false;
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onCanPlay = () => {
      void playWithSound();
    };

    el.addEventListener("canplay", onCanPlay);
    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void playWithSound();
    }

    return () => el.removeEventListener("canplay", onCanPlay);
  }, [playWithSound]);

  useEffect(() => {
    if (!awaitingTap) return;

    const unlock = () => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = false;
      el.volume = 1;
      void el.play().then(() => setAwaitingTap(false));
    };

    document.addEventListener("pointerdown", unlock, { once: true, capture: true });
    document.addEventListener("keydown", unlock, { once: true, capture: true });

    return () => {
      document.removeEventListener("pointerdown", unlock, { capture: true });
      document.removeEventListener("keydown", unlock, { capture: true });
    };
  }, [awaitingTap]);

  return (
    <div className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        src={INTRO_VIDEO_SRC}
        autoPlay
        playsInline
        preload="auto"
        onEnded={enterSite}
      />

      {awaitingTap ? (
        <button
          type="button"
          className="absolute inset-0 z-20 flex items-end justify-center bg-transparent pb-[max(2rem,env(safe-area-inset-bottom))]"
          onClick={() => void playWithSound()}
          aria-label="Start intro with sound"
        >
          <span className="rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm">
            Tap to start
          </span>
        </button>
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden
      />

      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-6"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
      >
        <p className="font-athlete text-[10px] tracking-[0.2em] text-[#FF8C3A]/90 sm:text-xs">D1 Nation</p>
      </div>

      <div
        className="relative z-10 mt-auto flex items-center justify-end px-4 sm:px-6"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          onClick={enterSite}
          disabled={entering}
          className="pointer-events-auto rounded-full border border-white/30 bg-black/45 px-4 py-2.5 text-xs font-semibold text-white/90 backdrop-blur-sm hover:bg-black/60 disabled:opacity-60"
        >
          {entering ? "Loading…" : "Skip intro"}
        </button>
      </div>
    </div>
  );
}
