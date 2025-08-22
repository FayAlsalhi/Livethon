'use client'
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:5050"}/api/register/individual`;

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface FormErrors {
  name?: string;
  gender?: string;
  email?: string;
  phone?: string;
  studyWork?: string;
  specialization?: string;
  age?: string;
  skills?: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    studyWork: '',
    specialization: '',
    age: '',
    skills: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFinalSuccessModal, setShowFinalSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateField = (field: keyof typeof formData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'الاسم مطلوب';
        if (value.trim().length < 3) return 'الاسم يجب أن يكون 3 أحرف على الأقل';
        if (value.trim().length > 50) return 'الاسم يجب أن يكون أقل من 50 حرف';
        if (!/^[\u0600-\u06FF\s]+$/.test(value.trim())) return 'الاسم يجب أن يكون باللغة العربية';
        return undefined;
      
      case 'gender':
        if (!value) return 'يرجى اختيار الجنس';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'البريد الإلكتروني مطلوب';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'البريد الإلكتروني غير صحيح';
        return undefined;
      
      case 'phone':
        if (!value.trim()) return 'رقم الجوال مطلوب';
        const phoneRegex = /^(\+966|966)?[0-9]{9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'رقم الجوال غير صحيح (مثال: +966501234567)';
        return undefined;
      
      case 'studyWork':
        if (!value.trim()) return 'جهة العمل/الدراسة مطلوبة';
        if (value.trim().length < 3) return 'جهة العمل/الدراسة يجب أن تكون 3 أحرف على الأقل';
        if (value.trim().length > 100) return 'جهة العمل/الدراسة يجب أن تكون أقل من 100 حرف';
        return undefined;
      
      case 'specialization':
        if (!value.trim()) return 'التخصص مطلوب';
        if (value.trim().length < 2) return 'التخصص يجب أن يكون حرفين على الأقل';
        if (value.trim().length > 50) return 'التخصص يجب أن يكون أقل من 50 حرف';
        return undefined;
      
      case 'age':
        if (!value.trim()) return 'العمر مطلوب';
        const age = parseInt(value);
        if (isNaN(age)) return 'العمر يجب أن يكون رقماً';
        if (age < 12) return 'العمر يجب أن يكون 12 سنة على الأقل';
        if (age > 100) return 'العمر يجب أن يكون أقل من 100 سنة';
        return undefined;
      
      case 'skills':
        if (!value.trim()) return 'المهارات/الخبرات مطلوبة';
        if (value.trim().length < 10) return 'المهارات/الخبرات يجب أن تكون 10 أحرف على الأقل';
        if (value.trim().length > 500) return 'المهارات/الخبرات يجب أن تكون أقل من 500 حرف';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldKey = field as keyof typeof formData;
      const error = validateField(fieldKey, formData[fieldKey]);
      if (error) {
        newErrors[fieldKey] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
  e?.preventDefault?.();

  if (validateForm()) {
    setShowSuccessModal(true); 
  } else {
    
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      document
        .querySelector(`[name="${firstErrorField}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
};

  const handleCloseModal = async () => {
  try {
    setSubmitting(true);
    setErrors({}); // clear old errors

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({} as Record<string, unknown>));

    if (res.status === 201 && data?.success) {
      // Success → reset, close confirm, show final success
      setFormData({
        name: '', gender: '', email: '', phone: '',
        studyWork: '', specialization: '', age: '', skills: ''
      });
      setErrors({});
      setShowSuccessModal(false);
      setShowFinalSuccessModal(true);
      return;
    }

    if (res.status === 400 || res.status === 409) {
      // Backend validation / duplicate → show field errors
      const serverErrors = (data?.errors ?? {}) as FormErrors;
      setErrors(serverErrors);
      setShowSuccessModal(false); // close confirm, go back to form

      // Scroll to first backend error
      const firstServerError = Object.keys(serverErrors)[0];
      if (firstServerError) {
        document
          .querySelector(`[name="${firstServerError}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Any other error
    alert(data?.message || "حدث خطأ في الخادم. حاول لاحقًا.");
    setShowSuccessModal(false);

  } catch (err) {
    console.error("Submit error:", err);
    alert("تعذر الاتصال بالخادم. تحقق من الاتصال ثم حاول مجددًا.");
    setShowSuccessModal(false);
  } finally {
    setSubmitting(false);
  }
};

  const handleCloseFinalModal = () => {
    setShowFinalSuccessModal(false);
    // Reset form
    setFormData({
      name: '',
      gender: '',
      email: '',
      phone: '',
      studyWork: '',
      specialization: '',
      age: '',
      skills: ''
    });
    setErrors({});
  };

  

  return (
    <div className="min-h-screen bg-[#08070D] text-white relative overflow-hidden" dir="rtl">
      {/*  purple tone */}
      <div className="absolute -top-2 -right-32 w-[300px] h-[300px] md:w-[250px] md:h-[300px] lg:w-[400px] lg:h-[500px] bg-[#7877C6]/20 rounded-full blur-[90px] sm:blur-[100px] md:blur-[120px]"></div>
      <div className="absolute -bottom-48 -left-48 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/15 rounded-full blur-[90px] sm:blur-[100px] md:blur-[120px]"></div>
      
      {/* Content wrapper */}
      <div className="relative z-20">
        {/* HEADER SECTION */}
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 lg:p-6">
          <div className="flex gap-1">
            <span><Image src="/Flower.svg" alt="Lifethon Logo" width={96} height={96} priority className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
            <span><Image src="/Text.svg" alt="Lifethon Logo" width={96} height={96} priority className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
          </div>

          <Link href="/CRegistration" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 rounded-full border border-gray-600 hover:bg-gray-800/50 transition-colors text-xs sm:text-sm md:text-base lg:text-lg">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">عودة إلى تفاصيل الهاكثون</span>
            <ChevronLeft size={20} className="-mr-1" />
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col items-center px-4 pb-8">
          {/* TITLE SECTION */}
          <div className="text-center mb-8 md:mb-12">
            <p 
              className="text-[#DFDFDF] mb-2 md:mb-4  mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-[amiri]">
              للتسجيل الفردي في
            </p>
            <div className="relative flex justify-center">
              <div className="flex justify-center">
                <Image src="/lifethon.svg" alt="Lifethon Logo" width={640} height={200} priority sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 416px" className="mx-auto w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[26rem] h-auto object-contain select-none pointer-events-none" />
              </div>
              {/* Decorative stars */}
             
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div 
            className="relative  w-full max-w-[85vw] lg:max-w-4xl xl:max-w-6xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 100%)',
              borderRadius: '48px',
              boxShadow: '0 4px 70px 0 rgba(255, 255, 255, 0.11)',
              padding: 'clamp(24px, 4vw, 48px)'
            }}
          >
            <div className="space-y-4 md:space-y-5 flex flex-col items-center">
              
              {/* NAME FIELD */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  الاسم : 
                </label>
                <input
                  name="name"
                  required
                  minLength={3}
                  maxLength={50}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="ادخل الاسم كاملا"
                  className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                    errors.name ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                  }`}
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: errors.name ? '1px solid #ef4444' : 'none',
                    fontFamily: 'Adobe Arabic, Arial'
                  }}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.name}</p>
                )}
              </div>

              {/* GENDER SELECTION */}
              <div className="w-full max-w-[548px]">
                <div className="flex gap-3 ">
                <label 
                  className="block text-right mb-2 mt-1 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  الجنس :
                </label>
                
                  <button
                    type="button"
                    onClick={() => handleInputChange('gender', 'أنثى')}
                    className={`transition-all text-sm md:text-base ${
                      formData.gender === 'أنثى' 
                        ? 'bg-[#7C73A8] text-white' 
                        : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                    }`}
                    style={{
                      width: 'clamp(80px, 18vw, 99px)',
                      height: '42px',
                      borderRadius: '11.3px',
                      border: 'none',
                      fontWeight: 400,
                      fontFamily: 'Adobe Arabic, Arial'
                    }}
                  >
                    أنثى
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('gender', 'ذكر')}
                    className={`transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                      formData.gender === 'ذكر' 
                        ? 'bg-[#7C73A8] text-white' 
                        : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                    }`}
                    style={{
                      width: 'clamp(80px, 18vw, 99px)',
                      height: '42px',
                      borderRadius: '11.3px',
                      border: 'none',
                      fontWeight: 400,
                      fontFamily: 'Adobe Arabic, Arial'
                    }}
                  >
                    ذكر
                  </button>
                </div>
                {errors.gender && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.gender}</p>
                )}
              </div>

              {/* EMAIL FIELD */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  الإيميل :
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base ${
                    errors.email ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                  }`}
                  dir="ltr"
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: errors.email ? '1px solid #ef4444' : 'none',
                    fontFamily: 'Adobe Arabic, Arial'
                  }}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.email}</p>
                )}
              </div>

              {/* PHONE FIELD */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  رقم الجوال :
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+966 5# ### ####"
                  className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base ${
                    errors.phone ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                  }`}
                  dir="ltr"
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: errors.phone ? '1px solid #ef4444' : 'none',
                    fontFamily: 'Adobe Arabic, Arial'
                  }}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.phone}</p>
                )}
              </div>

              {/* STUDY/WORK FIELD */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  جهة العمل / الدراسة :
                </label>
                <input
                  name="studyWork"
                  type="text"
                  value={formData.studyWork}
                  onChange={(e) => handleInputChange('studyWork', e.target.value)}
                  placeholder="مثل جامعة القصيم"
                  className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base ${
                    errors.studyWork ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                  }`}
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: errors.studyWork ? '1px solid #ef4444' : 'none',
                    fontFamily: 'Adobe Arabic, Arial'
                  }}
                />
                {errors.studyWork && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.studyWork}</p>
                )}
              </div>

              {/* SPECIALIZATION DROPDOWN */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  التخصص :
                </label>
                <div className="relative">
            
                <input
                 name="specialization"
                 type="text"
                 required
                 minLength={2}
                 maxLength={50}
                 value={formData.specialization}
                 onChange={(e) => handleInputChange('specialization', e.target.value)}
                 placeholder=" علوم الحاسب"
                 className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all pr-10 text-sm md:text-base ${
                   errors.specialization ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                 }`}
                 dir="rtl"
                    style={{
                        height: '42px',
                        borderRadius: '11.3px',
                        padding: '15.07px',
                        backgroundColor: '#343045',
                        border: errors.specialization ? '1px solid #ef4444' : 'none',
                        fontFamily: 'Adobe Arabic, Arial'
                        }}
                    />
                 </div>
                 {errors.specialization && (
                   <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.specialization}</p>
                 )}
                </div>

              
              {/* AGE INPUT FIELD */}
<div className="w-full max-w-[548px]">
  <label 
    className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
    style={{ fontFamily: 'Adobe Arabic, Arial' }}
  >
    العمر :
  </label>
  <div className="relative">
    <input
      name="age"
      type="number"
      required
      min="12"
      max="100"
      value={formData.age}
      onChange={(e) => handleInputChange('age', e.target.value)}
      placeholder="أدخل عمرك"
      className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base ${
        errors.age ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
      }`}
      style={{
        height: '42px',
        borderRadius: '11.3px',
        padding: '15.07px',
        backgroundColor: '#343045',
        border: errors.age ? '1px solid #ef4444' : 'none',
        fontFamily: 'Adobe Arabic, Arial'
      }}
    />
  </div>
  {errors.age && (
    <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.age}</p>
  )}
