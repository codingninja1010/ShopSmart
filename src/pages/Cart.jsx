import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, removeAllOfProduct } from "../redux/action";
import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { usdToInr, formatINR } from "../utils/currency";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 cart-bg text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };
  const removeAll = (product) => {
    dispatch(removeAllOfProduct(product));
  };

  const ShowCart = () => {
    const subtotal = state.reduce((sum, item) => sum + (item.price * item.qty), 0);
    // Base shipping in USD; convert to INR for display
    const shippingUSD = 30.0;
    const totalItems = state.reduce((sum, item) => sum + item.qty, 0);
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <LazyImage
                                  src={item.image}
                                  alt={item.title}
                                  width={100}
                                  height={75}
                                  style={{ objectFit: 'contain' }}
                                  sizes="100px"
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.title}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex align-items-center gap-2 mb-4"
                                style={{ maxWidth: "360px" }}
                              >
                                <button
                                  className="btn qty-btn"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.qty}</p>

                                <button
                                  className="btn qty-btn"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>

                                {/* Remove this product entirely */}
                                <button
                                  className="btn btn-outline-danger ms-3"
                                  title="Remove item"
                                  onClick={() => removeAll(item)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x {formatINR(usdToInr(Number(item.price)))}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 cart-bg">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>{formatINR(Math.round(usdToInr(subtotal)))}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>{formatINR(Math.round(usdToInr(shippingUSD)))}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{formatINR(Math.round(usdToInr(subtotal + shippingUSD)))}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Cart • ShopSmart</title>
        <meta name="robots" content="noindex,follow" />
        <meta name="description" content="Review items in your cart and proceed to checkout on ShopSmart." />
        <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ShopSmart" />
        <meta property="og:title" content="Cart • ShopSmart" />
        <meta property="og:description" content="Review items in your cart and proceed to checkout on ShopSmart." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/cart'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cart • ShopSmart" />
        <meta name="twitter:description" content="Review items in your cart and proceed to checkout on ShopSmart." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/cart'} />
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Cart • ShopSmart', url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/cart', description: 'Review items in your cart and proceed to checkout on ShopSmart.' })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/' }, { '@type': 'ListItem', position: 2, name: 'Cart', item: typeof window !== 'undefined' ? window.location.href : 'https://example.com/cart' } ] })}
        </script>
      </Helmet>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
