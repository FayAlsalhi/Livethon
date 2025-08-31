"use client";

export default function About() {
  return (
    <section id="about" className="mb-8 sm:mb-16 lg:mb-8">
      <div className="max-w-5xl mx-auto px-10 pt-2 pb-10">
        <div
          className="relative rounded-[30px] sm:rounded-[30px] overflow-visible"
          style={{
            background:
              "linear-gradient(180deg, rgba(185, 212, 64, 0.28) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 86.9px 0 rgba(255, 255, 255, 0.1)",
            marginTop: "24px",
          }}
        >
          <h2
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 text-6xl sm:text-8xl md:text-8xl lg:text-8xl xl:text-8xl font-bold text-white select-none pointer-events-none fade-in"
            style={{
              fontWeight: 400,
              lineHeight: "1.2",
              letterSpacing: "0%",
              color: "#B9D440",
              textShadow: "0 4px 16.9px rgba(255, 255, 255, 0.3)",
              whiteSpace: "nowrap",
            }}
          >
            ماهو لايفثون؟
          </h2>

          <div className="px-6 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-8 sm:pb-12 fade-in">
            <p className="text-white text-center leading-relaxed max-w-4xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              هو هاكثون يهدف إلى تحفيز الإبداع التقني والاستثماري وتطوير مهارات العرض لدى المشاركين من خلال{' '}
              <span className="text-[#B9D440] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">4</span>{' '}
              أيام من التحدي والتدريب بإشراف نخبة من الخبراء
              <span className="typing-cursor"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


