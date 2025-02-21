import { codeToHtml } from "shiki";

export default async function Installation() {
  const sectionsDetails = [
    {
      title: "Installation",
      description:
        "Installing gState is simple. Just run the following command in your project.",
      code: "npm install @react-after/gstate",
    },
    {
      title: "Why Use gState?",
      description:
        "gState is a lightweight, flexible, and beginner-friendly global state management library built on top of Zustand. It simplifies state management in React applications by providing an intuitive API, dynamic key support, and built-in utilities for asynchronous updates and debugging.",
      code: "",
    },
    {
      title: "Quick Start",
      description:
        "Once installed, you can start using gState in your project. Here's a quick example to get you started:",
      code: `import { gState } from "@react-after/gstate";

// Set an initial value
gState("theme", "dark");

// Retrieve the value
const theme = gState("theme");
console.log(theme); // Output: "dark"

// Update the value
gState.set("theme", "light");`,
    },
    {
      title: "Additional Configuration",
      description:
        "gState works out of the box with zero configuration. However, you can enable debugging to log state changes to the console for easier development:",
      code: `// Enable debugging
gState.debug(true);`,
    },
    {
      title: "Troubleshooting",
      description:
        "If you encounter any issues during installation or usage, here are some common solutions:",
      code: `// Ensure you have the correct version of Node.js and npm
node -v
npm -v

// Clear your npm cache and reinstall
npm cache clean --force
npm install @react-after/gstate`,
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: section.title === "Installation" ? "bash" : "typescript",
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
          </div>
        );
      })}
    </div>
  );
}
