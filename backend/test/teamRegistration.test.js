import { teamRegisterSchema } from "../validators/teamValidator.js";

// Test data for valid team registration (3 members)
export const validTeam3Members = {
  teamName: "فريق الابتكار الصغير",
  projectIdea: "تطوير تطبيق بسيط لحل مشاكل المجتمع المحلي من خلال استخدام تقنيات بسيطة ومتاحة",
  teamNumber: "3",
  teamLeader: {
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    organization: "جامعة القصيم",
    specialization: "علوم الحاسب",
    role: "قائد الفريق",
    gender: "ذكر",
    age: "25",
    skills: "برمجة، تطوير الويب، قواعد البيانات"
  },
  members: [
    {
      name: "فاطمة أحمد",
      email: "fatima@example.com",
      phone: "+966501234568",
      organization: "جامعة الملك سعود",
      specialization: "هندسة البرمجيات",
      role: "عضو",
      gender: "أنثى",
      age: "23",
      skills: "تطوير تطبيقات، واجهات المستخدم"
    },
    {
      name: "محمد عبدالله",
      email: "mohammed@example.com",
      phone: "+966501234569",
      organization: "جامعة الأميرة نورة",
      specialization: "تقنية المعلومات",
      role: "عضو",
      gender: "ذكر",
      age: "24",
      skills: "تطوير الألعاب، الرسومات الحاسوبية"
    }
  ]
};

// Test data for valid team registration (4 members)
export const validTeam4Members = {
  teamName: "فريق التطوير الذكي",
  projectIdea: "تطوير تطبيق ذكي لحل مشاكل المجتمع المحلي من خلال استخدام تقنيات الذكاء الاصطناعي والتعلم الآلي",
  teamNumber: "4",
  teamLeader: {
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    organization: "جامعة القصيم",
    specialization: "علوم الحاسب",
    role: "قائد الفريق",
    gender: "ذكر",
    age: "25",
    skills: "برمجة، تطوير الويب، الذكاء الاصطناعي، تعلم الآلة، قواعد البيانات"
  },
  members: [
    {
      name: "فاطمة أحمد",
      email: "fatima@example.com",
      phone: "+966501234568",
      organization: "جامعة الملك سعود",
      specialization: "هندسة البرمجيات",
      role: "عضو",
      gender: "أنثى",
      age: "23",
      skills: "تطوير تطبيقات، قواعد البيانات، واجهات المستخدم"
    },
    {
      name: "محمد عبدالله",
      email: "mohammed@example.com",
      phone: "+966501234569",
      organization: "جامعة الأميرة نورة",
      specialization: "تقنية المعلومات",
      role: "عضو",
      gender: "ذكر",
      age: "24",
      skills: "تطوير الألعاب، الرسومات الحاسوبية، الذكاء الاصطناعي"
    },
    {
      name: "سارة خالد",
      email: "sara@example.com",
      phone: "+966501234570",
      organization: "جامعة الملك فهد",
      specialization: "علوم البيانات",
      role: "عضو",
      gender: "أنثى",
      age: "22",
      skills: "تحليل البيانات، الإحصاء، تعلم الآلة، Python"
    }
  ]
};

// Test data for valid team registration (5 members)
export const validTeam5Members = {
  teamName: "فريق الابتكار التقني",
  projectIdea: "إنشاء منصة تعليمية تفاعلية تجمع بين الواقع المعزز والذكاء الاصطناعي لتوفير تجربة تعليمية مخصصة ومتطورة للطلاب في جميع المراحل الدراسية",
  teamNumber: "5",
  teamLeader: {
    name: "علي حسن",
    email: "ali@example.com",
    phone: "+966501234571",
    organization: "جامعة الملك عبدالعزيز",
    specialization: "هندسة الحاسوب",
    role: "قائد الفريق",
    gender: "ذكر",
    age: "26",
    skills: "تطوير الويب، تطوير تطبيقات الهاتف، الذكاء الاصطناعي، الواقع المعزز، إدارة المشاريع"
  },
  members: [
    {
      name: "نورا سعد",
      email: "noura@example.com",
      role: "عضو"
    },
    {
      name: "عبدالرحمن فهد",
      email: "abdulrahman@example.com",
      role: "عضو"
    },
    {
      name: "ريم سلطان",
      email: "reem@example.com",
      role: "عضو"
    },
    {
      name: "خالد عمر",
      email: "khalid@example.com",
      role: "عضو"
    }
  ]
};

