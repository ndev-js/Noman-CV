import {
  Code2, Server, CreditCard, Gamepad2, Box, Smartphone, Compass, PenTool, Wrench, Rocket,
  Briefcase, GraduationCap, MapPin, Clock, Layers, Globe,
} from "lucide-react";

export const HERO_WORDS = ["gaming platforms", "payment flows", "real-time apps", "marketplaces", "web products"];
export const STACK = ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redux Toolkit", "Socket.io", "Prisma", "React Native", "Tailwind CSS", "Stripe", "JazzCash", "Easypaisa", "Material UI"];

export const SERVICES = [
  { icon: Code2, title: "Web App Development", desc: "Fast, responsive web apps and dashboards built with React.js, Next.js and TypeScript.", tags: ["React.js", "Next.js", "TypeScript"] },
  { icon: Server, title: "Backend & APIs", desc: "Scalable REST APIs, background workers and clean data models that grow with your product.", tags: ["Node.js", "PostgreSQL", "MongoDB"] },
  { icon: CreditCard, title: "Payments & Subscriptions", desc: "Wallets, in-app purchases and daily/weekly/monthly subscriptions with local and global gateways.", tags: ["Stripe", "JazzCash", "Easypaisa"] },
  { icon: Gamepad2, title: "Real-Time & Gaming", desc: "Matchmaking, tournaments, lobbies, chat and live bidding — experiences that update instantly.", tags: ["Socket.io", "Redux Toolkit"] },
  { icon: Box, title: "Web3 & NFT", desc: "Minting platforms, campaign admin panels and wallet-based authentication.", tags: ["Xumm", "Node.js"] },
  { icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform mobile apps and the backends that power them.", tags: ["React Native", "Node.js"] },
];

export const PROCESS = [
  { icon: Compass, title: "Discover", desc: "We talk through your goals, users and constraints, and agree on what success looks like." },
  { icon: PenTool, title: "Plan & Design", desc: "I map out the architecture, data model and screens, so there are no surprises mid-build." },
  { icon: Wrench, title: "Build in Sprints", desc: "Agile sprints with regular demos. You see working software early and steer as we go." },
  { icon: Rocket, title: "Launch & Support", desc: "Testing, deployment and handover — plus support once real users arrive." },
];

// Dates are [year, monthIndex]; `end: null` means current role.
export const JOBS = [
  { id: "khaleef", short: "Khaleef (Airvon)", company: "Khaleef Technologies (Airvon)", role: "Software Engineer",
    start: [2024, 0], end: null,
    summary: "Frontend, state management, real-time gameplay, payments and subscription flows for telecom-partnered gaming and sports platforms.",
    highlights: ["Shipped gaming platforms for stc (Saudi Arabia) and Jazz (Pakistan)", "Integrated Stripe, JazzCash, Easypaisa and bank-card payments", "Built wallets, tournament passes and subscription plans"] },
  { id: "cherry", short: "Cherry Byte", company: "Cherry Byte Technologies", role: "Software Engineer",
    start: [2023, 4], end: [2023, 11],
    summary: "Full-SDLC ownership — requirements, design, development, system testing and UAT — for Web3 apps and business portals.",
    highlights: ["Scalable APIs and background workers with Node.js, TypeScript and Prisma", "PostgreSQL and MongoDB data layers", "NFT minting platform with wallet authentication"] },
  { id: "sagacious", short: "Sagacious Systems", company: "Sagacious Systems", role: "Software Engineer",
    start: [2021, 9], end: [2023, 4],
    summary: "Joined as an intern and converted to full-time after 3 months. Built web portals and mobile apps for multiple clients.",
    highlights: ["Built the backend for the Kisan mobile application", "Real-time notifications with Socket.io", "Role-based access control across portals"] },
];

export const PROJECTS = [
  { id: "stc", job: "khaleef", featured: true, name: "stc play", badge: "stc · Saudi Arabia", industry: ["Gaming", "Telecom"],
    blurb: "Gaming & esports platform of stc, Saudi Arabia's leading telecom operator.", tech: ["React.js", "TypeScript", "Redux Toolkit"],
    points: ["Developed frontend features for the stc play platform.", "Built responsive, production-grade flows for games, tournaments and player engagement at regional scale."] },
  { id: "gamenow", job: "khaleef", featured: true, name: "GameNow", badge: "Jazz · Pakistan", industry: ["Gaming", "Telecom", "Fintech"],
    blurb: "Telecom-partnered gaming platform for subscribers of Jazz, Pakistan's largest mobile network.", tech: ["React.js", "TypeScript", "Redux Toolkit", "Stripe", "JazzCash", "Easypaisa"],
    points: ["Single & multiplayer games with real-time matchmaking, tournaments, chat and lobbies.", "Wallet & monetization: gems, coins, tournament passes and monthly subscriptions.", "Stripe, JazzCash, Easypaisa and bank-card payments for top-ups and in-app purchases."] },
  { id: "estate", job: "academic", featured: true, name: "Real-Estate Marketplace", badge: "Live bidding", industry: ["Real Estate"],
    blurb: "Property portal similar to Zameen.com with real-time bidding on houses and plots.", tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    points: ["Listings for plots, houses, apartments, rooms, rentals and sales.", "Real-time bidding with instant updates to all participants, highest-bid tracking and bid history.", "Search, filters, geolocation search, accounts and buyer–seller messaging.", "Admin panel for moderating listings and bids."] },
  { id: "luxlabs", job: "cherry", featured: true, name: "Luxlabs NFT Minting", industry: ["Web3"],
    blurb: "NFT minting platform with campaign management and wallet login.", tech: ["Node.js", "PostgreSQL", "TypeScript", "React.js"],
    points: ["Admin panel to create and manage NFT minting campaigns.", "Xumm wallet authentication for passwordless login.", "Trait & burnable selection and breeding flow, minting directly to the user's wallet."] },
  { id: "gago", job: "khaleef", name: "Gago", industry: ["Gaming", "Fintech"],
    blurb: "Gaming platform with tournaments, matchmaking and subscriptions.", tech: ["React.js", "TypeScript", "Redux Toolkit", "Stripe", "JazzCash"],
    points: ["Single & multiplayer games, tournaments and real-time matchmaking.", "Daily, weekly and monthly subscription plans.", "Wallet and in-app purchase payments."] },
  { id: "cricwick", job: "khaleef", name: "Cricwick.net", industry: ["Sports"],
    blurb: "Cricket content and fantasy-sports platform.", tech: ["React.js", "TypeScript"],
    points: ["Built user-facing cricket content, match information and fantasy-sports engagement features."] },
  { id: "doctor", job: "sagacious", name: "Doctor Appointments", industry: ["Healthcare"],
    blurb: "Scheduling for doctors and patients without double bookings.", tech: ["React.js", "Node.js", "Express.js", "SQL"],
    points: ["Calendar scheduling with real-time availability.", "Email/SMS confirmations and reminders.", "Role-based access and secure patient-data handling."] },
  { id: "proanatomic", job: "sagacious", name: "ProAnatomic Portal", industry: ["Enterprise"],
    blurb: "Employee activity, timesheets and live budget reporting.", tech: ["React.js", "Node.js", "MongoDB", "Socket.io"],
    points: ["Role-based authentication and authorization.", "Timesheets for tasks, projects and hours.", "Socket.io alerts; Formik/Yup validation.", "Exportable budget reports with a live thermometer chart."] },
  { id: "taskninja", job: "sagacious", name: "Task Ninja", industry: ["Enterprise"],
    blurb: "Task management with resource-availability tracking.", tech: ["React.js", "React Native", "Node.js", "MongoDB"],
    points: ["Projects, team members and deadlines in one portal.", "Resource-availability tracking and real-time sub-admin notifications."] },
  { id: "hrm", job: "sagacious", name: "HRM System", industry: ["Enterprise"],
    blurb: "Records, attendance, leave, appraisals and payroll integration.", tech: ["React.js", "Node.js"],
    points: ["Employee records, attendance, leave, appraisals and recruitment.", "Document management, custom reports and self-service portal.", "Payroll integration and role-based access."] },
];

export const COVERS = ["from-lime-300 to-emerald-600", "from-cyan-300 to-blue-600", "from-amber-300 to-orange-600", "from-fuchsia-400 to-purple-700", "from-emerald-300 to-teal-700", "from-sky-300 to-indigo-600"];

export const FAQ = [
  ["What kind of projects do you take on?", "Web apps, dashboards, backends and APIs, payment and subscription systems, real-time features, Web3 platforms and React Native apps."],
  ["Can you work on an existing codebase?", "Yes. Much of my work has been extending live production platforms such as stc play and GameNow, so I'm comfortable picking up an established codebase."],
  ["Which payment gateways have you integrated?", "Stripe, JazzCash, Easypaisa and bank-card payments — for wallets, in-app purchases and recurring subscriptions."],
  ["Which time zone are you in?", "Pakistan Standard Time (UTC+5), which overlaps well with the Gulf, Europe and the start of the US day."],
];

export const SECTIONS = [
  { id: "home", label: "Home" }, { id: "services", label: "Services" }, { id: "work", label: "Work" },
  { id: "experience", label: "Experience" }, { id: "process", label: "Process" }, { id: "demo", label: "Live Demo" }, { id: "contact", label: "Contact" },
];

// Hero copy for each kind of visitor. Facts are shown as cards under the buttons.
export const AUDIENCES = {
  client: {
    label: "Need a project",
    facts: [
      { icon: Gamepad2, title: "Shipped for", value: "stc & Jazz" },
      { icon: CreditCard, title: "Payments", value: "Stripe · JazzCash · Easypaisa" },
      { icon: Layers, title: "Full stack", value: "React · Node · PostgreSQL" },
      { icon: Globe, title: "Time zone", value: "Overlaps Gulf & Europe" },
    ],
  },
  recruiter: {
    label: "Hiring",
    facts: [
      { icon: Briefcase, title: "Current role", value: "Software Engineer · Khaleef" },
      { icon: Clock, title: "Experience", value: "5+ years · 3 companies" },
      { icon: GraduationCap, title: "Education", value: "B.S. Software Engineering" },
      { icon: MapPin, title: "Based in", value: "Lahore, Pakistan (UTC+5)" },
    ],
  },
};

// Project brief builder options
export const BRIEF_TYPES = ["Web app", "Mobile app", "Backend / API", "Payment integration", "Gaming platform", "Marketplace", "Web3 / NFT", "Dashboard / Admin"];
export const BRIEF_FEATURES = ["User auth & roles", "Payments & wallet", "Subscriptions", "Real-time updates", "Admin panel", "Maps & geolocation", "Email / SMS alerts", "Third-party APIs"];
export const BRIEF_TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Flexible"];
export const BRIEF_BUDGETS = ["< $1k", "$1k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];
