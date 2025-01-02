"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
    const pathname = usePathname()
    const paths = pathname.split('/').filter(path => path)

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <Link href="/" className="flex items-center hover:text-gray-700">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join('/')}`
                    const isLast = index === paths.length - 1
                    return (
                        <li key={path} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-1" />
                            {isLast ? (
                                <span className="font-medium text-gray-900 capitalize">{path}</span>
                            ) : (
                                <Link href={href} className="hover:text-gray-700 capitalize">
                                    {path}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

