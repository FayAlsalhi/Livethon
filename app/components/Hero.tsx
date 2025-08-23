import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 xl:gap-10 mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="w-full lg:w-1/2 text-center text-right font-[amiri]">
        <div className="space-y-1 mb-1">
          <p className=" text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl leading-relaxed">
            <span className=" text-[#8176AF]">أطلق رؤيتك</span>{" "}
            <span className="text-white">وأصنع ما</span>
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-white leading-relaxed">
            يحدث فرقًا مع
          </p>
        </div>
        <div className="relative -mt-3 sm:-mt-4 md:-mt-4 lg:-mt-8 xl:-mt-10">
          <div className="relative">
            <Image src="/lifethon.svg" alt="Lifethon Logo" width={900} height={240} priority className="mx-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto object-contain select-none pointer-events-none" />
          </div>
        </div>
        <p className="text-white text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-6 leading-relaxed">
          التسجيل متاح من 7 ربيع الآخر وحتى 20 ربيع الآخر 1447 هـ
        </p>
        <Link href="/CRegistration" className="inline-block px-8 sm:px-10 md:px-12 py-2 sm:py-3 bg-gradient-to-r from-[#C0B7E8] to-[#FDCB00] text-[#343045] font-bold text-lg sm:text-xl lg:text-2xl rounded-[40px] hover:scale-105 transition-all duration-300 shadow-lg">
          سجل الآن !
        </Link>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center">
        <div className=" relative   w-44 h-44 sm:w-80 sm:h-80 md:w-86 md:h-86 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] select-none pointer-events-none">
          <Image src="/Flower-mid.svg" alt="Lifethon Flower" width={800} height={800} className="w-full h-full object-contain" />
        </div>
      </div>
    </section>
  );
}


