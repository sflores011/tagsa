"use client";

import Link from 'next/link';
import { useState } from 'react';
import { HeaderData } from '@/types';

interface HeaderProps {
    data: HeaderData | null;
}

export default function Header({ data }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!data) return null;

    const menuItems = data.menu?.items || [];
    const buttonItems = menuItems.filter(item => item.slug === 'contacto' || item.title === 'Contacto');
    const navItems = menuItems.filter(item => !(item.slug === 'contacto' || item.title === 'Contacto'));
    const getMenuHref = (item: { id: number | string; title: string; slug?: string; url: string }) => {
        const isInicioItem =
            item.id === 7 &&
            item.title === 'Inicio' &&
            item.slug === 'inicio' &&
            item.url === '/inicio/';

        if (isInicioItem) {
            return '/';
        }
        return item.url || '/';
    };

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] h-auto px-[10px] py-[10px] bg-white rounded-[15px] shadow-[0px_4px_30px_0px_#00000026] flex items-center justify-between px-8 transition-all duration-300">
            {/* Logo */}
            <div className="flex-shrink-0">
                <Link href="/">
                    {data.logo?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={data.logo.url}
                            alt={data.logo.alt || "Logo"}
                            className="h-[60px] w-auto object-contain"
                        />
                    ) : (
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            TAGSA
                        </span>
                    )}
                </Link>
            </div>

            {/* Center Navigation - Standard Links */}
            <nav className="hidden md:flex flex-1 justify-center items-center space-x-[4rem]">
                {navItems.map((item) => (
                    <div key={item.id} className="relative group">
                        <Link
                            href={getMenuHref(item)}
                            className="text-sm font-bold text-black hover:text-[#0361B4] transition-colors uppercase"
                        >
                            {item.title}
                        </Link>

                        {/* Dropdown */}
                        {item.children && item.children.length > 0 && (
                            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-48 bg-white shadow-xl rounded-lg py-2 ring-1 ring-black ring-opacity-5">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.id}
                                            href={child.url}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors uppercase"
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

            {/* Right Side - Buttons */}
            <div className="hidden md:flex items-center">
                {buttonItems.map((item) => (
                    <div key={item.id} className="relative group">
                        <Link
                            href={item.url}
                            className="inline-flex items-center justify-center rounded-[15px] gap-[10px] px-[30px] py-[16px] bg-orange-500 text-white font-medium hover:bg-[#0361B4] transition-colors uppercase"
                        >
                            {item.title}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Mobile Menu Button Placeholder */}
            <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                className="md:hidden p-2 text-gray-600 hover:text-black"
            >
                <span className="sr-only">Menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {isMobileMenuOpen && (
                <div id="mobile-menu" className="absolute top-full left-0 mt-3 w-full rounded-[15px] bg-white shadow-[0px_4px_30px_0px_#00000026] p-5 md:hidden">
                    <nav className="flex flex-col gap-3">
                        {navItems.map((item) => (
                            <div key={item.id} className="flex flex-col gap-2">
                                <Link
                                    href={getMenuHref(item)}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm font-bold text-black hover:text-[#0361B4] transition-colors uppercase"
                                >
                                    {item.title}
                                </Link>

                                {item.children && item.children.length > 0 && (
                                    <div className="ml-4 flex flex-col gap-2 border-l border-gray-200 pl-3">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.id}
                                                href={child.url}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xs font-semibold text-gray-600 hover:text-black transition-colors uppercase"
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {buttonItems.length > 0 && (
                            <div className="border-t border-gray-200 pt-3 mt-1">
                                {buttonItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.url}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="inline-flex items-center justify-center rounded-[15px] gap-[10px] px-[20px] py-[16px] bg-orange-500 text-white text-sm font-medium hover:bg-[#0361B4] transition-colors uppercase"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
