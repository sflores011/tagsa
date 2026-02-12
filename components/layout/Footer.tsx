import Link from 'next/link';
import { FooterData } from '@/types';

interface FooterProps {
    data: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
    if (!data) return null;

    // Extraer información de los bloques del contenido
    const extractContentFromBlocks = (blocks: any[]): any => {
        const result: any = {
            logo: null,
            description: '',
            links: [],
            contactPhone: '',
            contactEmail: '',
            socialIcons: [],
            copyright: '',
            poweredByLogo: null
        };

        const processBlocks = (blocks: any[]) => {
            blocks.forEach(block => {
                // Procesar imágenes
                if (block.type === 'core/image' && block.image) {
                    if (!result.logo && block.image.url.includes('footer-logo')) {
                        result.logo = block.image;
                    } else if (block.image.url.includes('aumenta')) {
                        result.poweredByLogo = block.image;
                    }
                }

                // Procesar párrafos
                if (block.type === 'core/paragraph' && block.content) {
                    const content = block.content;

                    // Descripción de la empresa
                    if (content.includes('TAGSA es una empresa')) {
                        result.description = content;
                    }
                    // Links de navegación
                    else if (content.includes('InicioNosotrosServiciosContacto')) {
                        result.links = ['Inicio', 'Nosotros', 'Servicios', 'Contacto'];
                    }
                    // Información de contacto
                    else if (content.includes('1234 5678') || content.includes('correo@')) {
                        const parts = content.split(/(?=\d{4}\s\d{4})|(?=correo@)/);
                        parts.forEach((part: string) => {
                            if (part.match(/\d{4}\s\d{4}/)) {
                                result.contactPhone = part.trim();
                            } else if (part.includes('@')) {
                                result.contactEmail = part.trim();
                            }
                        });
                    }
                    // Copyright
                    else if (content.includes('©') || content.includes('Todos los derechos')) {
                        result.copyright = content;
                    }
                }

                // Procesar iconos SVG de redes sociales
                if (block.type === 'safe-svg/svg-icon' && block.attributes) {
                    result.socialIcons.push({
                        url: block.attributes.svgURL,
                        width: block.attributes.dimensionWidth,
                        height: block.attributes.dimensionHeight
                    });
                }

                // Recursivamente procesar bloques hijos
                if (block.children && Array.isArray(block.children)) {
                    processBlocks(block.children);
                }
            });
        };

        processBlocks(blocks);
        return result;
    };

    const content = extractContentFromBlocks(data.content.blocks);

    return (
        <footer className="w-full bg-black text-white">
            {/* Sección principal del footer */}
            <div className="max-w-[1440px] mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Columna izquierda - Logo y descripción (30%) */}
                    <div className="md:col-span-4">
                        {content.logo && (
                            <div className="mb-6">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={content.logo.url}
                                    alt={content.logo.alt || 'TAGSA'}
                                    className="h-[63px] w-auto object-contain"
                                />
                            </div>
                        )}
                        <p className="text-[14px] leading-[24px] text-white/90 max-w-[298px]">
                            {content.description || 'TAGSA es una empresa guatemalteca con altos estándares de calidad y servicio para cubrir las necesidades de transporte de granos y materias primas.'}
                        </p>
                    </div>

                    {/* Espacio vacío (20%) */}
                    <div className="md:col-span-2"></div>

                    {/* Columna derecha - Links y Contacto (50%) */}
                    <div className="md:col-span-6">
                        <div className="flex flex-wrap justify-between gap-8">
                            {/* Links */}
                            <div className="flex flex-col gap-4">
                                <h2 className="text-[18px] font-semibold text-white mb-2">
                                    Links
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {content.links.map((link: string, index: number) => (
                                        <Link
                                            key={index}
                                            href={`/${link.toLowerCase()}`}
                                            className="text-[14px] text-white/80 hover:text-white transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Contáctanos */}
                            <div className="flex flex-col gap-4">
                                <h2 className="text-[18px] font-semibold text-white mb-2">
                                    Contáctanos
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {content.contactPhone && (
                                        <a
                                            href={`tel:${content.contactPhone.replace(/\s/g, '')}`}
                                            className="text-[14px] text-white/80 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            {content.contactPhone}
                                        </a>
                                    )}
                                    {content.contactEmail && (
                                        <a
                                            href={`mailto:${content.contactEmail}`}
                                            className="text-[14px] text-white/80 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            {content.contactEmail}
                                        </a>
                                    )}

                                    {/* Redes sociales */}
                                    {content.socialIcons.length > 0 && (
                                        <div className="flex items-center gap-4 mt-2">
                                            {content.socialIcons.map((icon: any, index: number) => (
                                                <a
                                                    key={index}
                                                    href="#"
                                                    className="text-white/80 hover:text-white transition-colors"
                                                >
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={icon.url}
                                                        alt="Social icon"
                                                        width={icon.width}
                                                        height={icon.height}
                                                        className="w-auto h-[25px] brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Línea divisoria */}
            {/*<div className="border-t border-white/10"></div>*/}

            {/* Sección de copyright */}
            <div className="max-w-[1440px] mx-auto px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <div className="text-[14px] text-white/70">
                        {content.copyright || data.copyright.text}
                    </div>

                    {/* Powered by */}
                    <div className="flex items-center gap-3">
                        <span className="text-[14px] text-white/70">Powered by</span>
                        {content.poweredByLogo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={content.poweredByLogo.url}
                                alt="Aumenta"
                                className="h-[60px] w-auto object-contain"
                            />
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
