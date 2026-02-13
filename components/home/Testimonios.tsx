'use client';

import React, { useState } from 'react';

interface TestimonioItem {
    content: string;
    author?: string;
    position?: string;
}

interface TestimoniosProps {
    heading: string;
    testimonios: TestimonioItem[];
}

export default function Testimonios({ heading, testimonios }: TestimoniosProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Navegación del carrusel
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonios.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonios.length) % testimonios.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Grid de 2 columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Columna 1: Heading */}
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            {heading}
                        </h2>
                    </div>

                    {/* Columna 2: Carrusel de Testimonios */}
                    <div className="relative">
                        {/* Contenedor del carrusel */}
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-12 min-h-[300px]">

                            {/* Testimonios */}
                            <div className="relative">
                                {testimonios.map((testimonio, index) => (
                                    <div
                                        key={index}
                                        className={`transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                            }`}
                                    >
                                        {/* Icono de comillas */}
                                        <div className="text-6xl text-blue-600 mb-4 font-serif">"</div>

                                        {/* Contenido del testimonio */}
                                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                                            {testimonio.content}
                                        </p>

                                        {/* Autor y posición (si existen) */}
                                        {testimonio.author && (
                                            <div className="mt-6">
                                                <p className="font-bold text-gray-900">
                                                    {testimonio.author}
                                                </p>
                                                {testimonio.position && (
                                                    <p className="text-sm text-gray-600">
                                                        {testimonio.position}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Botones de navegación */}
                            <div className="flex items-center justify-between mt-8">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg"
                                    aria-label="Testimonio anterior"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                {/* Indicadores de diapositivas */}
                                <div className="flex gap-2">
                                    {testimonios.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                                ? 'bg-blue-600 w-8'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Ir al testimonio ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg"
                                    aria-label="Siguiente testimonio"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
