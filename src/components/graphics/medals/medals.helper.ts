export const animateHeader = (timelineHeader: any): void => {
  timelineHeader
    .to("#medalsBG", 0.4, { opacity: 1, scaleY: 1, ease: "power2.out" })
    .to(
      "#medalsCompetition",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsHash",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsEvent",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medalsTitle",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    );
};
