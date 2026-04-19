export const site = {
  name: "5 Shorts",
  tagline: "Independent film production",
  email: "5shortsfilms@gmail.com",
  location: "British Columbia, Canada",
  person: {
    name: "Leigh Akin",
    roles: ["Producer", "Director", "Writer"],
  },
  portfolio: [
    {
      title: "The 10th Door",
      href: "/scripts/the-10th-door",
      description:
        "Narration over visuals — the ladder of categories, and the door that is not a door.",
    },
    {
      title: "The Silent Room",
      href: "/scripts/the-silent-room",
      description:
        "A contained chamber piece — pressure, silence, and what the room won’t let you forget.",
    },
    {
      title: "Ascent",
      href: "/scripts/ascent",
      description:
        "Upward motion as story engine — climb, cost, and the view you didn’t ask for.",
    },
    {
      title: "Transfer",
      href: "/scripts/transfer",
      description:
        "Handoff, transit, and the moment something essential changes hands.",
    },
    {
      title: "Deep Pockets",
      href: "/scripts/deep-pockets",
      description:
        "A pocket with no limit — street stop, courtroom, and what the law can’t measure.",
    },
  ] as const,
}
