
"use client";

import { useMemo, useState } from "react";

type Resource = {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
  icon: string;
  color: string;
  tag: string;
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Penetration Testing",
    category: "Penetration Testing",
    description:
      "Explore ethical hacking, reconnaissance, vulnerability assessment and web application security.",
    level: "Beginner to Advanced",
    icon: "⌘",
    color: "blue",
    tag: "PRACTICAL LEARNING",
  },
  {
    id: 2,
    title: "Network Security",
    category: "Network Security",
    description:
      "Understand network protocols, network attacks, firewalls, monitoring and defensive techniques.",
    level: "Beginner to Advanced",
    icon: "◎",
    color: "purple",
    tag: "CORE KNOWLEDGE",
  },
  {
    id: 3,
    title: "CTF Challenges",
    category: "CTF & Labs",
    description:
      "Improve your problem-solving skills through legal cybersecurity challenges and practical labs.",
    level: "All Levels",
    icon: "⚑",
    color: "green",
    tag: "HANDS-ON PRACTICE",
  },
  {
    id: 4,
    title: "Cybersecurity Book",
    category: "Books & Notes",
    description:
      "Access organized cybersecurity knowledge, study material, explanations and reference notes.",
    level: "Learning Resource",
    icon: "▤",
    color: "orange",
    tag: "KNOWLEDGE LIBRARY",
  },
  {
    id: 5,
    title: "English Learning Notes",
    category: "Books & Notes",
    description:
      "Build technical English, communication skills and confidence for academic and professional life.",
    level: "All Levels",
    icon: "文",
    color: "pink",
    tag: "PERSONAL DEVELOPMENT",
  },
  {
    id: 6,
    title: "Practical Security Labs",
    category: "CTF & Labs",
    description:
      "Learn through guided exercises, command-line practice and authorized lab environments.",
    level: "Intermediate",
    icon: "⌘",
    color: "cyan",
    tag: "PRACTICE",
  },
];

const categories = [
  "All",
  "Penetration Testing",
  "Network Security",
  "CTF & Labs",
  "Books & Notes",
];

const learningPaths = [
  {
    number: "01",
    title: "Cybersecurity Fundamentals",
    description:
      "Start with essential concepts, operating systems, networking and security foundations.",
    duration: "Foundation",
    color: "blue",
  },
  {
    number: "02",
    title: "Penetration Testing",
    description:
      "Study reconnaissance, enumeration, web security, vulnerability testing and reporting.",
    duration: "Practical path",
    color: "purple",
  },
  {
    number: "03",
    title: "Network Security",
    description:
      "Understand network architecture, protocols, traffic analysis and defensive security.",
    duration: "Technical path",
    color: "green",
  },
];

const challenges = [
  {
    title: "Linux Fundamentals",
    level: "Beginner",
    category: "Linux",
    description:
      "Practice terminal navigation, file permissions and basic Linux commands.",
    color: "green",
  },
  {
    title: "Web Security Basics",
    level: "Beginner",
    category: "Web Security",
    description:
      "Explore common web security concepts in a controlled learning environment.",
    color: "blue",
  },
  {
    title: "Network Investigation",
    level: "Intermediate",
    category: "Networking",
    description:
      "Understand network traffic, services and basic investigation techniques.",
    color: "purple",
  },
];

