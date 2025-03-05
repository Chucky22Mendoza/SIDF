"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Film,
  FolderOpen,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Registros",
    icon: Film,
    href: "/admin/records"
  },
  {
    title: "Catálogos",
    icon: FolderOpen,
    href: "/admin/catalogs"
  },
  {
    title: "Imágenes",
    icon: Image,
    href: "/admin/viewer"
  },
  {
    title: "Reportes",
    icon: BarChart,
    href: "/admin/reportes"
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-card">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}