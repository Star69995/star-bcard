# 🌟 Star bCard

**Star bCard** is a responsive React-based web application that allows users to create, manage, and view digital business cards. It includes login and registration, card creation/editing for business users, and user-specific favorite cards.

## 🌐 GitHub Repository
[View on GitHub](https://github.com/Star69995/star-bcard)

## 📦 Features
- User registration and login with validation
- JWT-based authentication
- Role-based access (regular/business/admin)
- Create, edit, and delete business cards (business users only)
- View card details with business info
- Mark/unmark cards as favorites
- Responsive design and light/dark mode toggle
- Search functionality for cards
- Dynamic navigation based on user status

## 🧱 Tech Stack
- **Frontend:** React, React Router, React Bootstrap
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Bootstrap, CSS
- **Icons:** React Icons, Bootstrap Icons
- **State Management:** React Context API
- **Routing:** React Router
- **Form Handling:** Formik, Yup
- **API Calls:** Axios
- **Toast Notifications:** React Toastify

## 🛠 Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/Star69995/star-bcard.git
```

2. Install dependencies:

```bash Copy Edit
npm install
```
3. Start the development server:

```bash Copy Edit
npm run dev
```

## 📄 Notes
- No lorem ipsum – all content is real.
- The design is responsive and mobile-friendly.
- Clean and commented code, structured by modules.
- This repository only includes the frontend code for the Star bCard platform.
- The backend code and database are not included in this repository.
- This project uses a custom theme context to manage dark mode and light mode themes.
- No graphic interface for admin functions

## 🐞 Known Issues

- No graphic interface for admin functions

- Long files:
	- `src/components/Card.jsx`
	- `src/pages/CardDetails.jsx`

- Unify dark mode and light mode background colors in `src/providers/ThemeContext.jsx`:
	- `src/components/Navbar.jsx`
	- `src/components/FooterComponent.jsx`
	- `src/components/FormField.jsx`
	- `src/components/SearchBar.jsx`
	- `src/pages/MyCardsPage.jsx`

- Users can access admin/business pages without being authenticated using the URL directly