function SectionLabel({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${
          color === "purple"
            ? "bg-purple-500"
            : color === "green"
              ? "bg-emerald-500"
              : "bg-cyan-500"
        }`}
      />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    purple: "bg-purple-50 text-purple-700 ring-purple-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    orange: "bg-orange-50 text-orange-700 ring-orange-100",
    pink: "bg-pink-50 text-pink-700 ring-pink-100",
    cyan: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="mb-6 flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ring-1 ${
            colorClasses[resource.color]
          }`}
        >
          {resource.icon}
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500">
          {resource.tag}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 transition group-hover:text-cyan-700">
        {resource.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
        {resource.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs font-medium text-slate-500">
          {resource.level}
        </span>
        <a
          href="#library"
          className="text-sm font-bold text-cyan-700 transition hover:text-purple-700"
        >
          Explore <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "All" ||
        resource.category === activeCategory;

      const searchText =
        `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();

      const matchesSearch = searchText.includes(
        searchQuery.toLowerCase().trim()
      );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* =========================================
          1. NAVIGATION
      ========================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-500 text-lg font-black text-white shadow-lg shadow-blue-200">
              W
            </div>

            <div>
              <div className="text-sm font-black tracking-wide text-slate-900">
                WAKEEL'S
              </div>
              <div className="text-xs font-bold tracking-[0.15em] text-cyan-700">
                CYBER HUB
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            <a href="#home" className="text-sm font-semibold text-cyan-700">
              Home
            </a>
            <a
              href="#library"
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-700"
            >
              Resources
            </a>
            <a
              href="#learning"
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-700"
            >
              Learning Paths
            </a>
            <a
              href="#ctf"
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-700"
            >
              CTF & Labs
            </a>
            <a
              href="#community"
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-700"
            >
              Community
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-cyan-700"
            >
              About
            </a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
  href="/admin"
  className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100"
>
  Admin Dashboard
</a>
            <a
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </a>
            <a
              href="/signup"
              className="rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Create Account
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-800 lg:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">
            <nav className="flex flex-col gap-1">
              {[
                ["Home", "#home"],
                ["Resources", "#library"],
                ["Learning Paths", "#learning"],
                ["CTF & Labs", "#ctf"],
                ["Community", "#community"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700"
                >
                  {label}
                </a>
              ))}

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <a
                  href="/login"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================
          2. HERO SECTION
      ========================================== */}

      <section
        id="home"
        className="relative isolate overflow-hidden bg-gradient-to-br from-white via-blue-50/70 to-cyan-50"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-xs font-bold tracking-widest text-slate-600">
                CYBERSECURITY KNOWLEDGE PLATFORM
              </span>
            </div>

            <p className="mb-4 text-sm font-bold text-cyan-700">
              Assalam-o-Alaikum! Welcome to
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Learn.
              <span className="text-blue-700"> Store.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Your personal cybersecurity knowledge hub. Explore security
              concepts, develop practical skills, access learning resources
              and build your technical future in one place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#library"
                className="rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1"
              >
                Explore Resources <span className="ml-2">→</span>
              </a>

              <a
                href="#about"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
              >
                Discover the Hub
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold tracking-wide text-slate-500">
              <span>✓ LEARN</span>
              <span>✓ STORE</span>
              <span>✓ PRACTICE</span>
              <span>✓ GROW</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/50 via-blue-200/40 to-purple-200/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-5 shadow-2xl shadow-blue-200/60 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Personal Knowledge Hub
                  </p>
                  <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                    Cyber Hub Overview
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  ● Online
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Learning",
                    subtitle: "Build knowledge",
                    icon: "▤",
                    color: "bg-blue-50 text-blue-700",
                    number: "01",
                  },
                  {
                    title: "Resources",
                    subtitle: "Store materials",
                    icon: "▣",
                    color: "bg-purple-50 text-purple-700",
                    number: "02",
                  },
                  {
                    title: "Practice",
                    subtitle: "Improve skills",
                    icon: "⌘",
                    color: "bg-emerald-50 text-emerald-700",
                    number: "03",
                  },
                  {
                    title: "Growth",
                    subtitle: "Track progress",
                    icon: "↗",
                    color: "bg-orange-50 text-orange-700",
                    number: "04",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-300">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="mt-5 font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 p-5 text-white">
                <p className="text-xs font-bold tracking-widest text-blue-100">
                  OUR MISSION
                </p>
                <h3 className="mt-2 text-xl font-extrabold">
                  Knowledge becomes power through practice.
                </h3>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Learn continuously. Practice responsibly. Grow confidently.
                </p>
              </div>
            </div>

            <div className="absolute -right-4 top-16 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-xs font-bold text-slate-400">LEARN</p>
              <p className="text-sm font-extrabold text-blue-700">
                Every day
              </p>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-xs font-bold text-slate-400">GROW</p>
              <p className="text-sm font-extrabold text-purple-700">
                Step by step
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3. PLATFORM HIGHLIGHTS
      ========================================== */}

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4 lg:px-8">
          {[
            ["01", "Learn", "Structured knowledge"],
            ["02", "Store", "Personal resources"],
            ["03", "Practice", "Hands-on learning"],
            ["04", "Grow", "Continuous improvement"],
          ].map(([number, title, description]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="text-sm font-black text-cyan-600">
                {number}
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          4. RESOURCE LIBRARY
      ========================================== */}

      <section id="library" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            label="Explore the platform"
            title="Knowledge & Resources"
            description="Explore cybersecurity subjects, practical learning material, personal notes and technical resources. The library will grow as new material is published."
          />

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <label
              htmlFor="resource-search"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              Search the knowledge library
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                id="resource-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search penetration testing, CTF, network security..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <a
                href="#resource-results"
                className="rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Search Resources
              </a>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${
                  activeCategory === category
                    ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div
            id="resource-results"
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="text-4xl">⌕</div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No resources found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another search term or select a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white"
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-slate-400">
            Showing {filteredResources.length} resource categories
          </p>
        </div>
      </section>

      {/* =========================================
          5. LEARNING PATHS
      ========================================== */}

      <section id="learning" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            label="Your learning journey"
            title="Build skills with learning paths"
            description="A structured direction can make learning easier. Explore focused learning paths and build your knowledge one step at a time."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <article
                key={path.number}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute right-0 top-0 h-28 w-28 rounded-bl-full opacity-60 ${
                    path.color === "blue"
                      ? "bg-blue-100"
                      : path.color === "purple"
                        ? "bg-purple-100"
                        : "bg-emerald-100"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-slate-200">
                      {path.number}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {path.duration}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-extrabold text-slate-900">
                    {path.title}
                  </h3>

                  <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">
                    {path.description}
                  </p>

                  <a
                    href="#library"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-purple-700"
                  >
                    Explore learning material <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          6. CTF AND PRACTICAL LABS
      ========================================== */}

      <section id="ctf" className="overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel color="green">Practice and improve</SectionLabel>

              <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                Learn by doing.
                <span className="block text-cyan-400">Think like a defender.</span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300">
                Practical cybersecurity knowledge grows through responsible
                experimentation. Explore CTF concepts, guided labs and
                authorized exercises to improve your technical skills.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#challenge-list"
                  className="rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Explore Challenges
                </a>
                <a
                  href="#library"
                  className="rounded-xl border border-slate-600 px-6 py-3.5 text-sm font-bold text-white transition hover:border-cyan-400"
                >
                  Study Resources
                </a>
              </div>
            </div>

            <div
              id="challenge-list"
              className="grid gap-4 sm:grid-cols-2"
            >
              {challenges.map((challenge) => (
                <article
                  key={challenge.title}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-cyan-500"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-cyan-300">
                      {challenge.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {challenge.level}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold text-white">
                    {challenge.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {challenge.description}
                  </p>

                  <div className="mt-6 border-t border-slate-800 pt-4 text-xs font-bold text-cyan-400">
                    LEARNING CHALLENGE
                  </div>
                </article>
              ))}

              <div className="flex flex-col justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-6 sm:col-span-2">
                <p className="text-xs font-bold tracking-widest text-purple-300">
                  MORE CHALLENGES COMING
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-white">
                  Your practical learning collection
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  New challenges and authorized practice material can be
                  published here as the platform grows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          7. PERSONAL BOOK AND KNOWLEDGE
      ========================================== */}

      <section id="book" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-5 rounded-full bg-purple-200/60 blur-3xl" />

            <div className="relative mx-auto max-w-sm rotate-[-2deg] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
              <div className="flex min-h-[390px] flex-col justify-between rounded-xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-8 text-white">
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                    CYBERSECURITY KNOWLEDGE
                  </p>
                  <div className="mt-10 h-1 w-16 bg-cyan-400" />
                  <h3 className="mt-6 text-4xl font-black leading-tight">
                    CYBER
                    <span className="block text-cyan-300">KNOWLEDGE</span>
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-blue-100">
                    Learn the concepts. Understand the technology. Practice
                    responsibly.
                  </p>
                </div>

                <div>
                  <div className="mb-5 grid grid-cols-3 gap-2">
                    <div className="h-1 rounded bg-cyan-400" />
                    <div className="h-1 rounded bg-purple-400" />
                    <div className="h-1 rounded bg-emerald-400" />
                  </div>
                  <p className="text-xs font-bold tracking-widest text-blue-200">
                    WAKEEL'S CYBER HUB
                  </p>
                  <p className="mt-2 text-xs text-blue-300">
                    LEARN | STORE | GROW
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel color="purple">Personal knowledge library</SectionLabel>

            <h2 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Knowledge worth
              <span className="block text-purple-700">sharing.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              A dedicated space for your cybersecurity book, personal notes,
              study materials and technical documents. Your published
              knowledge can help other learners develop their skills.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Cybersecurity book and reference material",
                "Penetration testing notes and practical guides",
                "Network security and university study notes",
                "English learning and communication notes",
                "PDFs, documents and other learning resources",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700">
                    ✓
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="#library"
              className="mt-9 inline-flex rounded-xl bg-purple-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-purple-800"
            >
              Explore Knowledge Library →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
          8. COMMUNITY
      ========================================== */}

      <section id="community" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-blue-800 to-purple-800 p-8 text-white shadow-2xl shadow-blue-200 sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-[0.2em] text-cyan-200">
                  LEARN TOGETHER
                </p>

                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  A place for curious minds and future security professionals.
                </h2>

                <p className="mt-5 text-base leading-8 text-blue-100">
                  Explore shared knowledge, learn from resources and become
                  part of a growing cybersecurity learning community.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-52">
                <a
                  href="/signup"
                  className="rounded-xl bg-white px-6 py-4 text-center text-sm font-extrabold text-blue-800 transition hover:bg-cyan-50"
                >
                  Join the Community
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-blue-300/50 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Contact the Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          9. ABOUT
      ========================================== */}

      <section id="about" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>About the project</SectionLabel>

            <h2 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              More than a website.
              <span className="block text-blue-700">A knowledge platform.</span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-slate-600">
              Wakeel's Cyber Hub is a cybersecurity knowledge and learning
              platform designed to bring educational resources, practical
              development, personal study material and community learning
              together in one organized place.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Its purpose is to make useful knowledge easier to discover,
              organize and share. The platform will continue to grow as new
              learning material and features are published.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["LEARN", "Understand"],
                ["STORE", "Organize"],
                ["GROW", "Improve"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-black text-blue-700">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          10. PLATFORM ROADMAP
      ========================================== */}

      <section id="roadmap" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            label="Platform development"
            title="Growing step by step"
            description="The platform is being developed in stages. These are planned capabilities, not claims that every feature is already active."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Knowledge Website",
                status: "Frontend development",
                icon: "01",
                color: "blue",
              },
              {
                title: "User Accounts",
                status: "Planned integration",
                icon: "02",
                color: "purple",
              },
              {
                title: "Admin Upload Center",
                status: "Planned integration",
                icon: "03",
                color: "orange",
              },
              {
                title: "Security & Community",
                status: "Planned integration",
                icon: "04",
                color: "green",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="text-3xl font-black text-slate-200">
                  {item.icon}
                </span>
                <h3 className="mt-5 font-extrabold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          11. CONTACT
      ========================================== */}

      <section id="contact" className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionLabel>Get in touch</SectionLabel>
              <h2 className="text-4xl font-black text-slate-950 sm:text-5xl">
                Let's connect.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                Have a question, suggestion or learning resource to share?
                Use the contact details published by the website owner when
                they become available.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900">
                Wakeel's Cyber Hub
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Cybersecurity knowledge and learning platform.
              </p>

              <div className="mt-7 space-y-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Platform
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    LEARN | STORE | GROW
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Welcome
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    Assalam-o-Alaikum. Welcome to our knowledge hub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          12. FOOTER
      ========================================== */}

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <a href="#home" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-black">
                  W
                </div>
                <div>
                  <p className="font-black tracking-wide">WAKEEL'S</p>
                  <p className="text-xs font-bold tracking-[0.15em] text-cyan-400">
                    CYBER HUB
                  </p>
                </div>
              </a>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                A knowledge platform for cybersecurity learning, practical
                development and sharing useful educational resources.
              </p>

              <p className="mt-5 text-xs font-bold tracking-[0.2em] text-cyan-400">
                LEARN | STORE | GROW
              </p>
            </div>

            <div>
              <h3 className="font-extrabold">Explore</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                <a href="#library" className="hover:text-cyan-400">
                  Resources
                </a>
                <a href="#learning" className="hover:text-cyan-400">
                  Learning Paths
                </a>
                <a href="#ctf" className="hover:text-cyan-400">
                  CTF & Labs
                </a>
                <a href="#book" className="hover:text-cyan-400">
                  Knowledge Library
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold">Platform</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                <a href="#about" className="hover:text-cyan-400">
                  About
                </a>
                <a href="#community" className="hover:text-cyan-400">
                  Community
                </a>
                <a href="#contact" className="hover:text-cyan-400">
                  Contact
                </a>
                <a href="/signup" className="hover:text-cyan-400">
                  Create Account
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-800 pt-7 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 Wakeel's Cyber Hub. All rights reserved.</p>
            <p>Built for cybersecurity learning and growth.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
