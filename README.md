<div align="center">

# 🌸 Petals & Pages

### *An elegant, curated book review platform*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-In--Memory-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-ISC-blueviolet?style=flat-square)](LICENSE)

*A beautifully crafted full-stack web application for book lovers to discover, review, and track their reading journey — designed with a refined, editorial aesthetic.*

---

</div>

## ✨ Overview

**Petals & Pages** is a full-stack book review platform built with a Goodreads-inspired vision but elevated with a sophisticated, calm design language. Built using a warm beige base, soft pastel accents, and refined typography, the platform offers readers a thoughtfully curated space to explore literature, share reviews, and manage their personal reading lists.

Whether you're tracking your reading goals, discovering a new favourite classic, or writing your thoughts on the latest thriller — Petals & Pages makes the experience feel intentional and beautiful.

---

## 🖼️ Features

### 📚 Book Discovery
- **Browse a curated library** of 33 pre-seeded books spanning 10 genres: Fiction, Romance, Mystery, Fantasy, Sci-Fi, Thriller, Biography, History, Poetry, and Non-Fiction
- **Search books** by title or author in real time
- **Filter by genre** to find exactly what you're looking for
- **Book detail pages** with full descriptions, average ratings, and all community reviews

### ⭐ Reviews & Ratings
- **Write reviews** with a 1–5 star rating system
- **Read community reviews** on every book
- **Edit or delete** your own reviews at any time
- Reviews are tied to your authenticated account

### 📖 Personal Reading List
- **Add books** to your reading list with a single click from any book page
- **Track reading status** across three categories:
  - 📌 *Want to Read*
  - 📖 *Currently Reading*
  - ✅ *Read*
- **Update status** at any time from your reading list page
- **Remove books** from your list

### 👤 User Profile
- Personal profile dashboard showing your reading statistics
- Breakdown of books by status (*Completed*, *Currently Reading*, *Want to Read*)
- View all reviews you've written
- Account details with your join date

### 🔐 Authentication
- **Register** a new account with name, email, and password
- **Login / Logout** with JWT-based session management
- Passwords are securely hashed with **bcryptjs**
- Protected routes redirect unauthenticated users

### 🎨 Design & UX
- Elegant warm beige and dusty rose color palette
- Smooth page transitions and micro-animations
- Responsive layout for all screen sizes
- Light/Dark mode toggle
- Glassmorphism-inspired card designs
- Refined typography using **Cormorant Garamond** & **Lato**

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **MUI (Material UI v5)** | UI component base |
| **Vanilla CSS** | Custom design system & styling |
| **React Context API** | Global state (Auth, Reading List, Theme) |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Mongoose** | MongoDB ODM |
| **MongoDB Memory Server** | Zero-config in-memory database |
| **JWT (jsonwebtoken)** | Stateless authentication |
| **bcryptjs** | Password hashing |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin resource sharing |

---

## 📁 Project Structure

```
petals-and-pages/
├── client/                         # React frontend
│   └── src/
│       ├── components/
│       │   ├── books/              # BookCard, BookSearch, BookList
│       │   ├── common/             # Navbar, Footer, LoadingSpinner
│       │   ├── reviews/            # ReviewCard, ReviewForm, ReviewList
│       │   └── ui/                 # Reusable UI primitives
│       ├── context/
│       │   ├── AuthContext.jsx     # Authentication state
│       │   ├── ReadingListContext.jsx
│       │   └── ThemeContext.jsx    # Light/Dark mode
│       ├── hooks/                  # Custom React hooks
│       ├── pages/
│       │   ├── HomePage.jsx        # Book discovery & search
│       │   ├── BookDetailPage.jsx  # Book info & reviews
│       │   ├── ReadingListPage.jsx # Personal reading list
│       │   ├── ProfilePage.jsx     # User dashboard
│       │   ├── LoginPage.jsx
│       │   └── RegisterPage.jsx
│       ├── services/               # API service layer (Axios)
│       │   ├── api.js              # Axios instance + interceptors
│       │   ├── authServices.js
│       │   ├── bookServices.js
│       │   ├── readingListServices.js
│       │   └── reviewServices.js
│       └── styles/                 # Global CSS design tokens
│
├── server/                         # Express backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection & DB seeder
│   ├── controllers/                # Route handler logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   └── errorMiddleware.js      # Global error handler
│   ├── models/
│   │   ├── book.js
│   │   ├── review.js
│   │   ├── user.js
│   │   └── ReadingList.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   ├── reviews.js
│   │   └── readingList.js
│   └── index.js                    # Server entry point
│
├── package.json                    # Root scripts (concurrently)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher

> **No MongoDB installation required!** The server uses `mongodb-memory-server` which spins up an in-memory MongoDB instance automatically on startup. The database is seeded with 33 curated books on first run.

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/mallaaikayousaf/Book-Review-App.git
cd Book-Review-App
```

