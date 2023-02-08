import { useMemo, useState, useEffect } from "react";

// @ts-ignore
function useIsInViewport(ref, rootMargin = "0px") {
  // if (ref == null) return;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
      ),
    []
  );

  useEffect(() => {
    if (ref.current != null){
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }
  }, [ref, observer]);

  return isIntersecting;
}

export default useIsInViewport;