// Test data for invalid team registration (multiple errors)
export const invalidTeamData = {
  teamName: "", // Empty team name
  projectIdea: "short", // Too short
  teamNumber: "6", // Invalid team size
  teamLeader: {
    name: "A", // Too short
    email: "invalid-email", // Invalid email
    phone: "123", // Invalid phone
    organization: "", // Empty
    specialization: "", // Empty
    role: "قائد الفريق",
    gender: "", // Empty
    age: "5", // Too young
    skills: "short" // Too short
  },
  members: [
    {
      name: "", // Empty name
      email: "invalid", // Invalid email
      role: "عضو"
    }
  ]
};

// Test function to validate schemas
export function testTeamValidation() {
  console.log("🧪 Testing Team Registration Validation...\n");

  // Test valid 3-member team
  console.log("✅ Testing valid 3-member team...");
  const result3 = teamRegisterSchema.safeParse(validTeam3Members);
  if (result3.success) {
    console.log("   ✓ 3-member team validation passed");
  } else {
    console.log("   ✗ 3-member team validation failed:", result3.error.errors);
  }

  // Test valid 4-member team
  console.log("\n✅ Testing valid 4-member team...");
  const result4 = teamRegisterSchema.safeParse(validTeam4Members);
  if (result4.success) {
    console.log("   ✓ 4-member team validation passed");
  } else {
    console.log("   ✗ 4-member team validation failed:", result4.error.errors);
  }

  // Test valid 5-member team
  console.log("\n✅ Testing valid 5-member team...");
  const result5 = teamRegisterSchema.safeParse(validTeam5Members);
  if (result5.success) {
    console.log("   ✓ 5-member team validation passed");
  } else {
    console.log("   ✗ 5-member team validation failed:", result5.error.errors);
  }

  // Test invalid team data
  console.log("\n❌ Testing invalid team data...");
  const resultInvalid = teamRegisterSchema.safeParse(invalidTeamData);
  if (!resultInvalid.success) {
    console.log("   ✓ Invalid team data correctly rejected");
    console.log("   Errors found:", resultInvalid.error.errors.length);
  } else {
    console.log("   ✗ Invalid team data incorrectly accepted");
  }

  console.log("\n🏁 Team validation testing completed!");
}

// Additional test scenarios
export const testEdgeCases = () => {
  console.log("\n🧪 Testing Edge Cases...");
  
  // Test team with duplicate emails (this should pass schema validation but fail in controller)
  const duplicateEmailTeam = {
    ...validTeam4Members,
    members: [
      { ...validTeam4Members.members[0] },
      { ...validTeam4Members.members[0], email: validTeam4Members.teamLeader.email }
    ]
  };
  
  const resultDuplicate = teamRegisterSchema.safeParse(duplicateEmailTeam);
  if (resultDuplicate.success) {
    console.log("   ✓ Duplicate email passes schema (will be caught by controller)");
  } else {
    console.log("   ✗ Duplicate email caught by schema unexpectedly");
  }
  
  // Test team with invalid member count (this should pass schema validation but fail in controller)
  const invalidMemberCountTeam = {
    ...validTeam4Members,
    teamNumber: "4",
    members: [validTeam4Members.members[0]] // Only 1 member instead of 3
  };
  
  const resultCount = teamRegisterSchema.safeParse(invalidMemberCountTeam);
  if (resultCount.success) {
    console.log("   ✓ Invalid member count passes schema (will be caught by controller)");
  } else {
    console.log("   ✗ Invalid member count caught by schema unexpectedly");
  }
};

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testTeamValidation();
  testEdgeCases();
}
