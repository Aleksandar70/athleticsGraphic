export const headerAnimation = (timelineHeader): void => {
  timelineHeader
    .to("#startnaListaHeader", {
      duration: 0.2,
      opacity: 1,
      scaleY: 1,
      ease: "power2.out",
    })
    .to(
      "#startnaListaNaslov",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#startnaListaDisciplina",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<.1"
    )
    .to(
      "#startnaListaHash",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#startnaListaTitle",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    );
};
