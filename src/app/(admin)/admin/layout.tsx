"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, Tag, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/candles", label: "Lumânări", icon: Package, exact: false },
  { href: "/admin/orders", label: "Comenzi", icon: ClipboardList, exact: false },
  { href: "/admin/categories", label: "Categorii", icon: Tag, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page renders without sidebar
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-60 bg-warm-brown text-cream flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-cream/10">
          <span className="font-display text-lg font-bold">Admin Panel</span>
          <p className="text-cream/50 text-xs mt-0.5">Oana Otilia Candles</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                  active
                    ? "bg-amber text-white font-medium"
                    : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-cream/70 hover:bg-cream/10 hover:text-cream transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Deconectare
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}