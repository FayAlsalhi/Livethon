import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function TeamInfo() {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-24 py-12 relative">
      <div className="text-center relative max-w-4xl mx-auto px-2">
        <div className="relative inline-block">
          <Image
            src="/mous.svg"
            alt="pointer"
            width={128}
            height={128}
            className="absolute -top-12 -right-20 sm:-top-15 sm:-right-24 md:-top-14 md:-right-28 lg:-top-16 lg:-right-36 xl:-top-18 xl:-right-34 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 select-none pointer-events-none"
          />
          <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-white mb-3 sm:mb-4">
            100 فريق
          </h3>
        </div>
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10">كل فريق مكون من 3 الى 5 أعضاء .</p>
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <ChevronDown className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 text-purple-300 opacity-30 -mb-12 sm:-mb-16 md:-mb-20 lg:-mb-24 xl:-mb-28" />
          <ChevronDown className="w-18 h-18 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 text-purple-300 opacity-60 -mb-14 sm:-mb-18 md:-mb-22 lg:-mb-26 xl:-mb-30" />
          <ChevronDown className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 text-purple-300 opacity-90 -mb-6 sm:-mb-8 md:-mb-10 lg:-mb-10 xl:-mb-12" />
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-[#FFD230] mb-3">فقط 50 فريق</h3>
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-6">
          بعد الفرز الأولي <span className="text-[#FFD230]">يتأهل</span> لحضور الهاكثون
        </p>
      </div>
    </section>
  );
}


