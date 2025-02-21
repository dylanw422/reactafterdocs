import { codeToHtml } from "shiki";

export default async function CreatingAStore() {
  const sectionsDetails = [
    {
      title: "Why Use gState?",
      description:
        "Global state management is essential for managing shared data across your application. Instead of passing props down multiple levels (prop drilling), you can use a global store to access and update state from anywhere in your app. This makes your code cleaner, more maintainable, and easier to debug.",
      code: "",
      details: [], // No bullet points for this section
    },
    {
      title: "Creating A Store",
      description:
        "The gState library provides a simple and flexible way to manage global state in your application. You can create and manage a global store with minimal setup, and it supports dynamic keys, asynchronous updates, and more.",
      code: "",
      details: [], // No bullet points for this section
    },
    {
      title: "Initializing the Store",
      description:
        "To start using gState, you don't need to explicitly create a store. The store is automatically initialized the first time you use gState to set or retrieve a value. The gState function is used to set an initial value for the key. The store is automatically created whenever 2 values are passed to the gState function. The first argument is the key, and the second argument is the initial value.",
      code: `import { gState } from "@react-after/gstate";

// Initialize the store with a default value
gState("theme", "dark");

// Retrieve the value
const theme = gState("theme");
console.log(theme); // "dark"
`,
      details: [], // No bullet points for this section
    },
    {
      title: "Dynamic Keys",
      description:
        "gState supports dynamic keys, meaning you can create and manage state properties on the fly. This makes it easy to add new state properties without predefining them.",
      code: `// Add a new key dynamically
gState("user", { name: "John", age: 30 });

// Retrieve the value
const user = gState("user");
console.log(user); // { name: "John", age: 30 }
`,
      details: [], // No bullet points for this section
    },

    {
      title: "Common Use Cases",
      description:
        "gState is ideal for applications where you need to manage shared state across multiple components. Here are some common use cases:",
      code: "", // No code block for this section
      details: [
        "User authentication state (e.g., logged-in user details)",
        "Theme preferences (e.g., light/dark mode)",
        "Shopping cart state in an e-commerce app",
        "Form state management across multiple steps",
        "Real-time data synchronization (e.g., chat apps)",
      ],
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: "typescript",
            theme: "github-dark",
          })
        : "",
    }))
  );

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <h1 className="text-xl font-bold">{section.title}</h1>
            <p className="mt-1 text-muted-foreground">{section.description}</p>
            {section.details && section.details.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-muted-foreground">
                {section.details.map((detail, i) => (
                  <li className="py-1" key={i}>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
            {section.code && (
              <div
                className="w-full mt-4 bg-primary-foreground font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-2 border rounded-md [&_code]:break-all md:max-h-[45vh] overflow-scroll"
                dangerouslySetInnerHTML={{ __html: section.code }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
