export default function Goals() {
  const items = [
    "تشجيع الإبتكار<br/>التقني لحلول<br/>الحياة.",
    "تطوير حلول<br/>واقعية و مؤثرة<br/>تخدم المجتمع.",
    "تعزيز المهارات<br/>العملية لدى<br/>الشباب.",
    "بناء مجتمع شبابي<br/>تقني فعّال<br/>و داعم.",
  ];
  return (
    <section className="mb-12 sm:mb-16 lg:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h3
          className="inline-block px-6 sm:px-12 md:px-16 py-2 sm:py-4 rounded-[20px] sm:rounded-[40px] text-xl sm:text-3xl md:text-4xl lg:text-5xl"
          style={{
            fontWeight: 600,
            color: "#FFD230",
            background:
              "linear-gradient(180deg, rgba(255, 210, 48, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 86.9px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          أهدافنا:
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-12 sm:px-4 items-stretch">
        {items.map((text, i) => (
          <div
            key={i}
            className="min-w-0 aspect-square h-full p-2 sm:p-6 rounded-[30px] sm:rounded-[30px] flex items-center justify-center text-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 210, 48, 0.23) 0%, rgba(255, 255, 255, 0.05) 90%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 86.9px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <p
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


