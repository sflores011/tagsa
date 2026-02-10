import Link from 'next/link';
import { HeaderData } from '@/types';

interface HeaderProps {
    data: HeaderData | null;
}

export default function Header({ data }: HeaderProps) {
    if (!data) return null;

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        {data.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={data.logo.url}
                                alt={data.logo.alt || "Logo"}
                                className="h-10 w-auto object-contain"
                            />
                        ) : (
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                TAGSA
                            </span>
                        )}
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {data.main_menu?.map((item) => (
                        <div key={item.ID} className="relative group">
                            <Link
                                href={item.url}
                                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                            >
                                {item.title}
                            </Link>

                            {/* Dropdown */}
                            {item.children && item.children.length > 0 && (
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="w-48 bg-white shadow-xl rounded-lg py-2 ring-1 ring-black ring-opacity-5">
                                        {item.children.map(child => (
                                            <Link
                                                key={child.ID}
                                                href={child.url}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Mobile Menu Button Placeholder */}
                <button className="md:hidden p-2 text-gray-600 hover:text-black">
                    <span className="sr-only">Menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
