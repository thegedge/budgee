import type { Action } from "svelte/action";

interface ResizableConfig {
  colSpan?: number;
  rowSpan?: number;
  maxColumns?: number;
  maxRows?: number;
  onResized?: (update: { colSpan?: number; rowSpan?: number }) => void;
  onLiveColSpan?: (colSpan: number | undefined) => void;
}

export const resizable: Action<HTMLElement, ResizableConfig> = (node, config) => {
  let current = config;

  function startResize(
    e: PointerEvent,
    { horizontal, vertical }: { horizontal?: boolean; vertical?: boolean },
  ) {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);

    const gridItem = node.parentElement;
    const grid = node.closest(".chart-grid") ?? node.closest(".table-grid") ?? gridItem;
    if (!grid || !gridItem) return;

    const gridRect = grid.getBoundingClientRect();
    const gridStyle = getComputedStyle(grid);
    const gridColumns = horizontal ? gridStyle.gridTemplateColumns.split(" ").length : 0;
    const rowHeight = vertical ? parseFloat(gridStyle.gridTemplateRows.split(" ")[0]) || 200 : 0;
    const gap = vertical ? parseFloat(gridStyle.rowGap) || 0 : 0;

    let currentColSpan = current.colSpan ?? 1;
    let currentRowSpan = current.rowSpan ?? 1;
    const maxColumns = current.maxColumns ?? 12;
    const maxRows = current.maxRows ?? 4;

    const attr =
      horizontal && vertical
        ? "data-resizing-corner"
        : horizontal
          ? "data-resizing"
          : "data-resizing-vertical";
    node.setAttribute(attr, "");

    const onPointerMove = (ev: PointerEvent) => {
      if (horizontal) {
        const relativeX = ev.clientX - gridRect.left;
        const fractionAcrossGrid = relativeX / gridRect.width;
        const rawSpan = Math.round(fractionAcrossGrid * gridColumns);
        const hostLeft = node.getBoundingClientRect().left - gridRect.left;
        const startCol = Math.round((hostLeft / gridRect.width) * gridColumns);
        currentColSpan = Math.max(1, Math.min(gridColumns - startCol, rawSpan - startCol));
        gridItem.style.gridColumn = `span ${currentColSpan}`;
        current.onLiveColSpan?.(currentColSpan);
      }
      if (vertical) {
        const hostTop = node.getBoundingClientRect().top - gridRect.top;
        const bottomEdge = ev.clientY - gridRect.top;
        const spannedHeight = bottomEdge - hostTop;
        currentRowSpan = Math.max(1, Math.round((spannedHeight + gap) / (rowHeight + gap)));
        gridItem.style.gridRow = `span ${currentRowSpan}`;
      }
    };

    const onPointerUp = () => {
      node.removeAttribute(attr);
      current.onLiveColSpan?.(undefined);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);

      current.onResized?.({
        ...(horizontal && { colSpan: Math.max(1, Math.min(maxColumns, currentColSpan)) }),
        ...(vertical && { rowSpan: Math.max(1, Math.min(maxRows, currentRowSpan)) }),
      });
    };

    handle.addEventListener("pointermove", onPointerMove);
    handle.addEventListener("pointerup", onPointerUp);
  }

  // Attach to child handles
  function attachHandles() {
    for (const handle of Array.from(node.querySelectorAll<HTMLElement>("[data-resize-handle]"))) {
      handle.onpointerdown = (e: PointerEvent) => {
        const axes = handle.dataset.resizeHandle ?? "";
        startResize(e, {
          horizontal: axes.includes("horizontal") || axes.includes("corner"),
          vertical: axes.includes("vertical") || axes.includes("corner"),
        });
      };
    }
  }

  attachHandles();

  return {
    update(newConfig: ResizableConfig) {
      current = newConfig;
      attachHandles();
    },
  };
};
