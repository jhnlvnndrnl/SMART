export default function Footer() {
    return (
        <div
            className="relative bg-[#000A00] text-white font-[Poppins]
    bg-[linear-gradient(to_right,rgba(28,74,0,0.08)_1.5px,transparent_1px),linear-gradient(to_bottom,rgba(28,74,0,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px]"
        >
            <section className="text-center px-4 sm:px-7 py-20 md:py-24 relative">
                <div className="flex flex-col gap-12 md:gap-16 max-w-6xl mx-auto px-0 sm:px-6">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <h2 className="text-lg md:text-xl font-bold text-[#22c55e] mb-2 tracking-tight">
                            Sustainable Monitoring and Agricultural Resource Technology
                        </h2>
                        <p className="text-gray-300 text-base md:text-s leading-relaxed opacity-60">
                            University of the Philippines Los Baños <br></br>
                            <a href="https://www.facebook.com/acss.til" target="_blank">
                                The Innovation Lab Hackathon 2026
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}