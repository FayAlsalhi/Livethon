'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  organization: string;
  specialization: string;
  role: string;
  gender: string;
  age: string;
  skills: string;
}

interface TeamFormData {
  teamName: string;
  projectIdea: string;
  teamNumber: string;
  teamLeader: TeamMember;
  members: TeamMember[];
}
// API configuration - direct backend communication
const API_URL = 'http://localhost:5050/api/register/team';


export default function TeamRegistrationForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFinalSuccessModal, setShowFinalSuccessModal] = useState(false);
  const [leaderErrors, setLeaderErrors] = useState<Partial<Record<keyof TeamMember, string>>>({});
  const [teamInfoErrors, setTeamInfoErrors] = useState<Record<string, string>>({});
  const [memberErrors, setMemberErrors] = useState<Record<number, Partial<Record<keyof TeamMember, string>>>>({});
  const [submitting, setSubmitting] = useState(false);


  
  const [formData, setFormData] = useState<TeamFormData>({
    teamName: '',
    projectIdea: '',
    teamNumber: '3', // Default to 3 members (minimum)
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      specialization: '',
      role: 'قائد الفريق',
      gender: '',
      age: '',
      skills: ''
    },
    members: [
      { name: '', email: '', phone: '', organization: '', specialization: '', role: 'عضو', gender: '', age: '', skills: '' },
      { name: '', email: '', phone: '', organization: '', specialization: '', role: 'عضو', gender: '', age: '', skills: '' }
    ]
  });

  const tabs = [
    { id: 0, label: 'قائد الفريق' },
    { id: 1, label: 'معلومات الفريق' },
    { id: 2, label: 'أعضاء الفريق' },
    { id: 3, label: 'مراجعة' }
  ];

  const updateTeamLeader = (field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamLeader: { ...prev.teamLeader, [field]: value }
    }));
    
    if (leaderErrors[field]) {
      setLeaderErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateTeamInfo = (field: keyof Pick<TeamFormData, 'teamName' | 'projectIdea' | 'teamNumber'>, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If teamNumber changed, update members array
      if (field === 'teamNumber') {
        const memberCount = parseInt(value) - 1; // Subtract 1 for team leader
        const newMembers = [];
        
        for (let i = 0; i < memberCount; i++) {
          // Keep existing member data if available, otherwise create new
          newMembers.push(prev.members[i] || {
            name: '', email: '', phone: '', organization: '', specialization: '', role: 'عضو', gender: '', age: '', skills: ''
          });
        }
        
        newData.members = newMembers;
        
        // Clear member errors for removed members
        setMemberErrors(prev => {
          const newErrors = { ...prev };
          Object.keys(newErrors).forEach(key => {
            const index = parseInt(key);
            if (index >= memberCount) {
              delete newErrors[index];
            }
          });
          return newErrors;
        });
      }
      
      return newData;
    });
  };

  const updateMember = (memberIndex: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((member, index) => 
        index === memberIndex ? { ...member, [field]: value } : member
      )
    }));
    
    // Clear error for this field
    if (memberErrors[memberIndex]?.[field]) {
      setMemberErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[memberIndex]) {
          delete newErrors[memberIndex][field];
          
        }
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    console.log('=== SUBMIT BUTTON CLICKED ===');
    console.log('Current active tab:', activeTab);
    console.log('Form Data:', formData);
    
     // Client-side validation before showing confirmation modal
    const leaderErrors = validateTeamLeader();
    const teamInfoErrors: Record<string, string> = {};
    
    // Debug form data
    console.log('Team size:', formData.teamNumber);
    console.log('Members count:', formData.members.length);
    console.log('Expected members:', parseInt(formData.teamNumber) - 1);

    // Validate team info
    if (!formData.teamName.trim()) teamInfoErrors.teamName = 'اسم الفريق مطلوب';
    if (!formData.projectIdea.trim()) teamInfoErrors.projectIdea = 'فكرة المشروع مطلوبة';
    if (!formData.teamNumber) teamInfoErrors.teamNumber = 'يجب تحديد عدد أعضاء الفريق';
    
    
     // Validate members
     const memberErrors: Record<number, Partial<Record<keyof TeamMember, string>>> = {};
     formData.members.forEach((member, index) => {
       if (!member.name.trim()) {
         if (!memberErrors[index]) memberErrors[index] = {};
         memberErrors[index]!.name = 'اسم العضو مطلوب';
       }
       if (!member.email.trim()) {
         if (!memberErrors[index]) memberErrors[index] = {};
         memberErrors[index]!.email = 'البريد الإلكتروني مطلوب';
       }
     });
 
     // Set all errors
     setLeaderErrors(leaderErrors);
     setTeamInfoErrors(teamInfoErrors);
     setMemberErrors(memberErrors);
    
    
     // Check if there are any errors
     const hasErrors = Object.keys(leaderErrors).length > 0 || 
     Object.keys(teamInfoErrors).length > 0 || 
     Object.keys(memberErrors).length > 0;
    
   
     if (hasErrors) {
      console.log('Client-side validation errors:', { leaderErrors, teamInfoErrors, memberErrors });
      // Show errors on current tab instead of jumping
      alert('يرجى إكمال جميع الحقول المطلوبة قبل المتابعة');
      return;
    }

    // No errors, show confirmation modal
    setShowSuccessModal(true);
  };

  const handleCloseModal = async () => {
    console.log('=== CONFIRMATION MODAL CONFIRMED ===');
    console.log('About to send data to backend...');
    
    
    try {
      setSubmitting(true);
      
      // Clear all previous errors
      setLeaderErrors({});
      setTeamInfoErrors({});
      setMemberErrors({});

      // Clean up form data before sending (convert empty strings to undefined for optional fields)
      const cleanFormData = {
        ...formData,
        members: formData.members.map(member => ({
          ...member,
          phone: member.phone || undefined,
          organization: member.organization || undefined,
          specialization: member.specialization || undefined,
          gender: member.gender === "" ? undefined : member.gender,
          age: member.age || undefined,
          skills: member.skills || undefined
        }))
      };
      
      console.log('Cleaned form data:', cleanFormData);
      
      // Send team registration data to backend
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanFormData),
        cache: "no-store",
      });

      const data = await res.json().catch(() => ({} as Record<string, unknown>));
      
      console.log('Backend response status:', res.status);
      console.log('Backend response data:', data);

      if (res.status === 201 && data?.success) {
        // Success → reset form, close confirm, show final success
        setFormData({
          teamName: '',
          projectIdea: '',
          teamNumber: '3', // Reset to minimum team size
          teamLeader: {
            name: '',
            email: '',
            phone: '',
            organization: '',
            specialization: '',
            role: 'قائد الفريق',
            gender: '',
            age: '',
            skills: ''
          },
          members: [
            { name: '', email: '', phone: '', organization: '', specialization: '', role: 'عضو', gender: '', age: '', skills: '' },
            { name: '', email: '', phone: '', organization: '', specialization: '', role: 'عضو', gender: '', age: '', skills: '' }
          ]
        });
        
        setActiveTab(0);
        setShowSuccessModal(false);
        setShowFinalSuccessModal(true);
        return;
      }

      if (res.status === 400 || res.status === 409) {
        // Backend validation / duplicate → show field errors
        const serverErrors = (data?.errors ?? {}) as Record<string, unknown>;
        
        // Handle nested errors for teamLeader and members
        if (serverErrors.teamLeader && typeof serverErrors.teamLeader === 'object') {
          setLeaderErrors(serverErrors.teamLeader as Partial<Record<keyof TeamMember, string>>);
        }
        if (serverErrors.members && typeof serverErrors.members === 'object') {
          setMemberErrors(serverErrors.members as Record<number, Partial<Record<keyof TeamMember, string>>>);
        }
        if (serverErrors.teamName || serverErrors.projectIdea || serverErrors.teamNumber) {
          setTeamInfoErrors(serverErrors as Record<string, string>);
        }
        
        setShowSuccessModal(false); // close confirm, go back to form
        
        // Don't automatically change tabs - let user see errors on current tab
        // Just log the errors for debugging
        console.log('Backend validation errors:', serverErrors);
        
        // Show detailed error information
        if (serverErrors.members && typeof serverErrors.members === 'object') {
          console.log('Member validation errors:', serverErrors.members);
          Object.keys(serverErrors.members as Record<string, unknown>).forEach(memberIndex => {
            const memberErrors = (serverErrors.members as Record<string, unknown>)[memberIndex];
            console.log(`Member ${memberIndex} errors:`, memberErrors);
          });
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
  };

  const validateTeamLeaderField = (field: keyof TeamMember, value: string): string | undefined => {
    const trimmed = (value ?? '').toString().trim();
    switch (field) {
      case 'name':
        if (!trimmed) return 'هذا الحقل مطلوب';
        if (trimmed.length < 2) return 'الاسم قصير جداً';
        if (!/^[\u0600-\u06FF\s]+$/.test(trimmed)) return 'الاسم يجب أن يكون باللغة العربية فقط';
        return undefined;
      case 'gender':
        if (!trimmed) return 'الرجاء اختيار الجنس';
        return undefined;
        case 'email':
          if (!trimmed) return 'هذا الحقل مطلوب';
          if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
              return 'صيغة البريد الإلكتروني غير صحيحة أو تحتوي على حروف غير إنجليزية';
          }
          return undefined;
      case 'phone':
        if (!trimmed) return 'هذا الحقل مطلوب';
        
        const cleanPhone = trimmed.replace(/\s/g, '');
        if (!/^(?:\+966|0)5\d{8}$/.test(cleanPhone)) return 'رقم الجوال غير صحيح';
        return undefined;
      case 'organization':
        if (!trimmed) return 'هذا الحقل مطلوب';
        return undefined;
      case 'specialization':
        if (!trimmed) return 'هذا الحقل مطلوب';
        return undefined;
      case 'age':
        if (!trimmed) return 'هذا الحقل مطلوب';
        const n = Number(trimmed);
        if (Number.isNaN(n)) return 'أدخل رقمًا صالحًا';
        if (n < 12 || n > 100) return 'العمر يجب أن يكون بين 12 و 100 سنة';
        return undefined;
      case 'skills':
        if (!trimmed) return 'هذا الحقل مطلوب';
        if (trimmed.length < 10) return 'يجب أن يكون الحقل 10 أحرف على الأقل';
        
        return undefined;
      case 'role':
        return undefined;
      default:
        return undefined;
    }
  };

  const validateTeamLeader = (): Partial<Record<keyof TeamMember, string>> => {
    const errors: Partial<Record<keyof TeamMember, string>> = {};
    const fields: Array<keyof TeamMember> = [
      'name',
      'gender',
      'email',
      'phone',
      'organization',
      'specialization',
      'age',
      'skills'
    ];
    for (const field of fields) {
      const err = validateTeamLeaderField(field, formData.teamLeader[field as keyof TeamMember]);
      if (err) errors[field] = err;
    }
    return errors;
  };

  const validateTeamInfo = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    
    if (!formData.teamName.trim()) {
      errors.teamName = 'اسم الفريق مطلوب';
    }
    
    if (!formData.teamNumber) {
      errors.teamNumber = 'يجب تحديد عدد أعضاء الفريق';
    }
    
    if (!formData.projectIdea.trim()) {
      errors.projectIdea = 'فكرة المشروع مطلوبة';
    } else if (formData.projectIdea.trim().length < 20) {
      errors.projectIdea = 'يجب أن تكون فكرة المشروع 20 حرف على الأقل';
    }
    
    return errors;
  };

  const validateTeamMembers = (): Record<number, Partial<Record<keyof TeamMember, string>>> => {
    const errors: Record<number, Partial<Record<keyof TeamMember, string>>> = {};
    const memberCount = Math.max(0, parseInt(formData.teamNumber) - 1) || 0;
    
    for (let i = 0; i < memberCount; i++) {
      const member = formData.members[i];
      
      if (!member) continue;
      
      const memberErrors: Partial<Record<keyof TeamMember, string>> = {};
      
      if (!member.name?.trim()) {
        memberErrors.name = 'اسم العضو مطلوب';
      } else if (member.name.trim().length < 2) {
        memberErrors.name = 'الاسم قصير جداً';
      } else if (!/^[\u0600-\u06FF\s]+$/.test(member.name.trim())) {
        memberErrors.name = 'الاسم يجب أن يكون باللغة العربية فقط';
      }
      
      if (!member.email?.trim()) {
        memberErrors.email = 'البريد الإلكتروني مطلوب';
      } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(member.email.trim())) {
        memberErrors.email = 'صيغة البريد الإلكتروني غير صحيحة أو يحتوي على أحرف غير إنجليزية';
      }
      
      
      if (Object.keys(memberErrors).length > 0) {
        errors[i] = memberErrors;
      }
    }
    
    return errors;
  };

  const handleNext = () => {
    if (activeTab === 0) {
      const errors = validateTeamLeader();
      setLeaderErrors(errors);
      if (Object.keys(errors).length > 0) return;
    } else if (activeTab === 1) {
      const errors = validateTeamInfo();
      setTeamInfoErrors(errors);
      if (Object.keys(errors).length > 0) return;
    } else if (activeTab === 2) {
      const errors = validateTeamMembers();
      setMemberErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }
    setLeaderErrors({});
    setTeamInfoErrors({});
    setMemberErrors({});
    setActiveTab(activeTab + 1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: 
        return (
          <div className="space-y-4 md:space-y-5 flex flex-col items-center">
            {/* NAME FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                الاسم : 
              </label>
                             <input
                 type="text"
                 value={formData.teamLeader.name}
                 onChange={(e) => updateTeamLeader('name', e.target.value)}
                 placeholder="ادخل الاسم كاملا"
                 className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base lg:text-lg xl:text-xl focus:ring-gray-500/100 ${leaderErrors.name ? 'ring-1 ring-red-500' : ''}`}
                 style={{
                   height: '42px',
                   borderRadius: '11.3px',
                   padding: '15.07px',
                   backgroundColor: '#343045',
                   border: 'none'
                 }}
               />
               {leaderErrors.name && (
                 <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.name}</p>
               )}
            </div>

            {/* GENDER SELECTION */}
            <div className="w-full max-w-[548px]">
              <div className="flex gap-3">
                <label 
                  className="block text-right mb-2 mt-1 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  الجنس :
                </label>
                
                <button
                  type="button"
                  onClick={() => updateTeamLeader('gender', 'أنثى')}
                  className={`transition-all text-sm md:text-base ${
                    formData.teamLeader.gender === 'أنثى' 
                      ? 'bg-[#7C73A8] text-white' 
                      : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                  }`}
                  style={{
                    width: 'clamp(80px, 18vw, 99px)',
                    height: '42px',
                    borderRadius: '11.3px',
                    border: 'none',
                    fontWeight: 400
                  }}
                >
                  أنثى
                </button>
                <button
                  type="button"
                  onClick={() => updateTeamLeader('gender', 'ذكر')}
                  className={`transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                    formData.teamLeader.gender === 'ذكر' 
                      ? 'bg-[#7C73A8] text-white' 
                      : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                  }`}
                  style={{
                    width: 'clamp(80px, 18vw, 99px)',
                    height: '42px',
                    borderRadius: '11.3px',
                    border: 'none',
                    fontWeight: 400
                  }}
                >
                  ذكر
                </button>
              </div>
              {leaderErrors.gender && (
                <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.gender}</p>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                الإيميل :
              </label>
              <input
                type="email"
                value={formData.teamLeader.email}
                onChange={(e) => updateTeamLeader('email', e.target.value)}
                placeholder="example@email.com"
                className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base focus:ring-gray-500/100 ${leaderErrors.email ? 'ring-1 ring-red-500' : ''}`}
                dir="ltr"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {leaderErrors.email && (
                <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.email}</p>
              )}
            </div>

            {/* PHONE FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                رقم الجوال :
              </label>
              <input
                type="tel"
                value={formData.teamLeader.phone}
                onChange={(e) => updateTeamLeader('phone', e.target.value)}
                placeholder="+966 5# ### ####"
                className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base focus:ring-gray-500/100 ${leaderErrors.phone ? 'ring-1 ring-red-500' : ''}`}
                dir="ltr"
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {leaderErrors.phone && (
                <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.phone}</p>
              )}
            </div>

            {/* STUDY/WORK FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                جهة العمل / الدراسة :
              </label>
              <input
                type="text"
                value={formData.teamLeader.organization}
                onChange={(e) => updateTeamLeader('organization', e.target.value)}
                placeholder="مثل جامعة القصيم"
                className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base focus:ring-gray-500/100 ${leaderErrors.organization ? 'ring-1 ring-red-500' : ''}`}
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {leaderErrors.organization && (
                <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.organization}</p>
              )}
            </div>

            {/* SPECIALIZATION FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                التخصص :
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.teamLeader.specialization}
                  onChange={(e) => updateTeamLeader('specialization', e.target.value)}
                  placeholder=" علوم الحاسب"
                  className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all pr-10 text-sm md:text-base focus:ring-gray-500/100 ${leaderErrors.specialization ? 'ring-1 ring-red-500' : ''}`}
                  dir="rtl"
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: 'none',
                    
                  }}
                />
                {leaderErrors.specialization && (
                  <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.specialization}</p>
                )}
              </div>
            </div>

            {/* AGE INPUT FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                العمر :
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={formData.teamLeader.age}
                  onChange={(e) => updateTeamLeader('age', e.target.value)}
                  placeholder="أدخل عمرك"
                  className={`w-full text-gray-300 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base focus:ring-gray-500/100 ${leaderErrors.age ? 'ring-1 ring-red-500' : ''}`}
                  style={{
                    height: '42px',
                    borderRadius: '11.3px',
                    padding: '15.07px',
                    backgroundColor: '#343045',
                    border: 'none',
                    
                  }}
                />
                {leaderErrors.age && (
                  <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.age}</p>
                )}
              </div>
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
                value={formData.teamLeader.skills}
                onChange={(e) => updateTeamLeader('skills', e.target.value)}
                placeholder="اضف مهاراتك وخبراتك هنا"
                rows={3}
                className={`w-full text-gray-300 text-right focus:ring-3 focus:outline-none transition-all resize-none text-sm md:text-base focus:ring-gray-500/10 ${leaderErrors.skills ? 'ring-1 ring-red-500' : ''}`}
                style={{
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {leaderErrors.skills && (
                <p className="text-red-400 text-sm mt-2 text-right">{leaderErrors.skills}</p>
              )}
            </div>
          </div>
        );

      case 2: // أعضاء الفريق
        return (
          <div className="space-y-4 md:space-y-5 flex flex-col items-center">
            {/* INFO NOTE */}
            <div className="w-full max-w-[548px] text-center mb-4">
              <p className="text-gray-400 text-sm md:text-base">
                ملاحظة: قائد الفريق محسوب بالفعل، هذه الحقول للأعضاء الإضافيين فقط
              </p>
              <p className="text-gray-500 text-xs mt-2">
                عدد الأعضاء المحدد: {formData.teamNumber} | عدد النماذج المعروضة: {Math.max(0, parseInt(formData.teamNumber) - 1) || 0}
              </p>
            </div>
            {(() => {
              const totalMembers = parseInt(formData.teamNumber) || 0;
              const additionalMembers = Math.max(0, totalMembers - 1);
              console.log('Debug - Total Members:', totalMembers, 'Additional Members:', additionalMembers);
              return Array.from({ length: additionalMembers }, (_, index) => (
                <div key={index} className="w-full max-w-[548px] space-y-4">
                <h4 
                  className="text-lg text-purple-300 mb-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  
                >
                  عضو  {index + 2}
                </h4>
                
                {/* MEMBER NAME FIELD */}
                  <div>
                  <label 
                    className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                    
                  >
                    الاسم :
                  </label>
                    <input
                      type="text"
                    value={formData.members[index]?.name || ''}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                    placeholder="ادخل الاسم كاملا"
                    className={`w-full text-white placeholder-gray-500 text-right focus:ring-3 focus:outline-none transition-all text-sm md:text-base lg:text-lg xl:text-xl focus:ring-gray-500/100 ${memberErrors[index]?.name ? 'ring-1 ring-red-500' : ''}`}
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                      padding: '15.07px',
                        backgroundColor: '#343045',
                      border: 'none',
                      
                      }}
                    />
                    {memberErrors[index]?.name && (
                      <p className="text-red-400 text-sm mt-2 text-right">{memberErrors[index]?.name}</p>
                    )}
                  </div>

                {/* MEMBER EMAIL FIELD */}
                  <div>
                  <label 
                    className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                    
                  >
                    الإيميل :
                  </label>
                    <input
                      type="email"
                    value={formData.members[index]?.email || ''}
                      onChange={(e) => updateMember(index, 'email', e.target.value)}
                      placeholder="example@email.com"
                    className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base focus:ring-gray-500/100 ${memberErrors[index]?.email ? 'ring-1 ring-red-500' : ''}`}
                      dir="ltr"
                      style={{
                        height: '42px',
                        borderRadius: '11.3px',
                      padding: '15.07px',
                        backgroundColor: '#343045',
                      border: 'none',
                      
                    }}
                  />
                  {memberErrors[index]?.email && (
                    <p className="text-red-400 text-sm mt-2 text-right">{memberErrors[index]?.email}</p>
                  )}
                </div>
                              </div>
              ));
            })()}
          </div>
        );

      case 1: // معلومات الفريق
        return (
          <div className="space-y-4 md:space-y-5 flex flex-col items-center">
            {/* TEAM NAME FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                اسم الفريق :
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => updateTeamInfo('teamName', e.target.value)}
                placeholder="ادخل اسم الفريق"
                className={`w-full text-white placeholder-gray-500 text-center focus:ring-3 focus:outline-none transition-all text-sm md:text-base lg:text-lg xl:text-xl focus:ring-gray-500/100 ${teamInfoErrors.teamName ? 'ring-1 ring-red-500' : ''}`}
                style={{
                  height: '42px',
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {teamInfoErrors.teamName && (
                <p className="text-red-400 text-sm mt-2 text-right">{teamInfoErrors.teamName}</p>
              )}
            </div>

            {/* TEAM NUMBER SELECTION */}
            <div className="w-full max-w-[548px]">
              <div className="flex gap-3">
                <label 
                  className="block text-right mb-2 mt-1 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  
                >
                  عدد أعضاء الفريق :
                </label>
                
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      teamNumber: '3',
                      members: Array(2).fill(null).map(() => ({ 
                        name: '', 
                        email: '', 
                        phone: '', 
                        organization: '', 
                        specialization: '', 
                        role: 'عضو', 
                        gender: '', 
                        age: '', 
                        skills: '' 
                      }))
                    }));
                    if (teamInfoErrors.teamNumber) {
                      setTeamInfoErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.teamNumber;
                        return newErrors;
                      });
                    }
                  }}
                  className={`transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                    formData.teamNumber === '3' 
                      ? 'bg-[#7C73A8] text-white' 
                      : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                  }`}
                  style={{
                    width: 'clamp(80px, 18vw, 99px)',
                    height: '42px',
                    borderRadius: '11.3px',
                    border: 'none',
                    fontWeight: 400,
                    
                  }}
                >
                  3 أعضاء
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      teamNumber: '4',
                      members: Array(3).fill(null).map(() => ({ 
                        name: '', 
                        email: '', 
                        phone: '', 
                        organization: '', 
                        specialization: '', 
                        role: 'عضو', 
                        gender: '', 
                        age: '', 
                        skills: '' 
                      }))
                    }));
                    if (teamInfoErrors.teamNumber) {
                      setTeamInfoErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.teamNumber;
                        return newErrors;
                      });
                    }
                  }}
                  className={`transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                    formData.teamNumber === '4' 
                      ? 'bg-[#7C73A8] text-white' 
                      : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                  }`}
                  style={{
                    width: 'clamp(80px, 18vw, 99px)',
                    height: '42px',
                    borderRadius: '11.3px',
                    border: 'none',
                    fontWeight: 400,
                    
                  }}
                >
                  4 أعضاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      teamNumber: '5',
                      members: Array(4).fill(null).map(() => ({ 
                        name: '', 
                        email: '', 
                        phone: '', 
                        organization: '', 
                        specialization: '', 
                        role: 'عضو', 
                        gender: '', 
                        age: '', 
                        skills: '' 
                      }))
                    }));
                    if (teamInfoErrors.teamNumber) {
                      setTeamInfoErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.teamNumber;
                        return newErrors;
                      });
                    }
                  }}
                  className={`transition-all text-sm md:text-base lg:text-lg xl:text-xl ${
                    formData.teamNumber === '5' 
                      ? 'bg-[#7C73A8] text-white' 
                      : 'bg-[#343045] text-gray-400 hover:bg-[#443655]'
                  }`}
                  style={{
                    width: 'clamp(80px, 18vw, 99px)',
                    height: '42px',
                    borderRadius: '11.3px',
                    border: 'none',
                    fontWeight: 400,
                    
                  }}
                >
                  5 أعضاء
                </button>
              </div>
              {teamInfoErrors.teamNumber && (
                <p className="text-red-400 text-sm mt-2 text-right">{teamInfoErrors.teamNumber}</p>
              )}
            </div>

            {/* PROJECT IDEA FIELD */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                فكرة المشروع :
              </label>
              <textarea
                value={formData.projectIdea}
                onChange={(e) => updateTeamInfo('projectIdea', e.target.value)}
                placeholder="اشرح فكرة مشروعك بإيجاز"
                rows={5}
                className={`w-full text-white placeholder-gray-500 text-right focus:ring-3 focus:outline-none transition-all resize-none text-sm md:text-base focus:ring-gray-500/10 ${teamInfoErrors.projectIdea ? 'ring-1 ring-red-500' : ''}`}
                style={{
                  borderRadius: '11.3px',
                  padding: '15.07px',
                  backgroundColor: '#343045',
                  border: 'none',
                  
                }}
              />
              {teamInfoErrors.projectIdea && (
                <p className="text-red-400 text-sm mt-2 text-right">{teamInfoErrors.projectIdea}</p>
              )}
            </div>
          </div>
        );

      case 3: // مراجعة
        return (
          <div className="space-y-4 md:space-y-5 flex flex-col items-center">
            {/* TEAM NAME */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                اسم الفريق :
              </label>
              <div 
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: '#343045',
                  borderRadius: '24px',
                  boxShadow: '0 4px 60px 0 rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <p className="text-gray-300 text-right text-lg md:text-xl break-words overflow-hidden">
                  {formData.teamName || 'لم يتم الإدخال'}
                </p>
              </div>
            </div>

            {/* TEAM MEMBERS COUNT */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                عدد اعضاء الفريق :
              </label>
              <div 
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: '#343045',
                  borderRadius: '24px',
                  boxShadow: '0 4px 60px 0 rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <p className="text-gray-300 text-right text-lg md:text-xl">
                  {formData.teamNumber === '3' ? 'ثلاثة اعضاء' : formData.teamNumber === '4' ? 'اربعة اعضاء' : formData.teamNumber === '5' ? 'خمس اعضاء' : 'لم يتم الإدخال'}
                </p>
              </div>
            </div>

            {/* TEAM LEADER NAME */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                اسم قائد الفريق :
              </label>
              <div 
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: '#343045',
                  borderRadius: '24px',
                  boxShadow: '0 4px 60px 0 rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <p className="text-gray-300 text-right text-lg md:text-xl break-words overflow-hidden">
                  {formData.teamLeader.name || 'لم يتم الإدخال'}
                </p>
              </div>
            </div>

            {/* PROJECT IDEA */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                
              >
                فكرة الفريق :
              </label>
              <div 
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: '#343045',
                  borderRadius: '24px',
                  boxShadow: '0 4px 60px 0 rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <p className="text-gray-300 text-right text-lg md:text-xl leading-relaxed break-words whitespace-pre-wrap overflow-hidden">
                  {formData.projectIdea || 'لم يتم الإدخال'}
                </p>
              </div>
            </div>

            {/* TEAM MEMBERS NAMES */}
            <div className="w-full max-w-[548px]">
              <label 
                className="block text-right mb-2 text-gray-300 text-xl md:text-2xl lg:text-3xl xl:text-4xl"

              >
                اسماء اعضاء الفريق :
              </label>
              <div 
                className="rounded-2xl p-6 relative"
                style={{
                  backgroundColor: '#343045',
                  borderRadius: '24px',
                  boxShadow: '0 4px 60px 0 rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="space-y-2">
                  {/* Team Leader */}
                  <p className="text-gray-300 text-right text-lg md:text-xl break-words overflow-hidden">
                    <span className="text-purple-300 font-medium">قائد الفريق:</span> {formData.teamLeader.name }
                  </p>
                  
                  {/* Additional Members */}
                  {Array.from({ length: Math.max(0, parseInt(formData.teamNumber) - 1) || 0 }, (_, index) => (
                    <p key={index} className="text-gray-300 text-right text-lg md:text-xl break-words overflow-hidden">
                      <span className="text-purple-300 font-medium">عضو {index + 2}:</span> {formData.members[index]?.name }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#08070D] text-white relative overflow-hidden" dir="rtl" style={{ overscrollBehavior: 'none', touchAction: 'pan-y' }}>
      {/*  purple tone */}
      <div className="absolute -top-2 -right-32 w-[200px] h-[200px] md:w-[250px] md:h-[300px] lg:w-[400px] lg:h-[500px] bg-[#7877C6]/20 rounded-full blur-[100px] md:blur-[120px]"></div>
      <div className="absolute -bottom-48 -left-48 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-[#7877C6]/15 rounded-full blur-[100px] md:blur-[120px]"></div>
      
      {/* Content wrapper */}
      <div className="relative z-20">
        {/* HEADER SECTION */}
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 lg:p-6">
          {/* Logo Section */}
          <div className="flex gap-1">
            <span><Image src="/Flower.svg" alt="Lifethon Logo" width={96} height={96} priority className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
            <span><Image src="/Text.svg" alt="Lifethon Logo" width={96} height={96} priority className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain select-none pointer-events-none" /></span>
          </div>
          
          {/* Back Button */}
          <Link href="/CRegistration" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 lg:py-4 rounded-full border border-gray-600 hover:bg-gray-800/50 transition-colors text-xs sm:text-sm md:text-base lg:text-lg">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ">عودة إلى تفاصيل الهاكثون</span>
            <ChevronLeft size={20} className="-mr-1" />
          </Link>
        </div>

                  {/* MAIN CONTENT */}
        <div className="flex flex-col items-center px-3 sm:px-4 md:px-6 pb-6 sm:pb-8">
          {/* TITLE SECTION */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <p className="text-[#DFDFDF] mb-2 sm:mb-3 md:mb-4  mb-2 sm:mb-3 md:mb-4 text-md sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-[amiri] ">
              للتسجيل بفريق في
            </p>
            <div className="relative flex justify-center">
            <div className="flex justify-center">
              <Image
                src="/lifethon.svg"
                alt="Lifethon Logo"
                width={640}
                height={200}
                priority
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 416px"
                className="mx-auto w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[26rem] h-auto object-contain select-none pointer-events-none"
              />
            </div>
              
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div 
            className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-4xl xl:max-w-6xl"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 100%)',
              borderRadius: 'clamp(24px, 6vw, 48px)',
              boxShadow: '0 4px 80px 0 rgba(255, 255, 255, 0.1)',
              padding: 'clamp(16px, 3vw, 48px)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* TAB NAVIGATION BOX */}
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <div 
                className="inline-flex gap-1 p-2 sm:p-2 rounded-[clamp(24px,6vw,48px)] text-center"
                style={{
                  background: 'rgba(52, 48, 69, 0.44)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 100px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {tabs.map((tab) => (
                   <div
                    key={tab.id}
                     className="px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-2 md:py-3 rounded-2xl sm:rounded-3xl transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium cursor-default"
                    style={{
                      backgroundColor: activeTab === tab.id ? '#7C73A8' : 'transparent',
                      color: activeTab === tab.id ? 'white' : '#9CA3AF',
                       minWidth: 'clamp(80px, 20vw, 100px)',
                       pointerEvents: 'none'
                    }}
                  >
                    {tab.label}
                   </div>
                ))}
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
              {renderTabContent()}
            </div>

                        {/* SUBMIT BUTTON */}
             <div className="flex flex-col items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
               {activeTab === 3 ? (
                 // Final confirmation button in review section
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full max-w-[180px] sm:max-w-[199px] h-[44px] sm:h-[48px] mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-[#FFD230] to-[#C0B7E8] text-[#343045] font-normal rounded-[clamp(20px,5vw,40px)] transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-lg sm:text-xl md:text-2xl lg:text-3xl focus:ring-2 focus:ring-yellow-400/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
               
                   style={{
                     
                     fontWeight: 400,
                     lineHeight: '100%',
                     letterSpacing: '0%'
                   }}
                 >
                  {submitting ? 'جاري الإرسال...' : 'إرسال التسجيل'}
                 </button>
               ) : (
                 // Continue to next section button
                 <button
                   onClick={handleNext}
                   disabled={submitting}
                   className="w-full max-w-[180px] sm:max-w-[199px] h-[44px] sm:h-[48px] mt-3 sm:mt-4 md:mt-6 bg-gradient-to-r from-[#7C73A8] to-[#5A4F7B] text-white font-normal rounded-[clamp(20px,5vw,40px)] transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-lg sm:text-xl md:text-2xl lg:text-3xl focus:ring-2 focus:ring-purple-400/30 focus:outline-none"
                   style={{
                     fontWeight: 400,
                     lineHeight: '100%',
                     letterSpacing: '0%'
                   }}
                 >
                   {submitting ? 'جاري التسجيل...' : 'إكمال التسجيل '}
                 </button>
               )}
               
               {/* Previous button - show on all sections except the first one */}
                              {activeTab > 0 && (
                 <button
                   onClick={() => {
                     setActiveTab(activeTab - 1);
                     // Clear errors when going back
                     setLeaderErrors({});
                     setTeamInfoErrors({});
                     setMemberErrors({});
                   }}
                   className="w-full max-w-[180px] sm:max-w-[199px] h-[44px] sm:h-[48px] bg-transparent border border-gray-500 text-gray-300 font-normal rounded-[clamp(20px,5vw,40px)] transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-800/50 hover:border-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl focus:ring-2 focus:ring-gray-400/30 focus:outline-none"
                   style={{
                     
                     fontWeight: 400,
                     lineHeight: '100%',
                     letterSpacing: '0%'
                   }}
                 >
                   السابق
                 </button>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div 
            className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl transform transition-all duration-300 scale-100 backdrop-blur-md"
            style={{
              background: 'linear-gradient(180deg, #353246 0%, #3E3A51 58%, #3E3A51 100%)',
              borderRadius: 'clamp(20px, 5vw, 30px)',
              padding: 'clamp(20px, 3vw, 80px)',
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
                
              >
                تأكد من صحة معلوماتك، حيث لا يمكن تعديلها بعد التسجيل ، يرجى التسجيل مرة واحدة فقط لضمان تنظيم العملية بشكل عادل.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
                {/* Confirm Button */}
                <button
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="w-full py-3 sm:py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: 'linear-gradient(135deg, #C0B7E8 0%, #FFD230 100%)',
                    color: '#343045'
                  }}
                >
                  {submitting ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div 
            className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl transform transition-all duration-300 scale-100 backdrop-blur-md"
            style={{
              background: '#353246',
              borderRadius: 'clamp(20px, 5vw, 30px)',
              padding: 'clamp(20px, 3vw, 80px)',
              boxShadow: '0 25px 100px 0 rgba(255, 255, 255, 0.1)',
              overflow: 'auto'
            }}
          >
            {/* Close Button (X) */}
            <button
              onClick={handleCloseFinalModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 transition-colors text-white text-xl font-bold z-20"
              
            >
              ×
            </button>
            
            {/* Content */}
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Success Message */}
              <div 
                className="space-y-2 sm:space-y-4 leading-relaxed mb-6 sm:mb-8"
                style={{
                  
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