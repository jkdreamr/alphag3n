// All content copied verbatim from alphag3n.com

export const LINKS = {
  apply: "https://luma.com/2hi73qia",
  applyHackathon: "https://luma.com/ml7emv1r",
  stanford: "https://www.alphag3n.com/stanford",
  youtube: "https://www.youtube.com/@alphag3n",
  discord: "https://discord.gg/FSS54eqeBG",
  instagram: "https://instagram.com/alphag3n",
  tiktok: "https://www.tiktok.com/@alphag3n",
  site: "https://www.alphag3n.com",
  email: "alphag3n.s@gmail.com",
  phone: "650 304 5958",
};

export const NAV_SECTIONS = [
  { label: "Vision", href: "/#vision" },
  { label: "Services", href: "/#services" },
  { label: "Events", href: "/#events" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Contact", href: "/#contact" },
];

// Archive / conference pages — internal routes
export const NAV_ARCHIVE = [
  { label: "Taiwan Conference 2026", href: "/taiwan-conference-2026" },
  { label: "Stanford Hackathon 2026", href: "/stanford-hackathon-2026" },
  { label: "Doshisha Conference 2025", href: "/doshisha-conference-2025" },
  { label: "Seoul Conference 2024", href: "/seoul-conference-2024" },
  { label: "SNU Conference 2023", href: "/snu-conference-2023" },
  { label: "Stanford Conference 2023", href: "/stanford-conference-2023" },
  { label: "Blogs", href: "/blogs" },
  { label: "News", href: "/news" },
];

export const SERVICES = [
  {
    id: "speaker-series",
    title: "Speaker Series",
    image: "/assets/img-daf69.png",
    imageAlt: "Sketch of a vintage microphone",
    body: "We interview prominent figures in the Web3 and AI industry. Such interviewees include Dan Kim (VP of Business Development at Coinbase), Sanchan Saxena (Former VP of Products at Coinbase), and Surojit Chatterjee (Former CPO at Coinbase). Upcoming interviewees include Jaeson Ma (founder and CEO of OP3N), Priyanka Mathishara (president of Stanford Blockchain Club), and Bonfire (creator of LiveToken.co and NFT collection PIELAND).",
    cta: { label: "Youtube", href: LINKS.youtube },
  },
  {
    id: "resources",
    title: "Resources",
    image: "/assets/img-54963.png",
    imageAlt: "Sketch of an open book",
    body: "We provide the best resources written by our team, ranging from beginner to expert-level content. Community members can also submit their own resources, which will be reviewed by our team and then posted. News regarding Web3 and AI spaces will also be posted.",
    cta: null,
  },
  {
    id: "events",
    title: "Events",
    image: "/assets/img-681f3.jpeg",
    imageAlt: "Sketch of a calendar",
    body: "Our team hosts Web3 and AI hackathons and conferences, as well as collaborates with other international events. ALPHAG3N's latest event includes a conference hosted at Stanford",
    cta: { label: "Events", href: LINKS.stanford },
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Community Members" },
  { value: 11, suffix: "", label: "Sponsors" },
  { value: 11, suffix: "k+", label: "Raised" },
  { value: 9, suffix: "", label: "Executive Team Members" },
];

export const SPONSORS = [
  { name: "Mithril", src: "" },
  { name: "JetLearn", src: "/assets/img-db3e2.png" },
  { name: "Coinbase", src: "/assets/sp-19acf.png" },
  { name: "Solana Foundation", src: "/assets/sp-3cac5.png" },
  { name: "Polygon", src: "/assets/sp-7c25a.png" },
  { name: "TheMiilk", src: "/assets/sp-fd7d4.png" },
  { name: "Maum", src: "/assets/sp-03d1c.png" },
  { name: "Reach Capital", src: "/assets/sp-reach.png" },
  { name: "Elicit", src: "/assets/sp-gk.png" },
  { name: "CodeTree", src: "/assets/sp-1cfef.png" },
  { name: "HumanX", src: "/assets/sp-b9435.png" },
  { name: "Pear VC", src: "/assets/sp-24a50.png" },
  { name: "Inspirit AI", src: "/assets/sp-updatedlogo.webp" },
  { name: "USA Artificial Intelligence Olympiad", src: "/assets/sp-3a40f.png" },
];

export const TEAM = [
  { name: "Daniel Koo", role: "Founder & CEO", image: "/assets/team-daniel.jpg" },
  { name: "Shayan Salimi", role: "COO", image: "/assets/team-shayan.png" },
  { name: "Aidin Salimi", role: "CFO & CTO", image: "/assets/team-aidin.jpg" },
];

// Event highlights — HAI Hackathon has concluded; Taiwan Conference is upcoming
export const EVENTS = [
  {
    id: "hai-2026",
    tag: "Recap · 2026",
    status: "Completed" as const,
    title: "HAI Hackathon 2026",
    body: "Our 2026 HAI Hackathon brought together the sharpest high-school builders across Web3 and AI for a weekend of hacking, mentorship, and demos. Huge thanks to everyone who built with us — the projects were incredible.",
    cta: { label: "View the Recap", href: LINKS.applyHackathon },
  },
  {
    id: "taiwan-2026",
    tag: "Flagship Event",
    status: "Upcoming" as const,
    title: "Taiwan Conference 2026",
    body: "Our next flagship Web3 and AI conference heads to Taiwan. Expect prominent speakers, hands-on workshops, and a global community of young builders. Details drop soon — join the community to be first to know.",
    cta: { label: "Get Notified", href: LINKS.discord },
  },
];
