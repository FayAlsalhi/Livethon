# 🏆 Livethon Admin Panel API Documentation

## 📋 Overview
This document provides complete API documentation for implementing the Livethon Admin Panel frontend. The backend provides all necessary endpoints for team management, search, filtering, and data export.
# 🏆 Livethon Admin Panel

### 1. **Complete API Documentation**
📖 **File**: `ADMIN_API_DOCUMENTATION.md`
- All API endpoints with examples
- Request/response formats
- Frontend implementation guide
- HTML templates and JavaScript functions

### 2. **Backend API Ready**
✅ **Status**: Complete and tested
- All endpoints working
- Basic authentication configured
- CORS enabled
- Rate limiting implemented


1. **Read the documentation**: `ADMIN_API_DOCUMENTATION.md`
2. **Test the API**: Visit `http://localhost:5050/admin` (credentials: `admin` / `livethon2024`)

## 🔑 Authentication

- **Username**: `admin`
- **Password**: `livethon2024`

## 📋 Required Features

- [ ] Search and filter teams
- [ ] Display team statistics
- [ ] Team table with project ideas
- [ ] Status change functionality
- [ ] CSV export (all teams + approved only)
- [ ] Responsive design
- [ ] RTL support for Arabic

## 🎯 API Endpoints

- `GET /api/admin/stats` - Team statistics
- `GET /api/admin/teams` - Search/filter teams
- `GET /api/admin/filter-options` - Organizations & specializations
- `GET /api/admin/teams.csv` - Export all teams
- `GET /api/admin/teams/approved.csv` - Export approved teams
- `POST /api/admin/teams/:id/status` - Change team status

## 🔧 Backend Status

- ✅ Server running on port 5050
- ✅ MongoDB connected
- ✅ All admin routes working
- ✅ Basic auth configured
- ✅ CORS enabled
- ✅ Rate limiting active


## 🔐 Authentication
All admin endpoints use **Basic Authentication**:
- **Username**: `admin` (from `.env` file)
- **Password**: `livethon2024` (from `.env` file)
- **Realm**: `Livethon Admin Panel`

## 🚀 API Endpoints

### 1. 📊 Get Team Statistics
**Endpoint**: `GET /api/admin/stats`  
**Description**: Retrieve overall team registration statistics  
**Response**:
```json
{
  "success": true,
  "data": {
    "teamRegistrations": 25,
    "pendingTeams": 15,
    "approvedTeams": 8,
    "rejectedTeams": 2
  }
}
```

### 2. 🔍 Search and Filter Teams
**Endpoint**: `GET /api/admin/teams`  
**Description**: Search and filter teams with various criteria  
**Query Parameters**:
- `teamName` (optional): Search by team name
- `leaderEmail` (optional): Search by team leader's email
- `organization` (optional): Filter by organization
- `specialization` (optional): Filter by specialization
- `status` (optional): Filter by status (pending/approved/rejected/cancelled)

