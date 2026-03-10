export default function Video() {
    return (
        <div
            className="relative bg-[#000A00] text-white font-[Poppins]
    bg-[linear-gradient(to_right,rgba(28,74,0,0.08)_1.5px,transparent_1px),linear-gradient(to_bottom,rgba(28,74,0,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px]"
        >
            {/* Hero */}
            <section className="text-center px-4 sm:px-7 py-20 md:py-24 relative">
                {/* Video */}
                <div className="justify-center items-center gap-8 px-0 sm:px-6 max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold text-[#22c55e] mb-15 tracking-tight">
                        Video Demonstration
                    </h2>

                    {/* YouTube Video */}
                    <div className="w-full sm:w-[90%] md:w-3/4 lg:w-2/3 xl:w-1/2 aspect-video mx-auto">
                        <iframe
                            className="w-full h-full rounded-xl sm:rounded-2xl"
                            src="https://www.youtube.com/embed/ljN4ZShlOCI"
                            title="YouTube video player"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}