</div>

              {/* SKILLS TEXTAREA */}
              <div className="w-full max-w-[548px]">
                <label 
                  className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  style={{ fontFamily: 'Adobe Arabic, Arial' }}
                >
                  المهارات / الخبرات :
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="اضف مهاراتك وخبراتك هنا"
                  rows={3}
                  className={`w-full text-white placeholder-gray-500 text-right focus:ring-3 focus:outline-none transition-all resize-none text-sm md:text-base ${
                    errors.skills ? 'focus:ring-red-500/50 border-red-500' : 'focus:ring-gray-500/100'
                  }`}
                  style={{
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: errors.skills ? '1px solid #ef4444' : 'none',
                    fontFamily: 'Adobe Arabic, Arial'
                  }}
                />
                {errors.skills && (
                  <p className="text-red-400 text-sm mt-1 text-right" style={{ fontFamily: 'Adobe Arabic, Arial' }}>{errors.skills}</p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit}
                className="w-full max-w-[199px] h-[48px] mt-4 md:mt-6 bg-gradient-to-r from-[#FFD230] to-[#C0B7E8] text-[#343045] font-normal rounded-[40px] transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-xl md:text-2xl lg:text-3xl"
                style={{
                  fontFamily: 'Adobe Arabic, Arial',
                  fontWeight: 400,
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                تأكيد التسجيل
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform transition-all duration-300 scale-100 backdrop-blur-md"
            style={{
              background: 'linear-gradient(180deg, #353246 0%, #3E3A51 58%, #3E3A51 100%)',
              borderRadius: '30px',
              padding: 'clamp(24px, 4vw, 80px)',
              boxShadow: '0 25px 100px 0 rgba(255, 255, 255, 0.1)',
              overflow: 'auto'
            }}
          >
            

            {/* Content */}
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Title */}
              <h2 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-center"
                style={{
                  fontFamily: 'Adobe Arabic, Arial',
                  background: 'linear-gradient(135deg, #FFD230 0%, #C0B7E8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(255, 210, 48, 0.3))'
                }}
              >
                تأكيد قبل إتمام التسجيل
              </h2>
              
              {/* Body Text */}
              <p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mb-8 sm:mb-12 leading-relaxed text-center px-2"
                style={{
                  fontFamily: 'Adobe Arabic, Arial'
                }}
              >
                تأكد من صحة معلوماتك، حيث لا يمكن تعديلها بعد التسجيل ، يرجى التسجيل مرة واحدة فقط لضمان تنظيم العملية بشكل عادل.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Confirm Button */}
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #C0B7E8 0%, #FFD230 100%)',
                    color: '#343045'
                  }}
                >
                  تأكيد التسجيل
                </button>

                {/* Previous Button */}
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl font-semibold border-2 border-white text-white hover:bg-white/10"
                >
                  السابق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FINAL SUCCESS MODAL */}
      {showFinalSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform transition-all duration-300 scale-100 backdrop-blur-md"
            style={{
              background: '#353246',
              borderRadius: '30px',
              padding: 'clamp(24px, 4vw, 80px)',
              boxShadow: '0 25px 100px 0 rgba(255, 255, 255, 0.1)',
              overflow: 'auto'
            }}
          >
            {/* Close Button (X) */}
            <button
              onClick={handleCloseFinalModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 transition-colors text-white text-xl font-bold z-20"
              style={{
                fontFamily: 'Adobe Arabic, Arial'
              }}
            >
              ×
            </button>
            
            {/* Content */}
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Success Message */}
              <div 
                className="space-y-2 sm:space-y-4 leading-relaxed mb-6 sm:mb-8"
                style={{
                  fontFamily: 'Adobe Arabic, Arial',
                  fontWeight: 400,
                  fontSize: 'clamp(16px, 3vw, 24px)',
                  lineHeight: '1.5',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#DFDFDF'
                }}
              >
                <p>شكرا لانضمامك إلى لايفثون</p>
                <p>يسعدنا أنك أصبحت جزءًا من التحدي.</p>
                <p>ننتظر إبداعك، وترقّب رسائلنا القادمة حول المراحل التالية.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}