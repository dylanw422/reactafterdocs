import { codeToHtml } from "shiki";

export default async function Production() {
  const sectionsDetails = [
    {
      title: "Create Production Build",
      description:
        "Build your app for production with the `build` command. This will create a production build of your app in the `dist` folder.",
      code: `npm run build:all`,
    },
    {
      title: "Alternate Method",
      description: "You can also build your app with the provided build script",
      code: `./build.sh --install`,
      details: [],
    },
    {
      title: "Serving the Production Build",
      description:
        "You can serve the production build with the `serve` command",
      code: `npm run serve`,
      details: [
        "This will start the Node.js server in production mode, serving both the static frontend assets and the API routes.",
      ],
    },
  ];

  const sections = await Promise.all(
    sectionsDetails.map(async (section) => ({
      ...section,
      code: section.code
        ? await codeToHtml(section.code, {
            lang: "bash",
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
