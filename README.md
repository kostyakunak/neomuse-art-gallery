# NeoMuse 🎨

An immersive, interactive 3D art gallery experience built with cutting-edge web technologies. This project showcases modern frontend development techniques including real-time 3D transformations, smooth animations, and dynamic database integration.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://neomuse.netlify.app)
[![Built with React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e)](https://supabase.com/)

---

## 🌟 Project Highlights

### Interactive 3D Effects
Experience cards that respond to your mouse movements with **real-time 3D tilt effects**. Each artifact card calculates perspective transformations based on cursor position, creating an engaging depth effect that brings the gallery to life.

### Intelligent Animations
- **Cascading entrance animations** - Cards fade in sequentially with staggered delays
- **Smooth hover transitions** - Images scale and overlays appear with fluid timing
- **Modal animations** - Scale and fade effects for viewing detailed information
- **Background parallax** - Gradient spotlight follows your cursor across the screen

### Production-Ready Architecture
- **Supabase backend** with proper Row Level Security policies
- **Type-safe** development with TypeScript throughout
- **Component-based** architecture for maintainability
- **Responsive design** that works beautifully on all devices

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **3D Mouse Tracking** | Cards tilt and rotate based on cursor position using perspective transforms |
| **Dynamic Color Themes** | Each artifact has its own color palette that influences UI elements |
| **Real-time Database** | Content managed through Supabase with instant updates |
| **Smooth Animations** | Custom CSS keyframes combined with React state management |
| **Modal Detail View** | Full-screen presentation of artifacts with rich metadata |
| **Optimized Performance** | Lazy loading, efficient re-renders, and optimized animations |

---

## 🛠️ Technical Stack

### Frontend
- **React 18.3** - Latest features including concurrent rendering
- **TypeScript 5.5** - Full type safety across the entire codebase
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling with custom animations

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **Row Level Security** - Secure data access policies
- **RESTful API** - Auto-generated API from database schema

### UI/UX Libraries
- **Lucide React** - Beautiful, consistent icon system
- **Custom CSS Animations** - Hand-crafted keyframe animations for smooth interactions

---

## 📂 Project Structure

```
neomuse/
├── src/
│   ├── components/
│   │   ├── ArtifactCard.tsx      # Interactive 3D card component
│   │   └── ArtifactModal.tsx     # Detail view modal
│   ├── lib/
│   │   └── supabase.ts           # Database client & types
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles & animations
├── supabase/
│   └── migrations/
│       └── create_artifacts_table.sql  # Database schema
└── package.json
```

---

## 🎨 Design Philosophy

### Visual Experience
The project uses a **dark, sophisticated theme** with accent colors derived from each artwork. This creates a museum-like atmosphere that lets the art shine while maintaining a modern, premium feel.

### Animation Strategy
All animations follow these principles:
- **Purposeful** - Every animation serves a functional purpose
- **Smooth** - 60 FPS performance with GPU-accelerated transforms
- **Subtle** - Enhances without overwhelming the content
- **Responsive** - Instant feedback to user interactions

### Color System
Each artifact has a unique color theme that:
- Creates a glowing halo effect on hover
- Influences the overlay gradient
- Appears as accent dots and badges
- Provides visual categorization

---

## 🌐 Live Demo

**🎨 [View Live Gallery →](https://neomuse.netlify.app)**

Experience the interactive 3D art gallery with real-time animations and smooth transitions. Built with React, TypeScript, and Supabase, hosted on Netlify.

> **Portfolio Note:** This is a copy of a real client project, showcased here as a portfolio demonstration of modern web development capabilities.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works great)



### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 💾 Database Schema

The application uses a single, well-structured table:

### `artifacts` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key, auto-generated |
| `title` | text | Artwork title |
| `artist` | text | Artist name |
| `year` | text | Year of creation |
| `description` | text | Detailed description |
| `image_url` | text | Direct link to image (Pexels) |
| `category` | text | Art category (digital, photography, etc.) |
| `color_theme` | text | Hex color for UI theming |
| `display_order` | integer | Sort order in gallery |
| `created_at` | timestamptz | Record creation timestamp |

### Security Policies
- **Public read access** - Anyone can view the gallery
- **Authenticated write access** - Only authenticated users can manage content
- **RLS enabled** - All queries run through Row Level Security

---

## 📱 Responsive Design

The gallery adapts seamlessly across devices:

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: 2-column grid
- **Desktop (1024px - 1280px)**: 3-column grid
- **Large Desktop (> 1280px)**: 4-column grid

All interactions work perfectly on touch devices with tap-based navigation.

---

## ⚡ Performance Optimizations

### Image Loading
- **Direct Pexels URLs** with optimized parameters
- **Lazy loading** browser native implementation
- **Aspect ratio preserved** to prevent layout shifts

### Animation Performance
- **GPU-accelerated** transforms (translate3d, scale, rotate)
- **Will-change hints** for frequently animated properties
- **RequestAnimationFrame** for smooth mouse tracking

### Code Splitting
- **Dynamic imports** ready for route-based splitting
- **Tree shaking** removes unused code
- **Minification** in production builds

---


## 🚀 Future Enhancements

Potential features for expansion:

- [ ] **Search & Filters** - Filter by category, artist, or year
- [ ] **User Favorites** - Allow visitors to save favorite pieces
- [ ] **Admin Panel** - CRUD interface for managing artifacts
- [ ] **Image Upload** - Direct upload instead of URL-only
- [ ] **Shareable Links** - Deep linking to specific artifacts
- [ ] **Virtual Tours** - Guided walkthrough functionality
- [ ] **AR Preview** - View art in your space using AR
- [ ] **Social Sharing** - Share artifacts on social media

---

