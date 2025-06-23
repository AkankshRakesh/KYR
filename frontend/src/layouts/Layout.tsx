// src/Layout.tsx
import { useState } from 'react';
import About from "../components/About";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ChatModal from '../components/ChatModal';
import FloatingChatButton from '../components/FloatingChat';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" id='nodiv'>
      <Header />
      <Hero />
      <main className="flex-grow container mx-auto px-6 py-2">
        <About />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-6">
        © 2025 KYR. All rights reserved.
      </footer>
      <div className="fixed bottom-8 right-7 flex items-center justify-center"> {/* Adjusted right value to move the button */}
        <div className="absolute w-24 h-24 bg-[#d42755] rounded-full animate-pulse -translate-x-1/4 translate-y-[-20px]" /> {/* Adjusted translate-x */}
        <FloatingChatButton onClick={handleOpenChat} />
      </div>

      <ChatModal isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
};

export default Layout;
