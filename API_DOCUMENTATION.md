# Lifethon Registration API Documentation

## Overview
This document outlines the API requirements for the Lifethon individual registration form integration.

## API Endpoint
```
POST /api/register/individual
```

## Request Format

### Headers
```
Content-Type: application/json
```

### Request Body Structure
```json
{
  "name": "string",
  "gender": "string", 
  "email": "string",
  "phone": "string",
  "studyWork": "string",
  "specialization": "string",
  "age": "string",
  "skills": "string"
}
```

### Field Details

| Field | Type | Required | Validation Rules | Example |
|-------|------|----------|------------------|---------|
| `name` | string | ✅ | Arabic only, 3-50 characters | "أحمد محمد علي" |
| `gender` | string | ✅ | Must be "ذكر" or "أنثى" | "ذكر" |
| `email` | string | ✅ | Valid email format | "ahmed@example.com" |
| `phone` | string | ✅ | Saudi format: +966XXXXXXXXX | "+966501234567" |
| `studyWork` | string | ✅ | 3-100 characters | "جامعة القصيم" |
| `specialization` | string | ✅ | 2-50 characters | "علوم الحاسب" |
| `age` | string | ✅ | 12-100 (as string) | "25" |
| `skills` | string | ✅ | 10-500 characters | "برمجة، تطوير الويب، الذكاء الاصطناعي" |

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "تم التسجيل بنجاح",
  "data": {
    "id": "unique_registration_id",
    "registrationDate": "2024-01-15T10:30:00Z"
  }
}
```

### Validation Error Response (400)
```json
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": {
    "name": "الاسم يجب أن يكون باللغة العربية",
    "email": "البريد الإلكتروني غير صحيح",
    "phone": "رقم الجوال غير صحيح"
  }
}
```

### Server Error Response (500)
```json
{
  "success": false,
  "message": "حدث خطأ في الخادم",
  "error": "Internal server error details"
}
```

## Validation Rules (Backend Should Implement)

### Name Validation
- **Required**: Yes
- **Min Length**: 3 characters
- **Max Length**: 50 characters
- **Pattern**: Arabic characters only (Unicode range: \u0600-\u06FF)
- **Error Message**: "الاسم يجب أن يكون باللغة العربية"

### Gender Validation
- **Required**: Yes
- **Allowed Values**: ["ذكر", "أنثى"]
- **Error Message**: "يرجى اختيار الجنس"

### Email Validation
- **Required**: Yes
- **Format**: Standard email format
- **Error Message**: "البريد الإلكتروني غير صحيح"

### Phone Validation
- **Required**: Yes
- **Format**: Saudi phone number format
- **Pattern**: ^(\+966|966)?[0-9]{9}$
- **Error Message**: "رقم الجوال غير صحيح (مثال: +966501234567)"

### Study/Work Validation
- **Required**: Yes
- **Min Length**: 3 characters
- **Max Length**: 100 characters
- **Error Message**: "جهة العمل/الدراسة مطلوبة"

### Specialization Validation
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Error Message**: "التخصص مطلوب"

### Age Validation
- **Required**: Yes
- **Type**: Integer (received as string)
- **Range**: 12-100
- **Error Message**: "العمر يجب أن يكون 12 سنة على الأقل"

### Skills Validation
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 500 characters
- **Error Message**: "المهارات/الخبرات مطلوبة"

## Frontend Integration Details

### Current Implementation
The frontend currently logs the data to console:
```javascript
console.log('Sending form data:', formData);
```

### Required Changes
Replace the console.log with actual API call:
```javascript
const response = await fetch('/api/register/individual', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});

const result = await response.json();

