# Lifethon Backend API

## Overview
This is the backend API for the Lifethon hackathon registration system, built with Node.js, Express, and MongoDB.

## Features
- **Individual Registration**: Handle individual participant registrations
- **Team Registration**: Handle team registrations (4-5 members)
- **Admin Panel**: Manage registrations, export data, update statuses
- **Security**: Input sanitization, rate limiting, CORS protection
- **Validation**: Comprehensive data validation using Zod schemas

## Tech Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod schema validation
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon for hot reloading

## Project Structure
```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── registerController.js  # Individual registration logic
│   └── teamController.js      # Team registration logic
├── middleware/
│   ├── sanitize.js        # Input sanitization
│   └── rateLimit.js       # Rate limiting
├── models/
│   ├── Individual.js      # Individual participant model
│   └── Team.js            # Team model
├── routes/
│   ├── registerRoutes.js  # Registration endpoints
│   └── adminRoutes.js     # Admin endpoints
├── validators/
│   ├── registerValidator.js  # Individual validation
│   └── teamValidator.js      # Team validation
├── test/
│   └── teamRegistration.test.js  # Test data and validation
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md              # This file
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/lifethon
   PORT=5050
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## API Endpoints

### Registration Endpoints

#### Individual Registration
```
POST /api/register/individual
```
**Rate Limit**: 5 attempts per 15 minutes
**Required Fields**: name, gender, email, phone, studyWork, specialization, age, skills

#### Team Registration
```
POST /api/register/team
```
**Rate Limit**: 3 attempts per 15 minutes
**Required Fields**: teamName, projectIdea, teamNumber, teamLeader (all fields), members (name & email)

### Admin Endpoints

#### Individual Registrations
```
GET /api/admin/registrations          # List all individual registrations
GET /api/admin/registrations.csv      # Export individual registrations to CSV
```

#### Team Registrations
```
GET /api/admin/teams                  # List all teams with pagination
GET /api/admin/teams.csv              # Export teams to CSV
GET /api/admin/teams/:id              # Get specific team details
PUT /api/admin/teams/:id              # Update team status
```

#### Statistics
```
GET /api/admin/stats                  # Get registration statistics
```

## Data Models

### Individual Model
```javascript
{
  name: String,           // Required, Arabic only, 3-50 chars
  gender: String,         // Required, "ذكر" or "أنثى"
  email: String,          // Required, unique, valid email
  phone: String,          // Required, unique, Saudi format
  studyWork: String,      // Required, 3-100 chars
  specialization: String, // Required, 2-50 chars
  age: String,            // Required, 12-100
  skills: String,         // Required, 10-500 chars
  timestamps: true
}
```

### Team Model
```javascript
{
  teamName: String,       // Required, unique, 2-100 chars
  projectIdea: String,    // Required, 20-1000 chars
  teamNumber: String,     // Required, "4" or "5"
  teamLeader: {           // Required, all fields
    name, email, phone, organization, specialization, role, gender, age, skills
  },
  members: [              // Required, name & email only
    { name, email, phone?, organization?, specialization?, role, gender?, age?, skills? }
  ],
  status: String,         // Default: "pending"
  registrationDate: Date, // Auto-generated
  notes: String,          // Admin notes
  timestamps: true
}
```

## Validation Rules

### Team Registration Validation
- **Team Size**: Must be exactly 4 or 5 members
- **Team Leader**: All fields required (same as Individual model)
- **Team Members**: Only name and email required, others optional
- **Email Uniqueness**: All emails must be unique across the entire team
- **Conflict Prevention**: No member can be registered in multiple teams or as individual

### Phone Number Format
- **Saudi Format**: `+9665XXXXXXXX` or `05XXXXXXXX`
- **Pattern**: `^(?:\+966|0)5\d{8}$`

### Name Validation
- **Arabic Names**: Must contain Arabic characters only
- **Pattern**: `^[\u0600-\u06FF\s]+$`

## Security Features

### Input Sanitization
- Removes dangerous characters and normalizes strings
- Prevents NoSQL injection and XSS attacks
- Applied to all registration endpoints

### Rate Limiting
- **Individual Registration**: 5 attempts per 15 minutes
- **Team Registration**: 3 attempts per 15 minutes
- **General API**: 100 requests per 15 minutes

### CORS Protection
- Configurable origins via environment variables
- Default: `http://localhost:3000`

### Helmet Security
- HTTP security headers
- Content Security Policy
- XSS protection

## Error Handling

### Response Format
```javascript
// Success Response
{
  "success": true,
  "message": "تم التسجيل بنجاح",
  "data": { ... }
}

// Error Response
{
  "success": false,
  "message": "بيانات غير صحيحة",
  "errors": { ... }
}
```

### Error Types
- **400**: Validation errors (client-side data issues)
- **409**: Conflict errors (duplicate data)
- **429**: Rate limit exceeded
- **500**: Server errors

## Testing

### Run Validation Tests
```bash
node test/teamRegistration.test.js
```

### Test Data
The test file includes:
- Valid 4-member team data
- Valid 5-member team data
- Invalid team data for error testing

## Database Indexes

### Individual Collection
- `email`: Unique index
- `phone`: Unique index
- `createdAt`: Descending index

### Team Collection
- `teamName`: Unique index
- `teamLeader.email`: Index
- `members.email`: Index
- `status`: Index
- `createdAt`: Descending index

## Performance Considerations

### Database Optimization
- Efficient indexing on frequently queried fields
- Lean queries for read operations
- Pagination for large result sets

### Caching Strategy
- Consider implementing Redis for frequently accessed data
- Cache validation rules and static data

### Monitoring
- Log all registration attempts
- Monitor API response times
- Track error rates and types

## Deployment

### Production Checklist
- [ ] Set proper environment variables
- [ ] Configure MongoDB connection string
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting thresholds
- [ ] Set up logging and monitoring
- [ ] Configure SSL/TLS certificates
- [ ] Set up backup and recovery procedures

### Environment Variables
```env
NODE_ENV=production
MONGO_URI=mongodb://username:password@host:port/database
PORT=5050
CORS_ORIGIN=https://yourdomain.com
```

## Support

For questions or issues, please contact the development team.

## License

This project is proprietary and confidential.
