# Guide Verification Integration

This integration successfully merges the guide verification functionality from `guide_verify_frontend` into the main `frontend` application with consistent design and styling.

## Features Integrated

### 1. Guide Services Overview (`/guide-services`)
- **Route**: `/guide-services`
- **Description**: Landing page for guide verification services
- **Features**:
  - Service overview cards
  - Statistics display
  - Feature highlights
  - Navigation to registration and search

### 2. Guide Registration (`/guide-registration`)
- **Route**: `/guide-registration`
- **Description**: Form for tour guides to register and get verification
- **Features**:
  - Multi-field registration form
  - Photo upload (file or URL)
  - Real-time form validation
  - Success/error response handling
  - Verified guide card display

### 3. Find Guide (`/find-guide`)
- **Route**: `/find-guide`
- **Description**: Search and verify tour guides
- **Features**:
  - Manual search by ID and name
  - QR code scanner for instant verification
  - Guide information display
  - Error handling for not found guides

## Components

### GuideCard
- **Location**: `/src/components/GuideCard.jsx`
- **Purpose**: Reusable component for displaying verified guide information
- **Features**:
  - Verified badge
  - Guide photo
  - Complete guide details
  - QR code display
  - Responsive design

## Design System Integration

### Styling Approach
- **Framework**: Tailwind CSS (consistent with main frontend)
- **Color Scheme**: 
  - Primary: Orange to Red gradient
  - Secondary: Blue gradients
  - Success: Green accents
  - Background: Multi-color gradient (green, blue, orange)

### Navigation Integration
- Added "Guide Services" to main navigation menu
- Consistent header/footer integration
- Proper routing with React Router

## Dependencies Added
- `html5-qrcode`: ^2.3.8 - For QR code scanning functionality
- `lucide-react`: Already available - For consistent icons
- `styled-components`: Already available - For component styling
- `axios`: Already available - For API calls

## API Integration
The pages are configured to connect to the guide verification backend:
- **Base URL**: `http://localhost:5000/api`
- **Endpoints**:
  - `POST /register` - Guide registration
  - `POST /find` - Manual guide search
  - `POST /findByQR` - QR code guide verification

## File Structure
```
frontend/src/
├── pages/
│   ├── GuideServicesPage.jsx     # Overview and navigation
│   ├── GuideRegistrationPage.jsx # Registration form
│   └── FindGuidePage.jsx         # Search and verification
├── components/
│   └── GuideCard.jsx             # Reusable guide display
└── App.jsx                       # Updated with new routes
```

## Navigation Routes
- `/guide-services` - Main guide services page
- `/guide-registration` - Guide registration form
- `/find-guide` - Guide search and verification

## Usage Instructions

### For Tourists/Visitors:
1. Navigate to "Guide Services" from the main menu
2. Click "Find Verified Guide"
3. Search by ID/name or scan QR code
4. Verify guide authenticity

### For Tour Guides:
1. Navigate to "Guide Services" from the main menu
2. Click "Register as Guide"
3. Fill out the registration form
4. Upload photo or provide photo URL
5. Submit for government verification
6. Receive verification status and QR code

## Mobile Responsiveness
- All pages are fully responsive
- QR scanner works on mobile devices
- Touch-friendly interface
- Optimized layouts for all screen sizes

## Error Handling
- Network error handling
- Form validation
- User-friendly error messages
- Loading states for async operations

## Security Features
- Input validation and sanitization
- Secure file upload handling
- Government verification backend integration
- QR code security measures