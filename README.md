
# ShopSmart

A modern, responsive e-commerce web app built with React and Redux. ShopSmart features product browsing, search, category filters, sorting, quick view, a persistent cart, and demo authentication. Designed for a seamless shopping experience and easy deployment.

---

## 🚀 Live Demo

[View Live Site](https://shopsmartweb.netlify.app/)

---

## 📝 Project Overview

ShopSmart is a demo e-commerce platform that lets users browse products, add to cart, and simulate checkout. It uses the Fake Store API for product data and stores cart/auth state in localStorage. The app is fully client-rendered and optimized for both desktop and mobile.

---

## ✨ Features

- Product catalog with search, category filters, and sorting (price, rating)
- Quick View modal and lazy-loaded images for fast UX
- Add to Cart with quantity merging and persistent storage
- Light/Dark theme toggle (saved in localStorage)
- Client-side routing (React Router v6)
- Demo authentication (Register/Login/Profile) using localStorage
- Responsive design with Bootstrap 5
- Accessible controls and ARIA labels

---

## �️ Tech Stack

- **Frontend:** React 18, React Router v6, Redux, Bootstrap 5, Font Awesome 4
- **State Management:** Redux Toolkit
- **Notifications:** react-hot-toast
- **Image Loading:** react-loading-skeleton, custom LazyImage
- **API:** [Fake Store API](https://fakestoreapi.com/)

---

## � Installation & Setup

**Prerequisites:** Node.js v18 or v20

1. Clone the repository:
   ```powershell
   git clone https://github.com/rakesh-vajrapu/ShopSmart.git
   cd shopsmart
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm start
   ```
4. Build for production:
   ```powershell
   npm run build
   ```

You can also use the VS Code task **Build ShopSmart** from the Run and Debug panel.

---

## 🚦 Usage

- Browse products, search, and filter by category
- Add items to cart and adjust quantities
- Register/login (demo only, uses localStorage)
- View and edit profile (demo only)
- Checkout (form is demo-only, no real payment)

---

## 🤝 Contribution Guide

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is for demo and educational purposes. To use in production, add an OSI-approved license (e.g., MIT) or contact the author.

---

## 🌐 Author & Links

- **Portfolio:** [your-portfolio-link](https://your-portfolio.com)
- **Website:** [your-website-link](https://shopsmartweb.netlify.app/)
- **GitHub:** [https://github.com/your-username](https://github.com/rakesh-vajrapu)

---

Made with ❤️ using React, Redux, and Bootstrap.
