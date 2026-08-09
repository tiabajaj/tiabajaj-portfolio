import { startTransition, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"

interface PhraseItem {
    text: string
}

interface RotatingRoleLineProps {
    phrases?: PhraseItem[]
    interval?: number
    textColor?: string
    fontSize?: number
    fontWeight?: number
    letterSpacing?: string
    alignment?: "left" | "center" | "right"
    transitionDuration?: number
    sweepWarmColor?: string
    sweepCoolColor?: string
    sweepDuration?: number
}

export default function RotatingRoleLine(props: RotatingRoleLineProps) {
    const {
        phrases = [
            { text: "AEROSPACE ENGINEER" },
            { text: "MISSION SYSTEMS DESIGNER" },
            { text: "ORBITAL SYSTEMS THINKER" },
            { text: "GUIDANCE & CONTROL" },
        ],
        interval = 2400,
        textColor = "#F5F0E6",
        fontSize = 34,
        fontWeight = 500,
        letterSpacing = "0.08em",
        alignment = "center",
        transitionDuration = 0.45,
        sweepWarmColor = "#FFFFFF",
        sweepCoolColor = "#A9CFFF",
        sweepDuration = 4.8,
    } = props

    const hostRef = useRef<HTMLDivElement | null>(null)
    const inView = useInView(hostRef, { amount: 0.5 })
    const [index, setIndex] = useState(0)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    const resolvedPhrases = useMemo(() => {
        const cleaned = phrases
            .map((item) => item?.text?.trim() ?? "")
            .filter((text) => text.length > 0)
        return cleaned.length > 0 ? cleaned : ["AEROSPACE ENGINEER"]
    }, [phrases])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
            const updatePreference = () => {
                startTransition(() => setPrefersReducedMotion(mediaQuery.matches))
            }
            updatePreference()
            mediaQuery.addEventListener("change", updatePreference)
            return () => {
                mediaQuery.removeEventListener("change", updatePreference)
            }
        }
    }, [])

    useEffect(() => {
        const canAnimate = !prefersReducedMotion && inView && resolvedPhrases.length > 1

        if (!canAnimate) return

        const timer = window.setInterval(() => {
            startTransition(() => {
                setIndex((prev) => (prev + 1) % resolvedPhrases.length)
            })
        }, Math.max(500, interval))

        return () => window.clearInterval(timer)
    }, [inView, interval, prefersReducedMotion, resolvedPhrases.length])

    const lineHeightPx = useMemo(() => Math.round(fontSize * 1.18), [fontSize])
    const visibleText = resolvedPhrases[index % resolvedPhrases.length]
    const shouldUseSweep = !prefersReducedMotion && inView
    const justifyContent =
        alignment === "left"
            ? "flex-start"
            : alignment === "right"
              ? "flex-end"
              : "center"

    return (
        <div
            ref={hostRef}
            style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent,
                alignItems: "center",
                overflow: "hidden",
                height: `${lineHeightPx}px`,
            }}
            aria-live="polite"
        >
            {prefersReducedMotion || !inView ? (
                <span
                    style={{
                        display: "block",
                        width: "100%",
                        textAlign: alignment,
                        color: textColor,
                        fontSize: `${fontSize}px`,
                        fontWeight,
                        fontStyle: "italic",
                        letterSpacing,
                        lineHeight: `${lineHeightPx}px`,
                        textTransform: "uppercase",
                        fontFamily:
                            '"Bodoni Moda", "Didot", "Bodoni MT", "Times New Roman", Times, serif',
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }}
                >
                    {resolvedPhrases[0]}
                </span>
            ) : (
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={`${visibleText}-${index}`}
                        initial={{ opacity: 0, y: lineHeightPx * 0.4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -lineHeightPx * 0.4 }}
                        transition={{ duration: Math.max(0.15, transitionDuration), ease: "easeInOut" }}
                        style={{
                            display: "block",
                            width: "100%",
                            textAlign: alignment,
                            color: textColor,
                            fontSize: `${fontSize}px`,
                            fontWeight,
                            fontStyle: "italic",
                            letterSpacing,
                            lineHeight: `${lineHeightPx}px`,
                            textTransform: "uppercase",
                            fontFamily:
                                '"Bodoni Moda", "Didot", "Bodoni MT", "Times New Roman", Times, serif',
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            backgroundImage: shouldUseSweep
                                ? `linear-gradient(100deg, ${textColor} 0%, ${textColor} 44%, ${sweepWarmColor} 49%, ${sweepCoolColor} 53%, ${textColor} 58%, ${textColor} 100%)`
                                : "none",
                            backgroundSize: shouldUseSweep ? "240% 100%" : "100% 100%",
                            backgroundPosition: shouldUseSweep ? "-180% 50%" : "0% 50%",
                            WebkitBackgroundClip: shouldUseSweep ? "text" : "border-box",
                            backgroundClip: shouldUseSweep ? "text" : "border-box",
                            WebkitTextFillColor: shouldUseSweep ? "transparent" : textColor,
                            textShadow: shouldUseSweep
                                ? `0 0 ${Math.max(4, fontSize * 0.2)}px rgba(185, 218, 255, 0.08)`
                                : "none",
                        }}
                    >
                        {shouldUseSweep ? (
                            <motion.span
                                style={{
                                    display: "inline-block",
                                }}
                                animate={{
                                    backgroundPosition: [
                                        "-180% 50%",
                                        "-180% 50%",
                                        "180% 50%",
                                        "180% 50%",
                                    ],
                                }}
                                transition={{
                                    duration: Math.max(2.4, sweepDuration),
                                    ease: "linear",
                                    repeat: Infinity,
                                    times: [0, 0.34, 0.72, 1],
                                }}
                            >
                                {visibleText}
                            </motion.span>
                        ) : (
                            visibleText
                        )}
                    </motion.span>
                </AnimatePresence>
            )}
        </div>
    )
}
