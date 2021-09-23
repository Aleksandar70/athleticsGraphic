export const animateHeader = (timelineHeader: any): void => {
  timelineHeader
    .to("#medaljeBG", 0.4, { opacity: 1, scaleY: 1, ease: "power2.out" })
    .to(
      "#medaljeCompetition",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medaljeHash",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medaljeEvent",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    )
    .to(
      "#medaljeTitle",
      0.3,
      { opacity: 1, scaleY: 1, ease: "power2.out" },
      "<0.05"
    );
};
