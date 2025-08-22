export default function Sponsors() {
  return (
    <section className="mb-12 sm:mb-16 lg:mb-24 px-4">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-400 font-[amiri]">
        الجهات المنظمة و الداعمة
      </h3>
      <div className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-8 flex-wrap">
        <div className="text-center">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gradient-to-r from-[#7877C6] to-[#FDCB00] rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xs sm:text-sm font-[amiri]">إرتواء</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-[amiri]">الجهة المنظمة</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gradient-to-r from-[#C0B7E8] to-[#FFD230] rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xs sm:text-sm font-[amiri]">شركاء تقنيون</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-[amiri]">دعم تقني</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gradient-to-r from-[#7877C6] to-[#FDCB00] rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xs sm:text-sm font-[amiri]">شركاء استثماريون</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-[amiri]">دعم استثماري</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gradient-to-r from-[#C0B7E8] to-[#FFD230] rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xs sm:text-sm font-[amiri]">جامعات</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-[amiri]">دعم أكاديمي</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gradient-to-r from-[#7877C6] to-[#FDCB00] rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xs sm:text-sm font-[amiri]">شركات ناشئة</span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm font-[amiri]">دعم ريادي</p>
        </div>
      </div>
    </section>
  );
}


