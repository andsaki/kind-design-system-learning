import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  title: string;
}

export const useActiveSection = (items: TocItem[]) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    let mounted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!mounted) return;

        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top,
          );

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.1, 1],
      },
    );

    const observedElements: Element[] = [];
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
        observedElements.push(element);
      }
    });

    return () => {
      mounted = false;
      observedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [items]);

  return activeId;
};
