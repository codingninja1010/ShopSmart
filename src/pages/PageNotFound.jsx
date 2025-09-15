import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found • ShopSmart</title>
        <meta name="robots" content="noindex,follow" />
        <meta name="description" content="The page you’re looking for could not be found on ShopSmart." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 Not Found • ShopSmart" />
        <meta property="og:description" content="The page you’re looking for could not be found on ShopSmart." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/404'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 Not Found • ShopSmart" />
        <meta name="twitter:description" content="The page you’re looking for could not be found on ShopSmart." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/404'} />
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: '404 Not Found • ShopSmart', url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/404', description: 'The page you’re looking for could not be found on ShopSmart.' })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/' }, { '@type': 'ListItem', position: 2, name: '404', item: typeof window !== 'undefined' ? window.location.href : 'https://example.com/404' } ] })}
        </script>
      </Helmet>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 cart-bg text-center">
              <h4 className="p-3 display-5">404: Page Not Found</h4>
              <Link to="/" className="btn btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
