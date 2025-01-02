import Link from "next/link";
import { Utensils, BookOpen, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcumbs";
import { AdminParam } from "./paramType";

export const metadata = {
  title: "Restaurant Admin",
  description: "Admin panel for restaurant management",
};

export default async function RootLayout({
  children,
  params,
}: {
  params: Promise<AdminParam>;
  children: React.ReactNode;
}) {
  const id = (await params).id;
  const navItems = [
    // { href: "/admin", label: "Restaurants", icon: Home },
    // { href: `/admin/${id}/dashboard`, label: "Dashboard", icon: Home },
    { href: `/admin/${id}/tables`, label: "Tables", icon: Utensils },
    { href: `/admin/${id}/menu`, label: "Menu", icon: BookOpen },
    { href: `/admin/${id}/orders`, label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href={`/admin/${id}`}
              className="text-2xl font-bold text-gray-800"
            >
              Restaurant Admin
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="md:hidden">
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Breadcrumbs />
        {children}
      </section>
    </div>
  );
}
