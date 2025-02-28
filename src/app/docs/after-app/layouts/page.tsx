import { codeToHtml } from "shiki";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Code } from "@/components/ui/code";

export default async function Routing() {
  const sectionsDetails = [
    {
      title: "Introduction",
      description:
        "After App is a modern, full-stack React framework designed to provide developers with a streamlined, powerful environment for building web applications. This framework integrates TanStack Router + Vite to offer exceptional developer experience while ensuring high-performance, maintainable applications.",
      code: "",
      details: [],
    },
    {
      title: "The Root Layout",
      description: (
        <div>
          <div>
            The <Code>__root.tsx</Code> file is the root layout that wraps all
            components in your app.
          </div>
        </div>
      ),
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
      details: [],
      lang: "tsx",
    },
    {
      title: "Creating Layouts",
      description: (
        <div>
          <p>
            Layouts are used to wrap components and provide a consistent look
            and feel.
          </p>
          <p>
            To create a new layout, or a nameless route, create a file with the
            &quot;_&quot; prefix. Ex: <Code>_dashboard.tsx</Code>
          </p>
          <p>
            Files with the &quot;_&quot; prefix will be ignored in the path.
          </p>
          <p>
            Layouts must have an <Code>{"<Outlet />"}</Code> component. This is
            how children components are rendered within the layout.
          </p>
        </div>
      ),
      code: `import { createRootRoute, Outlet } from '@tanstack/react-router'

  export const Route = createRootRoute({
    component: LayoutA,
  })

  function LayoutA() {
    return (
      <div>
        <h1>My App</h1>
        <Outlet /> {/* This is where child routes will render */}
      </div>
    )
  }`,
      details: [],
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: (section.lang as string) || "tsx",
            theme: "github-dark",
          })
        : "",
    }))
  );

  return (
    <div className="space-y-12">
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <h1 className="text-xl font-bold">{section.title}</h1>
            <div className="mt-1 text-muted-foreground">
              {section.description}
            </div>

            {section.code && (
              <div
                className="w-full mt-4 bg-primary-foreground font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-2 border rounded-md [&_code]:break-all md:max-h-[45vh] overflow-scroll"
                dangerouslySetInnerHTML={{ __html: section.code }}
              />
            )}
            {section.details && section.details.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-muted-foreground">
                {section.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
