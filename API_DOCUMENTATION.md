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
For any questions about this API specification, please contact me:azaam. 