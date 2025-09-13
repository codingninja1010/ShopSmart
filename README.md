# ShopSmart

A modern React + Redux storefront demo with product browsing, search, filters, sorting, quick view, a persistent cart, and local demo auth. It’s responsive, uses Bootstrap 5, and deploys easily to Netlify.

## 🚀 Live Demo

https://shopsmartweb.netlify.app/

## ✨ Highlights

- Product catalog from Fake Store API (with AbortController and skeleton loading)
- Search, category filters, and sorting (price asc/desc, rating)
- Quick View modal and lazy-loaded images for snappy UX
- Add to Cart with quantity merging and persistent storage via localStorage
- Light/Dark theme toggle stored in localStorage
- Client-side routing (React Router v6) with SPA fallback on Netlify
- Demo authentication (Register/Login/Profile) using localStorage only

## 🧭 App Routes

- `/` Home
- `/product` Products listing
- `/product/:id` Product details
- `/cart` Cart and checkout entry
- `/login`, `/register`, `/profile` Demo auth screens
- `/about`, `/contact` Static info pages

## 🖼️ Screenshot

![ShopSmart](public/assets/ShopSmart.PNG)

## 📁 Project Structure

```
public/
   index.html
   assets/
      ShopSmart.PNG
      main.png.jpg
src/
   index.js          # Entry: providers, theme, routes
   theme.css         # Theme tokens, components polish
   components/       # Navbar, Products, LazyImage, BackToTop, etc.
   pages/            # Home, Product, Cart, Login, Register, Profile, ...
   redux/            # store.js, actions, reducers (cart)
   utils/            # currency.js (USD->INR helper)
```

## 🛠️ Getting Started

Prerequisites: Node 18 or 20 (see `package.json` engines).

1) Install dependencies

```powershell
npm install
```

2) Start the dev server (Create React App)

```powershell
npm start
```

3) Build for production

```powershell
npm run build
```

You can also use the workspace task “Build ShopSmart” from VS Code’s Run and Debug panel.

## � NPM Scripts

- `start` – CRA development server with hot reload
- `build` – Production bundle to `build/`
- `test` – CRA test runner (none added yet)

## 🧰 Tech Notes

- UI: React 18, React Router v6, Bootstrap 5, Font Awesome 4
- State: Redux (cart reducer with localStorage persistence)
- Data: https://fakestoreapi.com/ (public demo API)
- Currency: Displays prices in INR using a static USD→INR conversion (see `utils/currency.js`)
- Images: `LazyImage` defers loading using IntersectionObserver + native `loading="lazy"`
- Toaster: `react-hot-toast` for add-to-cart feedback
- Accessibility: custom select and controls include ARIA roles/labels; back-to-top has `aria-label`

## 📤 Deploy (Netlify)

Netlify is pre-configured via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `build`
- SPA routing fallback to `index.html`
- Node 18 environment

Two easy options:

1) Connect your GitHub repo to Netlify and select this project (recommended).
2) Or build locally and drag-drop the `build/` folder into Netlify Deploys.

## 🔐 About Authentication (Demo Only)

Register/Login/Profile use `localStorage` only (no backend). Stored keys:

- `users` – array of demo users
- `isLoggedIn` – string "true" when logged in
- `currentUser` – `{ name, email }` for navbar/profile
- `cart` – cart line items with `qty`

Never put real credentials here—this is strictly for demos.

## 🧪 Known Limitations

- Public Fake Store API can be slow or rate-limited at times
- Demo auth is not secure and should be replaced with a real backend for production
- No SSR; fully client-rendered SPA

## 🧯 Troubleshooting

- Node version: use Node 18 or 20. If installs fail, upgrade Node and clear cache.
- Port already in use: stop the other app or set `PORT` env (CRA reads it).
- Netlify 404s on client routes: ensure `netlify.toml` is deployed so `/*` redirects to `/index.html`.
- CORS/API failures: the public API may occasionally fail—retry or use a mock API during development.

## 🤝 Contributing

Issues and PRs are welcome. For larger changes, please open an issue first to discuss scope.

## 📄 License

No license file is present in this repository. If you plan to use this code beyond personal learning, add an OSI-approved license (e.g., MIT) or obtain permission from the author.

—

Made with ❤️ using React, Redux, and Bootstrap.