if (result.success) {
  // Show success modal
  setShowFinalSuccessModal(true);
} else {
  // Handle validation errors
  setErrors(result.errors);
}
```

## Error Handling

### Frontend Error Display
The frontend displays errors in Arabic under each field:
- Error messages are in Arabic
- Errors appear below the input field
- Errors clear when user starts typing

### Backend Error Response Format
All error messages should be in Arabic and match the frontend validation messages exactly.

## Security Considerations

### Input Sanitization
- Sanitize all text inputs to prevent XSS
- Validate file uploads if any
- Implement rate limiting for registration attempts

### Data Protection
- Encrypt sensitive data in transit and at rest
- Implement proper authentication if needed
- Log registration attempts for security monitoring

## Testing Scenarios

### Valid Registration
```json
{
  "name": "أحمد محمد علي",
  "gender": "ذكر",
  "email": "ahmed@example.com",
  "phone": "+966501234567",
  "studyWork": "جامعة القصيم",
  "specialization": "علوم الحاسب",
  "age": "25",
  "skills": "برمجة، تطوير الويب، الذكاء الاصطناعي، تعلم الآلة"
}
```

### Invalid Registration (Multiple Errors)
```json
{
  "name": "Ahmed",  // English name (should be Arabic)
  "gender": "",     // Empty gender
  "email": "invalid-email",  // Invalid email
  "phone": "123",   // Invalid phone
  "studyWork": "",  // Empty
  "specialization": "",  // Empty
  "age": "5",       // Too young
  "skills": "short" // Too short
}
```

## Additional Notes

### Language
- All user-facing messages should be in Arabic
- Error messages should match frontend validation messages exactly

### Database Considerations
- Store registration data with proper indexing
- Consider unique constraints on email and phone
- Implement soft delete for data retention

### Performance
- Implement caching for static validation rules
- Consider async processing for heavy operations
- Monitor API response times

## Contact
For any questions about this API specification, please contact me: azaam.

---

# Team Registration API Documentation

## Overview
This section outlines the API requirements for the Lifethon team registration form integration. Teams can register with 4 or 5 total members (including the team leader).

## API Endpoint
```
POST /api/register/team
```

## Request Format

### Headers
```
Content-Type: application/json
```

### Request Body Structure
```json
{
  "teamName": "string",
  "projectIdea": "string",
  "teamNumber": "string",
  "teamLeader": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "organization": "string",
    "specialization": "string",
    "role": "string",
    "gender": "string",
    "age": "string",
    "skills": "string"
  },
  "members": [
    {
      "name": "string",
      "email": "string",
      "phone": "string",
      "organization": "string",
      "specialization": "string",
      "role": "string",
      "gender": "string",
      "age": "string",
      "skills": "string"
    }
  ]
}
```

### Field Details

#### Team Information
| Field | Type | Required | Validation Rules | Example |
|-------|------|----------|------------------|---------|
| `teamName` | string | ✅ | 2-100 characters | "فريق التطوير الذكي" |
| `projectIdea` | string | ✅ | 20-1000 characters | "تطوير تطبيق ذكي لحل مشاكل المجتمع" |
| `teamNumber` | string | ✅ | Must be "4" or "5" | "4" |

#### Team Leader
| Field | Type | Required | Validation Rules | Example |
|-------|------|----------|------------------|---------|
| `name` | string | ✅ | 2-50 characters | "أحمد محمد علي" |
| `email` | string | ✅ | Valid email format | "ahmed@example.com" |
| `phone` | string | ✅ | Saudi format: +9665######## or 05######## | "+966501234567" |
| `organization` | string | ✅ | 2-100 characters | "جامعة القصيم" |
| `specialization` | string | ✅ | 2-50 characters | "علوم الحاسب" |
| `role` | string | ✅ | Must be "قائد الفريق" | "قائد الفريق" |
| `gender` | string | ✅ | Must be "ذكر" or "أنثى" | "ذكر" |
| `age` | string | ✅ | 12-100 (as string) | "25" |
| `skills` | string | ✅ | 10-500 characters | "برمجة، تطوير الويب، الذكاء الاصطناعي" |

#### Team Members
| Field | Type | Required | Validation Rules | Example |
|-------|------|----------|------------------|---------|
| `name` | string | ✅ | 2-50 characters | "فاطمة أحمد" |
| `email` | string | ✅ | Valid email format | "fatima@example.com" |
| `phone` | string | ❌ | Optional for members | "+966501234568" |
| `organization` | string | ❌ | Optional for members | "جامعة الملك سعود" |
| `specialization` | string | ❌ | Optional for members | "هندسة البرمجيات" |
| `role` | string | ✅ | Must be "عضو" | "عضو" |
| `gender` | string | ❌ | Optional for members | "أنثى" |
| `age` | string | ❌ | Optional for members | "23" |
| `skills` | string | ❌ | Optional for members | "تطوير تطبيقات، قواعد البيانات" |

## Response Format

### Success Response (200)
```json
{
  "success": true,
  "message": "تم تسجيل الفريق بنجاح",
  "data": {
    "teamId": "unique_team_id",
    "registrationDate": "2024-01-15T10:30:00Z",
    "teamSize": 4,
    "leaderEmail": "ahmed@example.com"
  }
}
```

### Validation Error Response (400)
```json
{
  "success": false,
  "message": "بيانات الفريق غير صحيحة",
  "errors": {
    "teamName": "اسم الفريق مطلوب",
    "projectIdea": "يجب أن تكون فكرة المشروع 20 حرف على الأقل",
    "teamNumber": "يجب تحديد عدد أعضاء الفريق",
    "teamLeader": {
      "name": "الاسم قصير جداً",
      "email": "صيغة البريد الإلكتروني غير صحيحة",
      "phone": "رقم الجوال غير صحيح",
      "skills": "يجب أن يكون الحقل 10 أحرف على الأقل"
    },
    "members": {
      "0": {
        "name": "اسم العضو مطلوب",
        "email": "صيغة البريد الإلكتروني غير صحيحة"
      }
    }
  }
}
```

### Server Error Response (500)
```json
{
  "success": false,
  "message": "حدث خطأ في الخادم",
  "error": "Internal server error details"
}
```

## Validation Rules (Backend Should Implement)

### Team Information Validation

#### Team Name
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Error Message**: "اسم الفريق مطلوب"

#### Project Idea
- **Required**: Yes
- **Min Length**: 20 characters
- **Max Length**: 1000 characters
- **Error Message**: "يجب أن تكون فكرة المشروع 20 حرف على الأقل"

#### Team Number
- **Required**: Yes
- **Allowed Values**: ["4", "5"]
- **Error Message**: "يجب تحديد عدد أعضاء الفريق"

### Team Leader Validation

#### Name
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Error Message**: "الاسم قصير جداً"

#### Email
- **Required**: Yes
- **Format**: Standard email format
- **Error Message**: "صيغة البريد الإلكتروني غير صحيحة"

#### Phone
- **Required**: Yes
- **Format**: Saudi mobile format
- **Pattern**: `^(?:\+966|0)5\d{8}$`
- **Error Message**: "رقم الجوال غير صحيح"

#### Organization
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Error Message**: "هذا الحقل مطلوب"

#### Specialization
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Error Message**: "هذا الحقل مطلوب"

#### Gender
- **Required**: Yes
- **Allowed Values**: ["ذكر", "أنثى"]
- **Error Message**: "الرجاء اختيار الجنس"

#### Age
- **Required**: Yes
- **Type**: Integer (received as string)
- **Range**: 12-100
- **Error Message**: "العمر يجب أن يكون بين 12 و 100 سنة"

#### Skills
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 500 characters
- **Error Message**: "يجب أن يكون الحقل 10 أحرف على الأقل"

### Team Members Validation

#### Name (Required for all members)
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Error Message**: "اسم العضو مطلوب"

#### Email (Required for all members)
- **Required**: Yes
- **Format**: Standard email format
- **Error Message**: "البريد الإلكتروني مطلوب"

#### Other Fields (Optional for members)
- All other fields are optional for team members
- If provided, they should follow the same validation rules as team leader

## Frontend Integration Details

### Current Implementation
The frontend currently logs the data to console:
```javascript
console.log('Sending team form data:', formData);
```

### Required Changes
Replace the console.log with actual API call:
```javascript
const response = await fetch('/api/register/team', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});

