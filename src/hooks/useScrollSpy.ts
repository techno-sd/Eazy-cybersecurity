"use client";

import { useEffect, useState } from "react";

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  throttleMs?: number;
}

/**
 * Custom hook to detect which section is currently visible in viewport
 * Supports scroll-based active state for navigation menus
 *
 * @param sectionIds - Array of section IDs to track (e.g., ['ai', 'cybersecurity', 'bigdata'])
 * @param offset - Offset from top in pixels (default: 200)
 * @param throttleMs - Throttle delay in milliseconds (default: 100)
 * @returns The currently active section ID
 */
export function useScrollSpy({
  sectionIds,
  offset = 200,
  throttleMs = 100,
}: UseScrollSpyOptions): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let isThrottled = false;

    const handleScroll = () => {
      if (isThrottled) return;

      isThrottled = true;
      timeoutId = setTimeout(() => {
        isThrottled = false;
      }, throttleMs);

      // Get current scroll position
      const scrollPosition = window.scrollY + offset;

      // Find which section is currently in view
      let currentSection = "";

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          // Check if scroll position is within this section
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection = sectionId;
            break;
          }
        }
      }

      // If no section matched and we're near the top, clear active state
      if (!currentSection && window.scrollY < 300) {
        setActiveSection("");
        return;
      }

      // If we're past all sections, keep the last one active
      if (!currentSection && sectionIds.length > 0) {
        const lastSection = document.getElementById(sectionIds[sectionIds.length - 1]);
        if (lastSection && scrollPosition >= lastSection.offsetTop) {
          currentSection = sectionIds[sectionIds.length - 1];
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sectionIds, offset, throttleMs, activeSection]);

  return activeSection;
}
