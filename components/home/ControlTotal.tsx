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
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#004e92] mb-4">
                        {mainTitle}
                    </h2>
                    <p className="text-gray-600 max-w-4xl text-lg">
                        {mainDescription}
                    </p>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    {/* Left Image Column (66%) */}
                    <div className="w-full md:w-2/3">
                        <div className="h-full relative overflow-hidden rounded-lg shadow-lg min-h-[400px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageSrc}
                                alt="Control Total"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Content Column (33%) */}
                    <div className="w-full md:w-1/3 flex flex-col justify-center bg-gray-50 p-8 rounded-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {subTitle}
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {subDescription}
                        </p>

                        {buttonText && (
                            <Link
                                href={buttonUrl || '#'}
                                className="inline-block text-center bg-[#004e92] text-white font-semibold py-3 px-6 rounded hover:bg-[#003B73] transition-colors"
                            >
                                {buttonText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
