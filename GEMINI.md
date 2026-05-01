# Agent-Teligram: WebRTC Media App

A full-stack real-time communication platform enabling text, audio, and video interaction between Clients and Agents using WebRTC and Socket.io.

## 🏗️ Architecture (Modernized)
The project follows the **`src/` directory pattern** for clear separation of concerns:
- **`src/server.js`**: Entry point. Manages HTTPS, Socket.io initialization, and MongoDB connection.
- **`src/app.js`**: Express application setup, middleware orchestration, and route mapping.
- **`src/sockets/`**: Signaling layer for WebRTC and real-time presence logic.
- **`src/config/`**: Environment-aware configurations (Passport, Credentials).
- **`public/js/video.js`**: Client-side WebRTC logic leveraging `simple-peer`.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, Socket.io, Mongoose (MongoDB).
- **WebRTC**: `simple-peer` for P2P media streams.
- **Frontend**: EJS Templates, Bootstrap, jQuery, Howler.js (Audio), SweetAlert2.
- **Security**: Passport.js (Local Strategy), HTTPS (Required for Media), `dotenv`.

## 🚀 Getting Started
1. **Environment**: Copy values from the code to a `.env` file (see `.env.example` logic).
2. **SSL**: Requires `key.pem` and `server.crt` in the root (HTTPS is mandatory for camera/mic access).
3. **Install**: `npm install`
4. **Run**: `npm run dev`

## 📡 WebRTC Signaling Flow
1. Client joins a room via Socket.io.
2. Agent initiates `video_request` or `audio_request`.
3. Signaling server (`chat-engine.js`) exchanges `Offer` and `Answer` SDP objects.
4. P2P connection established via `simple-peer` for low-latency media streaming.
