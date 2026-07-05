// Content for archive / sub-pages, copied from the ALPHAG3N Wix site.
// Images live under /assets/archive/<slug>/hero.webp + NN.webp (galleries).

const g = (slug: string, n: number) =>
  Array.from(
    { length: n },
    (_, i) => `/assets/archive/${slug}/${String(i + 1).padStart(2, "0")}.webp`
  );

// pick specific image numbers (used to exclude decorative/stock frames)
const pick = (slug: string, nums: number[]) =>
  nums.map((n) => `/assets/archive/${slug}/${String(n).padStart(2, "0")}.webp`);

export type Person = { name: string; bio: string; image: string };

export type EventPage = {
  kind: "event";
  slug: string;
  navLabel: string;
  name: string;
  tagline?: string;
  status: "Upcoming" | "Completed";
  date: string;
  location: string;
  hero: string;
  partner?: string;
  intro?: string;
  comingSoon?: boolean;
  prize?: { amount: string; note: string };
  eligibility?: string[];
  highlights?: { title: string; body: string }[];
  stats?: { value: string; label: string }[];
  extraSections?: { kicker?: string; title?: string; body: string }[];
  people?: { group: string; members: Person[] }[];
  schedule?: { day?: string; time: string; title: string; body?: string }[];
  faqs?: { q: string; a: string }[];
  gallery?: string[];
  showSponsors?: boolean;
};

export type BlogPage = {
  kind: "blog";
  slug: string;
  navLabel: string;
  name: string;
  tagline: string;
  posts: {
    title: string;
    author: string;
    date: string;
    read: string;
    excerpt: string;
    image?: string;
  }[];
};

export type NewsPage = {
  kind: "news";
  slug: string;
  navLabel: string;
  name: string;
  tagline: string;
  hero: string;
  items: {
    title: string;
    location?: string;
    date?: string;
    heading?: string;
    body: string;
  }[];
  gallery?: string[];
};

export type ArchivePage = EventPage | BlogPage | NewsPage;

