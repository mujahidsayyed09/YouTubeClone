# YouTube Clone (MERN Stack)

This is a **YouTube Clone** built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It includes **authentication, video upload, comments, and responsive frontend**.
Live Link---https://youtubeclonems.netlify.app/
---

## 🚀 **Setup Instructions**

### **1️⃣ Clone the Repository**

```bash
git clone (https://github.com/mujahidsayyed09/YouTubeClone)
cd YouTubeClone
```

### **2️⃣ Backend Setup**

```bash
cd backend
npm install
```

* Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

* Start backend:

```bash
npm start
```

Backend will run at: `http://localhost:5000`

---

### **3️⃣ Frontend Setup (Vite + React)**

```bash
cd frontend
npm install
```

* Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

* Start frontend:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🌐 **Deployment**

* **Backend**: Deploy on Render (update CORS with deployed frontend URL)
* **Frontend**: Deploy on Netlify (use `npm run build` → select `dist` folder)

---

## 📌 **API Routes for Testing**

### **Base URL**

* Local: `http://localhost:5000`
* Deployed: `https://youtubeclone-gnz1.onrender.com`

### **Auth Routes** (`/auth`)

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/signUp` | Register new user       |
| POST   | `/auth/signIn` | Login user (JWT cookie) |
| GET    | `/auth/logout` | Logout user             |

### **Video Routes** (`/api`)

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| POST   | `/api/upload`          | Upload new video *(Auth required)* |
| GET    | `/api/allVideo`        | Get all videos                     |
| GET    | `/api/video/:id`       | Get video by ID                    |
| GET    | `/api/channel/:userId` | Get videos by channel/user         |

### **Comment Routes** (`/commentApi`)

| Method | Endpoint                       | Description                   |
| ------ | ------------------------------ | ----------------------------- |
| POST   | `/commentApi/comment`          | Add comment *(Auth required)* |
| GET    | `/commentApi/comment/:videoId` | Get comments for video        |

---

