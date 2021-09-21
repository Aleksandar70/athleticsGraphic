export const headerAnimation = (timelineHeader: any): void => {
  timelineHeader
    .to("#resultListaHeader", {
      duration: 0.2,
      opacity: 1,
      scaleY: 1,
      ease: "power2.out",
    })
    .to(
      "#resultListaNaslov",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#resultListaDisciplina",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<.1"
    )
    .to(
      "#resultListaHash",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#resultListaTitle",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    );
};
