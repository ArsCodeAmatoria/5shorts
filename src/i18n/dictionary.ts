import type { Locale } from "./config"
import { site } from "@/lib/site"

type Messages = {
  metadata: {
    siteTitle: string
    siteDescription: string
    ogSiteName: string
    homeDescription: string
    aboutDescription: string
    contactDescription: string
    portfolioDescription: string
  }
  skipToContent: string
  header: {
    openMenu: string
    closeMenu: string
    siteMenu: string
    language: string
    switchToEn: string
    switchToFr: string
  }
  nav: {
    home: string
    portfolio: string
    about: string
    contact: string
  }
  footer: {
    aria: string
    home: string
    portfolio: string
    about: string
    contact: string
  }
  home: {
    heroLine1: string
    heroLine2: string
    heroLang: string
    lead: string
    bio: string
    rolesClause: string
    indieHeading: string
    indieP1: string
    indieP2: string
    portfolioEyebrow: string
    portfolioTitle: string
    portfolioBlurb: string
    portfolioCta: string
    aboutEyebrow: string
    aboutTitle: string
    aboutBody: string
    aboutRoles: string
    aboutCta: string
    contactEyebrow: string
    contactTitle: string
    contactBody: string
    contactCta: string
  }
  about: {
    title: string
    body: string
    craftHeading: string
    craftIntro: string
    craftBullets: readonly string[]
    roleHeading: string
    rolesLine: string
  }
  contact: {
    title: string
    body: string
  }
  portfolioPage: {
    eyebrow: string
    title: string
    subtitle: string
  }
  portfolioDescriptions: Record<string, string>
}

const en: Messages = {
  metadata: {
    siteTitle: site.name,
    siteDescription:
      "Independent film production company. Producer, director, and writer Leigh Akin.",
    ogSiteName: site.name,
    homeDescription:
      "Independent film production built for stories that stay under your skin.",
    aboutDescription: `About ${site.name} and principal ${site.person.name}.`,
    contactDescription: `Get in touch with ${site.name} for screeners, packets, and partnerships.`,
    portfolioDescription:
      "Selected film and development projects from 5 Shorts.",
  },
  skipToContent: "Skip to main content",
  header: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    siteMenu: "Site menu",
    language: "Language",
    switchToEn: "English",
    switchToFr: "Français",
  },
  nav: {
    home: "Home",
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
  },
  footer: {
    aria: "Footer",
    home: "Home",
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
  },
  home: {
    heroLine1: "Independent film",
    heroLine2: "5 Shorts",
    heroLang: "en",
    lead: "Production built for stories that stay under your skin.",
    bio: "Character-first work with a sharp eye for tone and tension.",
    rolesClause: site.person.roles.map((r) => r.toLowerCase()).join(", "),
    indieHeading: "Indie features & shorts",
    indieP1:
      "We develop and produce indie features meant for the long haul—scripts that hold up in the room, on location, and in the cut. From psychological thrillers and grounded fantasy to music-driven drama, the work is built around clear premise, pressure, and subtext so every scene earns its place.",
    indieP2:
      "Shorts stay in rotation too: as proof-of-tone, as calling cards for collaborators, and as a way to test rhythm and voice before a bigger swing. Whether it's a contained forest night, a river-town musical, or a single corridor in a castle, the through-line is the same—independent spirit, disciplined craft, and stories that still bother you after the lights come up.",
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Selected work",
    portfolioBlurb:
      "The 5 Shorts anthology — The 10th Door, The Silent Room, Ascent, Transfer, and Deep Pockets.",
    portfolioCta: "Full portfolio",
    aboutEyebrow: "About",
    aboutTitle: "Built around story first.",
    aboutBody: `${site.name} develops independent features and shorts with a focus on pressure, character, and tone. The work moves between psychological thriller, grounded fantasy, and music-driven storytelling without losing a precise dramatic spine.`,
    aboutRoles: `${site.person.name} — ${site.person.roles.map((r) => r.toLowerCase()).join(", ")}.`,
    aboutCta: "More about us",
    contactEyebrow: "Contact",
    contactTitle: "Let's talk.",
    contactBody:
      "Screeners, packets, collaborators, festivals, and production conversations are all welcome.",
    contactCta: "Contact page",
  },
  about: {
    title: "About the studio",
    body: "We work lean and intentional — from script through picture lock — with collaborators who care as much about subtext as they do about the frame.",
    craftHeading: "How we shoot & finish",
    craftIntro:
      "The work comes first; tools follow. We often stay light and handheld on Sony when a scene needs proximity and speed—then carry that same discipline through sound, light, and post so the film feels like one piece.",
    craftBullets: [
      "Sony cameras when we want a nimble, intimate camera—usually handheld, always in service of the scene.",
      "Sound and lighting shaped for performance and place, not for spec sheets.",
    ],
    roleHeading: "Principal",
    rolesLine: site.person.roles.join(" · "),
  },
  contact: {
    title: "Let's talk",
    body: "Screeners, packets, and creative partnerships — reach out and we'll respond directly.",
  },
  portfolioPage: {
    eyebrow: "Portfolio",
    title: "Selected projects",
    subtitle:
      "Each card opens the script page for that short (full text where available).",
  },
  portfolioDescriptions: Object.fromEntries(
    site.portfolio.map((p) => [p.href, p.description])
  ),
}

