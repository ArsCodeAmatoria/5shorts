import type { Locale } from "./config"
import type { ScriptSlug } from "@/lib/script-routes"
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
    copyrightName: string
  }
  home: {
    heroLine1: string
    heroLine2: string
    heroLang: string
    aboutFilms: {
      heading: string
      intro: readonly string[]
      films: readonly { title: string; paragraphs: readonly string[] }[]
      finalNote: { title: string; paragraphs: readonly string[] }
    }
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
  /** Screenplay reader: intro line + sidebar act labels per film. */
  scriptsPage: {
    screenplayIntro: string
    actsNav: string
    scenesNav: string
    navAria: string
  }
  scriptsActs: Record<ScriptSlug, { act1: string; act2: string }>
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
    copyrightName: "A Thousand Cuts Films",
  },
  home: {
    heroLine1: "Independent film",
    heroLine2: "5 Shorts",
    heroLang: "en",
    aboutFilms: {
      heading: "About the Films",
      intro: [
        "These five short films explore a single idea from five different angles:",
        "What happens when reality stops behaving the way we expect it to?",
        "Each story begins grounded—familiar spaces, recognizable emotions—before slipping into something uncertain, surreal, or quietly impossible. There are no explosions, no spectacle for its own sake. The tension lives in stillness, in implication, in what should make sense but doesn't.",
        "This collection is designed to be minimal, deliberate, and unsettling in a way that lingers.",
      ],
      films: [
        {
          title: "The Silent Room",
          paragraphs: [
            "A woman returns to a room that refuses to acknowledge her presence. Time fractures. Sound disappears. The question becomes unavoidable: If the world stops responding to you… do you still exist within it?",
            "A study in isolation, perception, and the thin line between absence and erasure.",
          ],
        },
        {
          title: "Ascent",
          paragraphs: [
            "Balloons rise. Effortlessly. Beautifully. Inevitably. Until they don't.",
            "Told through motion and environment, Ascent traces the arc from lift to collapse—ending not in spectacle, but in quiet aftermath. A meditation on impermanence and the illusion of upward momentum.",
          ],
        },
        {
          title: "The 10th Door",
          paragraphs: [
            "A philosophical descent disguised as ascension. A journey through layers of reality—space, time, identity, and beyond—until there is nothing left to transcend.",
            "At the threshold of the final “door,” the film confronts a paradox: What lies beyond everything… may be nothing at all.",
          ],
        },
        {
          title: "Deep Pockets",
          paragraphs: [
            "A routine search turns into an impossible event. Evidence without limit. Logic without footing.",
            "As authority struggles to define what they're witnessing, the question shifts from legality to language itself: How do you measure something that has no end?",
            "A dark absurdist piece about systems breaking under the weight of the unexplainable.",
          ],
        },
        {
          title: "Transfer",
          paragraphs: [
            "A moment passes between two people—simple, ordinary, unnoticed. Something moves between them. Memory? Emotion? Identity?",
            "Transfer explores the idea that who we are may not be as contained as we believe—and that a single interaction can alter more than we understand.",
          ],
        },
      ],
      finalNote: {
        title: "Final Note",
        paragraphs: [
          "These films are intentionally restrained—built on atmosphere, performance, and concept rather than scale.",
          "They are meant to be experienced, questioned, and interpreted— not fully explained.",
        ],
      },
    },
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Selected work",
    portfolioBlurb:
      "The 5 Shorts anthology — The 10th Door, The Silent Room, Ascent, Transfer, and Deep Pockets.",
    portfolioCta: "Full portfolio",
    aboutEyebrow: "About",
    aboutTitle: "Built around story first.",
    aboutBody:
      "A Thousand Cuts Films develops independent features and shorts with a focus on pressure, character, and tone. The work moves between psychological thriller, grounded fantasy, and music-driven storytelling without losing a precise dramatic spine.",
    aboutRoles: "Leigh Akin — producer, director, writer.",
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
  scriptsPage: {
    screenplayIntro: "Short film script — read below.",
    actsNav: "Acts",
    scenesNav: "Scenes",
    navAria: "Acts and scenes",
  },
  scriptsActs: {
    "the-10th-door": {
      act1: "Act I — The door",
      act2: "Act II — Beyond",
    },
    "the-silent-room": {
      act1: "Act I — The facility",
      act2: "Act II — The room",
    },
    ascent: {
      act1: "Act I — The ground",
      act2: "Act II — The rise",
    },
    transfer: {
      act1: "Act I — The alley",
      act2: "Act II — The bus",
    },
    "deep-pockets": {
      act1: "Act I — The stop",
      act2: "Act II — The court",
    },
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
    copyrightName: "A Thousand Cuts Films",
  },
  home: {
    heroLine1: "Cinéma indépendant",
    heroLine2: "5 Shorts",
    heroLang: "fr",
    aboutFilms: {
      heading: "À propos des films",
      intro: [
        "Cinq courts métrages pour une seule idée, vue sous cinq angles :",
        "Que se passe-t-il lorsque le réel cesse de se conduire comme nous l’attendons ?",
        "Chaque histoire part du sol — lieux familiers, émotions reconnaissables — avant de glisser vers l’incertain, le surréel ou l’impossible silencieux. Pas d’explosions, pas de spectacle gratuit. La tension vit dans l’immobilité, dans ce qui est suggéré, dans ce qui devrait avoir un sens… et n’en a pas.",
        "Ce programme est pensé comme minimal, délibéré, et dérangeant d’une façon qui reste.",
      ],
      films: [
        {
          title: "The Silent Room",
          paragraphs: [
            "Une femme retrouve une pièce qui refuse de reconnaître sa présence. Le temps se fissure. Le son disparaît. La question devient inévitable : si le monde cesse de vous répondre… existe-t-on encore en son sein ?",
            "Une étude de l’isolement, de la perception, et de la ligne fragile entre absence et effacement.",
          ],
        },
        {
          title: "Ascent",
          paragraphs: [
            "Les ballons montent. Sans effort. Avec beauté. Inéluctablement. Jusqu’à ce qu’ils ne montent plus.",
            "Par le mouvement et le milieu, Ascent suit l’arc de l’élévation à l’effondrement — sans finir en spectacle, mais dans un silence après coup. Une méditation sur l’impermanence et l’illusion d’un élan toujours vers le haut.",
          ],
        },
        {
          title: "The 10th Door",
          paragraphs: [
            "Une descente philosophique déguisée en ascension. Un voyage à travers les couches du réel — espace, temps, identité, et au-delà — jusqu’à ce qu’il ne reste plus rien à transcender.",
            "Au seuil de la dernière « porte », le film affronte un paradoxe : ce qui se trouve au-delà de tout… n’est peut-être rien.",
          ],
        },
        {
          title: "Deep Pockets",
          paragraphs: [
            "Une fouille de routine devient un événement impossible. Des preuves sans limites. Une logique sans prise.",
            "Lorsque l’autorité peine à nommer ce qu’elle voit, la question glisse du droit au langage : comment mesurer ce qui n’a pas de fin ?",
            "Une fable absurde et sombre sur des systèmes qui cèdent sous le poids de l’inexplicable.",
          ],
        },
        {
          title: "Transfer",
          paragraphs: [
            "Un instant passe entre deux personnes — simple, ordinaire, à peine remarqué. Quelque chose circule. Mémoire ? Émotion ? Identité ?",
            "Transfer explore l’idée que nous ne sommes peut-être pas aussi clos que nous le croyons — et qu’un seul échange peut en déplacer plus que nous ne le comprendrons.",
          ],
        },
      ],
      finalNote: {
        title: "Note finale",
        paragraphs: [
          "Ces films sont volontairement sobres — fondés sur l’atmosphère, le jeu et le concept plutôt que sur l’échelle.",
          "Ils se veulent vécus, questionnés, interprétés — jamais entièrement expliqués.",
        ],
      },
    },
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Travaux choisis",
    portfolioBlurb:
      "L’anthologie 5 Shorts — The 10th Door, The Silent Room, Ascent, Transfer et Deep Pockets.",
    portfolioCta: "Portfolio complet",
    aboutEyebrow: "À propos",
    aboutTitle: "L’histoire d’abord.",
    aboutBody:
      "A Thousand Cuts Films développe des longs métrages et des courts indépendants en mettant l’accent sur la pression dramatique, le personnage et la tonalité. Le travail navigue entre thriller psychologique, fantaisie ancrée et récit porté par la musique, sans jamais perdre une colonne vertébrale dramatique précise.",
    aboutRoles: "Leigh Akin — productrice, réalisatrice, scénariste.",
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
  scriptsPage: {
    screenplayIntro:
      "Scénario du court métrage — texte intégral ci-dessous (anglais).",
    actsNav: "Actes",
    scenesNav: "Scènes",
    navAria: "Actes et scènes",
  },
  scriptsActs: {
    "the-10th-door": {
      act1: "Acte I — La porte",
      act2: "Acte II — Au-delà",
    },
    "the-silent-room": {
      act1: "Acte I — Le lieu",
      act2: "Acte II — La pièce",
    },
    ascent: {
      act1: "Acte I — Le sol",
      act2: "Acte II — L’élévation",
    },
    transfer: {
      act1: "Acte I — La ruelle",
      act2: "Acte II — Le bus",
    },
    "deep-pockets": {
      act1: "Acte I — Le contrôle",
      act2: "Acte II — Le tribunal",
    },
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
