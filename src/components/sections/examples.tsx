import { FeatureSelector } from "@/components/feature-selector";
import { Section } from "@/components/section";
import { codeToHtml } from "shiki";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code: string;
}

const featureOptions: FeatureOption[] = [
  {
    id: 1,
    title: "After App",
    description: "A fullstack framework for Vite",
    code: `export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background h-[100dvh]">
        <Outlet />
        <ThemeIcon />
      </div>
    </ThemeProvider>
  ),
});`,
  },
  {
    id: 2,
    title: "gState",
    description: "An intuitive global state management library.",
    code: `import { gState } from "@react-after/gstate"
    
export default function App() {
  const count = gState("count", 0);

  const increment = () => {
    gState.set("count", (prev) => prev + 1);
  }

  return (
    <p>Count: {count}</p>
  )
}`,
  },
];

export async function Examples() {
  const features = await Promise.all(
    featureOptions.map(async (feature) => ({
      ...feature,
      code: await codeToHtml(feature.code, {
        lang: "tsx",
        theme: "github-dark",
      }),
    }))
  );

  return (
    <Section id="examples">
      <div className="border-x border-t">
        <FeatureSelector features={features} />
      </div>
    </Section>
  );
}