**Example Request**: `GET /api/admin/teams?status=approved&organization=جامعة الملك سعود`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "team_id_here",
      "teamName": "فريق الابتكار",
      "projectIdea": "تطبيق ذكي لإدارة الطاقة",
      "teamNumber": 4,
      "teamLeader": {
        "name": "أحمد محمد",
        "email": "ahmed@example.com",
        "organization": "جامعة الملك سعود",
        "specialization": "هندسة الحاسوب"
      },
      "members": [
        {
          "name": "فاطمة علي",
          "email": "fatima@example.com",
          "organization": "جامعة الملك سعود",
          "specialization": "هندسة الحاسوب"
        }
      ],
      "status": "approved",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T14:20:00.000Z"
    }
  ]
}
```

### 3. 📋 Get Filter Options
**Endpoint**: `GET /api/admin/filter-options`  
**Description**: Get unique organizations and specializations for dropdowns  
**Response**:
```json
{
  "success": true,
  "data": {
    "organizations": [
      "جامعة الملك سعود",
      "جامعة الملك فهد",
      "جامعة الأميرة نورة"
    ],
    "specializations": [
      "هندسة الحاسوب",
      "علوم الحاسوب",
      "هندسة البرمجيات"
    ],
    "lastUpdated": "2024-01-16T15:30:00.000Z"
  }
}
```

### 4. 📊 Export All Teams to CSV
**Endpoint**: `GET /api/admin/teams.csv`  
**Description**: Export all teams (with current filters) to CSV format  
**Query Parameters**: Same as search endpoint  
**Response**: CSV file download  
**Filename**: `lifethon_teams.csv`

### 5. 📋 Export Approved Teams to CSV
**Endpoint**: `GET /api/admin/teams/approved.csv`  
**Description**: Export only approved teams to CSV format  
**Query Parameters**: Same as search endpoint (except status is always "approved")  
**Response**: CSV file download  
**Filename**: `lifethon_approved_teams.csv`

### 6. ✏️ Change Team Status
**Endpoint**: `POST /api/admin/teams/:id/status`  
**Description**: Change the status of a specific team  
**URL Parameters**: `id` - Team ID  
**Request Body**:
```json
{
  "status": "approved",
  "notes": "تم قبول الفريق بناءً على جودة المشروع"
}
```

**Status Values**:
- `pending`: في الانتظار
- `approved`: مقبول
- `rejected`: مرفوض
- `cancelled`: ملغي

**Response**:
```json
{
  "success": true,
  "message": "Team status changed to \"approved\" successfully",
  "data": {
    "teamId": "team_id_here",
    "teamName": "فريق الابتكار",
    "oldStatus": "pending",
    "newStatus": "approved",
    "notes": "تم قبول الفريق بناءً على جودة المشروع",
    "updatedAt": "2024-01-16T15:30:00.000Z"
  }
}
```

## 🎨 Frontend Implementation Guide

### Required UI Components

#### 1. 🔍 Search and Filter Section
```html
<div class="search-section">
  <h3>🔍 البحث والتصفية</h3>
  
  <!-- First Row -->
  <div class="search-row">
    <input type="text" id="teamName" placeholder="اسم الفريق">
    <select id="organization">
      <option value="">جميع المؤسسات</option>
      <!-- Populate from /api/admin/filter-options -->
    </select>
    <select id="specialization">
      <option value="">جميع التخصصات</option>
      <!-- Populate from /api/admin/filter-options -->
    </select>
  </div>
  
  <!-- Second Row -->
  <div class="search-row">
    <select id="status">
      <option value="">جميع الحالات</option>
      <option value="pending">في الانتظار</option>
      <option value="approved">مقبول</option>
      <option value="rejected">مرفوض</option>
      <option value="cancelled">ملغي</option>
    </select>
    <button id="searchBtn">🔍 بحث</button>
    <button id="resetBtn">🔄 إعادة تعيين</button>
    <button id="exportBtn">📊 تصدير إلى CSV</button>
    <button id="exportApprovedBtn">📋 تصدير الفرق المقبولة</button>
  </div>
</div>
```

#### 2. 📊 Statistics Cards
```html
<div class="stats" id="stats">
  <div class="stat-card">
    <div class="stat-number" id="totalTeams">-</div>
    <div>إجمالي الفرق</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="pendingTeams">-</div>
    <div>في الانتظار</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="approvedTeams">-</div>
    <div>مقبول</div>
  </div>
</div>
```

#### 3. 📋 Teams Table
```html
<div id="results">
  <table>
    <thead>
      <tr>
        <th>اسم الفريق</th>
        <th>فكرة المشروع</th>
        <th>قائد الفريق</th>
        <th>عدد الأعضاء</th>
        <th>الحالة</th>
        <th>تاريخ التسجيل</th>
        <th>تغيير الحالة</th>
      </tr>
    </thead>
    <tbody>
      <!-- Populate dynamically -->
    </tbody>
  </table>
</div>
```
