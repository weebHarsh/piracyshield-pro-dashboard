# PiracyShield Pro - Complete Component Catalog

## Component Architecture Overview

This document provides a comprehensive catalog of every UI component in PiracyShield Pro, including their structure, properties, behaviors, and implementation details.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Navigation Components](#navigation-components)
3. [Data Display Components](#data-display-components)
4. [Form Components](#form-components)
5. [Feedback Components](#feedback-components)
6. [Overlay Components](#overlay-components)
7. [Chart Components](#chart-components)
8. [Landing Page Components](#landing-page-components)

---

## Layout Components

### 1. Main Application Container

**Location:** `index.html` - Root container

```html
<div class="app-container">
  <!-- Landing Page -->
  <div id="landing" class="landing-page">
    <!-- Landing content -->
  </div>
  
  <!-- Dashboard -->
  <div class="dashboard-container" id="dashboard">
    <!-- Dashboard content -->
  </div>
</div>
```

**State Management:**
- Landing page: Visible when not logged in
- Dashboard: Visible after successful login
- Toggle via `handleAdminLogin()` and `handleLogout()`

### 2. Sidebar Component

**Purpose:** Left navigation panel for dashboard

**Structure:**
```html
<aside class="sidebar" id="sidebar">
  <!-- Logo & User Info -->
  <div class="sidebar-header">
    <div class="logo">
      <div class="logo-icon">
        <svg><!-- Shield icon --></svg>
      </div>
      <span class="logo-text">PiracyShield</span>
    </div>
    
    <div class="user-info">
      <div class="user-avatar">
        <span id="sidebarUserInitial">A</span>
      </div>
      <div class="user-details">
        <div id="sidebarUserName">Admin User</div>
        <div class="account-badge" id="accountBadge">
          Pro
        </div>
      </div>
    </div>
  </div>
  
  <!-- Navigation Links -->
  <nav class="sidebar-nav">
    <a onclick="switchTab('dashboard')" 
       class="nav-item active" 
       data-tab="dashboard">
      <svg><!-- Dashboard icon --></svg>
      <span>Dashboard</span>
    </a>
    <!-- More nav items -->
  </nav>
  
  <!-- Logout Button -->
  <div class="sidebar-footer">
    <button onclick="handleLogout()" class="nav-item">
      <svg><!-- Logout icon --></svg>
      <span>Logout</span>
    </button>
  </div>
</aside>
```

**Styles:**
```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 16px 0;
  overflow-y: auto;
  z-index: 40;
}
```

**Properties:**
- `id="sidebar"` - Fixed positioning
- Width: 240px (static)
- Background: White
- Border right: 1px solid #e5e7eb
- Scrollable content area

**States:**
- Active: Teal gradient background on nav item
- Hover: Teal-50 background on nav item
- Default: Gray-600 text

### 3. Main Content Area

**Purpose:** Right side content panel

**Structure:**
```html
<main class="main-content">
  <!-- Top Bar -->
  <div class="top-bar">
    <h1 id="dashboardTitle">Dashboard</h1>
    
    <!-- Notifications -->
    <div class="notification-bell">
      <button onclick="toggleNotifications()">
        <svg><!-- Bell icon --></svg>
        <span class="notification-badge" id="notificationBadge">3</span>
      </button>
      <div class="notification-dropdown" id="notificationDropdown">
        <!-- Notifications list -->
      </div>
    </div>
    
    <!-- Usage Stats -->
    <div class="usage-stats" id="usageStats">
      <div class="usage-item">
        <span class="usage-label">Keywords:</span>
        <span class="usage-value">5/∞</span>
      </div>
    </div>
    
    <!-- Actions -->
    <button onclick="refreshData()">
      <span id="refreshSpinner"></span>
      Refresh
    </button>
  </div>
  
  <!-- Content Sections -->
  <div class="content-area">
    <div id="dashboard-section" class="section active">
      <!-- Dashboard content -->
    </div>
    <!-- More sections -->
  </div>
</main>
```

**Dimensions:**
- Margin left: 240px (sidebar width)
- Min height: 100vh
- Background: gray-50

---

## Navigation Components

### 1. Top Navigation Bar (Landing Page)

**Structure:**
```html
<nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md 
            border-b border-gray-200 z-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 
                    rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-white">
            <!-- Shield icon -->
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-900">PiracyShield</span>
      </div>
      
      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#how">How It Works</a>
        <a href="#resources">Resources</a>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex items-center space-x-4">
        <button onclick="openLogin()" class="btn-secondary">
          Login
        </button>
        <button onclick="scrollToTrial()" class="btn-primary">
          Start Free Trial
        </button>
      </div>
    </div>
  </div>
</nav>
```

**Behaviors:**
- Fixed positioning on scroll
- Backdrop blur effect (backdrop-blur-md)
- Hover effect on links: text color change to teal-600
- Responsive: Hide nav links on mobile

### 2. Sidebar Navigation

**Navigation Items:**

```javascript
// Navigation configuration
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'chart-bar' },
  { id: 'incidents', label: 'Incidents', icon: 'exclamation-circle' },
  { id: 'takedowns', label: 'Takedowns', icon: 'document-text' },
  { id: 'content', label: 'Content', icon: 'shield-check' },
  { id: 'configuration', label: 'Configuration', icon: 'cog' },
  { id: 'users', label: 'Users', icon: 'users' }
];
```

**Active State:**
```css
.nav-item.active {
  background: var(--gradient-teal-primary);
  color: white;
  border-radius: 8px;
}
```

---

## Data Display Components

### 1. KPI Card Component

**Purpose:** Display key performance indicators

**Structure:**
```html
<div class="kpi-card kpi-card-teal-dark" 
     draggable="true" 
     data-widget-id="active-threats">
  <div class="kpi-icon">
    <svg><!-- Icon --></svg>
  </div>
  <div class="kpi-content">
    <div class="kpi-label">Active Threats</div>
    <div class="kpi-value" id="activeThreats" 
         style="color: var(--teal-800);">
      287
    </div>
    <div class="kpi-change positive">
      <span>↑12%</span>
      <span class="text-gray-500 ml-1">vs last month</span>
    </div>
  </div>
</div>
```

**Variants:**
| Type | Class | Color | Use Case |
|------|-------|-------|-----------|
| Dark | `kpi-card-teal-dark` | teal-800 | Primary metrics |
| Base | `kpi-card-teal` | teal-700 | Secondary metrics |
| Light | `kpi-card-teal-light` | teal-500 | Tertiary metrics |
| Lighter | `kpi-card-teal-lighter` | teal-400 | Quaternary metrics |

**Styles:**
```css
.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 118, 110, 0.12),
              0 0 20px rgba(15, 118, 110, 0.08);
}

.kpi-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
}

.kpi-value {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.kpi-change {
  font-size: 12px;
  margin-top: 4px;
}
```

**Interactive Features:**
- Drag and drop reordering
- Save layout to localStorage
- Real-time value updates
- Hover elevation effect

### 2. Data Table Component

**Purpose:** Display sortable, filterable data

**Structure:**
```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>
          <input type="checkbox" id="selectAll" 
                 onchange="toggleSelectAll()">
        </th>
        <th>Title</th>
        <th>Platform</th>
        <th>Risk</th>
        <th>Similarity</th>
        <th>Status</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="incidentsTable">
      <tr>
        <td>
          <input type="checkbox" class="incident-checkbox" 
                 value="${incident.id}">
        </td>
        <td>
          <div class="flex items-center space-x-2">
            <span class="text-lg">${thumbnail}</span>
            <span class="font-medium">${title}</span>
          </div>
        </td>
        <td>
          <span class="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
            ${platform}
          </span>
        </td>
        <td>
          <span class="status-badge status-${risk}">
            <span class="risk-dot risk-dot-${risk}"></span>
            ${risk}
          </span>
        </td>
        <td>
          <strong class="text-teal-600">${similarity}%</strong>
        </td>
        <td>
          <span class="status-badge status-${status}">
            ${status}
          </span>
        </td>
        <td class="text-gray-600 text-sm">${date}</td>
        <td>
          <div class="action-group">
            <button onclick="openCaseDetails(${id})" 
                    class="action-btn action-btn-secondary">
              Details
            </button>
            <button onclick="openTakedownModal(${id})" 
                    class="action-btn action-btn-primary">
              Takedown
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Styles:**
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: var(--teal-50);
  border-bottom: 2px solid var(--primary-teal);
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--primary-teal);
  font-size: 14px;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.data-table tbody tr {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.data-table tbody tr:hover {
  background: linear-gradient(90deg, 
    rgba(15, 118, 110, 0.04), 
    transparent);
}
```

**Features:**
- Row selection with checkboxes
- Bulk actions for selected rows
- Hover highlighting
- Status badges with color coding
- Action buttons per row
- Responsive design (horizontal scroll)

### 3. Status Badge Component

**Purpose:** Display status with color coding

**Variants:**
```css
/* Base badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
}

/* Risk levels */
.status-critical {
  background: #fee2e2;
  color: #991b1b;
}

.status-high {
  background: #ffedd5;
  color: #9a3412;
}

.status-medium {
  background: #fef3c7;
  color: #92400e;
}

.status-low {
  background: #d1fae5;
  color: #065f46;
}

/* Status types */
.status-new {
  background: #dbeafe;
  color: #1e40af;
}

.status-in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-resolved {
  background: #d1fae5;
  color: #065f46;
}

.status-closed {
  background: #f3f4f6;
  color: #374151;
}
```

**HTML:**
```html
<span class="status-badge status-critical">
  <span class="risk-dot risk-dot-critical"></span>
  Critical
</span>
```

### 4. Chart Container Component

**Purpose:** Wrapper for ECharts visualizations

**Structure:**
```html
<div class="chart-container" draggable="true" data-widget-id="detection-chart">
  <div class="chart-header">
    <h3 class="chart-title">Detection vs Takedown Trends</h3>
    <p class="chart-subtitle">Weekly analysis</p>
  </div>
  <div id="detectionChart" style="height: 280px;"></div>
</div>
```

**Styles:**
```css
.chart-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.chart-container:hover {
  box-shadow: var(--shadow-md);
}

.chart-header {
  margin-bottom: 16px;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--neutral-800);
  font-family: 'Poppins', sans-serif;
}

.chart-subtitle {
  font-size: 14px;
  color: var(--neutral-500);
}
```

---

## Form Components

### 1. Text Input

```html
<div class="form-group">
  <label class="form-label">Keyword</label>
  <input type="text" 
         id="keywordInput" 
         class="form-input" 
         placeholder="Add keyword">
</div>
```

**Styles:**
```css
.form-label {
  display: block;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 8px;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all var(--transition-fast);
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-teal);
  box-shadow: var(--shadow-glow-teal);
}

.form-input::placeholder {
  color: #9ca3af;
}
```

### 2. Select Dropdown

```html
<select id="filterRisk" class="filter-select" onchange="filterIncidents()">
  <option value="">All Risks</option>
  <option value="critical">Critical</option>
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</select>
```

**Styles:**
```css
.filter-select {
  padding: 8px 32px 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-teal);
}
```

### 3. Checkbox Group

```html
<div class="checkbox-group">
  <label class="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" 
           class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
           value="YouTube">
    <span class="text-sm text-gray-700">YouTube</span>
  </label>
</div>
```

**Styles:**
```css
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #d1d5db;
}

input[type="checkbox"]:checked {
  background: var(--primary-teal);
  border-color: var(--primary-teal);
}
```

### 4. Bulk Upload Component

**Purpose:** Excel file upload with drag & drop

**Structure:**
```html
<div class="bulk-upload-panel" id="bulkUploadPanel" style="display: none;">
  <div class="upload-area" id="uploadArea">
    <svg class="upload-icon">
      <!-- Upload icon -->
    </svg>
    <p class="upload-text">
      Drag & drop Excel file or click to browse
    </p>
    <p class="upload-hint">
      Supports .xlsx, .xls, .csv files
    </p>
    <input type="file" 
           id="excelFileInput" 
           accept=".xlsx,.xls,.csv" 
           style="display: none;">
  </div>
  
  <div class="upload-progress hidden" id="uploadProgress">
    <div class="progress-bar">
      <div class="progress-fill" id="progressFill"></div>
    </div>
    <div class="progress-text" id="progressText">
      Processing...
    </div>
  </div>
  
  <button onclick="downloadTemplate()">
    Download Template
  </button>
</div>
```

**JavaScript:**
```javascript
setupExcelUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('excelFileInput');
  
  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    this.handleExcelUpload(files[0]);
  });
  
  // File input
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', (e) => {
    this.handleExcelUpload(e.target.files[0]);
  });
}
```

**Styles:**
```css
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.upload-area.dragover {
  border-color: var(--primary-teal);
  background: var(--teal-50);
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-teal-primary);
  transition: width var(--transition-base);
}
```

---

## Feedback Components

### 1. Toast Notification

**Purpose:** Display temporary feedback messages

**Structure:**
```html
<div id="toastContainer"></div>

<!-- Toast template -->
<div class="toast toast-success">
  <svg class="toast-icon">
    <!-- Success icon -->
  </svg>
  <span class="toast-message">Operation successful!</span>
  <button class="toast-close" onclick="closeToast()">
    <svg><!-- X icon --></svg>
  </button>
</div>
```

**JavaScript:**
```javascript
showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg class="toast-icon">
      <!-- Icon based on type -->
    </svg>
    <span class="toast-message">${message}</span>
    <button class="toast-close">
      <svg>X icon</svg>
    </button>
  `;
  
  container.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}
```

**Styles:**
```css
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  animation: slideIn 0.3s ease;
  margin-bottom: 12px;
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-warning {
  border-left: 4px solid #f59e0b;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### 2. Loading Spinner

```html
<span class="loading-spinner hidden" id="refreshSpinner"></span>
```

**Styles:**
```css
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top-color: var(--primary-teal);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### 3. Empty State

```html
<div class="empty-state">
  <svg class="empty-state-icon">
    <!-- Empty state icon -->
  </svg>
  <h3 class="empty-state-title">No incidents found</h3>
  <p class="empty-state-description">
    Start by adding keywords to monitor
  </p>
  <button class="btn-primary">Add Keyword</button>
</div>
```

**Styles:**
```css
.empty-state {
  text-align: center;
  padding: 64px 32px;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  color: #d1d5db;
  margin: 0 auto 16px;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--neutral-800);
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: var(--neutral-500);
  margin-bottom: 24px;
}
```

---

## Overlay Components

### 1. Modal Component

**Purpose:** Display content inan overlay

**Structure:**
```html
<div class="modal-overlay" id="takedownModal">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Submit Takedown Request</h2>
      <button onclick="closeTakedownModal()" class="modal-close">
        <svg><!-- X icon --></svg>
      </button>
    </div>
    
    <div class="modal-body">
      <form id="takedownForm">
        <div class="form-group">
          <label class="form-label">Platform</label>
          <input type="text" class="form-input" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Reason</label>
          <textarea class="form-textarea" rows="4" required></textarea>
        </div>
      </form>
    </div>
    
    <div class="modal-footer">
      <button onclick="closeTakedownModal()" class="btn-secondary">
        Cancel
      </button>
      <button onclick="submitTakedown()" class="btn-primary">
        Submit
      </button>
    </div>
  </div>
</div>
```

**JavaScript:**
```javascript
openTakedownModal(incidentId) {
  document.getElementById('takedownModal').classList.add('open');
  document.body.classList.add('noscroll');
  this.currentIncidentId = incidentId;
}

closeTakedownModal() {
  document.getElementById('takedownModal').classList.remove('open');
  document.body.classList.remove('noscroll');
  document.getElementById('takedownForm').reset();
}
```

**Styles:**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.open {
  display: flex;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}
```

---

## Chart Components

### 1. Detection vs Takedown Chart (Line)

**Type:** ECharts Line Chart

**Configuration:**
```javascript
initializeDetectionChart() {
  const chart = echarts.init(document.getElementById('detectionChart'));
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: {
        color: '#1f2937'
      }
    },
    legend: {
      data: ['Detections', 'Takedowns'],
      bottom: 0,
      textStyle: {
        color: '#6b7280'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: 'Detections',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90],
        lineStyle: {
          color: '#14b8a6',
          width: 2
        },
        itemStyle: {
          color: '#14b8a6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(20, 184, 166, 0.3)' },
              { offset: 1, color: 'rgba(20, 184, 166, 0)' }
            ]
          }
        }
      },
      {
        name: 'Takedowns',
        type: 'line',
        smooth: true,
        data: [90, 102, 81, 104, 70],
        lineStyle: {
          color: '#f59e0b',
          width: 2
        },
        itemStyle: {
          color: '#f59e0b'
        }
      }
    ]
  };
  
  chart.setOption(option);
  this.charts.detection = chart;
}
```

### 2. Content Type Distribution (Pie)

**Type:** ECharts Pie Chart

### 3. Platform Performance (Bar)

**Type:** ECharts Horizontal Bar Chart

### 4. Risk Distribution (Donut)

**Type:** ECharts Donut Chart

---

## Landing Page Components

### 1. Hero Section

**Structure:**
```html
<section class="hero-bg pt-24 pb-16 relative">
  <div class="floating-shapes">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl lg:text-6xl font-bold mb-6">
          <span id="typed-headline" class="gradient-text"></span>
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Advanced AI-powered content protection...
        </p>
        <div class="flex gap-4">
          <button onclick="scrollToTrial()" class="btn-primary">
            Start Free Trial
          </button>
          <button onclick="openDemo()" class="btn-secondary">
            Watch Demo
          </button>
        </div>
      </div>
      
      <div class="relative">
        <div class="bg-white rounded-2xl shadow-2xl p-6">
          <!-- Dashboard preview -->
        </div>
      </div>
    </div>
  </div>
</section>
```

**Typed.js Integration:**
```javascript
initializeTyped() {
  new Typed('#typed-headline', {
    strings: [
      'Protect Your Content',
      'Stop Piracy Today',
      'Monitor 1000+ Platforms',
      'Get Real-time Alerts'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  });
}
```

### 2. Feature Card Grid

```html
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-center text-3xl font-bold mb-12">
      Powerful Features
    </h2>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="feature-card card-hover">
        <div class="feature-icon">
          <svg><!-- Icon --></svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">
          AI Detection
        </h3>
        <p class="text-gray-600">
          Advanced machine learning...
        </p>
      </div>
      
      <!-- More feature cards -->
    </div>
  </div>
</section>
```

### 3. Pricing Cards

```html
<section class="py-20">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-3 gap-8">
      <div class="pricing-card">
        <div class="pricing-header">
          <h3 class="text-xl font-semibold">Free</h3>
          <div class="pricing-price">
            <span class="text-4xl font-bold">$0</span>
            <span class="text-gray-500">/month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li>50 keywords</li>
          <li>5 platforms</li>
          <li>Email alerts</li>
        </ul>
        <button class="btn-secondary w-full">
          Get Started
        </button>
      </div>
      
      <!-- Pro and Enterprise cards -->
    </div>
  </div>
</section>
```

---

## Component State Management

### State Object Structure

```javascript
class PiracyShieldApp {
  constructor() {
    this.state = {
      currentTab: 'dashboard',
      accountType: 'pro',
      selectedIncidents: new Set(),
      currentUser: null,
      data: {
        incidents: [],
        takedowns: [],
        whitelist: [],
        blacklist: [],
        keywords: [],
        platforms: [],
        scheduledScans: [],
        users: []
      }
    };
  }
}
```

### Component Lifecycle

1. **Initialization** (`init()`)
   - Initialize data
   - Setup event listeners
   - Initialize charts
   - Start real-time updates

2. **Mounting** (DOM ready)
   - Render components
   - Bind event handlers
   - Initialize animations

3. **Update** (Data changes)
   - Update UI
   - Re-render affected components
   - Save to localStorage

4. **Cleanup** (Unmount)
   - Clear intervals
   - Remove event listeners
   - Clear localStorage

---

## Accessibility Features

### ARIA Labels

```html
<button aria-label="Submit takedown request">
  <svg aria-hidden="true"><!-- Icon --></svg>
</button>

<nav aria-label="Main navigation">
  <!-- Links -->
</nav>

<div role="alert" aria-live="polite">
  <!-- Toast notification -->
</div>
```

### Keyboard Navigation

- All interactive elements are focusable
- Tab order follows visual hierarchy
- Enter/Space triggers actions
- Escape closes modals

### Focus Management

```javascript
// Trap focus in modal
trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

---

**Last Updated:** 2025-04-07  
**Version:** 1.0  
**Dashboard:** PiracyShield Pro v5.0