import { Rocket, Users, Hammer, DollarSign, Trophy } from "lucide-react";

export default function Benefits() {
  return (
    <section id="participation" className="mb-12 sm:mb-16 lg:mb-24 relative overflow-hidden">
      <img src="/side.svg" alt="decorative" className="hidden md:block absolute left-0 top-0 h-full w-auto opacity-60 select-none pointer-events-none" />
      <div className="text-center max-w-4xl mx-auto px-4">
        <h3 className=" py-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-12 sm:mb-16 text-[#FFD230] font-[amiri] ">
          ماذا ستستفيد من المشاركة ؟
        </h3>
        <div className="space-y-8 sm:space-y-12">
          <div className="flex flex-row-reverse items-center justify-center gap-6 sm:gap-8">
            <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl leading-relaxed text-right">
              تطوير مهاراتك في التقنية<br/>والاستثمار والعرض .
            </p>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#514E6B' }}>
              <Rocket className="w-18 h-18 sm:w-28 sm:h-28 md:w-34 md:h-34 text-white" />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center justify-center gap-6 sm:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#8A8644' }}>
              <Users className="w-18 h-18 sm:w-28 sm:h-28 md:w-34 md:h-34 text-white" />
            </div>
            <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl leading-relaxed text-right">
              التفاعل المباشر مع دربين<br/>وخبراء في المجال .
            </p>
          </div>
          <div className="flex flex-row-reverse items-center justify-center gap-6 sm:gap-8">
            <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl leading-relaxed text-right">
              فرصة لعرض مشروعك امام<br/>لجنة تحكيم محترفة .
            </p>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#514E6B' }}>
              <Hammer className="w-18 h-18 sm:w-28 sm:h-28 md:w-34 md:h-34 text-white" />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center justify-center gap-6 sm:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#8A8644' }}>
              <DollarSign className="w-18 h-18 sm:w-28 sm:h-28 md:w-34 md:h-34 text-white" />
            </div>
            <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl leading-relaxed text-right">
              إمكانية الفوز بدعم<br/>أو تمويل لمشروعك .
            </p>
          </div>
          <div className="flex flex-row-reverse items-center justify-center gap-6 sm:gap-8">
            <p className="text-gray-200 text-xl sm:text-2xl md:text-3xl leading-relaxed text-right">
              فرصة لعرض مشروعك امام<br/>لجنة تحكيم محترفة .
            </p>
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#514E6B' }}>
              <Trophy className="w-18 h-18 sm:w-28 sm:h-28 md:w-34 md:h-34 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


