interface HeroProps {
    backgroundImageUrl?: string;
    title: string;
    description: string;
}

export default function Hero({ backgroundImageUrl, title, description }: HeroProps) {
    return (
        <section className="relative w-full h-[78vh] overflow-hidden">
            {backgroundImageUrl && (
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={backgroundImageUrl}
                        alt={title || "Nosotros hero background"}
                        className="w-full h-full object-cover object-center"
                    />

                    <div
                        className="absolute bottom-0 left-0 right-0 z-10"
                        style={{
                            height: "75%",
                            background: "linear-gradient(to top, #0361B4 0%, rgba(3, 97, 180, 0.8) 40%, transparent 100%)"
                        }}
                    />

                    <div className="absolute inset-0 bg-black/10 z-0" />
                </div>
            )}

            <div className="relative z-20 h-full flex items-center justify-center text-center px-4 pt-20">
                <div className="w-full max-w-[900px] text-white">
                    <h1
                        className="font-[Benn] font-normal uppercase tracking-wider leading-none mb-6 text-4xl md:text-5xl lg:text-[45px]"
                    >
                        {title}
                    </h1>
                    <p className="text-white leading-relaxed text-[18px] font-normal">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
