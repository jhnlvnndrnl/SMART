import { useEffect, useState, useRef } from 'react';
import Carlos from '../img/1.png';
import John from '../img/5.png';
import Latrell from '../img/2.png';
import Matthew from '../img/3.png';
import JohnNesty from '../img/4.png';

export default function Members() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef(null);

    const members = [
        { id: 1, name: "John Elvin S. Endrenal", desc: "Pamantasan ng Lungsod ng San Pablo : BSCpE : Team Lead", image: John },
        { id: 2, name: "Latrell Mirby B. Cruz", desc: "Laguna State Polytechnic University : BSIT : Frontend", image: Latrell },
        { id: 3, name: "John Nesty D. Bautista", desc: "Laguna State Polytechnic University : BSCS : Hardware", image: JohnNesty },
        { id: 4, name: "Matthew A. Manalang", desc: "Laguna State Polytechnic University : BSIT : Database", image: Matthew },
        { id: 5, name: "Carlos James B. Alanano", desc: "Laguna State Polytechnic University : BSCS : Backend", image: Carlos },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Calculate how far the container is scrolled into view (0 to 1)
                // Start tracking when top of container hits middle of screen
                // End tracking when bottom of container hits middle of screen
                const scrollableDistance = rect.height;
                const scrolled = (windowHeight / 2) - rect.top;

                let progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            id="members"
            className="relative bg-[#000A00] text-white font-[Poppins]
    bg-[linear-gradient(to_right,rgba(28,74,0,0.08)_1.5px,transparent_1px),linear-gradient(to_bottom,rgba(28,74,0,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px]"
        >
            <section className="px-4 sm:px-7 py-20 md:py-24 max-w-5xl mx-auto relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#22c55e] mb-12 md:mb-16 tracking-tight text-center">
                    The Team
                </h2>

                <div className="relative pl-6 sm:pl-8 md:pl-16" ref={containerRef}>
                    {/* Background Timeline track */}
                    <div className="absolute left-[11px] sm:left-[15px] md:left-[31px] top-6 bottom-6 w-1 bg-white/10 rounded-full"></div>

                    {/* Animated Timeline Progress Line */}
                    <div
                        className="absolute left-[11px] sm:left-[15px] md:left-[31px] top-6 w-1 bg-[#22c55e] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300 ease-out"
                        style={{ height: `calc(${scrollProgress * 100}% - 48px)` }}
                    ></div>

                    {/* Member Entries */}
                    <div className="flex flex-col gap-16 md:gap-24">
                        {members.map((member, index) => {
                            // Calculate if this item has been reached by the scroll progress timeline
                            // Since items are evenly spaced, we can estimate based on index
                            const itemProgressThreshold = (index / (members.length - 1)) * 0.9;
                            const isActive = scrollProgress >= itemProgressThreshold;

                            return (
                                <div key={member.id} className="relative flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 md:gap-12 group">
                                    {/* Timeline Node dot */}
                                    <div
                                        className={`absolute -left-[21px] sm:-left-[25px] md:-left-[41px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 w-5 h-5 rounded-full border-4 border-[#000A00] z-10 transition-colors duration-500
                                        ${isActive ? 'bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-gray-600'}`}
                                    ></div>

                                    {/* Image Box */}
                                    <div className="w-full sm:w-2/5 shrink-0 flex justify-center">
                                        <div className={`w-full max-w-[280px] sm:max-w-none aspect-[4/3] rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-700
                                            ${isActive ? 'bg-white/10 border-[#22c55e]/50 shadow-[0_0_20px_rgba(34,197,94,0.15)] transform translate-y-0 opacity-100' : 'bg-white/5 opacity-50 translate-y-8'}`}
                                        >
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Descriptive Text Box */}
                                    <div className={`w-full sm:w-3/5 text-center sm:text-left transition-all duration-700 delay-100
                                                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    >
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-2 sm:mb-3">{member.name}</h3>
                                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                                            {member.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}