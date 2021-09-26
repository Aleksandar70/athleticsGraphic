export const animateHeader = (timelineHeader: any): void => {
  timelineHeader
    .to("#medalsBG", {
      duration: 0.2,
      opacity: 1,
      scaleY: 1,
      ease: "power2.out",
    })
    .to(
      "#medalsCompetition",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsHash",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsEvent",

      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsTitle",
      { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    );
};
