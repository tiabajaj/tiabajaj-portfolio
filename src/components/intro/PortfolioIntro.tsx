"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import type * as THREE from "three";
import { createIntroHandles, type IntroHandles } from "./introTypes";
import { SatelliteSketch } from "./SatelliteSketch";
import { IntroTypography } from "./IntroTypography";
import { SkipButton } from "./SkipButton";

const IntroSceneRoot = dynamic(() => import("./scene/IntroSceneRoot").then((m) => m.IntroSceneRoot), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function PortfolioIntro() {
  const handlesRef = useRef<IntroHandles>(createIntroHandles());
  const [canAnimate, setCanAnimate] = useState<boolean | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const sketchRootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLParagraphElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const startedRef = useRef(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanAnimate(!reduceMotion && supportsWebGL());
  }, []);

  // Static fallback for reduced-motion / no-WebGL: settle instantly on the end state.
  useEffect(() => {
    if (canAnimate === false) {
      setUnlocked(true);
      gsap.set([roleRef.current, nameRef.current, taglineRef.current, scrollCueRef.current], { opacity: 1 });
    }
  }, [canAnimate]);

  useEffect(() => {
    if (canAnimate && !unlocked) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [canAnimate, unlocked]);

  // Poll for the R3F scene to register its objects (separate reconciler root —
  // no single reliable "ready" callback), then build the timeline exactly once.
  useEffect(() => {
    if (!canAnimate || startedRef.current) return;

    let rafId: number;
    const tryStart = () => {
      if (startedRef.current || skippedRef.current) return;
      const h = handlesRef.current;
      if (!h.satellite || !h.camera || !h.starfield) {
        rafId = requestAnimationFrame(tryStart);
        return;
      }
      startedRef.current = true;
      buildTimeline(h);
    };
    rafId = requestAnimationFrame(tryStart);
    return () => cancelAnimationFrame(rafId);

    function buildTimeline(h: IntroHandles) {
      const sat = h.satellite!;
      const starMat = h.starfield!.material as THREE.PointsMaterial;
      const drawEls = sketchRootRef.current?.querySelectorAll("[data-draw]") ?? [];

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // -- Stars fade in (0 - 1.0) --
      tl.to(starMat, { opacity: 0.4, duration: 1.4, ease: "power2.out" }, 0.2);

      // -- Satellite sketch draws itself on (0.3 - 2.4) --
      tl.to(
        drawEls,
        { attr: { "stroke-dashoffset": 0 }, duration: 1.3, stagger: 0.05, ease: "power2.inOut" },
        0.3
      );

      // -- Brief hold, quiet energizing pulse (2.4 - 2.8) --
      tl.to(glowRef.current, { opacity: 0.5, duration: 0.35, ease: "power1.out" }, 2.4);
      tl.to(glowRef.current, { opacity: 0, duration: 0.6, ease: "power1.in" }, 2.75);

      // -- Crossfade: sketch dissolves, 3D satellite materializes as wireframe (2.7 - 3.5) --
      tl.to(sketchRootRef.current, { opacity: 0, scale: 1.05, filter: "blur(6px)", duration: 0.7, ease: "power2.inOut" }, 2.7);
      tl.to(sat.group.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: "power3.out" }, 2.8);
      tl.to(sat.wireMat, { opacity: 0.9, duration: 0.5, ease: "power2.out" }, 2.8);

      // -- Wireframe resolves into a solid, softly lit object (3.5 - 4.3) --
      tl.to(sat.wireMat, { opacity: 0.12, duration: 0.8, ease: "power2.inOut" }, 3.5);
      tl.to(sat.solidMat, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 3.5);
      tl.to(sat.cellMat, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 3.6);
      tl.call(() => sat.setSpin(true), [], 4.0);

      // -- Typography reveal, staggered, calm easing (4.2 - 5.4) --
      tl.to(roleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 4.2);
      tl.fromTo(nameRef.current, { y: 12 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 4.45);
      tl.fromTo(taglineRef.current, { y: 10 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 4.75);

      // -- Scroll cue, unlock (5.6 - 6.0) --
      tl.to(scrollCueRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 5.6);
      tl.call(() => setUnlocked(true), [], 5.7);
    }
  }, [canAnimate]);

  function skip() {
    skippedRef.current = true;
    timelineRef.current?.kill();
    const h = handlesRef.current;
    if (h.satellite) {
      h.satellite.group.scale.set(1, 1, 1);
      h.satellite.wireMat.opacity = 0;
      h.satellite.solidMat.opacity = 1;
      h.satellite.cellMat.opacity = 1;
      h.satellite.setSpin(true);
    }
    if (h.starfield) (h.starfield.material as THREE.PointsMaterial).opacity = 0.4;
    if (sketchRootRef.current) gsap.set(sketchRootRef.current, { opacity: 0 });
    gsap.set([roleRef.current, nameRef.current, taglineRef.current, scrollCueRef.current], {
      opacity: 1,
      y: 0,
    });
    setUnlocked(true);
  }

  const wrapperClass = unlocked ? "absolute inset-0 z-0 overflow-hidden" : "fixed inset-0 z-[100] overflow-hidden";

  return (
    <div className={`${wrapperClass} bg-background`}>
      <div className="grain-overlay" />
      {canAnimate !== false && <IntroSceneRoot handles={handlesRef} />}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)" }}
      />
      <SatelliteSketch rootRef={sketchRootRef} />
      <IntroTypography roleRef={roleRef} nameRef={nameRef} taglineRef={taglineRef} scrollCueRef={scrollCueRef} />
      <SkipButton onSkip={skip} visible={!unlocked && canAnimate === true} />
    </div>
  );
}
