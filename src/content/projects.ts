import type { L } from "@/i18n/i18n";

export type Section = { heading: L; items: L[] };
export type Project = {
  slug: string;
  name: string;
  category: L;
  summary: L;
  live: string;
  tags: string[];
  featured?: boolean;
  realClient?: boolean;
  overview: L;
  sections: { key: "context" | "architecture" | "decisions" | "security" | "payment" | "lessons" | "features" | "demonstrates" | "process"; items: L[] }[];
  stackGroups?: { label: L; items: string[] }[];
};

const x = (en: string, de: string): L => ({ en, de });

export const projects: Project[] = [
  {
    slug: "4kids",
    name: "4Kids Store",
    category: x("Full-stack e-commerce", "Full-Stack E-Commerce"),
    summary: x(
      "A type-safe, data-driven storefront for a children's gift shop with ~300 products, localized in Persian (RTL).",
      "Ein typsicherer, datengetriebener Shop für einen Kindergeschenkladen mit ca. 300 Produkten, lokalisiert auf Persisch (RTL).",
    ),
    live: "https://4kids-store.vercel.app",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    featured: true,
    realClient: true,
    overview: x(
      "4Kids is an e-commerce storefront built for a real client: a children's gift and accessories shop with a catalogue of approximately 300 products. It began as a static website and was re-engineered as a type-safe, data-driven single-page application backed by a relational database. The interface is localized in Persian and uses a right-to-left layout.",
      "4Kids ist ein Online-Shop für einen echten Kunden: ein Geschäft für Kindergeschenke und Accessoires mit rund 300 Produkten. Das Projekt begann als statische Website und wurde als typsichere, datengetriebene Single-Page-Anwendung mit relationaler Datenbank neu entwickelt. Die Oberfläche ist auf Persisch lokalisiert und nutzt ein Rechts-nach-links-Layout.",
    ),
    stackGroups: [
      { label: x("Frontend", "Frontend"), items: ["React", "TypeScript", "Vite", "CSS Modules"] },
      { label: x("Backend & data", "Backend & Daten"), items: ["Supabase", "PostgreSQL", "Row Level Security", "Supabase Storage"] },
      { label: x("Deploy & workflow", "Deployment & Workflow"), items: ["Vercel", "Git", "GitHub", "Conventional Commits"] },
    ],
    sections: [
      { key: "context", items: [
        x("The original product list was hard-coded, making every catalogue change a code change.", "Die ursprüngliche Produktliste war fest im Code hinterlegt – jede Katalogänderung war eine Codeänderung."),
        x("The client needed a catalogue that could grow, with categories they could control.", "Der Kunde brauchte einen wachstumsfähigen Katalog mit selbst steuerbaren Kategorien."),
      ]},
      { key: "architecture", items: [
        x("Products migrated to a PostgreSQL schema consumed through a typed data-access layer.", "Produkte wurden in ein PostgreSQL-Schema migriert, das über eine typisierte Datenzugriffsschicht genutzt wird."),
        x("Database rows are mapped to strongly typed TypeScript domain models.", "Datenbankzeilen werden auf streng typisierte TypeScript-Domänenmodelle abgebildet."),
        x("The catalogue is loaded once and shared through React Context.", "Der Katalog wird einmal geladen und über React Context geteilt."),
      ]},
      { key: "decisions", items: [
        x("Schema constraints, nullable ranking fields and deterministic ordering: manual category rank, then newest first, with a stable tie-breaker.", "Schema-Constraints, optionale Ranking-Felder und deterministische Sortierung: manueller Kategorierang, dann neueste zuerst, mit stabilem Tie-Breaker."),
        x("Category-driven homepage with configurable category visibility and an adaptive product grid.", "Kategoriebasierte Startseite mit konfigurierbarer Sichtbarkeit und adaptivem Produktraster."),
        x("URL-based pagination with strict validation; malformed or out-of-range pages degrade gracefully, stay shareable and update the document title.", "URL-basierte Paginierung mit strikter Validierung; fehlerhafte Seitenparameter werden robust behandelt, bleiben teilbar und aktualisieren den Dokumenttitel."),
        x("Versioned SQL migrations for orders and order items; items snapshot product names and prices at purchase time.", "Versionierte SQL-Migrationen für Bestellungen; Positionen speichern Produktname und Preis zum Kaufzeitpunkt."),
        x("Guest checkout through unguessable tracking tokens.", "Gast-Checkout über nicht erratbare Tracking-Tokens."),
        x("Per-page metadata managed; sitemap planned for indexing.", "Metadaten pro Seite; Sitemap für die Indexierung geplant."),
      ]},
      { key: "security", items: [
        x("Row Level Security enabled on every table. Public clients have read-only access to products; order tables are not directly accessible to anonymous users.", "Row Level Security auf jeder Tabelle. Öffentliche Clients haben nur Lesezugriff auf Produkte; Bestelltabellen sind für anonyme Nutzer nicht direkt zugänglich."),
        x("Image uploads restricted by file type and size at the storage-bucket level.", "Bild-Uploads auf Bucket-Ebene nach Dateityp und Größe beschränkt."),
        x("Security headers configured at the hosting layer.", "Sicherheits-Header auf Hosting-Ebene konfiguriert."),
        x("Mobile-first layout, lazy-loaded images, keyboard-navigable controls with visible focus states.", "Mobile-first-Layout, Lazy-Loading für Bilder, tastaturbedienbare Elemente mit sichtbarem Fokus."),
      ]},
      { key: "payment", items: [
        x("A server-side ZarinPal payment flow using Supabase Edge Functions is in progress.", "Ein serverseitiger ZarinPal-Zahlungsablauf mit Supabase Edge Functions ist in Arbeit."),
        x("Prices and totals are calculated exclusively on the server.", "Preise und Summen werden ausschließlich serverseitig berechnet."),
        x("Payment verification is designed to be idempotent.", "Die Zahlungsverifizierung ist idempotent konzipiert."),
      ]},
      { key: "process", items: [
        x("Small, independently testable commits using Conventional Commits.", "Kleine, unabhängig testbare Commits nach Conventional Commits."),
        x("Verified through production builds and manual testing across viewport sizes before release.", "Vor Releases durch Produktions-Builds und manuelle Tests auf verschiedenen Bildschirmgrößen geprüft."),
      ]},
      { key: "lessons", items: [
        x("Treat the client as untrusted.", "Den Client als nicht vertrauenswürdig behandeln."),
        x("Design the database before building the interface.", "Die Datenbank vor der Oberfläche entwerfen."),
        x("Make deliberate trade-offs between simplicity and scalability.", "Bewusst zwischen Einfachheit und Skalierbarkeit abwägen."),
        x("In-memory pagination is appropriate for the current catalogue size.", "In-Memory-Paginierung passt zur aktuellen Kataloggröße."),
        x("Reconsider server-side pagination as the catalogue grows.", "Serverseitige Paginierung neu bewerten, wenn der Katalog wächst."),
      ]},
    ],
  },
  {
    slug: "weather",
    name: "Weather Forecast",
    category: x("Frontend + serverless", "Frontend + Serverless"),
    summary: x("Real-time weather lookup through a custom Vercel API route that keeps the API key out of the browser.", "Echtzeit-Wetterabfrage über eine eigene Vercel-API-Route, die den API-Schlüssel vom Browser fernhält."),
    live: "https://weather-forecast-chi-six.vercel.app",
    tags: ["HTML", "CSS", "JavaScript", "Vercel API routes"],
    overview: x("A weather forecast web application that retrieves real-time weather information through a custom serverless backend implemented as a Vercel API route. Built with HTML, CSS and JavaScript using the Fetch API and async/await.", "Eine Wetter-App, die Echtzeitdaten über ein eigenes Serverless-Backend als Vercel-API-Route abruft. Gebaut mit HTML, CSS und JavaScript, Fetch API und async/await."),
    sections: [
      { key: "features", items: [
        x("City-based weather lookup", "Wetterabfrage nach Stadt"),
        x("Temperature, humidity and wind speed", "Temperatur, Luftfeuchtigkeit und Windgeschwindigkeit"),
        x("Dynamic weather icons", "Dynamische Wetter-Icons"),
        x("Invalid-city error handling", "Fehlerbehandlung bei ungültigen Städten"),
      ]},
      { key: "demonstrates", items: [
        x("API integration and asynchronous programming.", "API-Integration und asynchrone Programmierung."),
        x("Graceful error handling.", "Robuste Fehlerbehandlung."),
        x("Awareness of server-side secret management.", "Bewusstsein für serverseitiges Secret-Management."),
      ]},
    ],
  },
  {
    slug: "vocab-bridge",
    name: "Vocab Bridge",
    category: x("Bilingual learning app", "Zweisprachige Lern-App"),
    summary: x("Persian–English flashcards with flip animations, native pronunciation and RTL/LTR switching.", "Persisch–Englische Lernkarten mit Flip-Animation, Aussprache und RTL/LTR-Umschaltung."),
    live: "https://ali-armani.github.io/vocab-bridge",
    tags: ["HTML", "CSS", "JavaScript", "Web Speech API"],
    overview: x("A fully responsive Persian–English vocabulary flashcard application combining language learning, interaction design, browser APIs and bilingual interface handling.", "Eine vollständig responsive Persisch–Englisch-Vokabel-App, die Sprachenlernen, Interaktionsdesign, Browser-APIs und zweisprachige Oberflächen verbindet."),
    sections: [
      { key: "features", items: [
        x("Bilingual Persian–English vocabulary", "Zweisprachiges Persisch–Englisch-Vokabular"),
        x("Animated flip cards", "Animierte Lernkarten"),
        x("Native pronunciation via the Web Speech API", "Aussprache über die Web Speech API"),
        x("RTL/LTR language switching", "RTL/LTR-Sprachumschaltung"),
        x("Progress tracking and mistake review", "Fortschrittsanzeige und Fehlerwiederholung"),
        x("Accessibility-conscious interface design", "Auf Barrierefreiheit bedachtes Interface"),
      ]},
      { key: "demonstrates", items: [
        x("Correct bidirectional text: Latin words and numbers inside Persian content must not break the layout.", "Korrekter bidirektionaler Text: Lateinische Wörter und Zahlen in persischem Text dürfen das Layout nicht brechen."),
        x("Practical use of browser APIs.", "Praktischer Einsatz von Browser-APIs."),
      ]},
    ],
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    category: x("Interaction design", "Interaktionsdesign"),
    summary: x("A responsive to-do app focused on clean UI, organized logic and consistent interface details.", "Eine responsive To-do-App mit Fokus auf klarer UI, strukturierter Logik und konsistenten Details."),
    live: "https://ali-armani.github.io/taskflow-todo/",
    tags: ["HTML", "CSS", "JavaScript"],
    overview: x("TaskFlow is a fully responsive to-do list application built with HTML, CSS and JavaScript, focused on frontend fundamentals and interaction design.", "TaskFlow ist eine vollständig responsive To-do-App mit HTML, CSS und JavaScript – mit Fokus auf Frontend-Grundlagen und Interaktionsdesign."),
    sections: [
      { key: "features", items: [
        x("Task management with interactive behavior", "Aufgabenverwaltung mit interaktivem Verhalten"),
        x("Responsive layouts", "Responsive Layouts"),
        x("Organized frontend logic and consistent interface details", "Strukturierte Frontend-Logik und konsistente Details"),
      ]},
      { key: "process", items: [
        x("Built with AI-assisted development informed by a prompt engineering course, while retaining responsibility for code quality and implementation decisions.", "Mit KI-gestützter Entwicklung auf Basis eines Prompt-Engineering-Kurses gebaut – die Verantwortung für Codequalität und Entscheidungen blieb bei mir."),
      ]},
    ],
  },
  {
    slug: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    category: x("Game logic", "Spiellogik"),
    summary: x("A small interactive game demonstrating fundamental programming logic.", "Ein kleines interaktives Spiel, das grundlegende Programmierlogik zeigt."),
    live: "https://ali-armani.github.io/Rock-Paper-Scissors",
    tags: ["HTML", "CSS", "JavaScript"],
    overview: x("An interactive frontend application built with HTML, CSS and JavaScript, with a responsive layout, dynamic interactions and functional game logic.", "Eine interaktive Frontend-Anwendung mit HTML, CSS und JavaScript – responsive, dynamisch und mit funktionierender Spiellogik."),
    sections: [
      { key: "features", items: [
        x("Responsive layout and clean interface", "Responsives Layout und klare Oberfläche"),
        x("Dynamic interactions and game logic", "Dynamische Interaktionen und Spiellogik"),
      ]},
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
