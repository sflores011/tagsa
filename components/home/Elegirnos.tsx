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

    const order = ['satisfaccion', 'pago', 'soluciones', 'gestion', 'servicio', 'entrega'];

    // Ordenar las características según el orden definido
    const sortedFeatures = order.map(name => features.find(f => f.name === name)).filter(Boolean) as FeatureItem[];

    // Incluir cualquier característica restante que no haya coincidido con el nombre (respaldo)
    const remainingFeatures = features.filter(f => !order.includes(f.name));
    const finalFeatures = [...sortedFeatures, ...remainingFeatures];

    return (
        <section className="relative py-20 overflow-hidden min-h-[800px] flex items-center">
            {/* Imagen de fondo con superposición */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={backgroundImage}
                    alt="Fondo"
                    className="w-full h-full object-cover"
                    style={{
                        boxShadow: '0px 4px 4px 0px #00000040'
                    }}
                />
                {/* Superposición de degradado con especificaciones exactas */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03)), linear-gradient(0deg, rgba(3, 97, 180, 0.46), rgba(3, 97, 180, 0.46))',
                        backgroundBlendMode: 'multiply'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Título principal */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Benn'] font-bold text-center text-white mb-16 uppercase tracking-wider">
                    {title}
                </h2>

                {/* Contenedor de cuadrícula */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                    {finalFeatures.map((feature, index) => {
                        const isSatisfaccion = feature.name === 'satisfaccion';
                        const isPago = feature.name === 'pago';

                        // Calcular clases basadas en el tipo de característica
                        let gridClasses = 'col-span-1';
                        if (isSatisfaccion) gridClasses = 'lg:row-span-2 lg:col-span-1 md:row-span-2';
                        if (isPago) gridClasses = 'lg:col-span-2 md:col-span-2';

                        return (
                            <div
                                key={index}
                                className={`
                                    ${gridClasses}
                                    backdrop-blur-md border border-white/20 
                                    rounded-[20px] p-8 
                                    flex flex-col justify-end
                                `}
                                style={{
                                    background: '#FFFFFF40',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div>
                                    {/* Icono */}
                                    <div className="mb-6 w-[40px] h-[40px]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={feature.iconUrl}
                                            alt={feature.title}
                                            className="w-full h-full object-contain"
                                            style={{
                                                filter: 'brightness(0) saturate(100%) invert(87%) sepia(26%) saturate(1528%) hue-rotate(125deg) brightness(103%) contrast(101%)'
                                            }}
                                        />
                                    </div>

                                    {/* Título */}
                                    <h3 className="font-['FamiliarPro'] font-bold text-[22px] text-white mb-4 leading-tight">
                                        {feature.title}
                                    </h3>

                                    {/* Descripción */}
                                    <p className="font-['FamiliarPro'] text-white/80 text-base leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Decorador para Satisfacción (Estrella) si es necesario, o solo alineación inferior */}
                                {isSatisfaccion && (
                                    <div className="mt-8">
                                        {/* Decoración interna opcional podría ir aquí */}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
