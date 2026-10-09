"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { INTRO_COOKIE_MAX_AGE_SECONDS, INTRO_SEEN_COOKIE, INTRO_VIDEO_SRC } from "@/lib/brand";

function setIntroSeenCookie() {
  document.cookie = `${INTRO_SEEN_COOKIE}=1; path=/; max-age=${INTRO_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function IntroLandingPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [entering, setEntering] = useState(false);

  const enterSite = useCallback(() => {
    if (entering) return;
    setEntering(true);
    setIntroSeenCookie();
    router.push("/");
    router.refresh();
  }, [entering, router]);

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
    <div className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col overflow-hidden bg-black font-[family-name:var(--font-marketing)] text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={INTRO_VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={enterSite}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" aria-hidden />

      <div
        className="relative z-10 flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top, 0px))" }}
      >
        <p className="font-athlete text-xs tracking-[0.2em] text-[#FF8C3A]">D1 Nation</p>
        <button
          type="button"
          onClick={toggleMute}
          className="pointer-events-auto flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>

      <div className="relative z-10 mt-auto px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
          <p className="break-words px-2 font-athlete text-[clamp(1.5rem,6vw,2rem)] text-white sm:text-3xl">Run your era.</p>
          <p className="text-sm text-white/75">Tap in when you&apos;re ready.</p>
          <button
            type="button"
            onClick={enterSite}
            disabled={entering}
            className="cta-glow pointer-events-auto inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#FF6600] px-8 py-4 text-xs font-bold uppercase tracking-wide text-white transition hover:scale-[1.02] hover:bg-[#e85c00] disabled:opacity-70"
          >
            {entering ? "Loading…" : "Enter the site"}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={enterSite}
            className="pointer-events-auto text-xs font-medium text-white/70 underline-offset-2 hover:text-white hover:underline"
          >
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
}
