import { codeToHtml } from "shiki";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Code } from "@/components/ui/code";

export default async function Routing() {
  const sectionsDetails = [
    {
      title: "Dynamic Routes",
      description: (
        <div>
          <p>
            To create a dynamic route, create a file with the dynamic value
            passed to the end of the route using the &quot;$&quot; prefix. Ex:{" "}
            <Code>user.$userId.tsx</Code>
          </p>
        </div>
      ),
      code: `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userId')({
  component: User,
})
  
function User() {
  const { userId } = Route.useParams()
  return <div>UserID: {userId}</div>
}`,
      lang: "tsx",
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
