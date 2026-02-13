import React from 'react';

interface FeatureItem {
    iconUrl: string;
    title: string;
    description: string;
    name: string;
}

interface ElegirnosProps {
    title: string;
    backgroundImage: string;
    features: FeatureItem[];
}

export default function Elegirnos({ title, backgroundImage, features }: ElegirnosProps) {
    // Definir el orden requerido para que el diseño de cuadrícula funcione correctamente
    // Diseño de cuadrícula: 4 columnas
    const order = ['satisfaccion', 'pago', 'soluciones', 'gestion', 'servicio', 'entrega'];

    // Ordenar las características según el orden definido
    const sortedFeatures = order.map(name => features.find(f => f.name === name)).filter(Boolean) as FeatureItem[];

    // Incluir cualquier característica restante que no haya coincidido con el nombre (respaldo)
    const remainingFeatures = features.filter(f => !order.includes(f.name));
    const finalFeatures = [...sortedFeatures, ...remainingFeatures];

    return (
        <section className="relative w-full lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-15">
            {/* 1. Fondo Full Bleed con Overlay */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={backgroundImage}
                    alt="Fondo"
                    className="w-full h-full object-cover"
                />

                {/* Sombra sobre la imagen de fondo (Overlay oscuro sutil) */}
                {/* <div className="absolute inset-0 bg-black/20" /> */}

                {/* Superposición de degradado específico solicitado */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.03),rgba(0,0,0,0.03)),linear-gradient(0deg,rgba(3,97,180,0.46),rgba(3,97,180,0.46))]
      mix-blend-multiply
      pointer-events-none"
                />
            </div>

            <div className="container mx-auto relative z-10 w-full max-w-[1200px]">
                {/* 2. Título "Tech/Condensada" */}
                <h2 className="text-4xl md:text-5xl lg:text-[45px] font-['Benn'] font-bold text-center text-white mb-10 uppercase tracking-[0.1em] italic">
                    {title}
                </h2>

                {/* 3. Grid Layout Exacto (Desktop lg+) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] ">
                    {finalFeatures.map((feature, index) => {
                        const name = feature.name;

                        // Configuración por tarjeta
                        let gridClasses = 'col-span-1 row-span-1'; // Default
                        let cardStyleClass = 'glass-card'; // Default style

                        // A) Izquierda: Satisfacción (Alta)
                        if (name === 'satisfaccion') {
                            gridClasses = 'lg:row-span-2 lg:col-span-1 md:row-span-2';
                        }

                        // B) Fila superior centro: Pago (Ancha)
                        if (name === 'pago') {
                            gridClasses = 'lg:col-span-2 md:col-span-2';
                            cardStyleClass = 'glass-card glass-card-blur-center';
                        }

                        // C) Soluciones (1x1 default) - top right
                        // D) Gestión e informes (Azul intenso)
                        if (name === 'gestion') {
                            cardStyleClass = 'glass-card-blue';
                        }

                        // E) Servicio 24/7 (Azul intenso)
                        if (name === 'servicio') {
                            cardStyleClass = 'glass-card-blue';
                        }

                        // F) Entrega (Default glass) - bottom right

                        return (
                            <div
                                key={index}
                                className={`
                                    ${gridClasses}
                                    ${cardStyleClass}
                                    backdrop-blur-sm
                                    rounded-[24px] p-8
                                    flex flex-col justify-end
                                    transition-all duration-300 hover:scale-[1.01]
                                    relative overflow-hidden group
                                `}
                            >
                                {/* Overlay interno sutil para profundidad */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 pointer-events-none " />

                                <div className="relative z-10 flex flex-col items-start">
                                    {/* Icono Menta/Aqua - Ahora junto al texto */}
                                    <div className="w-8 h-8 mb-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={feature.iconUrl}
                                            alt={feature.title}
                                            className="w-full h-full object-contain icon-mint"
                                        />
                                    </div>

                                    {/* Título Blanco Bold */}
                                    <h3 className="font-['FamiliarPro'] font-bold text-[22px] text-white mb-3 leading-tight tracking-wide">
                                        {feature.title}
                                    </h3>

                                    {/* Descripción Blanco Opacidad */}
                                    <p className="font-['FamiliarPro'] text-white/80 text-[15px] leading-relaxed font-normal">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
