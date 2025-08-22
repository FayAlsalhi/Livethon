import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

export default function ChooseRegistration() {
  return (
    <div className="min-h-screen bg-[#08070D] text-white relative overflow-hidden font-[amiri]" dir="rtl">
      <div className="absolute -top-2 -right-32 w-[200px] h-[200px] md:w-[250px] md:h-[300px] lg:w-[400px] lg:h-[500px] bg-[#7877C6]/20 rounded-full blur-[100px] md:blur-[120px]"></div>
      <div className="absolute -bottom-48 -left-48 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/15 rounded-full blur-[100px] md:blur-[120px]"></div>

      <div className="relative z-20">
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 lg:p-6">
          <div className="flex gap-1">
            <span><img src="/Flower.svg" alt="Lifethon Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
            <span><img src="/Text.svg" alt="Lifethon Logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
          </div>

          <Link href="/" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 rounded-full border border-gray-600 hover:bg-gray-800/50 transition-colors text-xs sm:text-sm md:text-base lg:text-lg">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">عودة إلى تفاصيل الهاكثون</span>
            <ChevronLeft size={20} className="-mr-1" />
          </Link>
        </div>

        <div className="flex flex-col items-center px-3 sm:px-4 md:px-6 pb-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <p className="text-[#DFDFDF] mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl">
              مرحبًا بك في عالم
            </p>
            <div className="flex justify-center">
              <img
                src="/lifethon.svg"
                alt="Lifethon Logo"
                className="mx-auto w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[26rem] object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          <div
            className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-4xl xl:max-w-6xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)',
              borderRadius: 'clamp(24px, 6vw, 48px)',
              boxShadow: '0 4px 80px 0 rgba(255, 255, 255, 0.1)',
              padding: 'clamp(16px, 3vw, 48px)',
              backdropFilter: 'blur(10px)'
            }}
          >
            
            <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h2 className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ">
                قبل ما تبدأ رحلتك معنا، فيه شوية نقاط مهمة نحب نذكرك فيها:
              </h2>
              <ol className="list-decimal list-inside text-gray-300 space-y-1 sm:space-y-2 md:space-y-3 text-md sm:text-lg md:text-2xl lg:text-2xl xl:text-3xl pr-5  md:pr-20 lg:pr-30  xl:pr-40 text-right">
                <li>المشاركة متاحة للجميع، مع حد معيّن لعدد أعضاء الفريق أو التسجيل الفردي.</li>
                <li>الطلبات تُراجع بدقّة لضمان العدالة لكل المشاركين.</li>
                <li>تأكد من معلوماتك قبل الإرسال، ما راح يكون فيه تعديل بعد التسجيل.</li>
                <li>التسجيل مرة واحدة كافي، وإعادة التسجيل قد يعرّضك للإقصاء.</li>
              </ol>
              <p className="text-center mt-10 text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl bg-[#FBEEBD] bg-clip-text text-transparent" style={{ textShadow: '0 0 10px rgba(255, 254, 249, 0.49)', fontFamily: 'Adobe Arabic, Arial' }}>
                اختر طريقتك في المنافسة — فردي؟ أو مع فريق يشاركك الشغف؟
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <Link href="/registration-team" className="group">
                <div className="rounded-[30px] p-6 sm:p-8 text-center transition-all duration-300 border-3 border-white/10 group-hover:border-white/30 opacity-80  hover:opacity-100 transition-opacity duration-300"  style={{ background: 'linear-gradient(180deg, rgba(53,50,70,0.95) 0%, rgba(62,58,81,0.85) 100%)', boxShadow: '0 4px 60px 0 rgba(255,255,255,0.06)' }}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-1">تسجيل فريق</h3>
                  <div className="mx-auto  flex items-center justify-center"><img src="/team Icon.svg" alt="team icon" className="w-20 h-20 sm:w-28 sm:h-28  md:w-38 md:h-38 lg:w-50 lg:h-50 xl:w-58 xl:h-58  flex items-center justify-center  " /></div>
                </div>
              </Link>

              <Link href="/registration" className="group">
                <div className="rounded-[30px] p-6 sm:p-8 text-center transition-all duration-300 border-3 border-white/10 group-hover:border-white/30 opacity-70  hover:opacity-80 transition-opacity duration-300"  style={{ background: 'linear-gradient(180deg, rgba(53,50,70,0.95) 0%, rgba(62,58,81,0.85) 100%)', boxShadow: '0 4px 60px 0 rgba(255,255,255,0.06)' }}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-1">تسجيل فردي</h3>
                  <div className="mx-auto  flex items-center justify-center opacity-50"><img src="/lonely Iconl.svg" alt="team icon" className="w-15 h-20 sm:w-22 sm:h-28  md:w-28 md:h-38 lg:w-38 lg:h-50 xl:w-40 xl:h-58  flex items-center justify-center  " /></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


