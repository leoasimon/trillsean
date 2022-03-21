import * as R from "ramda";
import React, { ReactElement, useEffect, useRef } from "react";
import "./animatedCounter.less";

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  itemWrapper?: ReactElement;
}

// TODO v2: handle backward counter (start > end)
// TODO v2: fix alignment for padded item content
// TODO v2: separated digits animation ([1][5][2]...)
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  itemWrapper = <span />,
}) => {
  const counterItemRef = useRef<HTMLDivElement>(null);
  const counterItemsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const counterLen = end - start;
  const addStart = R.add(start);
  const counterItems = R.map(addStart, [
    ...Array.from({ length: counterLen + 1 }).keys(),
  ]);
  const reversedCounterItems = R.reverse(counterItems);

  useEffect(() => {
    if (
      counterItemRef.current &&
      counterItemsRef.current &&
      counterRef.current
    ) {
      const height = counterItemRef.current.offsetHeight;
      const width = counterItemRef.current.offsetWidth;
      counterRef.current.style.setProperty("height", `${height}px`);
      counterRef.current.style.setProperty("width", `${width}px`);

      const top = -(counterItemRef.current.clientHeight * counterLen);
      counterItemsRef.current.style.setProperty("top", `${top}px`);
    }
  }, [counterItemRef, counterItemsRef, counterRef, counterLen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counterItemsRef.current) {
        counterItemsRef.current.style.setProperty("top", "0");
        counterItemsRef.current.style.setProperty(
          "transition",
          `top ${duration}s`
        );
      }
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [counterItemsRef, delay, duration]);

  return (
    <div className="animated-counter" ref={counterRef}>
      <div className="counter-items" ref={counterItemsRef}>
        {reversedCounterItems.map((item) => {
          const props = { ref: counterItemRef };
          return (
            <div key={item} {...props}>
              {React.cloneElement(itemWrapper, undefined, item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedCounter;
