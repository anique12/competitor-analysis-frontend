import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import UserCard from "../Cards/UserCard";
import ProjectsCard from "../Projects/ProjectsCard";

export function AppSidebar() {
  const items = [
    {
      title: "New Project",
      url: "new-project",
      icon: CirclePlus,
    },
  ];

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader />
      <UserCard />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem className="px-2" key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <p className="text-sm font-medium tracking-tight text-gray-700 leading-none">
                      {item.title}
                    </p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <ProjectsCard />
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
