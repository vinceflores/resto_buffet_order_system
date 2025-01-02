import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "#", label: "About" },
  ];

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          BuffetBoss
        </Link>
        <nav className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="text-base font-medium text-gray-500 hover:text-gray-900">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <Button variant="ghost" className="mr-4">
            Log in
          </Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  )
}
