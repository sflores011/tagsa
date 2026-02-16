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
    const order = ["satisfaccion", "pago", "soluciones", "gestion", "servicio", "entrega"];

    const sortedFeatures = order.map((name) => features.find((feature) => feature.name === name)).filter(Boolean) as FeatureItem[];
    const remainingFeatures = features.filter((feature) => !order.includes(feature.name));
    const finalFeatures = [...sortedFeatures, ...remainingFeatures];

    return (
        <section className="relative w-full lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-15">
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={backgroundImage}
                    alt="Fondo Elegirnos"
                    className="w-full h-full object-cover"
                />

                <div
                    className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.03),rgba(0,0,0,0.03)),linear-gradient(0deg,rgba(3,97,180,0.46),rgba(3,97,180,0.46))] mix-blend-multiply pointer-events-none"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-[1200px]">
                <h2 className="text-4xl md:text-5xl lg:text-[45px] font-['Benn'] font-bold text-center text-white mb-10 uppercase tracking-[0.1em] italic">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {finalFeatures.map((feature, index) => {
                        const name = feature.name;
                        let gridClasses = "col-span-1 row-span-1";
                        let cardStyleClass = "glass-card";

                        if (name === "satisfaccion") {
                            gridClasses = "lg:row-span-2 lg:col-span-1 md:row-span-2";
                        }

                        if (name === "pago") {
                            gridClasses = "lg:col-span-2 md:col-span-2";
                            cardStyleClass = "glass-card glass-card-blur-center";
                        }

                        if (name === "gestion") {
                            cardStyleClass = "glass-card-blue";
                        }

                        if (name === "servicio") {
                            cardStyleClass = "glass-card-blue";
                        }

                        return (
                            <div
                                key={index}
                                className={`${gridClasses} ${cardStyleClass} backdrop-blur-sm rounded-[24px] p-8 flex flex-col justify-end transition-all duration-300 hover:scale-[1.01] relative overflow-hidden group`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-start">
                                    <div className="w-8 h-8 mb-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={feature.iconUrl}
                                            alt={feature.title}
                                            className="w-full h-full object-contain icon-mint"
                                        />
                                    </div>

                                    <h3 className="font-['FamiliarPro'] font-bold text-[22px] text-white mb-3 leading-tight tracking-wide">
                                        {feature.title}
                                    </h3>

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
