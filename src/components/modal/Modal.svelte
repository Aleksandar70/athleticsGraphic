<script context="module" lang="ts">
  let onTop: Record<string, unknown>;
  const modals = {};

  export const getModal = (id = ""): Record<string, unknown> => modals[id];
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import "./modal.style.css";

  let topDiv;
  let visible = false;
  let prevOnTop;

  export const id = "";

  const keyPress = (event: KeyboardEvent): void => {
    if (event.key == "Escape" && onTop == topDiv) close();
  };

  const open = (): void => {
    if (visible) return;
    prevOnTop = onTop;
    onTop = topDiv;

    window.addEventListener("keydown", keyPress);
    document.body.style.overflow = "hidden";

    visible = true;

    document.body.appendChild(topDiv);
  };

  const close = (): void => {
    if (!visible) return;
    window.removeEventListener("keydown", keyPress);
    onTop = prevOnTop;
    if (!onTop) document.body.style.overflow = "";
    visible = false;
  };

  modals[id] = { open, close };

  onDestroy(() => {
    delete modals[id];
    window.removeEventListener("keydown", keyPress);
  });
</script>

<div id="topModal" class:visible bind:this={topDiv} on:click={() => close()}>
  <div id="modal" on:click|stopPropagation={() => {}}>
    <svg id="close" on:click={() => close()} viewBox="0 0 12 12">
      <circle cx="6" cy="6" r="6" />
      <line x1="3" y1="3" x2="9" y2="9" />
      <line x1="9" y1="3" x2="3" y2="9" />
    </svg>
    <div id="modal-content">
      <slot />
    </div>
  </div>
</div>
