# إس إم كيو العقارية - SMQ Real Estate

## Overview
A real estate company website for SMQ (إس إم كيو العقارية) in Jeddah with Arabic RTL support, admin dashboard, authentication, lead management with WhatsApp integration, animated loading screen, blog/articles section, partners section, and Google Maps integration.

## Brand Identity
- **Company Name**: إس إم كيو العقارية / SMQ REAL ESTATE
- **Logo**: Official logo image with transparent background at `attached_assets/smq_logo_transparent.png`
- **Brand Colors**: Gold #B48F2E, Dark Gray #4E4D4E, White #FFFFFF
- **Theme**: Light mode only (no dark mode)
- **Social Handle**: @smq-re (Instagram, Snapchat, X, TikTok, YouTube)
- **Website**: www.smq-re.com
- **Phone**: +966 55 999 7929
- **Email**: info@smq-re.com
- **Address**: Jeddah, Alfaisaliah District

## Architecture
- **Frontend**: React + Vite + TailwindCSS + Framer Motion + shadcn/ui + Sass
- **Backend**: Express.js with Passport.js authentication
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (frontend), Express (backend)
- **PWA**: manifest.json with web app meta tags

## Key Features
- Animated SMQ logo loading screen (spinning gold circle around logo, fixed text)
- Landing page with hero video, services, featured properties, articles preview, partners, Google Maps, CTA
- Properties listing with search and filter
- Articles/blog page with category filter, animated cards, and modal article detail view
- Partners dedicated page (/partners) with hero image and grid layout
- About page with Vision/Mission (official text), "What Sets Us Apart" hexagons, Founder bio section
- Contact page with Google Maps embed (Jeddah)
- User registration and login (Passport.js local strategy)
- Ads/banners system with animated header strip (auto-rotating, framer-motion), fullscreen smooth overlay on click, admin CRUD
- Admin dashboard with tabs: Overview, Properties CRUD, Leads management, Articles CRUD, Partners CRUD, Ads management, Users management, Site Settings
- Role-based permissions system: مدير النظام (admin - full access), مشرف (supervisor - custom permissions), نائب مشرف (deputy - custom permissions), عميل (client)
- 8 granular permissions: manage_properties, manage_leads, manage_articles, manage_partners, manage_ads, manage_users, manage_settings, view_stats
- Admin user management: create/edit/delete users, assign roles and custom permissions
- WhatsApp integration - leads are sent to WhatsApp for instant contact
- Footer with animated gradient background, social media links (Instagram, Snapchat, X, TikTok, YouTube)
- RTL Arabic layout throughout
- Responsive design for all devices (PWA-ready)

## Data Models
- **users**: id, username, password, fullName, email, phone, role (admin/supervisor/deputy/client), permissions (text array)
- **properties**: id, title, description, type, price, area, location, bedrooms, bathrooms, imageUrl, featured, status, createdAt
- **leads**: id, name, phone, email, propertyId, message, status, createdAt
- **articles**: id, title, excerpt, content, imageUrl, category, published, createdAt
- **partners**: id, name, logoUrl, websiteUrl, sortOrder
- **ads**: id, title, description, imageUrl, linkUrl, buttonText, active, sortOrder, createdAt
- **siteSettings**: id, key, value (for configurable site data)

## Admin Credentials
- Username: `admin`
- Password: `admin123`

## File Structure
- `shared/schema.ts` - Database schema and types
- `server/routes.ts` - API routes with auth
- `server/storage.ts` - Database storage layer
- `server/seed.ts` - Database seed data (Jeddah properties + articles + partners)
- `client/src/pages/` - Page components (home, properties, articles, partners, about, contact, login, register, admin)
- `client/src/components/` - Shared components (navbar, footer, loading-screen, whatsapp-button, interest-form, page-hero, scroll-navigator, theme-toggle)
- `client/src/hooks/` - Custom hooks (use-auth, use-settings, use-toast)

## API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `GET /api/properties` - All properties
- `GET /api/properties/featured` - Featured properties
- `POST /api/properties` - Create property (admin)
- `PATCH /api/properties/:id` - Update property (admin)
- `DELETE /api/properties/:id` - Delete property (admin)
- `GET /api/leads` - All leads (admin)
- `POST /api/leads` - Create lead (public)
- `PATCH /api/leads/:id/status` - Update lead status (admin)
- `GET /api/articles` - Published articles
- `GET /api/articles/all` - All articles (admin)
- `GET /api/articles/:id` - Single article
- `POST /api/articles` - Create article (admin)
- `PATCH /api/articles/:id` - Update article (admin)
- `DELETE /api/articles/:id` - Delete article (admin)
- `GET /api/partners` - All partners
- `POST /api/partners` - Create partner (admin)
- `PATCH /api/partners/:id` - Update partner (admin)
- `DELETE /api/partners/:id` - Delete partner (admin)
- `GET /api/admin/users` - All users (admin)
- `POST /api/admin/users` - Create user (admin)
- `PATCH /api/admin/users/:id` - Update user (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)
- `GET /api/settings` - All settings
- `POST /api/settings` - Upsert setting (admin)
- `GET /api/admin/stats` - Dashboard stats (admin)
- `POST /api/upload` - Upload image (admin)

## Static Assets
- `/assets/` serves `attached_assets/` directory
- Partner logos at `attached_assets/partner_logos/`
- Uploaded images at `attached_assets/uploads/`
- Stock images at `attached_assets/stock_images/`
- Hero video at `attached_assets/generated_videos/`