export const ARCHIVE: Record<string, ArchivePage> = {
  "taiwan-conference-2026": {
    kind: "event",
    slug: "taiwan-conference-2026",
    navLabel: "Taiwan Conference 2026",
    name: "ALPHAG3N Conference @ Taiwan",
    tagline: "An immersive Physical AI conference for Taiwanese high school students.",
    status: "Upcoming",
    date: "August 9th, 2026 · 10 AM – 5 PM TST",
    location: "Taipei FuHsing Private School",
    hero: "/assets/archive/taiwan-conference-2026/hero.webp",
    comingSoon: true,
  },

  "stanford-hackathon-2026": {
    kind: "event",
    slug: "stanford-hackathon-2026",
    navLabel: "Stanford Hackathon 2026",
    name: "ALPHAG3N HAI Hackathon @ Stanford University",
    tagline:
      "A two full-day, immersive Human-Centered AI Hackathon featuring expert talks and emphasizing collaborative problem-solving.",
    status: "Completed",
    date: "May 23rd – 24th, 2026 · 8:30 AM – 9:00 PM",
    location: "Stanford University, California",
    hero: "/assets/archive/stanford-hackathon-2026/hero.webp",
    prize: {
      amount: "$5,000 in Prizes",
      note: "Raffle prizes included free merchandise, gift cards, and software licenses — plus the opportunity to meet with VC founders among other perks!",
    },
    eligibility: [
      "All participants must be current high school students (Grades 9–12)",
      "Teams must be comprised of 3–5 members",
    ],
    schedule: [
      {
        day: "Day 1 — May 23rd",
        time: "8:30 – 9:25 AM",
        title: "Check-In",
        body: "Participants registered with their teams at the registration desk outside of the Jen-Hsun Huang Engineering Center.",
      },
      {
        day: "Day 1 — May 23rd",
        time: "9:30 – 11:45 AM",
        title: "Hackathon Event Kickoff",
        body: "The event was officially kickstarted with an introduction to ALPHAG3N, followed by sponsor shoutouts and a guest speaker series.",
      },
      {
        day: "Day 2 — May 24th",
        time: "9:00 – 9:55 AM",
        title: "Check-In",
        body: "Participants registered with their teams outside of the Jen-Hsun Huang Engineering Center. A raffle was also held during this time.",
      },
      {
        day: "Day 2 — May 24th",
        time: "10:00 – 11:30 AM",
        title: "Project Presentations",
        body: "Teams presented their projects to a panel of judges, with 3 minutes to present and 2 minutes for Q&A.",
      },
    ],
    faqs: [
      {
        q: "What should I bring to the event?",
        a: "Please bring your laptop, chargers, and any other hardware you may need. It's also recommended to bring snacks, a water bottle, and anything else that helps you stay comfortable — though these are also provided by staff throughout the event.",
      },
      {
        q: "Where can I check in on the day of the event?",
        a: "There is a check-in desk directly in front of the Jensen Huang Engineering Center, where you'll be greeted by ALPHAG3N staff members. Please check in with your team upon arrival.",
      },
      {
        q: "Will food be provided?",
        a: "Yes, meals are provided throughout the event for lunch and dinner. Specific times can be found on the schedule above.",
      },
      {
        q: "Can I participate without a team?",
        a: "Yes! If you indicated on the registration form that you'd like to be assigned a team, we contact you prior to the event with your team.",
      },
      {
        q: "What if I don't have much coding experience?",
        a: "No problem! This hackathon is open to all skill levels. Mentors are available to help guide you.",
      },
      {
        q: "Can we start working on our project before the event?",
        a: "No — a problem statement is provided to all teams immediately following the official hackathon kickoff. All projects must be started after the designated time.",
      },
    ],
    people: [
      {
        group: "Speakers",
        members: [
          {
            name: "Jared Quincy Davis",
            bio: "Founder & CEO of Mithril\nStanford Computer Science PhD\nResearcher in Compound AI Systems & Distributed ML Infrastructure\nPioneer of Networks of Networks Architecture\nExpert in Multi-Agent Systems & Large-Scale ML Infrastructure\nSpecialist in Distributed Computing & AI Systems Reliability",
            image: "/assets/archive/stanford-hackathon-2026/03.webp",
          },
          {
            name: "Boao (Mark) Dong",
            bio: "Boao Dong is an AI Software Engineer at TikTok focused on large-scale AI systems, reliability, and security. He earned a Master of Engineering in Computer Science from Cornell University and is active in the AI builder community, supporting projects and hackathons.",
            image: "/assets/archive/stanford-hackathon-2026/04.webp",
          },
        ],
      },
      {
        group: "Mentors",
        members: [
          {
            name: "Albin Liljefors Isberg",
            bio: "Albin is an engineering physicist and Visiting Researcher at Stanford University working on topological data analysis, with interests in startups and practical AI applications.",
            image: "/assets/archive/stanford-hackathon-2026/05.webp",
          },
          {
            name: "Renato (Rem) Faraone",
            bio: "Rem is a mathematician and researcher focused on artificial general intelligence (AGI), along with neural-symbolic and cognitive systems. His work has involved the development of biologically modeled AI architectures, hyperdimensional computing frameworks, and more.",
            image: "/assets/archive/stanford-hackathon-2026/06.webp",
          },
          {
            name: "Nick Watters",
            bio: "Nick is a PhD candidate in the Department of Brain and Cognitive Sciences at MIT, where he studies how the primate brain represents multi-object scenes, predicts motion, and allows for flexible motor control. Previously, he worked as a research engineer at Google DeepMind on visual unsupervised and reinforcement learning.",
            image: "/assets/archive/stanford-hackathon-2026/07.webp",
          },
          {
            name: "Zi Li",
            bio: "Zi Li is an Urban Government and Human AI decision making systems researcher currently at MIT. His work focuses on human-centered AI, responsible AI adoption, and how organizations and societies can build the capacity to use AI safely and effectively in real-world settings. He is interested in translating AI governance ideas into practical tools, products, and learning frameworks for builders and communities.",
            image: "/assets/archive/stanford-hackathon-2026/08.webp",
          },
        ],
      },
      {
        group: "Judges",
        members: [
          {
            name: "Wayee Chu",
            bio: "Wayee Chu is a General Partner at Reach Capital focused on early-stage startups in learning, work, and health. She previously co-founded the NewSchools Seed Fund and began her career at Morgan Stanley and Merrill Lynch. She is also active in education and arts nonprofits and serves on several nonprofit and university boards.",
            image: "/assets/archive/stanford-hackathon-2026/09.webp",
          },
          {
            name: "Mark Bercow",
            bio: "Mark Bercow is a technology executive and strategic advisor with experience across software, semiconductors, robotics, and mobile. He has held leadership roles at Bessemer Venture Partners, Palm, Inc., and Intuit, and now advises technology companies on strategy, IP, and corporate development.",
            image: "/assets/archive/stanford-hackathon-2026/10.webp",
          },
          {
            name: "Boao (Mark) Dong",
            bio: "Boao Dong is an AI Software Engineer at TikTok focused on large-scale AI systems, reliability, and security. He earned a Master of Engineering in Computer Science from Cornell University and is active in the AI builder community, supporting projects and hackathons.",
            image: "/assets/archive/stanford-hackathon-2026/04.webp",
          },
          {
            name: "Steven Chen",
            bio: "Steven Chen received his Ph.D. from MIT and is also an alumnus of Stanford. He is the President of the USA AI Olympiad. His expertise includes AI, machine learning, mathematics, and economics. He has developed novel AI models and algorithms to address cutting-edge engineering and economic problems.",
            image: "/assets/archive/stanford-hackathon-2026/11.webp",
          },
        ],
      },
    ],
    showSponsors: true,
  },

  "doshisha-conference-2025": {
    kind: "event",
    slug: "doshisha-conference-2025",
    navLabel: "Doshisha Conference 2025",
    name: "ALPHAG3N @ Doshisha International School",
    tagline:
      "An interactive conference on the intersection of AI and Health Disparities for Japanese high school students.",
    status: "Completed",
    date: "July 14th, 2025 · 10 AM – 2:30 PM JST",
    location: "Doshisha International Junior and Senior High School, Kyoto, Japan",
    hero: "/assets/archive/doshisha-conference-2025/hero.webp",
    intro:
      "ALPHAG3N at Doshisha aims to educate students on the transformative role of AI in healthcare, fostering a deeper understanding through expert talks and hands-on learning, while also promoting cultural exchange and global networking.",
    highlights: [
      {
        title: "AI and Healthcare",
        body: "Students will learn about the role of AI in addressing health disparities.",
      },
      {
        title: "Cultural Exchange",
        body: "Students will engage in cultural exchange with American students.",
      },
      {
        title: "Networking",
        body: "Students will have the opportunity to network with professionals in AI and healthcare.",
      },
    ],
    stats: [
      { value: "48", label: "Attendees" },
      {
        value: "15",
        label: "Japanese student volunteers helping with translation and session transitions",
      },
      { value: "04", label: "Japanese schools" },
    ],
    extraSections: [
      {
        kicker: "Three Panels",
        title: "ALPHAG3N Workshops",
        body: "This session centers around the goal of inspiring Japanese high schoolers to become problem-solvers in their communities while exercising responsibility and caution with their use of AI. The ALPHAG3N team designed three interactive, 1-hour workshops to provide students with actionable frameworks and strategies to carry forward with them in their education and daily life.",
      },
    ],
    gallery: g("doshisha-conference-2025", 6),
  },

  "seoul-conference-2024": {
    kind: "event",
    slug: "seoul-conference-2024",
    navLabel: "Seoul Conference 2024",
    name: "ALPHAG3N in Seoul 2024",
    tagline:
      "An immersive conference on modern advances in AI for Korean and global college students.",
    status: "Completed",
    date: "July 18th, 2024 · 6 PM – 8 PM KST",
    location: "LIKELION HQ",
    partner: "In partnership with LIKELION and CODETREE",
    hero: "/assets/archive/seoul-conference-2024/hero.webp",
    intro:
      "The ALPHAG3N team presented! Our panel session focused on the usage and development of AI in American high school education. We offered firsthand insights into our personal experiences with AI used in classes, internships, and individual projects. Our discussion extended to the evolving role of AI in school curricula, illustrating how and why AI is growing more prominent in all facets of education and why ethics is important.",
    highlights: [
      {
        title: "Session 1 · CEO of CodeTree",
        body: "A coding education essential for this era and the role of AI.",
      },
      {
        title: "Session 2 · COO of LIKELION",
        body: "From AGI to ASI: A technical approach to AI ethical issues.",
      },
      {
        title: "Session 3 · ALPHAG3N Team",
        body: "Discussion on the usefulness of AI and AI ethics in the lives of U.S. high school and college students.",
      },
    ],
    gallery: g("seoul-conference-2024", 24),
  },

  "snu-conference-2023": {
    kind: "event",
    slug: "snu-conference-2023",
    navLabel: "SNU Conference 2023",
    name: "ALPHAG3N & SOLANA Conference @ Seoul National University",
    status: "Completed",
    date: "August 8th, 2023",
    location: "Seoul National University",
    hero: "/assets/archive/snu-conference-2023/hero.webp",
    gallery: g("snu-conference-2023", 3),
  },

  "stanford-conference-2023": {
    kind: "event",
    slug: "stanford-conference-2023",
    navLabel: "Stanford Conference 2023",
    name: "ALPHAG3N's First Web3 and AI Conference @ Stanford",
    tagline: "@ Stanford for teen (age 13 – 19) students.",
    status: "Completed",
    date: "April 23rd, 2023",
    location: "Stanford University, California",
    hero: "/assets/archive/stanford-conference-2023/hero.webp",
    intro:
      "In-person participants will have the role of being ALPHAG3N's first “ambassadors”. After the conference, it will be their job to help grow the ALPHAG3N community. Participants will receive silver-tier NFTs for free—more details will be sent out before the conference. We will be giving out a lot of merch (t-shirts, hats, tote bags, stickers, and more). Participants in the workshop (required) at the end of the conference will receive participation prizes and will also gain special access to a future ALPHAG3N-led hackathon with big prizes. You will receive many updates once you have signed up.",
    prize: {
      amount: "$1000 in Raffle Prizes",
      note: "Ten Winners · $100 Gift Cards — plus free lunch & snacks and Free T-Shirts, Hats, Tote-Bags, and Stickers.",
    },
    schedule: [
      {
        time: "8:55 – 9:55 AM",
        title: "Registration",
        body: "Participants registered in front of the lecture hall. Merch and snacks were given out during registration.",
      },
      {
        time: "10:00 – 11:00 AM",
        title: "Intro and Sponsor Talks",
        body: "An introduction about the conference and ALPHAG3N was presented, followed by brief talks from a few sponsors.",
      },
    ],
    gallery: pick(
      "stanford-conference-2023",
      [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19]
    ),
    showSponsors: true,
  },

  blogs: {
    kind: "blog",
    slug: "blogs",
    navLabel: "Blogs",
    name: "Community Blog Posts",
    tagline: "Ideas, explainers, and takes on Web3 and AI — written by the ALPHAG3N community.",
    posts: [
      {
        title: "The Ethics of Artificial Intelligence",
        author: "Leo Hsia",
        date: "Apr 5",
        read: "2 min read",
        image: "/assets/archive/blogs/01.webp",
        excerpt:
          "As the usage of artificial intelligence has grown exponentially, concerns have been raised over the ethical usage of AI. It has been widely accepted that bias exists in AI and impacts outcomes. Since the early days of development, concerns have been raised — such as when AI labeled African American men as “Primates.” One of the fundamental issues is data collection and labeling.",
      },
      {
        title: "What Happens When AI Serves Itself First?",
        author: "Anay Mehta",
        date: "Jan 30",
        read: "2 min read",
        image: "/assets/archive/blogs/02.webp",
        excerpt:
          "Artificial intelligence researchers at Anthropic recently published a study exploring what they call “agentic misalignment” — the idea that LLMs deployed with complete autonomy might behave like insider threats within organizations and serve their own purposes. In simulations, they tested 16 major models from several developers by giving them business objectives and then introducing scenarios where the model either succeeds or is compromised.",
      },
    ],
  },

  news: {
    kind: "news",
    slug: "news",
    navLabel: "News",
    name: "ALPHAG3N in the News",
    tagline: "Talks, features, and interviews from around the world.",
    hero: "/assets/archive/news/hero.webp",
    items: [
      {
        title:
          "Joshua Koo, founder and lead of ALPHAG3N, speaks at TheWaveSeoul conference at COEX in Seoul, Korea",
        location: "Seoul, South Korea",
        date: "June 29th, 2023",
        heading: "TheWaveSeoul Conference",
        body: "TheWaveSeoul conference is a premier tech in Seoul, South Korea for those who are interested in the latest advancement in future technology, especially Web3 and AI.\n\nJoshua Koo, founder and lead of ALPHAG3N, participated as the only high-schooler at TheWaveSeoul Conference in Korea, where he presented about how the MZ and younger generations are reacting to technologies such as Web3 and AI.\n\nJoshua had roughly 35 minutes to present and there were around 200 participants, ranging from entrepreneurs to news reporters to prominent figures in the Web3 and AI industries.",
      },
      {
        title: "TheMiilk Interview",
        body: "Joshua Koo, founder and lead of ALPHAG3N, was interviewed by the digital media platform based in Silicon Valley, TheMiilk. Following a deep dive into his background as a student and tech enthusiast, he expressed his thoughts on the current scene in AI and Web3 and the impact it will have on the younger (future) generation. The image on the right is linked to the interview.",
      },
    ],
    gallery: g("news", 13),
  },
};

export const ARCHIVE_SLUGS = Object.keys(ARCHIVE);
