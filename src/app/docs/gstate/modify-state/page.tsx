import { codeToHtml } from "shiki";

export default async function UpdatingState() {
  const sectionsDetails = [
    {
      title: "Updating State",
      description:
        "The `gState` library provides several methods for updating global state values. These methods allow you to modify state synchronously, asynchronously, append or merge values, update multiple properties at once, and reset state to its initial value.",
      code: "",
      details: [],
    },
    {
      title: "Synchronous Updates with ",
      method: "gState.set()",
      description:
        "Use `gState.set` to update state synchronously. You can pass a new value directly or a function that receives the previous state and returns the updated value. This is ideal for simple state updates that don't require asynchronous operations.",
      code: `// Update state with a new value
gState.set("theme", "light");

// Update state using a function
gState.set("counter", (prev) => prev + 1);`,
      details: [
        "Pass a new value directly to update the state.",
        "Pass a function to compute the new value based on the previous state.",
      ],
    },
    {
      title: "Asynchronous Updates with ",
      method: "gState.setAsync()",
      description:
        "Use `gState.setAsync` to update state after an asynchronous operation, such as fetching data from an API. The function passed to `setAsync` can return a new value directly or a function that receives the previous state and returns the updated value. This is ideal for handling side effects like API calls.",
      code: `// Update state after fetching data
gState.setAsync("user", async () => {
  const response = await fetch("/api/user");
  return response.json();
});

// Update state using a function with the previous state
gState.setAsync("todos", async (prev) => {
  const newTodo = await fetch("/api/todos");
  return [...prev, newTodo];
});`,
      details: [
        "Pass an asynchronous function to update the state after the operation completes.",
        "The function can return a new value directly or a function that computes the new value based on the previous state.",
        "Asynchronous updates are non-blocking and allow you to handle side effects like API calls or timers.",
      ],
    },
    {
      title: "Appending or Merging Values with ",
      method: "gState.append()",
      description:
        "Use `gState.append` to append values to an array or merge properties into an object. This is useful for updating nested state or adding items to a list.",
      code: `// Append to an array
gState.append("todos", { id: 1, text: "Buy groceries" });

// Merge into an object
gState.append("user", { age: 31 });`,
      details: [
        "Append values to an array or merge properties into an object.",
        "Useful for updating nested state or adding items to a list.",
      ],
    },
    {
      title: "Batch Updates with ",
      method: "gState.batch()",
      description:
        "Use `gState.batch` to update multiple state properties at once. This is useful for reducing re-renders when updating multiple values.",
      code: `// Update multiple state properties
gState.batch({
  theme: "dark",
  user: { name: "Jane", age: 25 },
});`,
      details: [
        "Update multiple state properties in a single call.",
        "Reduces re-renders by batching updates together.",
        "Ideal for scenarios where multiple state changes need to happen simultaneously.",
      ],
    },
    {
      title: "Resetting State with ",
      method: "gState.reset()",
      description:
        "Use `gState.reset` to reset a state property to its initial value. This is useful for cleaning up state when it's no longer needed.",
      code: `// Reset state to its initial value
gState.reset("theme");`,
      details: [
        "Reset a state property to its initial value.",
        "Useful for cleaning up state or reverting to default values.",
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
    <div className="space-y-12">
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <h1 className="text-xl font-bold">
              {section.title}
              {section.method && (
                <span className="p-1 px-2 border rounded-md font-mono">
                  {section.method}
                </span>
              )}
            </h1>
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
