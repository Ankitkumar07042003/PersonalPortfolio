# Ankit Kumar — Portfolio (MERN 2026)

A production-grade personal portfolio built with the MERN stack, Framer Motion, React Three Fiber, and a custom CSS design system.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Gold | `#FFD372` |
| Orange | `#F15B42` |
| Pink | `#F49CC4` |
| Navy | `#2C3D73` |
| Sky Blue | `#7CAADC` |

---

## 📁 Project Structure

```
portfolio/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing / Hero
│   │   │   ├── About.jsx          # Bio, skills, certifications
│   │   │   ├── Experience.jsx     # Timeline — training & education
│   │   │   ├── Projects.jsx       # Filterable project cards
│   │   │   ├── Contact.jsx        # Form → backend API
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Sticky nav with mobile menu
│   │   │   ├── Footer.jsx         # Site footer
│   │   │   ├── HeroSection.jsx    # Hero with typing + 3D scene
│   │   │   ├── ProjectCard.jsx    # Individual project card
│   │   │   ├── Timeline.jsx       # Vertical animated timeline
│   │   │   └── SkillsGrid.jsx     # Animated skill bars grid
│   │   ├── styles/
│   │   │   ├── variables.css      # Design tokens (CSS custom props)
│   │   │   ├── global.css         # Reset + base + layout
│   │   │   ├── components.css     # Reusable component styles
│   │   │   └── animations.css     # Keyframes + utility motion classes
│   │   ├── three/
│   │   │   ├── Scene.jsx          # R3F Canvas wrapper
│   │   │   ├── FloatingShapes.jsx # Background geometric meshes
│   │   │   └── Hero3D.jsx         # Interactive hero object
│   │   ├── hooks/
│   │   │   └── useInView.js       # IntersectionObserver scroll hook
│   │   ├── utils/
│   │   │   └── api.js             # Axios instance + API helpers
│   │   ├── App.jsx                # Router + page transitions
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   └── nginx.conf
│
├── server/                        # Node.js + Express backend
│   ├── models/
│   │   └── ContactMessage.js      # Mongoose schema + model
│   ├── routes/
│   │   └── contactRoutes.js       # Route definitions + validation
│   ├── controllers/
│   │   └── contactController.js   # Business logic + email notify
│   ├── middleware/
│   │   ├── errorHandler.js        # Global 404 + error middleware
│   │   └── rateLimiter.js         # express-rate-limit configs
│   ├── server.js                  # Express app + MongoDB connection
│   ├── .env.example               # Environment variable template
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml             # Full stack Docker setup
├── package.json                   # Root — concurrently scripts
└── .gitignore
```

---

## ⚡ Quick Start (Local Dev)

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally **or** a MongoDB Atlas URI
- npm ≥ 9

### 1. Clone & install

```bash
git clone <your-repo-url>
cd portfolio

# Install all dependencies (root + client + server)
npm run install:all
```

### 2. Configure the server

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ankit_portfolio
CLIENT_ORIGIN=http://localhost:3000

# Optional — email notifications for contact form
SMTP_USER=ankitraj829206@gmail.com
SMTP_PASS=your_gmail_app_password
NOTIFY_EMAIL=ankitraj829206@gmail.com
```

### 3. Run both servers

```bash
# From project root — starts client (port 3000) + server (port 5000) together
npm run dev
```

Or run separately:

```bash
# Terminal 1 — backend
npm run server

# Terminal 2 — frontend
npm run client
```

Open → **http://localhost:3000**

---

## 🐳 Docker (Full Stack)

```bash
# From project root
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend  → http://localhost:5000
- MongoDB  → localhost:27017

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api`

### POST `/contact`
Submit a contact form message.

**Request body:**
```json
{
  "name":    "John Doe",
  "email":   "john@example.com",
  "subject": "Job Opportunity",
  "message": "Hi Ankit, I'd love to connect..."
}
```

**Success `201`:**
```json
{
  "success": true,
  "message": "Thanks for reaching out! I'll get back to you soon.",
  "data": { "id": "...", "name": "John Doe", "createdAt": "..." }
}
```

**Validation error `422`:**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [{ "field": "email", "message": "Please provide a valid email address." }]
}
```

**Rate limit:** 5 messages / IP / hour.

---

### GET `/contact`
Retrieve all messages (paginated). Use in an admin dashboard.

```
GET /api/contact?page=1&limit=20
```

### PATCH `/contact/:id/read`
Mark a message as read.

### DELETE `/contact/:id`
Delete a message.

---

### GET `/health`
```json
{
  "success": true,
  "message": "Ankit Kumar Portfolio API is running.",
  "environment": "development",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
cd client
npm run build        # outputs to client/dist/
# Deploy dist/ to Vercel / Netlify
```

Set environment variable:
```
VITE_API_URL=https://your-api.railway.app
```

Update `client/src/utils/api.js` baseURL:
```js
baseURL: import.meta.env.VITE_API_URL || '/api'
```

### Backend (Railway / Render / VPS)
```bash
cd server
# Set production env vars in your platform's dashboard
npm start
```

### MongoDB Atlas
1. Create a free cluster at https://cloud.mongodb.com
2. Get the connection string
3. Set `MONGO_URI` in your server environment

---

## 🛡 Security Features

| Feature | Implementation |
|---------|---------------|
| CORS | Restricted to `CLIENT_ORIGIN` |
| Helmet | HTTP security headers |
| Rate Limiting | 100 req/15min global, 5 msg/hr on contact |
| Input Validation | `express-validator` on all POST fields |
| NoSQL Injection | `express-mongo-sanitize` |
| Body size limit | 10kb max payload |
| Mongoose validation | Schema-level + controller-level |

---

## 📦 Tech Stack

### Frontend
| Package | Purpose |
|---------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| React Router v6 | Client-side routing |
| Framer Motion | Page + scroll animations |
| React Three Fiber | 3D canvas (Three.js wrapper) |
| @react-three/drei | 3D helpers |
| react-type-animation | Typing effect in hero |
| react-helmet-async | SEO meta tags |
| Axios | HTTP client |

### Backend
| Package | Purpose |
|---------|---------|
| Express 4 | Web framework |
| Mongoose 8 | MongoDB ODM |
| express-validator | Input validation |
| Helmet | Security headers |
| CORS | Cross-origin config |
| express-rate-limit | Rate limiting |
| express-mongo-sanitize | NoSQL injection prevention |
| Nodemailer | Email notifications |
| Morgan | Request logging |
| dotenv | Environment variables |

---

## 👤 About Ankit Kumar

- **Location:** Ranchi, Jharkhand, India
- **Email:** ankitraj829206@gmail.com
- **Phone:** +91 7781805890
- **LinkedIn:** [linkedin.com/in/ankit-kumar-gupta-0149a125b](https://linkedin.com/in/ankit-kumar-gupta-0149a125b)
- **Education:** BCA — Doranda College, Ranchi University (2022–2025)

---

*Built with ❤️ by Ankit Kumar · 2026*
