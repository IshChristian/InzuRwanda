import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface HomeProps {
  children: ReactNode; // Explicitly type the children prop
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <>
      <Navbar />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      <Footer />
    </>
  );
};

export default Home;