const fr: Messages = {
  metadata: {
    siteTitle: site.name,
    siteDescription:
      "Maison de production cinématographique indépendante — productrice, réalisatrice et scénariste : Leigh Akin.",
    ogSiteName: site.name,
    homeDescription:
      "Production cinéma indépendante au service d’histoires qui restent sous la peau.",
    aboutDescription: `À propos de ${site.name} et de ${site.person.name}.`,
    contactDescription: `Contacter ${site.name} pour projections, dossiers et partenariats.`,
    portfolioDescription:
      "Projets cinéma et développement sélectionnés — 5 Shorts.",
  },
  skipToContent: "Aller au contenu principal",
  header: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    siteMenu: "Menu du site",
    language: "Langue",
    switchToEn: "English",
    switchToFr: "Français",
  },
  nav: {
    home: "Accueil",
    portfolio: "Portfolio",
    about: "À propos",
    contact: "Contact",
  },
  footer: {
    aria: "Pied de page",
    home: "Accueil",
    portfolio: "Portfolio",
    about: "À propos",
    contact: "Contact",
  },
  home: {
    heroLine1: "Cinéma indépendant",
    heroLine2: "5 Shorts",
    heroLang: "fr",
    lead: "Une production au service d’histoires qui restent sous la peau.",
    bio: "Un travail ancré dans le personnage, avec un sens aigu de la tonalité et de la tension.",
    rolesClause: "productrice, réalisatrice, scénariste",
    indieHeading: "Longs métrages indépendants & courts",
    indieP1:
      "Nous développons et produisons des longs métrages indépendants pensés pour durer — des scénarios solides en salle de script, sur le plateau et au montage. Entre thriller psychologique, fantaisie ancrée et drame porté par la musique, tout repose sur une prémisse nette, une pression tenue et un sous-texte assumé pour que chaque scène mérite sa place.",
    indieP2:
      "Les courts restent eux aussi en circulation : pour affirmer une tonalité, servir de carte de visite aux collaboratrices et collaborateurs, et éprouver rythme et voix avant un projet plus large. Qu’il s’agisse d’une nuit de forêt, d’une comédie musicale de ville fluviale ou d’un couloir de château, la ligne directrice est la même — esprit indépendant, exigence artisanale, et des histoires qui vous suivent quand les lumières se rallument.",
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Travaux choisis",
    portfolioBlurb:
      "L’anthologie 5 Shorts — The 10th Door, The Silent Room, Ascent, Transfer et Deep Pockets.",
    portfolioCta: "Portfolio complet",
    aboutEyebrow: "À propos",
    aboutTitle: "L’histoire d’abord.",
    aboutBody: `${site.name} développe des longs métrages et des courts indépendants en mettant l’accent sur la pression dramatique, le personnage et la tonalité. Le travail navigue entre thriller psychologique, fantaisie ancrée et récit porté par la musique, sans jamais perdre une colonne vertébrale dramatique précise.`,
    aboutRoles: `${site.person.name} — productrice, réalisatrice, scénariste.`,
    aboutCta: "En savoir plus",
    contactEyebrow: "Contact",
    contactTitle: "Parlons-en.",
    contactBody:
      "Projections, dossiers, collaborations, festivals et conversations de production : écrivez-nous.",
    contactCta: "Page contact",
  },
  about: {
    title: "Le studio",
    body: "Nous travaillons de façon sobre et intentionnelle — du script au verrouillage image — avec des collaboratrices et collaborateurs pour qui le sous-texte compte autant que le cadrage.",
    craftHeading: "Tournage & finition",
    craftIntro:
      "Le récit passe avant le matériel. On travaille souvent léger et à la main au Sony lorsqu’une scène demande proximité et réactivité — puis on prolonge la même exigence au son, à la lumière et au post pour que le film tienne d’un seul tenant.",
    craftBullets: [
      "Caméras Sony lorsqu’on veut une caméra souple et proche du jeu — le plus souvent à la main, toujours au service de la scène.",
      "Son et lumière pensés pour la performance et le lieu, pas pour la fiche technique.",
    ],
    roleHeading: "Direction",
    rolesLine: "Productrice · Réalisatrice · Scénariste",
  },
  contact: {
    title: "Parlons-en",
    body: "Projections, dossiers et partenariats créatifs : écrivez-nous et nous répondrons directement.",
  },
  portfolioPage: {
    eyebrow: "Portfolio",
    title: "Projets sélectionnés",
    subtitle:
      "Chaque fiche ouvre la page scénario du court (texte intégral lorsqu’il est disponible).",
  },
  portfolioDescriptions: {
    "/scripts/the-10th-door":
      "Narration sur images — l’échelle des catégories, et la porte qui n’en est pas une.",
    "/scripts/the-silent-room":
      "Une pièce de chambre contenue — pression, silence et ce que la pièce refuse d’oublier.",
    "/scripts/ascent":
      "La montée comme moteur narratif — effort, coût et le panorama dont on ne voulait pas.",
    "/scripts/transfer":
      "Passage de relais, transit et l’instant où l’essentiel change de main.",
    "/scripts/deep-pockets":
      "Une poche sans fin — contrôle au tapis, tribunal, et ce que la loi ne peut pas mesurer.",
  },
}

export function getDictionary(locale: Locale): Messages {
  return locale === "fr" ? fr : en
}

export function getLocalizedPortfolio(locale: Locale) {
  const dict = getDictionary(locale)
  return site.portfolio.map((item) => ({
    title: item.title,
    href: item.href,
    description:
      dict.portfolioDescriptions[item.href] ?? item.description,
  }))
}

export type LocalizedProject = ReturnType<typeof getLocalizedPortfolio>[number]

export type { Messages }
