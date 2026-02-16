'use client';

import React, { useCallback, useEffect, useState } from 'react';

interface TestimonioItem {
    content?: string;
    author?: string;
    position?: string;
    logo?: string | { mediaLink?: string; attributes?: { mediaLink?: string } };
    mediaLink?: string;
    blocks?: TestimonioBlock[];
}

interface TestimoniosProps {
    heading: string;
    testimonios: TestimonioItem[];
}

interface TestimonioBlock {
    type?: string;
    attributes?: {
        metadata?: {
            name?: string;
        };
        svgURL?: string;
    };
    content?: string;
    blocks?: TestimonioBlock[];
}

export default function Testimonios({ heading, testimonios }: TestimoniosProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (testimonios.length === 0) return;
        if (activeIndex > testimonios.length - 1) {
            setActiveIndex(0);
            setIncomingIndex(null);
            setIsTransitioning(false);
            setAnimateTransition(false);
        }
    }, [activeIndex, testimonios.length]);

    const startTransition = useCallback(
        (targetIndex: number, nextDirection: 'forward' | 'backward') => {
            if (testimonios.length <= 1) return;
            if (isTransitioning) return;
            if (targetIndex === activeIndex) return;

            setDirection(nextDirection);
            setIncomingIndex(targetIndex);
            setIsTransitioning(true);
            setAnimateTransition(false);
        },
        [activeIndex, isTransitioning, testimonios.length]
    );

    useEffect(() => {
        if (!isTransitioning || incomingIndex === null) return;

        const frameId = requestAnimationFrame(() => {
            setAnimateTransition(true);
        });

        const transitionTimeout = setTimeout(() => {
            setActiveIndex(incomingIndex);
            setIncomingIndex(null);
            setIsTransitioning(false);
            setAnimateTransition(false);
        }, 1500);

        return () => {
            cancelAnimationFrame(frameId);
            clearTimeout(transitionTimeout);
        };
    }, [incomingIndex, isTransitioning]);

    useEffect(() => {
        if (testimonios.length <= 1 || isHovered || isTransitioning) return;

        const holdTimeout = setTimeout(() => {
            const nextIndex = (activeIndex + 1) % testimonios.length;
            startTransition(nextIndex, 'forward');
        }, 3000);

        return () => {
            clearTimeout(holdTimeout);
        };
    }, [activeIndex, isHovered, isTransitioning, startTransition, testimonios.length]);

    const goToSlide = (index: number) => {
        if (index === activeIndex) return;
        const nextDirection = index > activeIndex ? 'forward' : 'backward';
        startTransition(index, nextDirection);
    };

    const activeTestimonio = testimonios[activeIndex];
    const incomingTestimonio = incomingIndex !== null ? testimonios[incomingIndex] : undefined;

    const outgoingAnimationClass = animateTransition
        ? direction === 'forward'
            ? '-translate-x-6 opacity-0'
            : 'translate-x-6 opacity-0'
        : 'translate-x-0 opacity-100';

    const incomingAnimationClass = animateTransition
        ? 'translate-x-0 opacity-100'
        : direction === 'forward'
            ? 'translate-x-6 opacity-0'
            : '-translate-x-6 opacity-0';

    const renderSlideContent = (testimonio: TestimonioItem) => {
        const paragraphs = getTestimonioParagraphs(testimonio);
        const logoSrc = getLogoSource(testimonio);
        const stars = getTestimonioStars(testimonio);

        return (
            <div className="h-full min-h-[400px] flex flex-col">
                {/* Estrellas */}
                <div className="flex gap-2 mb-12">
                    {stars.map((starName, i) => (
                        <svg key={`${starName}-${i}`} width="33" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17 0L20.829 11.785H33.2206L23.1958 19.0691L27.0248 30.8541L17 23.57L6.97524 30.8541L10.8042 19.0691L0.779435 11.785H13.171L17 0Z"
                                fill={starName === 'starFull' ? '#0361B4' : '#000000'}
                            />
                        </svg>
                    ))}
                </div>

                {/* Contenido del testimonio */}
                <div className="space-y-6 mb-10">
                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="font-['FamiliarPro'] text-black text-[15px] leading-relaxed font-normal"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Logo + autor/posición */}
                {(logoSrc || testimonio.author || testimonio.position) && (
                    <div className="mt-auto flex items-center gap-5">
                        {logoSrc && (
                            <img
                                src={logoSrc}
                                alt={testimonio.author ? `Logo de ${testimonio.author}` : 'Logo'}
                                className="w-20 h-auto object-contain"
                            />
                        )}
                        <div className="text-left">
                            {testimonio.author && (
                                <p className="font-['FamiliarPro'] font-normal text-[20px] leading-[100%] text-black">
                                    {testimonio.author}
                                </p>
                            )}
                            {testimonio.position && (
                                <p className="font-['FamiliarPro'] font-normal text-[16px] leading-[100%] text-black mt-2">
                                    {testimonio.position}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="py-20 bg-[#0361B4]">
            <div className="container mx-auto px-4">
                {/* Grid de 2 columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Columna 1: Heading */}
                    <div>
                        <h2 className="font-['Benn'] font-normal text-[42px] leading-[100%] tracking-normal text-white uppercase break-words align-middle">
                            {heading}
                        </h2>
                    </div>

                    {/* Columna 2: Carrusel de Testimonios */}
                    <div className="relative">
                        {/* Contenedor del carrusel */}
                        <div
                            className="overflow-hidden rounded-[30px] bg-white p-8 md:p-14 min-h-[400px]"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="relative min-h-[400px]">
                                {!isTransitioning && activeTestimonio && (
                                    <div className="h-full min-h-[400px]">
                                        {renderSlideContent(activeTestimonio)}
                                    </div>
                                )}

                                {isTransitioning && activeTestimonio && incomingTestimonio && (
                                    <>
                                        <div
                                            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${outgoingAnimationClass}`}
                                        >
                                            {renderSlideContent(activeTestimonio)}
                                        </div>
                                        <div
                                            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${incomingAnimationClass}`}
                                        >
                                            {renderSlideContent(incomingTestimonio)}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Indicadores fuera de la tarjeta */}
                        <div className="mt-6 flex justify-center gap-3">
                            {testimonios.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-3 w-3 rounded-full transition-opacity ${index === activeIndex ? 'bg-white opacity-100' : 'bg-white/30 opacity-100'}`}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function getLogoSource(testimonio?: TestimonioItem): string | undefined {
    if (!testimonio) return undefined;

    if (typeof testimonio.logo === 'string' && testimonio.logo.trim()) {
        return testimonio.logo;
    }

    if (testimonio.logo && typeof testimonio.logo === 'object') {
        if (typeof testimonio.logo.mediaLink === 'string' && testimonio.logo.mediaLink.trim()) {
            return testimonio.logo.mediaLink;
        }

        if (
            typeof testimonio.logo.attributes?.mediaLink === 'string' &&
            testimonio.logo.attributes.mediaLink.trim()
        ) {
            return testimonio.logo.attributes.mediaLink;
        }
    }

    if (typeof testimonio.mediaLink === 'string' && testimonio.mediaLink.trim()) {
        return testimonio.mediaLink;
    }

    return undefined;
}

function getTestimonioParagraphs(testimonio: TestimonioItem): string[] {
    const groupBlock = testimonio.blocks?.find(
        (block) =>
            block.type === 'core/group' &&
            block.attributes?.metadata?.name === 'contenido_testimonio'
    );

    if (groupBlock?.blocks?.length) {
        const paragraphsFromGroup = groupBlock.blocks
            .filter((block) => block.type === 'core/paragraph')
            .map((block) => (typeof block.content === 'string' ? block.content.trim() : ''))
            .filter(Boolean);

        if (paragraphsFromGroup.length > 0) {
            return paragraphsFromGroup;
        }
    }

    if (typeof testimonio.content === 'string' && testimonio.content.trim()) {
        return testimonio.content
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
    }

    return [];
}

function getTestimonioStars(testimonio: TestimonioItem): string[] {
    const iconBlocks = testimonio.blocks
        ?.flatMap((block) => {
            if (block.type === 'safe-svg/svg-icon') return [block];
            if (block.type === 'core/group' && Array.isArray(block.blocks)) {
                return block.blocks.filter((child) => child.type === 'safe-svg/svg-icon');
            }
            return [];
        })
        .filter(Boolean) || [];

    const stars = iconBlocks
        .map((block) => block.attributes?.metadata?.name)
        .filter((name): name is string => name === 'star' || name === 'starFull');

    if (stars.length > 0) return stars;

    return ['starFull', 'starFull', 'starFull', 'starFull', 'star'];
}
