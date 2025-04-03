🛒 Grocery Store Website with AI Chatbot

![image alt]([image_url](https://github.com/riyasah0963/Computer2003/blob/5545b625d5479a4bf5d8b43abb9111f80035f123/Screenshot.jpg))


🚀 Features
✅ User Authentication (Login, Register, Forgot Password via OTP)
✅ AI Chatbot (Assists customers in selecting groceries)
✅ Product Search & Filters (Find items easily)
✅ Shopping Cart (Add/remove products)
✅ Secure Payment Gateway
✅ Mobile-Responsive Design

📌 Tech Stack
Frontend: React, TailwindCSS, React Router

Backend: Node.js, Express, MongoDB

Authentication: JWT, Bcrypt

AI Chatbot: LangChain + OpenAI API

SMS OTP: Twilio API

🛠️ Installation Guide
🔹 1️⃣ Clone the Repository
git clone https://github.com/your-username/grocery-store.git
cd grocery-store

🔹 2️⃣ Install Dependencies
npm install

🔹 3️⃣ Set Up Backend
1.Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

2.Start the backend:
cd backend
npm start

🔹 4️⃣ Run the Frontend
cd frontend
npm start

🎯 Usage
Sign up or log in
Browse products & add to cart
Use AI chatbot for grocery suggestions
Proceed to checkout and pay securely

🛡️ Security Features
Hashed passwords for secure storage
JWT Authentication for user sessions
OTP-based password reset for added security

