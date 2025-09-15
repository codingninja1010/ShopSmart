import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";
import LazyImage from "../components/LazyImage";
import { usdToInr, formatINR } from "../utils/currency";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getProduct = async () => {
      setError("");
      setLoading(true);
      setLoading2(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, { signal });
        if (!response.ok) throw new Error(`Failed to load product (${response.status})`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        try {
          const response2 = await fetch(
            `https://fakestoreapi.com/products/category/${data.category}`,
            { signal }
          );
          if (response2.ok) {
            const data2 = await response2.json();
            setSimilarProducts(data2);
          }
        } catch (_) {
          // ignore similar products error
        } finally {
          setLoading2(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError("Unable to load product. Please try again.");
          toast.error('Failed to load product');
          setLoading(false);
          setLoading2(false);
        }
      }
    };
    getProduct();
    return () => controller.abort();
  }, [id, reloadKey]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <LazyImage
                className="img-fluid"
                src={product.image}
                alt={product.title}
                width="400"
                height="400"
                style={{ maxHeight: 420, aspectRatio: '1/1', objectFit: 'contain' }}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="col-md-6 col-sm-12 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <p className="lead">
                {product && product.rating ? product.rating.rate : ""} {" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">{formatINR(usdToInr(Number(product.price)))}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <LazyImage
                    className="card-img-top p-3"
                    src={item.image}
                    alt={item.title}
                    width="300"
                    height="300"
                    sizes="(max-width: 768px) 60vw, 250px"
                    style={{ aspectRatio: '1/1', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        {error && (
          <div className="alert alert-danger my-3 d-flex align-items-center justify-content-between" role="alert">
            <span>{error}</span>
            <button className="btn btn-sm btn-outline-light" onClick={() => setReloadKey(k => k + 1)}>Retry</button>
          </div>
        )}
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
