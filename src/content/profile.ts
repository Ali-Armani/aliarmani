import type { L } from "@/i18n/i18n";

export const profile = {
  name: "Ali Armani",
  email: "armani.ali@proton.me",
  resumeUrl: "/assets/Ali-Armani-Resume.pdf",
  links: [
    { label: "Email", href: "mailto:armani.ali@proton.me", handle: "armani.ali@proton.me" },
    { label: "LinkedIn", href: "https://linkedin.com/in/aliarmani", handle: "in/aliarmani" },
    { label: "GitHub", href: "https://github.com/Ali-Armani", handle: "Ali-Armani" },
    { label: "Telegram", href: "https://t.me/ali_armani_dev", handle: "@ali_armani_dev" },
  ],
};

export const aboutParagraphs: L[] = [
  { en: "I'm Ali Armani, an aspiring Frontend Developer, open to remote collaboration with teams and clients worldwide. I build clean, responsive, and user-focused websites with attention to both functionality and visual detail.", de: "Ich bin Ali Armani, angehender Frontend-Entwickler und offen für Remote-Zusammenarbeit mit Teams und Kunden weltweit. Ich baue saubere, responsive und nutzerorientierte Websites – mit Blick für Funktion und visuelle Details." },
  { en: "Before transitioning into web development, I spent two years in retail, where I learned to perform under pressure, collaborate effectively, and solve problems with a positive mindset. Today, I apply those skills to software development.", de: "Bevor ich in die Webentwicklung wechselte, war ich zwei Jahre im Einzelhandel tätig. Dort habe ich gelernt, unter Druck zu arbeiten, effektiv zusammenzuarbeiten und Probleme lösungsorientiert anzugehen. Heute bringe ich diese Fähigkeiten in die Softwareentwicklung ein." },
  { en: "I've built projects ranging from interactive frontend applications to a full-stack e-commerce platform for a real client.", de: "Meine Projekte reichen von interaktiven Frontend-Anwendungen bis zu einer Full-Stack-E-Commerce-Plattform für einen echten Kunden." },
  { en: "I'm also completing a degree in English Language Teaching, which has strengthened my communication skills and my ability to work with international teams.", de: "Außerdem schließe ich ein Studium in Englischdidaktik ab, das meine Kommunikationsfähigkeit und die Zusammenarbeit mit internationalen Teams gestärkt hat." },
  { en: "I'm currently open to freelance and part-time remote opportunities, and I'd be happy to connect.", de: "Derzeit bin ich offen für Freelance- und Teilzeit-Remote-Möglichkeiten und freue mich über Kontakt." },
];

export const softSkills: { title: L; proof: L }[] = [
  { title: { en: "Problem-solving", de: "Problemlösung" }, proof: { en: "Migrating 4Kids from a hard-coded list to a validated, paginated PostgreSQL catalogue.", de: "Migration von 4Kids von einer fest codierten Liste zu einem validierten, paginierten PostgreSQL-Katalog." } },
  { title: { en: "Critical thinking", de: "Kritisches Denken" }, proof: { en: "Treating the client as untrusted: prices and totals are calculated on the server.", de: "Den Client als nicht vertrauenswürdig behandeln: Preise und Summen werden serverseitig berechnet." } },
  { title: { en: "Teamwork", de: "Teamarbeit" }, proof: { en: "Two years in retail, collaborating under pressure with colleagues and customers.", de: "Zwei Jahre im Einzelhandel – Zusammenarbeit unter Druck mit Kollegen und Kunden." } },
  { title: { en: "Curiosity", de: "Neugier" }, proof: { en: "Exploring browser APIs like Web Speech for pronunciation in Vocab Bridge.", de: "Browser-APIs wie Web Speech für die Aussprache in Vocab Bridge erkunden." } },
  { title: { en: "Solution-oriented mindset", de: "Lösungsorientierung" }, proof: { en: "Deliberate trade-offs: in-memory pagination now, server-side when the catalogue grows.", de: "Bewusste Abwägungen: jetzt In-Memory-Paginierung, serverseitig bei wachsendem Katalog." } },
  { title: { en: "Continuous learning", de: "Kontinuierliches Lernen" }, proof: { en: "Six completed certificates and currently learning n8n, Docker and Git in depth.", de: "Sechs abgeschlossene Zertifikate; aktuell vertiefe ich n8n, Docker und Git." } },
];

export const languages = [
  { name: { en: "English", de: "Englisch" }, level: "B2", step: 4 },
  { name: { en: "German", de: "Deutsch" }, level: "A2", step: 2 },
];

export const certificates = [
  { title: "HTML / CSS", url: "https://maktabkhooneh.org/certificates/MK-4L7UPW/?show_actions=true&lang=en" },
  { title: "Linux", url: "https://maktabkhooneh.org/certificates/MK-ZHHZIY/?show_actions=true&lang=en" },
  { title: "Python", url: "https://maktabkhooneh.org/certificates/MK-XV4Z9C/?show_actions=true&lang=en" },
  { title: "SEO", url: "https://maktabkhooneh.org/certificates/MK-LVF5TR/?show_actions=true&lang=en" },
  { title: "Figma", url: "https://maktabkhooneh.org/certificates/MK-C8XUX4/?show_actions=true&lang=en" },
  { title: "ICDL", url: "https://maktabkhooneh.org/certificates/MK-Y6MO98/?show_actions=true&lang=en" },
];

export const skillsUsed: { name: string; where: string[] }[] = [
  { name: "HTML", where: ["weather", "taskflow", "vocab-bridge", "rock-paper-scissors"] },
  { name: "CSS", where: ["weather", "taskflow", "vocab-bridge", "rock-paper-scissors"] },
  { name: "JavaScript", where: ["weather", "taskflow", "vocab-bridge", "rock-paper-scissors"] },
  { name: "React", where: ["4kids"] },
  { name: "TypeScript", where: ["4kids"] },
  { name: "Vite", where: ["4kids"] },
  { name: "CSS Modules", where: ["4kids"] },
  { name: "Supabase", where: ["4kids"] },
  { name: "PostgreSQL", where: ["4kids"] },
  { name: "Row Level Security", where: ["4kids"] },
  { name: "Supabase Storage", where: ["4kids"] },
  { name: "Serverless API routes", where: ["weather"] },
  { name: "Vercel", where: ["4kids", "weather"] },
  { name: "Git", where: ["4kids"] },
  { name: "GitHub", where: ["4kids", "taskflow", "vocab-bridge"] },
  { name: "Figma", where: [] },
];

export const skillsLearning = ["JavaScript", "n8n", "Docker", "Git & GitHub"];
