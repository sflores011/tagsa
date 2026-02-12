interface Stat {
    value: string;
    label: string;
}

interface HeroProps {
    backgroundImageUrl?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
    stats?: Stat[];
}

import Link from 'next/link';

export default function Hero({ backgroundImageUrl, title, description, buttonText, buttonUrl, stats }: HeroProps) {
    return (
        <section className="relative w-full min-h-[125vh] flex flex-col overflow-hidden">
            {/* Background Image Container - Covers entire section */}
            {backgroundImageUrl && (
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={backgroundImageUrl}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    {/* Emulate fading from solid blue at bottom to transparent at ~40% height */}
                    <div
                        className="absolute bottom-0 left-0 right-0 z-10"
                        style={{
                            height: '50%',
                            background: 'linear-gradient(to top, #0361B4 5%, rgba(3, 97, 180, 0.8) 40%, transparent 100%)'
                        }}
                    />

                    {/* Full dark overlay for contrast if needed */}
                    <div className="absolute inset-0 bg-black/10 z-0" />
                </div>
            )}

            {/* Main Content (Title/Desc) - Centered between Header and Stats */}
            <div className="container mx-auto px-4 z-20 relative flex-grow flex flex-col justify-center pt-20">
                <div className="w-full md:w-[78%] text-white">
                    <h1
                        className="uppercase tracking-wider mb-6 leading-none drop-shadow-lg"
                        style={{
                            fontFamily: 'Benn, sans-serif',
                            fontWeight: 400,
                            fontSize: '70px'
                        }}
                    >
                        {title}
                    </h1>
                    <p className="mb-8 text-white leading-relaxed drop-shadow-md max-w-[88%] text-[25px] font-normal">
                        {description}
                    </p>

                    {buttonText && (
                        <Link
                            href={buttonUrl || '#'}
                            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-[15px] shadow-lg hover:bg-[#0361B4] hover:text-white transition-transform transform"
                        >
                            {buttonText}
                        </Link>
                    )}
                </div>
            </div>

            {/* Stats Section - Overlaying the bottom gradient area */}
            {stats && stats.length > 0 && (
                <div className="relative z-20 w-full text-white pb-20 pt-4">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-start">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <h4 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">{stat.value}</h4>
                                    <p className="text-base md:text-lg font-bold text-white">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
