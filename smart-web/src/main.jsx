import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PuffLoader } from "react-spinners";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Members from "./components/Members";
import Video from "./components/Video";
import Footer from "./components/Footer";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000A00]">
        {/* React spinner */}
        <PuffLoader color="#ffffff" size={150} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Members />
      <Video />
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
