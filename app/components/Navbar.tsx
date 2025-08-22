"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";
import Image from "next/image";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleNavClick = () => {
    const header = document.querySelector('header');
    if (header) {
      header.classList.add('active');
    }
    setMobileNavOpen(false);
  };

  return (
    <header className="relative flex flex-row justify-between items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-4 lg:p-4" role="navigation" aria-label="الرئيسية">
      {/* Logo Section */}
      <div className="flex gap-1 sm:gap-1 h-full items-center">
        <span>
          <Image
            src="/Flower.svg"
            alt="Lifethon Flower"
            width={80}
            height={80}
            priority
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 object-contain select-none pointer-events-none"
          />
        </span>
        <span>
          <Image
            src="/Text.svg"
            alt="Lifethon Text"
            width={120}
            height={120}
            priority
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-26 lg:h-26 xl:w-30 xl:h-30 object-contain select-none pointer-events-none"
          />
        </span>
      </div>

      {/* Navigation - Center */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm md:text-base lg:text-lg xl:text-xl absolute left-1/2 inset-y-0 -translate-x-1/2">
        <Link href="#about" onClick={handleNavClick} className="text-white hover:text-gray-300 transition-colors font-medium">
          حول الهاكثون
        </Link>
        <Link href="#participation" onClick={handleNavClick} className="text-white hover:text-gray-300 transition-colors font-medium">
          المشاركة
        </Link>
        <Link href="#timeline" onClick={handleNavClick} className="text-white hover:text-gray-300 transition-colors font-medium">
          الجدول الزمني
        </Link>
        <Link href="#faq" onClick={handleNavClick} className="text-white hover:text-gray-300 transition-colors font-medium">
          الأسئلة الشائعة
        </Link>
      </nav>

      {/* Buttons - Right Side */}
      <div className="flex gap-2 sm:gap-3 items-center">
        <Link
          href="#ertwaa"
          className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 border border-[#7877C6] text-white rounded-4xl hover:bg-[#7877C6]/20 transition-colors ring-1 ring-[#8176AF] text-xs sm:text-sm md:text-base"
        >
          عضو إرتواء؟
        </Link>
        <Link
          href="/CRegistration"
          className="px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2 bg-gradient-to-r from-[#C0B7E8] to-[#FDCB00] text-[#343045] font-bold rounded-full hover:scale-105 transition-all duration-300 text-sm sm:text-base md:text-xl "
        >
          التسجيل
        </Link>
        <button
          aria-label="فتح القائمة"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((v) => !v)}
          className="md:hidden p-2 rounded-full border border-white/20 text-white hover:bg-white/10 "
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileNavOpen && (
        <div className="md:hidden absolute left-3 top-full z-50">
          <div className="mt-2 rounded-2xl p-3 flex flex-col items-stretch bg-[#7877C6]/15 divide-y divide-white/30">
            <Link href="#about" onClick={handleNavClick} className="block w-full text-white text-base px-4 py-2 ">
              حول الهاكثون
            </Link>
            <Link href="#participation" onClick={handleNavClick} className="block w-full text-white text-base px-4 py-2 ">
              المشاركة
            </Link>
            <Link href="#timeline" onClick={handleNavClick} className="block w-full text-white text-base px-4 py-2 ">
              الجدول الزمني
            </Link>
            <Link href="#faq" onClick={handleNavClick} className="block w-full text-white text-base px-4 py-2 ">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


