import { Navbar, Main, Product, Footer } from "../components";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>ShopSmart • Home</title>
        <meta name="description" content="Discover the latest products on ShopSmart. Great prices, fast checkout, smooth experience." />
        <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ShopSmart" />
        <meta property="og:title" content="ShopSmart • Home" />
        <meta property="og:description" content="Discover the latest products on ShopSmart. Great prices, fast checkout, smooth experience." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ShopSmart • Home" />
        <meta name="twitter:description" content="Discover the latest products on ShopSmart. Great prices, fast checkout, smooth experience." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/'} />
      </Helmet>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home