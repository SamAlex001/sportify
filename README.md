# Sportify

Sportify is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for sports enthusiasts to create, share, and stay updated with the latest in the world of sports. The platform offers real-time updates, comprehensive coverage of various sports, and a user-friendly interface for seamless navigation.

> Stay connected, stay updated, and never miss a moment in the world of sports!

## Features

- ``Real-Time Updates`` Stay informed with live scores and developments as they happen.
- ``Comprehensive Coverage`` Access information on major leagues and niche sports alike.
- ``User-Friendly Interface`` Enjoy seamless browsing across all devices.
- ``Blog Functionality`` Create, share, and comment on sports-related posts.
- ``Authentication`` Secure login and registration for users.
- ``Support & FAQs`` Get help and answers to common questions.

---

## Project Structure

```
sportify/
│
├── api/                # Backend (Node.js, Express)
│   ├── models/         # Mongoose models (User, Post, Comment)
│   ├── routes/         # API routes (auth, user, post, comment, livescore)
│   ├── .env            # Environment variables
│   ├── server.js       # Entry point for backend server
│   └── package.json    # Backend dependencies
│
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── assets/     # Images and static assets
│   │   ├── uploads/    # Uploaded images
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # React context providers
│   │   ├── main/       # Main entry point
│   │   ├── pages/      # Page components (AboutUs, Support, etc.)
│   │   └── styles/     # CSS and Tailwind styles
│   ├── index.html      # HTML template
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
│
├── README.md           # Project documentation
└── .gitignore
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MongoDB

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SamAlex001/sportify.git
   cd sportify
   ```


2. **Run backend first, then frontend.**


3. **Backend Setup:**
   ```sh
   cd api
   npm install
   # Create a .env file with your MongoDB URI and other environment variables
   nodemon server.js
   ```


4. **Frontend Setup:**
   ```sh
   cd ../client
   npm install
   npm run dev
   ```


5. **Visit the app:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.
   Or click on the Vite URL.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

---
## Technologies Used

| **Backend Technologies**                           | **Frontend Technologies**                                      |
|----------------------------------------------------|----------------------------------------------------------------|
| `MongoDB` (database)                              | `React` (frontend library)                                     |
| `Express.js` (backend framework)                  | `Vite` for frontend build (client/vite.config.js)              |
| `Node.js` (runtime environment)                   | `Tailwind CSS` for styling (client/tailwind.config.js)         |
| `Mongoose` (MongoDB ODM, see api/models/)         | `Mantine` UI library (client/src/main/main.jsx)                |
| `JWT` for authentication (jsonwebtoken)           | `Embla Carousel` for carousels (client/src/components/HomeCarousel.jsx) |
| `bcrypt` for password hashing (bcrypt)            | `React Toastify` for notifications (client/src/main/main.jsx)  |
| `Multer` for file uploads (multer)                |                                                                |

---

## Usage

- `Register or Log In` – Create a new account or access your existing one to get started.
- `Stay Updated` – Browse real-time sports updates, news, and community blog posts.
- `Engage with the Community` – Create your own posts, share opinions, and comment on others’ content.
- `Get Help Anytime` – Visit the Support page to access FAQs and assistance.

---

## Contributing

Contributions are welcome!

---

**About Sportify:**  
Sportify provides updates on sports in real time. It covers a wide range of sports, from popular leagues to smaller competitions. Whether it's football, basketball, cricket, or tennis, Sportify helps you stay informed about scores and latest developments.
