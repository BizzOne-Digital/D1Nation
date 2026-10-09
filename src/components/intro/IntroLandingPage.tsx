"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { INTRO_COOKIE_MAX_AGE_SECONDS, INTRO_SEEN_COOKIE, INTRO_VIDEO_SRC } from "@/lib/brand";

function setIntroSeenCookie() {
  document.cookie = `${INTRO_SEEN_COOKIE}=1; path=/; max-age=${INTRO_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function IntroLandingPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [entering, setEntering] = useState(false);

  const enterSite = useCallback(() => {
    if (entering) return;
    setEntering(true);
    setIntroSeenCookie();
    router.push("/");
    router.refresh();
  }, [entering, router]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = false;
    setMuted(false);

    const tryPlay = async () => {
      try {
        await el.play();
      } catch {
        // Autoplay with sound is blocked on some browsers — fall back to muted, user can unmute.
        el.muted = true;
        setMuted(true);
        try {
          await el.play();
        } catch {
          /* ignore */
        }
      }
    };

    void tryPlay();
  }, []);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) {
      void el.play().catch(() => undefined);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain"
        src={INTRO_VIDEO_SRC}
        autoPlay
        playsInline
        preload="auto"
        muted={muted}
        onEnded={enterSite}
      />

      {/* Light edge fade only — keeps the full video visible */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden
      />

      <div
        className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
      >
        <p className="font-athlete text-[10px] tracking-[0.2em] text-[#FF8C3A]/90 sm:text-xs">D1 Nation</p>
        <button
          type="button"
          onClick={toggleMute}
          className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/25 bg-black/50 backdrop-blur-sm"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>
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
