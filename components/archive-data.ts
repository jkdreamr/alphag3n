// Content for archive / sub-pages, copied from the ALPHAG3N Wix site.

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
    body: string;
    images?: string[];
  }[];
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
    hero: "/assets/archive/taiwan-hero.png",
    comingSoon: true,
    highlights: [
      {
        title: "Physical AI",
        body: "A deep dive into the frontier where artificial intelligence meets the physical world — robotics, embodied agents, and real-world systems.",
      },
      {
        title: "International Conference",
        body: "Bringing together Taiwanese high schoolers and the global ALPHAG3N community for a day of talks, workshops, and connection.",
      },
    ],
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
    hero: "/assets/archive/shack-hero.jpg",
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
    hero: "/assets/archive/doshisha-hero.png",
    intro:
      "ALPHAG3N at Doshisha aimed to educate students on the transformative role of AI in healthcare, fostering a deeper understanding through expert talks and hands-on learning, while also promoting cultural exchange and global networking.",
    highlights: [
      {
        title: "AI and Healthcare",
        body: "Students learned about the role of AI in addressing health disparities.",
      },
      {
        title: "Cultural Exchange",
        body: "Students engaged in cultural exchange with American students.",
      },
      {
        title: "Networking",
        body: "Students had the opportunity to network with professionals in AI and healthcare.",
      },
    ],
    stats: [
      { value: "48", label: "Attendees" },
      { value: "15", label: "Japanese student volunteers" },
      { value: "04", label: "Japanese schools" },
      { value: "3", label: "Interactive panels" },
    ],
    gallery: [
      "/assets/archive/doshisha-1.png",
      "/assets/archive/doshisha-2.png",
      "/assets/archive/doshisha-3.png",
      "/assets/archive/doshisha-4.png",
      "/assets/archive/doshisha-5.png",
      "/assets/archive/doshisha-6.png",
    ],
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
    hero: "/assets/archive/seoul24-hero.jpg",
    intro:
      "The ALPHAG3N team presented! Our panel session focused on the usage and development of AI in American high school education. We offered firsthand insights into our personal experiences with AI used in classes, internships, and individual projects — extending the discussion to the evolving role of AI in school curricula and why ethics is so important.",
    highlights: [
      {
        title: "Session 1 · CEO of CodeTree",
        body: "A coding education essential for this era and the role of AI.",
      },
      {
        title: "Session 2 · COO of LIKELION",
        body: "From AGI to ASI: a technical approach to AI ethical issues.",
      },
      {
        title: "Session 3 · ALPHAG3N Team",
        body: "Discussion on the usefulness of AI and AI ethics in the lives of U.S. high school and college students.",
      },
    ],
    gallery: [
      "/assets/archive/seoul24-1.jpg",
      "/assets/archive/seoul24-2.jpg",
    ],
  },

  "snu-conference-2023": {
    kind: "event",
    slug: "snu-conference-2023",
    navLabel: "SNU Conference 2023",
    name: "ALPHAG3N & Solana Conference @ Seoul National University",
    tagline: "A Web3 and AI conference in partnership with Solana at Korea's leading university.",
    status: "Completed",
    date: "August 8th, 2023",
    location: "Seoul National University",
    hero: "/assets/archive/snu-hero.png",
    gallery: [
      "/assets/archive/snu-1.png",
      "/assets/archive/snu-2.png",
      "/assets/archive/snu-3.png",
    ],
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
    hero: "/assets/stanford-campus.jpeg",
    intro:
      "In-person participants took on the role of ALPHAG3N's first ambassadors — after the conference, it was their job to help grow the ALPHAG3N community. Participants received free silver-tier NFTs and plenty of merch (t-shirts, hats, tote bags, stickers, and more). Workshop participants received participation prizes and special access to a future ALPHAG3N-led hackathon with big prizes.",
    prize: {
      amount: "$1,000 in Raffle Prizes",
      note: "Ten winners received $100 gift cards — plus free t-shirts, hats, tote bags, stickers, lunch, and snacks.",
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
    gallery: ["/assets/archive/sconf-banner.jpg"],
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
        excerpt:
          "As the usage of artificial intelligence has grown exponentially, concerns have been raised over the ethical usage of AI. It has been widely accepted that bias exists in AI and impacts outcomes. Since the early days of development, concerns have been raised — such as when AI labeled African American men as “Primates.” One of the fundamental issues is data collection and labeling.",
      },
      {
        title: "What Happens When AI Serves Itself First?",
        author: "Anay Mehta",
        date: "Jan 30",
        read: "2 min read",
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
    hero: "/assets/archive/news-hero.jpg",
    items: [
      {
        title:
          "Joshua Koo speaks at TheWaveSeoul conference at COEX in Seoul, Korea",
        location: "Seoul, South Korea",
        date: "June 29th, 2023",
        body: "TheWaveSeoul is a premier tech conference in Seoul, South Korea for those interested in the latest advancements in future technology — especially Web3 and AI. Joshua Koo, founder and lead of ALPHAG3N, participated as the only high-schooler, presenting on how the MZ and younger generations are reacting to technologies such as Web3 and AI. Joshua had roughly 35 minutes to present to around 200 participants, ranging from entrepreneurs to news reporters to prominent figures in the Web3 and AI industries.",
        images: ["/assets/archive/news-1.png", "/assets/archive/news-2.png"],
      },
      {
        title: "TheMiilk Interview",
        body: "Joshua Koo, founder and lead of ALPHAG3N, was interviewed by TheMiilk, a Silicon Valley–based digital media platform. Following a deep dive into his background as a student and tech enthusiast, he shared his thoughts on the current scene in AI and Web3 and the impact it will have on the younger, future generation.",
        images: ["/assets/archive/news-3.jpg", "/assets/archive/news-4.jpg"],
      },
    ],
  },
};

export const ARCHIVE_SLUGS = Object.keys(ARCHIVE);
