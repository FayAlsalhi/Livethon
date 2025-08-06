'use client'
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  role: string;
}

interface TeamFormData {
  teamName: string;
  projectIdea: string;
  teamLeader: TeamMember;
  members: TeamMember[];
}

export default function TeamRegistrationForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [formData, setFormData] = useState<TeamFormData>({
    teamName: '',
    projectIdea: '',
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      specialization: '',
      role: 'قائد الفريق'
    },
    members: [
      { name: '', email: '', phone: '', specialization: '', role: 'عضو' },
      { name: '', email: '', phone: '', specialization: '', role: 'عضو' },
      { name: '', email: '', phone: '', specialization: '', role: 'عضو' }
    ]
  });

  const tabs = [
    { id: 0, label: 'قائد الفريق' },
    { id: 1, label: 'أعضاء الفريق' },
    { id: 2, label: 'معلومات الفريق' },
    { id: 3, label: 'مراجعة' }
  ];

  const updateTeamLeader = (field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamLeader: { ...prev.teamLeader, [field]: value }
    }));
  };

  const updateMember = (memberIndex: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((member, index) => 
        index === memberIndex ? { ...member, [field]: value } : member
      )
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    setShowSuccessModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // قائد الفريق
        return (
          <div className="space-y-5">
            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: الاسم</label>
              <input
                type="text"
                value={formData.teamLeader.name}
                onChange={(e) => updateTeamLeader('name', e.target.value)}
                placeholder="ادخل الاسم كاملا"
                className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm md:text-base"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: الإيميل</label>
              <input
                type="email"
                value={formData.teamLeader.email}
                onChange={(e) => updateTeamLeader('email', e.target.value)}
                placeholder="example@email.com"
                className="w-full text-white placeholder-gray-500 text-left focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm md:text-base"
                dir="ltr"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: رقم الجوال</label>
              <input
                type="tel"
                value={formData.teamLeader.phone}
                onChange={(e) => updateTeamLeader('phone', e.target.value)}
                placeholder="+966 5# ### ####"
                className="w-full text-white placeholder-gray-500 text-left focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm md:text-base"
                dir="ltr"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: جهة الدراسة / العمل</label>
              <input
                type="text"
                value={formData.teamLeader.specialization}
                onChange={(e) => updateTeamLeader('specialization', e.target.value)}
                placeholder="مثل جامعة القصيم"
                className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm md:text-base"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: التخصص</label>
              <div className="relative">
                <select
                  className="w-full text-gray-300 text-left focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all appearance-none cursor-pointer pr-10 text-sm md:text-base"
                  dir="ltr"
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15px',
                    paddingRight: '40px',
                    backgroundColor: '#343045',
                    border: 'none'
                  }}
                >
                  <option value="">Software Engineering</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="information-systems">Information Systems</option>
                  <option value="cybersecurity">Cybersecurity</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: العمر</label>
              <div className="relative">
                <select
                  className="w-full text-gray-300 text-center focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all appearance-none cursor-pointer text-sm md:text-base"
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15px',
                    backgroundColor: '#343045',
                    border: 'none'
                  }}
                >
                  <option value="">24</option>
                  <option value="18-20">18-20</option>
                  <option value="21-25">21-25</option>
                  <option value="26-30">26-30</option>
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: المهارات / الخبرات</label>
              <textarea
                rows={3}
                placeholder="اضف مهاراتك وخبراتك هنا"
                className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all resize-none text-sm md:text-base"
                style={{
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>
          </div>
        );

      case 1: // أعضاء الفريق
        return (
          <div className="space-y-6">
            {formData.members.map((member, index) => (
              <div key={index} className="bg-gray-800/30 rounded-2xl p-4 md:p-6 space-y-4">
                <h4 className="text-lg text-purple-400">عضو {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-right mb-2 text-gray-300 text-sm">: الاسم</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="ادخل الاسم"
                      className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm"
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                        padding: '15px',
                        backgroundColor: '#343045',
                        border: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-right mb-2 text-gray-300 text-sm">: الإيميل</label>
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateMember(index, 'email', e.target.value)}
                      placeholder="example@email.com"
                      className="w-full text-white placeholder-gray-500 text-left focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm"
                      dir="ltr"
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                        padding: '15px',
                        backgroundColor: '#343045',
                        border: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-right mb-2 text-gray-300 text-sm">: رقم الجوال</label>
                    <input
                      type="tel"
                      value={member.phone}
                      onChange={(e) => updateMember(index, 'phone', e.target.value)}
                      placeholder="+966 5# ### ####"
                      className="w-full text-white placeholder-gray-500 text-left focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm"
                      dir="ltr"
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                        padding: '15px',
                        backgroundColor: '#343045',
                        border: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-right mb-2 text-gray-300 text-sm">: التخصص</label>
                    <input
                      type="text"
                      value={member.specialization}
                      onChange={(e) => updateMember(index, 'specialization', e.target.value)}
                      placeholder="التخصص"
                      className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm"
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                        padding: '15px',
                        backgroundColor: '#343045',
                        border: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 2: // معلومات الفريق
        return (
          <div className="space-y-5">
            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: اسم الفريق</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                placeholder="ادخل اسم الفريق"
                className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all text-sm md:text-base"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>

            <div className="w-full max-w-[548px] mx-auto">
              <label className="block text-right mb-2 text-gray-300 text-sm md:text-base">: فكرة المشروع</label>
              <textarea
                value={formData.projectIdea}
                onChange={(e) => setFormData(prev => ({ ...prev, projectIdea: e.target.value }))}
                placeholder="اشرح فكرة مشروعك بإيجاز"
                rows={5}
                className="w-full text-white placeholder-gray-500 text-right focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all resize-none text-sm md:text-base"
                style={{
                  borderRadius: '11.3px',
                  padding: '15px',
                  backgroundColor: '#343045',
                  border: 'none'
                }}
              />
            </div>
          </div>
        );

      case 3: // مراجعة
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-2xl p-6 space-y-4">
              <h4 className="text-lg text-purple-400 mb-4">معلومات الفريق</h4>
              <p className="text-gray-300">اسم الفريق: {formData.teamName || 'لم يتم الإدخال'}</p>
              <p className="text-gray-300">فكرة المشروع: {formData.projectIdea || 'لم يتم الإدخال'}</p>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 space-y-4">
              <h4 className="text-lg text-purple-400 mb-4">قائد الفريق</h4>
              <p className="text-gray-300">الاسم: {formData.teamLeader.name || 'لم يتم الإدخال'}</p>
              <p className="text-gray-300">الإيميل: {formData.teamLeader.email || 'لم يتم الإدخال'}</p>
              <p className="text-gray-300">الجوال: {formData.teamLeader.phone || 'لم يتم الإدخال'}</p>
              <p className="text-gray-300">التخصص: {formData.teamLeader.specialization || 'لم يتم الإدخال'}</p>
            </div>

            <div className="bg-gray-800/30 rounded-2xl p-6 space-y-4">
              <h4 className="text-lg text-purple-400 mb-4">أعضاء الفريق</h4>
              {formData.members.map((member, index) => (
                <div key={index} className="border-t border-gray-700 pt-3">
                  <p className="text-gray-300 font-semibold mb-1">عضو {index + 1}:</p>
                  <p className="text-gray-300 text-sm">الاسم: {member.name || 'لم يتم الإدخال'}</p>
                  <p className="text-gray-300 text-sm">الإيميل: {member.email || 'لم يتم الإدخال'}</p>
                  <p className="text-gray-300 text-sm">الجوال: {member.phone || 'لم يتم الإدخال'}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#08070D] text-white relative overflow-hidden" dir="rtl">
      {/* Purple tone orbs */}
      <div className="absolute -top-32 -right-32 w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#7877C6]/20 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-48 -left-48 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/15 rounded-full blur-[120px]"></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/Flower.svg" alt="Lifethon Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
            <img src="/Text.svg" alt="Lifethon Text" className="h-8 md:h-10 w-auto object-contain" />
          </div>
          
          {/* Back Button */}
          <button className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-4 rounded-full border md:border-2 border-gray-600 hover:bg-gray-800/30 transition-colors text-sm md:text-lg focus:ring-2 focus:ring-gray-500/30 focus:outline-none">
            <span className="text-sm md:text-base">عودة إلى تفاصيل الهاكثون</span>
            <div className="flex">
              <ChevronLeft size={20} className="-mr-1 md:-mr-2" />
              <ChevronLeft size={20} className="md:hidden" />
              <ChevronLeft size={24} className="hidden md:block -mr-2" />
              <ChevronLeft size={24} className="hidden md:block" />
            </div>
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col items-center px-4 pb-8">
          {/* TITLE SECTION */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-[#DFDFDF] mb-2 md:mb-4 text-base md:text-3xl" style={{ fontFamily: 'Adobe Arabic, Arial' }}>
              للتسجيل الجماعي في
            </p>
            <div className="relative flex justify-center">
              <h1 className="bg-gradient-to-r from-[#E8E7F3] to-[#8176AF] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" style={{ fontFamily: 'Adobe Arabic, Arial', fontWeight: 400, lineHeight: '100%' }}>
                ليــفــثــون
              </h1>
              <span className="absolute -top-8 right-0 text-yellow-400 text-xl md:text-3xl">✦</span>
              <span className="absolute top-1/2 -right-12 text-blue-400 text-lg md:text-2xl">✦</span>
              <span className="absolute -bottom-8 left-0 text-purple-400 text-xl md:text-3xl">🌟</span>
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div 
            className="relative w-full max-w-[85vw] lg:max-w-4xl xl:max-w-6xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 100%)',
              borderRadius: '48px',
              boxShadow: '0 4px 80px 0 rgba(255, 255, 255, 0.1)',
              padding: 'clamp(24px, 4vw, 48px)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* TAB NAVIGATION BOX */}
            <div className="flex justify-center mb-8">
              <div 
                className="inline-flex gap-1 p-2 rounded-[48px]"
                style={{
                  background: 'rgba(52, 48, 69, 0.44)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 100px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 text-xs md:text-sm lg:text-base font-medium"
                    style={{
                      backgroundColor: activeTab === tab.id ? '#7C73A8' : 'transparent',
                      color: activeTab === tab.id ? 'white' : '#9CA3AF',
                      minWidth: '100px'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                className="w-full max-w-[199px] h-[48px] bg-gradient-to-r from-[#FFD230] to-[#C0B7E8] text-[#343045] font-normal rounded-[40px] transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-xl md:text-2xl focus:ring-2 focus:ring-yellow-400/30 focus:outline-none"
                style={{
                  fontFamily: 'Adobe Arabic, Arial',
                  fontWeight: 400,
                  lineHeight: '100%'
                }}
              >
                {activeTab === 3 ? 'إرسال التسجيل' : 'تأكيد التسجيل'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="relative bg-gradient-to-b from-[#5A4F7B] to-[#352B50] text-white transform transition-all duration-300 scale-100 backdrop-blur-md min-h-0 md:min-h-[624px]"
            style={{
              width: '100%',
              maxWidth: '1138px',
              height: 'auto',
              maxHeight: '90vh',
              borderRadius: '30px',
              padding: 'clamp(30px, 5vw, 60px)',
              boxShadow: '0 25px 100px 0 rgba(255, 255, 255, 0.1)',
              overflow: 'auto'
            }}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 md:top-6 left-4 md:left-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#C0B7E8] to-[#8176AF] rounded-full flex items-center justify-center shadow-2xl p-8">
                  <div className="w-full h-full bg-gradient-to-br from-[#FFD230] to-[#FFA500] rounded-full flex items-center justify-center">
                    <img 
                      src="/checkmark.svg" 
                      alt="Success" 
                      className="w-12 h-12 md:w-16 md:h-16 filter brightness-0 invert"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#C0B7E8]/30 to-[#8176AF]/30 rounded-full blur-xl"></div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                شكرًا لتسجيل فريقكم في ليفثون
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
                يسعدنا أن فريقكم أصبح جزءًا من التحدي،
                <br />
                ننتظر إبداعكم الجماعي، وترقّبوا رسالتنا القادمة حول المراحل التالية.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}