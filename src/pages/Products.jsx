import React from 'react'
import { Footer, Navbar, Product } from "../components"
import { Helmet } from "react-helmet-async";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>ShopSmart • Products</title>
        <meta name="description" content="Browse all products on ShopSmart. Filter by category, search, and sort by price or rating." />
        <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ShopSmart" />
        <meta property="og:title" content="ShopSmart • Products" />
        <meta property="og:description" content="Browse all products on ShopSmart. Filter by category, search, and sort by price or rating." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/product'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ShopSmart • Products" />
        <meta name="twitter:description" content="Browse all products on ShopSmart. Filter by category, search, and sort by price or rating." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/product'} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/' },
              { '@type': 'ListItem', position: 2, name: 'Products', item: typeof window !== 'undefined' ? window.location.href : 'https://example.com/product' }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Products • ShopSmart',
            url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/product',
            description: 'Browse all products on ShopSmart. Filter by category, search, and sort by price or rating.'
          })}
        </script>
      </Helmet>
      <Navbar />
      <div className="container my-3">
        <h1 className="visually-hidden">Products</h1>
      </div>
      <Product />
      <Footer />
    </>
  )
}

export default Products