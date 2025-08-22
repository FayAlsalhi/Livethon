import { MapPin } from "lucide-react";

export default function EventDetails() {
  return (
    <section className="mb-6 sm:mb-16 lg:mb-24">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
        <div
          className="p-6 sm:p-8 rounded-[20px] sm:rounded-[30px] text-right"
          style={{
            background:
              "linear-gradient(180deg, rgba(159, 149, 198, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 86.9px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          <h4 className="text-[#8176AF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            الفئة المستهدفة:
          </h4>
          <p className="text-white text-md sm:text-lg md:text-xl lg:text-2xl mb-1">طلاب & خريجون & موظفون</p>
          <p className="text-gray-300 text-sm sm:text-lg md:text-xl lg:text-2xl">لايفثون متاح للجميع.</p>
        </div>

        <div
          className="relative p-6 sm:p-8 rounded-[20px] sm:rounded-[30px] text-right"
          style={{
            background:
              "linear-gradient(180deg, rgba(159, 149, 198, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 86.9px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          <h4 className="text-[#8176AF] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">الهاكثون حضوري</h4>
          <p className="text-white text-md sm:text-lg md:text-xl lg:text-2xl mt-1">الموقع:</p>
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/80">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}


