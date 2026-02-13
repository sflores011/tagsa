import React from 'react';

interface PasoItem {
    number: string;
    description: string;
    title: string;
    name: string;
}

interface ProcesoProps {
    title: string;
    coverImage: string;
    pasos: PasoItem[];
}

export default function Proceso({ title, coverImage, pasos }: ProcesoProps) {
    // Ordenar los pasos según el orden definido
    const order = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5'];
    const sortedPasos = order
        .map(name => pasos.find(p => p.name === name))
        .filter(Boolean) as PasoItem[];

    // Dividir los pasos en dos grupos
    const pasosPrimeraColumna = sortedPasos.slice(0, 3); // paso1, paso2, paso3
    const pasosTerceraColumna = sortedPasos.slice(3, 5); // paso4, paso5

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Layout Flex con anchos porcentuales: 25% - 50% - 25% */}
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    {/* Columna 1: Pasos 1-3 (25% ancho) */}
                    <div className="flex flex-col gap-12 w-full lg:w-[25%] shrink-0">
                        {pasosPrimeraColumna.map((paso, index) => (
                            <div
                                key={`col1-${index}`}
                                className="flex flex-col items-start gap-4"
                            >
                                {/* Número H5 */}
                                <div
                                    className="px-[15px] py-[10px] rounded-[100px] bg-[#0361B4] flex items-center justify-center min-w-[45px] h-[45px]"
                                >
                                    <h5 className="font-['Benn'] font-normal text-[20px] leading-[100%] tracking-[0%] text-white m-0">
                                        {paso.number}
                                    </h5>
                                </div>

                                <div>
                                    {/* Título H3 */}
                                    <h3 className="font-['FamiliarPro'] font-bold text-[20px] leading-[100%] tracking-[0%] text-[#0361B4] mb-2">
                                        {paso.title}
                                    </h3>

                                    {/* Párrafo Descripción */}
                                    {paso.description && (
                                        <p className="font-['FamiliarPro'] font-normal text-[20px] leading-[100%] tracking-[0%] text-gray-700">
                                            {paso.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Columna 2: Cover Image con título (50% ancho - Protagonista) */}
                    <div className="relative overflow-hidden flex items-center justify-center min-h-[600px] flex-col justify-end w-full lg:w-[50%]"
                        style={{
                            borderRadius: '22px',
                        }}
                    >
                        {/* Imagen de fondo */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={coverImage}
                            alt="Proceso de compra"
                            className="absolute inset-0 w-full h-full object-cover object-right"
                        />

                        {/* Gradient Overlay */}
                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background: 'linear-gradient(180deg, rgba(3, 97, 180, 0) 52.71%, #0361B4 94.77%)'
                            }}
                        />

                        {/* Contenido centrado */}
                        <div className="relative z-20 p-[40px] w-full h-full flex items-center justify-start">
                            <h2 className="font-['Benn'] font-normal text-[55px] leading-[100%] tracking-[0%] text-white text-left uppercase italic text-balance">
                                {title}
                            </h2>
                        </div>
                    </div>

                    {/* Columna 3: Pasos 4-5 (25% ancho) */}
                    <div className="flex flex-col gap-12 w-full lg:w-[25%] shrink-0">
                        {pasosTerceraColumna.map((paso, index) => (
                            <div
                                key={`col3-${index}`}
                                className="flex flex-col items-start gap-4"
                            >
                                {/* Número H5 */}
                                <div
                                    className="px-[15px] py-[10px] rounded-[100px] bg-[#0361B4] flex items-center justify-center min-w-[45px] h-[45px]"
                                >
                                    <h5 className="font-['Benn'] font-normal text-[20px] leading-[100%] tracking-[0%] text-white m-0">
                                        {paso.number}
                                    </h5>
                                </div>

                                <div>
                                    {/* Título H3 */}
                                    <h3 className="font-['FamiliarPro'] font-bold text-[20px] leading-[100%] tracking-[0%] text-[#0361B4] mb-2">
                                        {paso.title}
                                    </h3>
                                    {/* Párrafo Descripción */}
                                    {paso.description && (
                                        <p className="font-['FamiliarPro'] font-normal text-[20px] leading-[100%] tracking-[0%] text-gray-700">
                                            {paso.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
