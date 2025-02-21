import { codeToHtml } from "shiki";

export default async function AboutReactAfter() {
  const sectionsDetails = [
    {
      title: "What is React After?",
      description:
        "React After is a collection of libraries designed to simplify and enhance the development experience for React developers. It provides intuitive, beginner-friendly abstractions over popular React libraries, making it easier to build scalable and maintainable applications.",
      code: "",
      details: [],
    },
    {
      title: "The Problem We're Solving",
      description:
        "React is a powerful library for building user interfaces, but as applications grow in complexity, managing state, side effects, and other common tasks can become challenging. Popular libraries like Zustand, TanStack Query, and others provide excellent solutions, but they often come with a steep learning curve or require boilerplate code. React After bridges this gap by offering simplified, opinionated APIs that retain the power of these libraries while making them more accessible to developers of all skill levels.",
      code: "",
      details: [
        "Managing global state in large applications can be complex and error-prone.",
        "Asynchronous data fetching and caching often require verbose setups.",
        "Beginners may struggle with advanced concepts like middleware, selectors, or query caching.",
        "React After simplifies these tasks while maintaining flexibility and performance.",
      ],
    },
    {
      title: "Introducing gState",
      description:
        "`gState` is the flagship library in the React After collection. It provides a simple and flexible way to manage global state in React applications. Built on top of Zustand, `gState` eliminates boilerplate code and introduces features like dynamic keys, asynchronous updates, and built-in debugging, making it an ideal choice for both small and large applications.",
      code: `// Example: Using gState for global state management
import { gState } from "@react-after/gstate";

// Set an initial value
gState("theme", "dark");

// Retrieve the value
const theme = gState("theme");
console.log(theme); // "dark"`,
      details: [
        "Dynamic keys: Add and manage state properties on the fly.",
        "Asynchronous updates: Handle side effects like API calls with ease.",
        "Minimal setup: No need for complex configurations or middleware.",
      ],
    },
    {
      title: "Why Choose React After?",
      description:
        "React After is designed to make React development faster, easier, and more enjoyable. Whether you're a beginner looking to learn best practices or an experienced developer seeking to reduce boilerplate, React After has something for you. Here's why you should try it:",
      code: "",
      details: [
        "Powerful: Built on top of proven libraries like Zustand and TanStack Query.",
        "Flexible: Works seamlessly with existing React applications.",
        "Efficient: Reduces boilerplate and improves development speed.",
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
                  <li key={i}>{detail}</li>
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
