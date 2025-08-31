import { FileText, Megaphone, Users, Puzzle, Presentation, Trophy, Vote } from "lucide-react";

export default function Steps() {
  const steps = [
    { icon: FileText, text: "التسجيل في<br/>الموقع ." },
    { icon: Megaphone, text: "إعلان نتائج<br/>القبول ." },
    { icon: Users, text: "حضور الجلسات<br/>الحوارية والورش ." },
    { icon: Puzzle, text: "العمل على تنفيذ<br/>النموذج الأولي ." },
    { icon: Presentation, text: "تقديم المشروع أمام<br/>لجنة التحكيم ." },
    { icon: Trophy, text: "إعلان النتائج<br/>وتوزيع الجوائز ." },
  ];
  return (
    <section className="mb-12 sm:mb-16 lg:mb-24 relative">
      <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-12 sm:mb-16 text-[#B9D440] px-4">رحلتك كمشارك</h3>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {steps.map((s, i) => (
            <div className="relative text-center" key={i}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-3xl sm:text-4xl md:text-5xl font-bold text-white select-none pointer-events-none">{i + 1}</div>
              <div
                className="p-6 sm:p-8 rounded-[20px] sm:rounded-[30px] text-center relative"
                style={{
                  background: "linear-gradient(180deg, rgba(185, 212, 64, 0.24) 0%, rgba(255, 255, 255, 0.05) 80%)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0px 86.9px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                <p
                  className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed mb-0"
                  dangerouslySetInnerHTML={{ __html: s.text }}
                />
                <div className="absolute left-2 sm:left-6 bottom-4 sm:bottom-6">
                  <s.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Step 7 */}
        <div className="flex justify-center">
          <div className="relative text-center w-1/2 sm:w-1/3">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-3xl sm:text-4xl md:text-5xl font-bold text-white select-none pointer-events-none">7</div>
            <div
              className="p-6 sm:p-8 rounded-[20px] sm:rounded-[30px] text-center relative"
              style={{
                background: "linear-gradient(180deg, rgba(185, 212, 64, 0.24) 0%, rgba(255, 255, 255, 0.05) 80%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0px 86.9px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed mb-0">
                التصويت من قبل<br/>أعضاء ارتواء .
              </p>
              <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
                <Vote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


