"use client";
import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GalleryVerticalEnd,
  Minus,
  Plus,
} from "lucide-react";
import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "/docs/getting-started",
      items: [
        {
          title: "React After",
          url: "/docs/getting-started",
        },
      ],
    },
    {
      title: "After App",
      url: "/docs/after-app/installation",
      items: [
        {
          title: "Installation",
          url: "/docs/after-app/installation",
        },
        {
          title: "Production",
          url: "/docs/after-app/production",
        },
        {
          title: "Routing",
          url: "/docs/after-app/routing",
        },
        {
          title: "Data Fetching",
          url: "/docs/after-app/data-fetching",
        },
      ],
    },
    {
      title: "gState",
      url: "/docs/gstate/installation",
      items: [
        {
          title: "Installation",
          url: "/docs/gstate/installation",
        },
        {
          title: "Creating A Store",
          url: "/docs/gstate/creating-a-store",
        },
        {
          title: "Modify State",
          url: "/docs/gstate/modify-state",
        },
        {
          title: "Examples",
          url: "/docs/gstate/examples",
        },
      ],
    },
    {
      title: "qFetch",
      url: "/docs/gstate/installation",
      items: [
        {
          title: "Coming Soon...",
          url: "",
        },
      ],
    },
  ],
};

export function AppSidebar({
  path,
  ...props
}: {
  path: string;
} & React.ComponentProps<typeof Sidebar>) {
  const section = path
    .split("/")
    [path.split("/").length - 2].replaceAll("-", " ");
  const subsection = path
    .split("/")
    [path.split("/").length - 1].replaceAll("-", " ");

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center">
                  <img className="rounded-sm" src="/afterA.webp" alt="" />
                </div>

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <ChevronUp className="ml-auto group-data-[state=open]/collapsible:-rotate-180 transition-transform duration-200" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className="text-muted-foreground"
                              asChild
                              isActive={
                                item.title.toLowerCase() === section &&
                                subItem.title.toLowerCase() === subsection
                              }
                            >
                              <Link
                                className="text-background"
                                href={subItem.url}
                              >
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
