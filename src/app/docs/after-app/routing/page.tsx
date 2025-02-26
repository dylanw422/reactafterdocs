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
      title: "The Root Layout",
      description: (
        <div>
          <p>
            The <Code>__root.tsx</Code> file is the root layout that wraps all
            components in your app.
          </p>
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
      title: "Dynamic Routes",
      description: (
        <div>
          <p>
            To create a dynamic route, create a file with the &quot;$&quot;
            prefix. Ex: <Code>$postId.tsx</Code>
          </p>
        </div>
      ),
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
      code: `src/                             # src directory
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
        </div>
      ),
      code: ``,
      details: [],
    },
    {
      title: "Applying Layouts",
      description: (
        <div>
          <p>
            Since the &quot;_&quot; prefix defines a nameless route, you can
            apply it by starting your route or directory name with the name of
            the layout.
          </p>
          <p>
            Layout: <Code>_layout.tsx</Code>
          </p>
          <p>
            Route: <Code>_layout.home.tsx</Code>
          </p>
          <p>
            Directory: <Code>_layout.posts/index.tsx</Code>
          </p>
        </div>
      ),
      code: `src/
├─ api/
│  └─ hello.ts
├─ routes/
│  ├─ _layoutB.account/              # _layoutB applies to all routes in the /account directory
│  │  ├─ edit.tsx
│  │  └─ index.tsx
│  ├─ _layoutA.dashboard/            # _layoutA applies to all routes in the /dashboard directory
│  │  ├─ payments.tsx
│  │  └─ index.tsx
│  ├─ index.tsx
│  ├─ __root.ts
│  ├─ _layoutA.tsx
│  └─ _layoutB.tsx
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

function FileTreeDemo() {
  return (
    <div className="relative flex h-[300px] w-1/3 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="1"
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="app">
            <Folder value="3" element="api">
              <File value="4">hello.ts</File>
            </Folder>
            <Folder value="5" element="routes">
              <File value="6">__root.tsx</File>
              <File value="7">index.tsx</File>
            </Folder>
          </Folder>
          <Folder value="8" element="components">
            <Folder value="9" element="ui">
              <File value="10">
                <p>button.tsx</p>
              </File>
            </Folder>
            <File value="11">
              <p>header.tsx</p>
            </File>
            <File value="12">
              <p>footer.tsx</p>
            </File>
          </Folder>
          <Folder value="13" element="lib">
            <File value="14">
              <p>utils.ts</p>
            </File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "api",
            children: [
              {
                id: "4",
                isSelectable: true,
                name: "hello.ts",
              },
            ],
          },
          {
            id: "5",
            isSelectable: true,
            name: "routes",
            children: [
              {
                id: "6",
                isSelectable: true,
                name: "__root.tsx",
              },
              {
                id: "7",
                isSelectable: true,
                name: "index.tsx",
              },
            ],
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "10",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "11",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "12",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
