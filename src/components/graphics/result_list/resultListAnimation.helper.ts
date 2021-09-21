export const animateHeader = (timelineHeader: any): void => {
  timelineHeader
    .to("#resultListHeader", {
      duration: 0.2,
      opacity: 1,
      scaleY: 1,
      ease: "power2.out",
    })
    .to(
      "#resultListCompetitionTitle",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#resultListDiscipline",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<.1"
    )
    .to(
      "#resultListHash",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    )
    .to(
      "#resultListDescription",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<"
    );
};