import imageee from "../img/6.png";

export default function About() {
    return (
        <div
            id="about"
            className="relative bg-[#000A00] text-white font-[Poppins]
    bg-[linear-gradient(to_right,rgba(28,74,0,0.08)_1.5px,transparent_1px),linear-gradient(to_bottom,rgba(28,74,0,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px]"
        >
            {/* Hero */}
            <section className="text-center px-4 sm:px-7 py-20 md:py-24 relative">
                {/* SMART Project Details */}
                <div className="flex flex-col gap-12 md:gap-16 max-w-6xl mx-auto px-0 sm:px-6">
                    {/* Centered Top Section */}
                    <div data-aos="fade-down" className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-4 tracking-tight">
                            What it is
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            A hackathon project focused on smart agriculture. SMART is an interactive game that helps farmers monitor crop health, manage environmental conditions using IoT devices, and predict crop yield through AI technology.
                        </p>
                    </div>

                    {/* Middle Row: Features Box & Image */}
                    <div id="features-row" className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        {/* Features Box */}
                        <div data-aos="fade-right" data-aos-anchor="#features-row" className="w-full lg:w-1/2 flex flex-col bg-[#001500]/50 p-6 sm:p-8 rounded-2xl border border-[#003305] text-left shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-[#22c55e]/30 transition-colors duration-500">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#22c55e] mb-6 tracking-tight">
                                What it features
                            </h2>
                            <ul className="ml-6 text-gray-300 text-base md:text-lg leading-relaxed space-y-4">
                                <li className="relative before:absolute before:-left-6 before:top-2 before:w-2 before:h-2 before:bg-[#22c55e] before:rounded-full">
                                    A game interface visualizes crop health, soil data, and IoT readings.
                                </li>
                                <li className="relative before:absolute before:-left-6 before:top-2 before:w-2 before:h-2 before:bg-[#22c55e] before:rounded-full">
                                    IoT integration monitors temperature, humidity, and soil conditions in real-time.
                                </li>
                                <li className="relative before:absolute before:-left-6 before:top-2 before:w-2 before:h-2 before:bg-[#22c55e] before:rounded-full">
                                    AI-powered crop disease detection helps identify issues early.
                                </li>
                                <li className="relative before:absolute before:-left-6 before:top-2 before:w-2 before:h-2 before:bg-[#22c55e] before:rounded-full">
                                    Predictive models estimate crop yield based on collected data.
                                </li>
                            </ul>
                        </div>

                        {/* Image */}
                        <div data-aos="fade-left" data-aos-anchor="#features-row" className="w-full lg:w-1/2 flex justify-center">
                            <div className="w-fit h-fit max-w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group hover:border-[#22c55e]/50 transition-colors duration-500">
                                {/* Decorative Background Glows */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#22c55e]/5 blur-[100px] rounded-full mix-blend-screen group-hover:bg-[#22c55e]/10 transition-colors duration-500"></div>
                                <img src={imageee} alt="About Section Image" className="max-w-full h-auto rounded-2xl relative z-10" />
                            </div>
                        </div>
                    </div>

                    {/* Centered Bottom Section */}
                    <div data-aos="fade-up" className="flex flex-col items-center text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-4 tracking-tight">
                            What powers it
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                            <span className="font-semibold text-white">Tech Stack:</span> IoT sensors, Unity gamified simulation, Supabase backend, N8n automation.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}