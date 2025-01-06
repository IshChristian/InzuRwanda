import React, { ReactNode } from "react";
import Navbar from "../dashboard/layout/navbar";
import Header from "../dashboard/layout/header";
import Footer from "./footer";

interface HomeProps {
  children: ReactNode; // Explicitly type the children prop
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-row w-full p-3 bg-gray-100 h-auto">
      <Navbar />
        <main className="min-h-screen bg-white w-full space-x-5">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
