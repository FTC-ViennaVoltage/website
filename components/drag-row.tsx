"use client";

import { useRef } from "react";

/*
  A sideways-scrolling row. Touch and trackpads scroll natively; with a mouse
  the row can also be dragged. A click that ends a drag is swallowed so links
  inside the row are not followed by accident.
*/
export default function DragRow({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !ref.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      ref.current.style.scrollSnapType = "none";
      ref.current.style.cursor = "grabbing";
    }
    ref.current.scrollLeft = d.left - dx;
  };
  const end = () => {
    drag.current.down = false;
    if (ref.current) {
      ref.current.style.scrollSnapType = "";
      ref.current.style.cursor = "";
    }
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`drag-row cursor-grab select-none ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerLeave={end}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
