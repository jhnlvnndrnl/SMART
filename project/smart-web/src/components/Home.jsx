import { useEffect, useState } from "react";

export default function Home() {
    const words = ["Notepad++", "The Innovation Lab"];
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let typingSpeed = isDeleting ? 60 : 230;
        let timeout;

        if (!isDeleting && charIndex === currentWord.length) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setText(
                    currentWord.substring(0, charIndex + (isDeleting ? -1 : 1))
                );
                setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
            }, typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    return (
        <div
            className="relative min-h-screen flex flex-col justify-center bg-[#000A00] text-white font-[Poppins]
    bg-[linear-gradient(to_right,rgba(28,74,0,0.08)_1.5px,transparent_1px),linear-gradient(to_bottom,rgba(28,74,0,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px] z-10"
        >
            {/* Hero */}
            <section className="text-center px-4 sm:px-7 py-20 md:py-24 relative w-full flex flex-col items-center">
                {/* Typing Effect */}
                <h1 className="text-xl sm:text-2xl mt-20 md:text-4xl font-bold text-gray-300 bg-clip-text mb-6 md:mb-9">
                    {text}
                    <span className="inline-block animate-blink font-medium">_</span>
                </h1>

                <div className="relative inline-block w-full">
                    <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-300 mb-4 break-words px-2">
                        S.M.A.R.T
                    </h1>
                </div>

                <p className="max-w-2xs mx-auto text-m md:max-w-xs text-base text-gray-300 leading-relaxed mb-20">
                    Sustainable Monitoring and Agricultural Resource Technology
                </p>

                {/* Scroll Down Indicator */}
                <div className="relative flex justify-center w-full animate-bounce">
                    <a href="#about" className="text-gray-400 hover:text-[#22c55e] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    );
}