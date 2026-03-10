import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 z-50 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
            <nav
                className={`bg-transparent md:bg-[#000501]/50 md:backdrop-blur-md rounded-b-xl px-4 md:px-6 py-4 flex justify-between items-center
        md:border md:border-[#003305]`}
            >
                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-40 font-semibold text-white justify-center w-full">
                    <li><a href="https://drive.google.com/file/d/1TRgVQRRnJ6yPn64BYZ2zsv5ag-BD4LgK/view?usp=sharing" target="_blank">Proposal</a></li>
                    <li><a href="https://www.figma.com/design/gz2hnt8N9lKlkPqFWxjLlM/SMART?node-id=0-1&p=f&t=bR6diEZPrU8NPIlN-0" target="_blank">Figma</a></li>
                    <li>
                        <a href="https://github.com/jhnlvnndrnl/SMART" target="_blank">
                            Github
                        </a>
                    </li>
                </ul>

                {/* Burger Button */}
                <div
                    className="md:hidden text-white text-2xl cursor-pointer border border-[#003305] rounded-full p-2 ml-auto relative"
                    onClick={toggleMenu}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}

                    {/* Mobile Menu */}
                    {isOpen && (
                        <ul className="absolute right-0 top-full mt-2 bg-[#000501] border border-[#003305] rounded-xl px-6 py-4 flex flex-col gap-3 font-semibold text-white text-base shadow-lg min-w-[200px] z-50">
                            <li><a href="https://drive.google.com/file/d/1TRgVQRRnJ6yPn64BYZ2zsv5ag-BD4LgK/view?usp=sharing" target="_blank" className="hover:text-[#22c55e] transition-colors" onClick={toggleMenu}>Proposal</a></li>
                            <li><a href="https://www.figma.com/design/gz2hnt8N9lKlkPqFWxjLlM/SMART?node-id=0-1&p=f&t=bR6diEZPrU8NPIlN-0" className="hover:text-[#22c55e] transition-colors" target="_blank" onClick={toggleMenu}>Figma</a></li>
                            <li><a href="https://github.com/jhnlvnndrnl/SMART" className="hover:text-[#22c55e] transition-colors" target="_blank" onClick={toggleMenu}>Github</a></li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
}