**2. Install all dependencies** (root, client, and server in one command)
```bash
npm run install-all
```

**3. Configure environment variables**

Create a `.env` file in the `server/` directory:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
```

Create a `.env` file in the `client/` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Running the App

**Start both frontend and backend simultaneously:**
```bash
npm run dev
```

This uses `concurrently` to launch:
- 🖥️ **Backend** → `http://localhost:5000`
- 🌐 **Frontend** → `http://localhost:3000`

**Or run them separately:**
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

---

### API Health Check

Once running, you can verify the API is live:
```
GET http://localhost:5000/api/health
```
Expected response:
```json
{ "message": "🌸 Petals & Pages API is running", "status": "healthy" }
```

---

## 🔌 API Reference

All routes are prefixed with `/api`.

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/auth/me` | Get current user info | ✅ |

### Books
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/books` | Get all books (supports `?search=` & `?genre=`) | ❌ |
| `GET` | `/books/:id` | Get a single book by ID | ❌ |
| `POST` | `/books` | Add a new book | ✅ |

### Reviews
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/reviews/book/:bookId` | Get all reviews for a book | ❌ |
| `GET` | `/reviews/user` | Get all reviews by the current user | ✅ |
| `POST` | `/reviews` | Submit a new review | ✅ |
| `PUT` | `/reviews/:id` | Update a review | ✅ |
| `DELETE` | `/reviews/:id` | Delete a review | ✅ |

### Reading List
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/reading-list` | Get the user's reading list | ✅ |
| `POST` | `/reading-list` | Add a book to the list | ✅ |
| `PUT` | `/reading-list/:bookId` | Update a book's reading status | ✅ |
| `DELETE` | `/reading-list/:bookId` | Remove a book from the list | ✅ |

---

## 📚 Pre-loaded Book Catalogue

The database is seeded with **33 handpicked books** across all supported genres on first startup:

| Genre | Notable Titles |
|-------|---------------|
| **Fiction** | The Secret History, The Great Gatsby, To Kill a Mockingbird |
| **Romance** | Pride and Prejudice, Jane Eyre, Anna Karenina |
| **Mystery** | Murder on the Orient Express, And Then There Were None, Rebecca |
| **Fantasy** | Circe, The Hobbit, The Name of the Wind |
| **Sci-Fi** | 1984, Brave New World, The Handmaid's Tale |
| **Thriller** | The Silent Patient, Gone Girl |
| **Biography** | Becoming, The Diary of a Young Girl |
| **History** | The Nightingale, All the Light We Cannot See |
| **Poetry** | Milk and Honey, The Sun and Her Flowers |
| **Non-Fiction** | Sapiens, The Art of Happiness |

---

## 🗄️ Data Models

### User
```
{ name, email, password (hashed), createdAt }
```

### Book
```
{ title, author, description, genre, publishedYear, coverImage, averageRating, totalReviews }
```

### Review
```
{ book (ref), user (ref), rating (1-5), content, createdAt }
```

### Reading List
```
{ user (ref), books: [{ book (ref), status ('want-to-read' | 'reading' | 'read'), addedAt }] }
```

---

## 📝 Usage Guide

1. **Browse books** on the Home page — search by title/author or filter by genre
2. **Click any book** to view its full details and community reviews
3. **Register or login** to unlock full functionality
4. **Add books** to your Reading List using the shelf button on any book card or detail page
5. **Track your progress** by updating status on your Reading List page
6. **Write reviews** on book detail pages — star ratings + written thoughts
7. **Visit your Profile** to see your reading stats at a glance

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with 🌸 and a deep love of books

*Petals & Pages — where every story finds its home*

</div>
