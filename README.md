# 🛒 Grocery Store Website with AI Chatbot

![image alt](https://github.com/riyasah0963/Computer2003/blob/master/Screenshot.jpg?raw=true)


## Features of Grocery Website 🛒

- ✅ **User Authentication**
  - Login, Register, Forgot Password via OTP  
- ✅ **AI Chatbot**
  - Assists customers in selecting groceries  
- ✅ **Product Search & Filters**
  - Find items easily  
- ✅ **Shopping Cart**
  - Add/remove products  
- ✅ **Secure Payment Gateway**
  - Safe & encrypted transactions  
- ✅ **Mobile-Responsive Design**
  - Works smoothly on all devices  


## 📌 Tech Stack
Frontend: React, TailwindCSS, React Router

Backend: Node.js, Express, MongoDB

Authentication: JWT, Bcrypt

AI Chatbot: LangChain + OpenAI API

SMS OTP: Twilio API

## 🛠️ Installation Guid
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

## 🎯 Usage
Sign up or log in
Browse products & add to cart
Use AI chatbot for grocery suggestions
Proceed to checkout and pay securely

## 🛡️ Security Features
Hashed passwords for secure storage
JWT Authentication for user sessions
OTP-based password reset for added security


## Weekly Updates

### [Date: 2025-03-06] - Login Page UI/UX Enhancements  

- Added a **beautiful gradient background** for a modern look.  
- Included **meaningful icons** for all input fields to improve usability.  
- Implemented **smooth hover and focus animations** for a better user experience.  
- Improved **typography** with better hierarchy for readability.  
- Enhanced **button styles** with a scale animation on hover.  
- Added **descriptive subtitles** for each section to guide users.  
- Improved **spacing and padding** for a cleaner layout.  
- Made the **reset password flow visually appealing** with better design.  
- Added **visual feedback** for selected reset methods.  
- Improved **error and success message styling** for better clarity.  
- Made the form more **engaging with icon decorations**.  
- Enhanced **mobile responsiveness** for a smooth experience on all devices.  

The login page now looks **more professional and engaging** while maintaining its functionality. 🚀  


### [Date: 2025-03-14] - Modify Home page and ChatBot
- Improve response time of ChatBot.
- Adding some extra question related to customer.
- explain customer queries in simple way and correct way.
- modify ChatBot in such a way so that customer should get satisfy. 

### [Date: 2025-03-24] - Login & Registration Updates  

#### Password Reset Flow:  
- Added a **"Forgot Password"** button in the login form.  
- Created a new **forgot password view** with options for email or mobile reset.  
- Implemented **state management** for the forgot password flow.  
- Added **success message display** when reset instructions are sent.  
- Included a **back button** to return to the login form.  
- Added a **mobile number field** to the form data.  
- Improved **error handling** for the reset password flow.  
- Implemented **validation for email and mobile inputs**.  
- Maintained all existing functionality while adding these new features.  

#### Password Confirmation (Registration):  
- Added a **confirmPassword** field to the form state.  
- Implemented **validation to check if passwords match** during registration.  
- Added a **password confirmation input field**, visible only during registration.  
- Updated the **form reset** to include the new **confirmPassword** field.  
- Ensured **both password fields** are filled out before submission.  


### [Date: 2025-04-01] - Login Component Update

- Added a **"Forgot Password"** button in the login form.  
- Created a new **forgot password view** with options for email or mobile reset.  
- Implemented **state management** for the forgot password flow.  
- Added **success message display** when reset instructions are sent.  
- Included a **back button** to return to the login form.  
- Added a **mobile number field** to the form data.  
- Improved **error handling** for the reset password flow.  
- Implemented **validation for email and mobile inputs**.  
- Maintained all existing functionality while adding these new features.  

### Password Reset Flow:

1. User clicks **"Forgot Password"** from the login screen.  
2. Chooses between **email or mobile number verification**.  
3. Enters their **email or mobile number**.  
4. Receives **confirmation** when reset instructions are sent.  
5. Returns to the **login screen** after reset instructions are sent.  

---

