import { codeToHtml } from "shiki";

export default async function Installation() {
  const sectionsDetails = [
    {
      title: "Introduction",
      description:
        "After App is a modern, full-stack React framework designed to provide developers with a streamlined, powerful environment for building web applications. This framework integrates TanStack Router + Vite to offer exceptional developer experience while ensuring high-performance, maintainable applications.",
      code: "",
      details: [],
    },
    {
      title: "Core Features",
      description: "",
      code: ``,
      details: [
        "Modern React Setup: Built with React 19 and TypeScript for type-safe development",
        "File-based Routing: Intuitive routing through TanStack Router",
        "Server Integration: Built-in Express server with API routes",
        "Component Library: Integrated Shadcn/UI components with Radix UI primitives",
        "Styling Solution: Tailwind CSS 4 with theming support",
        "Responsive Design: Built-in mobile detection hooks",
        "Development Experience: Hot reloading, TypeScript integration, and a testing framework",
      ],
    },
    {
      title: "Getting Started",
      description: "Prerequisites",
      code: ``,
      details: ["Node.js 18.0 or higher", "npm or yarn package manager"],
    },
    {
      title: "Installation",
      description: "Create a new After App project with: ",
      code: `npx @react-after/create-after-app`,
      lang: "bash",
    },
    {
      title: "Running the Development Server",
      description: "Start the development server with: ",
      code: `npm run start`,
      details: [
        "App will be available at http://localhost:5173",
        "Starts the Vite dev server for the frontent",
        "Starts the Express backend server using Nodemon",
        "Configures proxy settings for API forwarding",
      ],
      lang: "bash",
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: section.lang as any | "typescript",
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
            <p className="mt-1 text-muted-foreground">{section.description}</p>

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