const result = await response.json();

if (result.success) {
  // Show success modal and reset form
  setShowFinalSuccessModal(true);
  // Reset form data
  setFormData(initialFormData);
  setActiveTab(0);
} else {
  // Handle validation errors
  if (result.errors.teamLeader) {
    setLeaderErrors(result.errors.teamLeader);
  }
  if (result.errors.members) {
    setMemberErrors(result.errors.members);
  }
  if (result.errors.teamName || result.errors.projectIdea || result.errors.teamNumber) {
    setTeamInfoErrors(result.errors);
  }
}
```

## Business Logic Rules

### Team Size Logic
- **4 Members Total**: 1 leader + 3 additional members
- **5 Members Total**: 1 leader + 4 additional members
- The `members` array should contain exactly `teamNumber - 1` objects

### Member Count Validation
```javascript
// Backend should validate:
const expectedMemberCount = parseInt(teamNumber) - 1;
if (members.length !== expectedMemberCount) {
  throw new Error(`Expected ${expectedMemberCount} members, got ${members.length}`);
}
```

### Email Uniqueness
- All team members (including leader) must have unique email addresses
- Backend should check for duplicate emails within the team

## Error Handling

### Frontend Error Display
The frontend displays errors in Arabic under each field:
- **Team Leader Errors**: Displayed under leader fields
- **Team Info Errors**: Displayed under team name and project idea fields
- **Member Errors**: Displayed under each member's fields
- Errors clear when user starts typing

### Backend Error Response Format
All error messages should be in Arabic and match the frontend validation messages exactly.

## Security Considerations

### Input Sanitization
- Sanitize all text inputs to prevent XSS
- Validate email formats and phone number patterns
- Implement rate limiting for team registration attempts

### Data Protection
- Encrypt sensitive data in transit and at rest
- Implement proper authentication if needed
- Log team registration attempts for security monitoring
- Ensure email addresses are not exposed in logs

### Team Size Limits
- Validate that team size is exactly 4 or 5 members
- Prevent manipulation of member count

## Testing Scenarios

### Valid Team Registration (4 Members)
```json
{
  "teamName": "فريق التطوير الذكي",
  "projectIdea": "تطوير تطبيق ذكي لحل مشاكل المجتمع المحلي من خلال استخدام تقنيات الذكاء الاصطناعي والتعلم الآلي",
  "teamNumber": "4",
  "teamLeader": {
    "name": "أحمد محمد علي",
    "email": "ahmed@example.com",
    "phone": "+966501234567",
    "organization": "جامعة القصيم",
    "specialization": "علوم الحاسب",
    "role": "قائد الفريق",
    "gender": "ذكر",
    "age": "25",
    "skills": "برمجة، تطوير الويب، الذكاء الاصطناعي، تعلم الآلة، قواعد البيانات"
  },
  "members": [
    {
      "name": "فاطمة أحمد",
      "email": "fatima@example.com",
      "phone": "+966501234568",
      "organization": "جامعة الملك سعود",
      "specialization": "هندسة البرمجيات",
      "role": "عضو",
      "gender": "أنثى",
      "age": "23",
      "skills": "تطوير تطبيقات، قواعد البيانات، واجهات المستخدم"
    },
    {
      "name": "محمد عبدالله",
      "email": "mohammed@example.com",
      "phone": "+966501234569",
      "organization": "جامعة الأميرة نورة",
      "specialization": "تقنية المعلومات",
      "role": "عضو",
      "gender": "ذكر",
      "age": "24",
      "skills": "تطوير الألعاب، الرسومات الحاسوبية، الذكاء الاصطناعي"
    },
    {
      "name": "سارة خالد",
      "email": "sara@example.com",
      "phone": "+966501234570",
      "organization": "جامعة الملك فهد",
      "specialization": "علوم البيانات",
      "role": "عضو",
      "gender": "أنثى",
      "age": "22",
      "skills": "تحليل البيانات، الإحصاء، تعلم الآلة، Python"
    }
  ]
}
```

### Valid Team Registration (5 Members)
```json
{
  "teamName": "فريق الابتكار التقني",
  "projectIdea": "إنشاء منصة تعليمية تفاعلية تجمع بين الواقع المعزز والذكاء الاصطناعي لتوفير تجربة تعليمية مخصصة ومتطورة للطلاب في جميع المراحل الدراسية",
  "teamNumber": "5",
  "teamLeader": {
    "name": "علي حسن",
    "email": "ali@example.com",
    "phone": "+966501234571",
    "organization": "جامعة الملك عبدالعزيز",
    "specialization": "هندسة الحاسوب",
    "role": "قائد الفريق",
    "gender": "ذكر",
    "age": "26",
    "skills": "تطوير الويب، تطوير تطبيقات الهاتف، الذكاء الاصطناعي، الواقع المعزز، إدارة المشاريع"
  },
  "members": [
    {
      "name": "نورا سعد",
      "email": "noura@example.com",
      "role": "عضو"
    },
    {
      "name": "عبدالرحمن فهد",
      "email": "abdulrahman@example.com",
      "role": "عضو"
    },
    {
      "name": "ريم سلطان",
      "email": "reem@example.com",
      "role": "عضو"
    },
    {
      "name": "خالد عمر",
      "email": "khalid@example.com",
      "role": "عضو"
    }
  ]
}
```

### Invalid Team Registration (Multiple Errors)
```json
{
  "teamName": "",  // Empty team name
  "projectIdea": "short",  // Too short
  "teamNumber": "6",  // Invalid team size
  "teamLeader": {
    "name": "A",  // Too short
    "email": "invalid-email",  // Invalid email
    "phone": "123",  // Invalid phone
    "organization": "",  // Empty
    "specialization": "",  // Empty
    "role": "قائد الفريق",
    "gender": "",  // Empty
    "age": "5",  // Too young
    "skills": "short"  // Too short
  },
  "members": [
    {
      "name": "",  // Empty name
      "email": "invalid",  // Invalid email
      "role": "عضو"
    }
  ]
}
```

## Additional Notes

### Language
- All user-facing messages should be in Arabic
- Error messages should match frontend validation messages exactly
- Field labels and placeholders are in Arabic

### Database Considerations
- Store team data with proper indexing
- Consider unique constraints on team names and leader emails
- Implement soft delete for data retention
- Store team member relationships properly

### Performance
- Implement caching for static validation rules
- Consider async processing for team registration
- Monitor API response times
- Optimize database queries for team data

### Team Management
- Consider implementing team editing capabilities
- Allow team leader to update member information
- Implement team member invitation system
- Track team registration status

## Contact
For any questions about this API specification, please contact me: azaam. 