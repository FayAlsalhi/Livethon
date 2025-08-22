 
import React from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import Hero from './components/Hero';
import FAQ from './components/FAQ';
import Sponsors from './components/Sponsors';
import About from './components/About';
import Goals from './components/Goals';
import EventDetails from './components/EventDetails';
import TeamInfo from './components/TeamInfo';
import Steps from './components/Steps';
import Benefits from './components/Benefits';

export default function Home() {

  return (
    <div className="min-h-screen bg-[#08070D] text-white relative overflow-hidden  font-[amiri]" dir="rtl">
      {/* Background Elements */}
      <div className="absolute rotate-90 -right-10 w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[400px] lg:h-[700px] xl:w-[400px] xl:h-[700px] bg-[#7877C6]/25 rounded-full blur-[10px] blur-[100px]"></div>
      <div className="absolute -bottom-8 -left-28 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/25 rounded-full blur-[100px] md:blur-[120px]"></div>

      {/* Content wrapper */}
      <div className="relative z-20">
        {/* HEADER SECTION */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className=" pb-4 sm:pb-6 md:pb-8">
          {/* HERO SECTION */}
          <Hero />

          {/* ABOUT SECTION */}
          <About />
          {/* GOALS SECTION */}
          <Goals />

          {/* EVENT DETAILS */}
          <EventDetails />
<div className="absolute  -left-40 w-[350px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] bg-[#7877C6]/35 rounded-full blur-[100px] md:blur-[150px]"></div>

          {/* TEAM INFO */}
          <TeamInfo />

          {/* BENEFITS SECTION */}
          <Benefits />

          {/* JOURNEY STEPS */}
          <Steps />
<div className="absolute  -left-28 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/25 rounded-full blur-[100px] md:blur-[120px]"></div>
          {/* TIMELINE SECTION */}
<section id="timeline" className="mb-12 sm:mb-16 lg:mb-24 px-4">
  {/* Header */}
  <div className="text-center mb-0">
    <h3 
      className="inline-block px-10 py-1 xl:px-40 xl:py-5 md:px-20 md:py-3 lg:px-30 lg:py-4 rounded-[30px] text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#C0B7E8] to-[#FDCB00] text-[#343045] font-[amiri]"
      style={{ 
        fontFamily: 'Adobe Arabic, Arial',
        fontSize: '52px',
        fontWeight: 600,
        boxShadow: '0 12px 32px rgba(0,0,0,0.35), 0 0 90px rgba(255,255,255,0.35)'
      }}
    >
      الجدول الزمني
    </h3>
  </div>
  
  <Timeline
    stages={[
      {
        date: "17",
        month: "ربيع الآخر",
        title: "المرحلة التمهيدية",
        description: "فرز الكتروني من الحكام لاختيار",
        highlight: "50",
        highlightText: "فريقاً",
        position: "right"
      },
      {
        date: "21",
        month: "ربيع الآخر",
        title: "اليوم الأول",
        description: "جلسة حوارية عن التطوير التقني والبنية التحتية الذكية",
        secondLine: "تحكيم حضوري لاختيار أفضل",
        highlight: "30",
        highlightText: "فريقاً",
        position: "left"
      },
      {
        date: "22",
        month: "ربيع الآخر",
        title: "اليوم الثاني",
        description: "جلسة حوارية عن التطوير الاستثماري و جذب المستثمرين",
        secondLine: "تحكيم حضوري لاختيار أفضل",
        highlight: "15",
        highlightText: "فريقاً",
        position: "right"
      },
      {
        date: "23",
        month: "ربيع الآخر",
        title: "اليوم الثالث",
        description: "جلسة حوارية عن تطوير العرض والإقناع",
        secondLine: "تحكيم حضوري لاختيار أفضل",
        highlight: "7",
        highlightText: "فرق",
        position: "left"
      },
      {
        date: "24",
        month: "ربيع الآخر",
        title: "اليوم الأخير",
        description: "عرض المشاريع و إعلان المراكز",
        secondLine: "وتوزيع الجوائز",
        highlight: null,
        highlightText: "",
        position: "center"
      }
    ]}
  />
  <div className="absolute  -right-28 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/25 rounded-full blur-[100px] md:blur-[120px]"></div>
</section>
          {/* FAQ SECTION */}
          <FAQ />

          {/* CALL TO ACTION */}
          <section className="mb-12 sm:mb-16 lg:mb-24 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
            <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[48px] border border-gray-400/40 shadow-[0_2px_40px_rgba(0,0,0,0.25)]" style={{
              background: 'linear-gradient(180deg, rgba(255, 210, 48, 0.37) 0%, rgba(129, 118, 175, 0.47) 100%)'
            }}>
              <div className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="text-right min-w-0">
                  <h3 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Adobe Arabic, Arial' }}>
                    جاهز للتحدي؟
                  </h3>
                  <p className="text-white text-sm sm:text-lg md:text-2xl lg:text-4xl leading-snug" style={{ fontFamily: 'Adobe Arabic, Arial' }}>
                    سجل الآن وكن جزءاً من تحدي ملهم، وأصنع فرقاً معنا.
                  </p>
                </div>
                <Link 
                  href="/CRegistration"
                  className="shrink-0 inline-block px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-3xl bg-gradient-to-r from-[#C0B7E8] to-[#FFD230] text-[#343045] font-bold text-sm sm:text-lg md:text-2xl shadow-md"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  التسجيل
                </Link>
              </div>
            </div>
          </section>

          {/* SPONSORS */}
          <Sponsors />
        </main>

        {/* FOOTER */}
        <footer className="border-t border-gray-800 py-6 sm:py-8 text-center text-gray-400 px-4">
          <p className="text-sm sm:text-base" style={{ fontFamily: 'Adobe Arabic, Arial' }}>&copy; 2024 لايفثون. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
}

