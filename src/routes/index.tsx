import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <h1>Ali Armani</h1>
      <p>Portfolio is being rebuilt with TanStack Start.</p>
    </main>
  );
}
