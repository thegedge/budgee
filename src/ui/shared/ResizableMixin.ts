import type { LitElement } from "lit";
import { css, html } from "lit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export const resizableStyles = css`
  .resize-handle {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.15s;
  }
  .resize-handle:hover,
  :host([data-resizing]) .resize-handle {
    background: var(--budgee-primary);
  }
  .resize-handle-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    cursor: row-resize;
    background: transparent;
    transition: background 0.15s;
  }
  .resize-handle-bottom:hover,
  :host([data-resizing-vertical]) .resize-handle-bottom {
    background: var(--budgee-primary);
  }
  .resize-handle-corner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    cursor: nwse-resize;
    background: transparent;
    z-index: 1;
  }
  .resize-handle-corner:hover,
  :host([data-resizing-corner]) .resize-handle-corner {
    background: var(--budgee-primary);
  }
`;

export function renderResizeHandles(host: ResizableHost) {
  return html`
    <div class="resize-handle" @pointerdown=${(e: PointerEvent) => host.startResize(e, { horizontal: true })}></div>
    <div class="resize-handle-bottom" @pointerdown=${(e: PointerEvent) => host.startResize(e, { vertical: true })}></div>
    <div class="resize-handle-corner" @pointerdown=${(e: PointerEvent) => host.startResize(e, { horizontal: true, vertical: true })}></div>
  `;
}

interface ResizableConfig {
  colSpan?: number;
  rowSpan?: number;
}

interface ResizableHost {
  startResize(e: PointerEvent, axes: { horizontal?: boolean; vertical?: boolean }): void;
}

export function ResizableMixin<T extends Constructor<LitElement>>(superClass: T) {
  class ResizableMixinClass extends superClass {
    maxColumns = 12;
    maxRows = 4;

    protected get _resizableConfig(): ResizableConfig {
      return {};
    }

    protected _onResized(_update: { colSpan?: number; rowSpan?: number }): void {}
    protected _onLiveColSpan(_colSpan: number | undefined): void {}

    startResize(
      e: PointerEvent,
      { horizontal, vertical }: { horizontal?: boolean; vertical?: boolean },
    ) {
      e.preventDefault();
      e.stopPropagation();
      const handle = e.currentTarget as HTMLElement;
      handle.setPointerCapture(e.pointerId);

      const grid = this.closest(".chart-grid") ?? this.closest(".table-grid") ?? this.parentElement;
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      const gridStyle = getComputedStyle(grid);
      const gridColumns = horizontal ? gridStyle.gridTemplateColumns.split(" ").length : 0;
      const rowHeight = vertical ? parseFloat(gridStyle.gridTemplateRows.split(" ")[0]) || 200 : 0;
      const gap = vertical ? parseFloat(gridStyle.rowGap) || 0 : 0;

      const config = this._resizableConfig;
      let currentColSpan = config.colSpan ?? 1;
      let currentRowSpan = config.rowSpan ?? 1;

      const attr =
        horizontal && vertical
          ? "data-resizing-corner"
          : horizontal
            ? "data-resizing"
            : "data-resizing-vertical";
      this.setAttribute(attr, "");

      const onPointerMove = (ev: PointerEvent) => {
        if (horizontal) {
          const relativeX = ev.clientX - gridRect.left;
          const fractionAcrossGrid = relativeX / gridRect.width;
          const rawSpan = Math.round(fractionAcrossGrid * gridColumns);
          const hostLeft = this.getBoundingClientRect().left - gridRect.left;
          const startCol = Math.round((hostLeft / gridRect.width) * gridColumns);
          currentColSpan = Math.max(1, Math.min(gridColumns - startCol, rawSpan - startCol));
          this.style.gridColumn = `span ${currentColSpan}`;
          this._onLiveColSpan(currentColSpan);
        }
        if (vertical) {
          const hostTop = this.getBoundingClientRect().top - gridRect.top;
          const bottomEdge = ev.clientY - gridRect.top;
          const spannedHeight = bottomEdge - hostTop;
          currentRowSpan = Math.max(1, Math.round((spannedHeight + gap) / (rowHeight + gap)));
          this.style.gridRow = `span ${currentRowSpan}`;
        }
      };

      const onPointerUp = () => {
        this.removeAttribute(attr);
        this._onLiveColSpan(undefined);
        handle.removeEventListener("pointermove", onPointerMove);
        handle.removeEventListener("pointerup", onPointerUp);

        this._onResized({
          ...(horizontal && {
            colSpan: Math.max(1, Math.min(this.maxColumns, currentColSpan)),
          }),
          ...(vertical && {
            rowSpan: Math.max(1, Math.min(this.maxRows, currentRowSpan)),
          }),
        });
      };

      handle.addEventListener("pointermove", onPointerMove);
      handle.addEventListener("pointerup", onPointerUp);
    }
  }

  return ResizableMixinClass as unknown as Constructor<ResizableMixinClass> & T;
}
