import { codeToHtml } from "shiki";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Code } from "@/components/ui/code";

export default async function Routing() {
  const sectionsDetails = [
    {
      title: "Project Structure",
      description: "",
      code: `├── public/                # Static assets served directly
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   └── routes/        # Frontend routes
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configuration
│   ├── server/            # Server-side code
│   ├── main.tsx           # Frontend entry point
│   ├── styles.css         # Global styles
│   └── routeTree.gen.ts   # Generated route tree
├── build.sh               # Build script
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.server.json   # Server TypeScript configuration
└── vite.config.js         # Vite configuration`,
      lang: "markdown",
    },
    {
      title: "Routing",
      description: (
        <p>
          After App uses file-based routing through TanStack Router. Routes are
          defined in the <Code>src/app/routes</Code> directory.
        </p>
      ),
      code: ``,
      details: [],
    },
    {
      title: "Route Structure",
      description: (
        <div>
          <p>
            The <Code>__root.tsx</Code> file is the root layout that wraps all
            components.
          </p>
          <p>
            The <Code>index.tsx</Code> file is the default route.
          </p>
        </div>
      ),
      code: ``,
      details: [],
    },
    {
      title: "Creating A Route",
      description: (
        <div>
          <p>
            To create a new route, create a new file in the <Code>routes</Code>{" "}
            folder with the name of the path such as{" "}
            <Code>routes/profile.tsx</Code>
          </p>
          <p>
            This code will be automatically generated when the file is created
            and the app is started.
          </p>
        </div>
      ),
      code: `// src/app/routes/profile.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  return <div>Hello from "/profile"!</div>
}
`,
      details: [],
      lang: "tsx",
    },
    {
      title: "Nested Routes",
      description: (
        <div>
          <p>
            Nested routes can be created by creating directories that contain
            all the related routes. <Code>path/index.tsx</Code>{" "}
          </p>
        </div>
      ),
      code: `app/                             # src directory
├─ api/                          
│  └─ hello.ts                   # /api/hello
├─ routes/                       
│  ├─ account/                   
│  │  ├─ edit.tsx                # /account/edit
│  │  └─ index.tsx               # /account
│  ├─ dashboard/                 
│  │  ├─ payments.tsx            # /dashboard/payments
│  │  └─ index.tsx               # /dashboard
│  ├─ index.tsx                  # /
│  └─ __root.tsx                 # root layout
├─ components/
├─ hooks/
├─ lib/
└─ server/
`,
      details: [],
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: section.lang as string | "bash",
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
