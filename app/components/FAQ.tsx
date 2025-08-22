"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

export default function FAQ() {
  const [active, setActive] = React.useState<number | null>(null);

  const toggle = (i: number) => setActive(active === i ? null : i);

  const questions = [
    "من يستطيع التسجيل؟",
    "هل المشارك مجانية؟",
    "هل أحتاج إلى خبرة سابقة؟",
    "هل يمكنني المشاركة كفرد؟",
    "ما لغة الهاكثون ؟",
    "أين يقام الحدث ؟",
  ];

  const answers: Record<number, string> = {
    0: "جميع الطلاب والخريجين والمهتمين بالمجال التقني",
    1: "نعم، المشاركة مجانية تماماً. لا توجد أي رسوم للتسجيل أو المشاركة في الهاكثون",
    2: "لا، لا تحتاج إلى خبرة سابقة. الهاكثون مصمم لجميع المستويات، وسنقدم التدريب والدعم اللازم",
    3: "نعم، ويمكنك لاحقًا الانضمام لفريق",
    4: "اللغة العربية أساسية، مع استخدام مصطلحات تقنية إنجليزية",
    5: "في مدينة الطائف ",
  };

  return (
    <section id="faq" className="mb-12 sm:mb-16 lg:mb-24 px-4">
      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 sm:mb-12 text-[#C0B7E8] font-[amiri]">
        الأسئلة الشائعة
      </h3>
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 lg:space-y-6 text-center px-4 sm:px-6 lg:px-10">
        {questions.map((question, index) => (
          <div key={index} className="bg-[#5D5491]/30 rounded-2xl overflow-hidden">
            <button
              aria-expanded={active === index}
              aria-controls={`faq-panel-${index}`}
              onClick={() => toggle(index)}
              className="w-full p-4 sm:p-5 lg:p-6 text-center text-white flex items-center justify-between hover:bg-[#5D5491]/40 transition-colors"
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium font-[amiri]">
                {index + 1}. {question}
              </span>
              <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform ${active === index ? 'rotate-180' : ''}`} />
            </button>
            {active === index && (
              <div id={`faq-panel-${index}`} className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 text-gray-300 text-center">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-[amiri]">{answers[index]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


