import { get } from "svelte/store";
import { headerTimeline } from "../../../../stores/stream.store";

export const animateHeader = (): void => {
  get(headerTimeline)
    .to("#startListHeader", {
      duration: 0.2,
      opacity: 1,
      scaleY: 1,
      ease: "power2.out",
    })
    .to(
      "#startListCompetitonTitle",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#startListDiscipline",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<.1"
    )
    .to(
      "#startListHash",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#startListDescription",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    );
};
