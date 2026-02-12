import Link from 'next/link';

interface ControlTotalProps {
    mainTitle: string;
    mainDescription: string;
    imageSrc: string;
    subTitle: string;
    subDescription: string;
    buttonText: string;
    buttonUrl: string;
}

export default function ControlTotal({
    mainTitle,
    mainDescription,
    imageSrc,
    subTitle,
    subDescription,
    buttonText,
    buttonUrl
}: ControlTotalProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12 text-center max-w-[1200px] mx-auto">
                    <h2 className="font-['Benn'] text-[40px] leading-none text-center mb-4 bg-[linear-gradient(90deg,#0361B4_0%,#2797D2_50%,#0361B4_100%)] bg-clip-text text-transparent inline-block">
                        {mainTitle}
                    </h2>
                    <p className="font-['FamiliarPro'] text-[20px] leading-none text-black text-center max-w-4xl mx-auto">
                        {mainDescription}
                    </p>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                    {/* Left Image Column */}
                    <div className="w-full md:w-1/2">
                        <div className="relative overflow-hidden rounded-[22px] w-full h-auto aspect-[840/485]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageSrc}
                                alt="Control Total"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Content Column */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-start pl-4">
                        <h3 className="font-['FamiliarPro'] font-bold text-[40px] leading-none text-black uppercase mb-4">
                            {subTitle}
                        </h3>
                        <p className="font-['FamiliarPro'] text-[20px] leading-none text-black mb-8">
                            {subDescription}
                        </p>

                        {buttonText && (
                            <Link
                                href={buttonUrl || '#'}
                                className="flex items-center justify-center w-[128px] h-[52px] rounded-[15px] bg-[linear-gradient(90deg,#0361B4_0%,#2FAFE6_56.25%,#0361B4_100%)] text-white hover:bg-[#0361B4] hover:text-white transition-all duration-300"
                                style={{ padding: '16px 30px' }}
                            >
                                <span className="font-['FamiliarPro'] text-sm font-bold">
                                    {buttonText}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
