import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import SortSelect from "./SortSelect";
import LazyImage from "./LazyImage";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance"); // relevance | price-asc | price-desc | rating
  const [activeCat, setActiveCat] = useState("all");
  // Avoid setting state after unmount and cancel fetch on route change

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/", { signal });
        const json = await response.json();
        setData(json);
        setFilter(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to load products', err);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
    return () => controller.abort();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    if (cat === 'all') {
      setFilter(data);
      setActiveCat('all');
      return;
    }
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    setActiveCat(cat);
  };

  // Derived visible products with search + sorting over current filter set
  const getVisible = () => {
    const base = filter.length ? filter : data;
    let list = base.filter((p) =>
      [p.title, p.description, p.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    if (sortBy === "price-asc") list.sort((a,b)=> a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a,b)=> b.price - a.price);
    else if (sortBy === "rating") list.sort((a,b)=> (b.rating?.rate||0) - (a.rating?.rate||0));
    return list;
  };

  const [preview, setPreview] = useState(null);

  const ShowProducts = () => {
    return (
      <>
        <div className="filter-toolbar-card mb-4">
          <div className="d-flex justify-content-center filter-toolbar">
            <button className={`btn btn-chip ${activeCat==='all'?'active':''}`} onClick={()=> filterProduct('all')}><i className="fa fa-th-large me-1"></i> All</button>
            <button className={`btn btn-chip ${activeCat==="men's clothing"?'active':''}`} onClick={()=> filterProduct("men's clothing")}><i className="fa fa-male me-1"></i> Men's Clothing</button>
            <button className={`btn btn-chip ${activeCat==="women's clothing"?'active':''}`} onClick={()=> filterProduct("women's clothing")}><i className="fa fa-female me-1"></i> Women's Clothing</button>
            <button className={`btn btn-chip ${activeCat==='jewelery'?'active':''}`} onClick={()=> filterProduct('jewelery')}><i className="fa fa-diamond me-1"></i> Jewelery</button>
            <button className={`btn btn-chip ${activeCat==='electronics'?'active':''}`} onClick={()=> filterProduct('electronics')}><i className="fa fa-plug me-1"></i> Electronics</button>
          </div>
          <div className="row align-items-center justify-content-between g-2 mt-3">
            <div className="col-md-6">
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
              />
            </div>
            <div className="col-md-4 text-md-end">
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {/* End toolbar */}

        {getVisible().map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="product-col col-lg-4 col-md-6 col-sm-6 col-12 mb-4"
            >
              <div className="card product-card text-center h-100" key={product.id}>
                <div className="d-flex justify-content-between align-items-start p-3 pt-3">
                  <span className="badge-soft text-uppercase">
                    {product.category}
                  </span>
                  {product.rating && (
                    <span className="text-star" title={`${product.rating.rate} / 5`}>
                      <i className="fa fa-star"></i> {product.rating.rate}
                      <span className="text-muted"> ({product.rating.count})</span>
                    </span>
                  )}
                </div>
                <LazyImage
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  style={{ aspectRatio: '1 / 1', maxHeight: 320, objectFit: 'contain' }}
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                />
                <div className="card-body">
                  <h5 className="card-title clamp-2">{product.title}</h5>
                  <p className="card-text clamp-3">{product.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {Number(product.price).toFixed(2)}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-dark m-1"
                  >
                    <i className="fa fa-shopping-bag icon"></i> Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    <i className="fa fa-cart-plus icon"></i> Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-primary m-1"
                    onClick={() => setPreview(product)}
                  >
                    <i className="fa fa-eye icon"></i> Quick View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>

      {/* Quick View Modal */}
      {preview && (
        <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{preview.title}</h5>
                <button type="button" className="btn-close" onClick={()=> setPreview(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-5 text-center">
                    <LazyImage src={preview.image} alt={preview.title} className="img-fluid" style={{maxHeight: 320, aspectRatio:'1/1', objectFit:'contain'}} />
                  </div>
                  <div className="col-md-7">
                    <p className="clamp-3">{preview.description}</p>
                    {preview.rating && (
                      <p className="mb-2"><span className="text-star"><i className="fa fa-star"></i></span> {preview.rating.rate} <span className="text-muted">({preview.rating.count} reviews)</span></p>
                    )}
                    <p className="lead mb-3">$ {Number(preview.price).toFixed(2)}</p>
                    <div className="d-flex gap-2">
                      <Link to={"/product/" + preview.id} className="btn btn-primary" onClick={()=> setPreview(null)}>
                        View Details
                      </Link>
                      <button className="btn btn-dark" onClick={()=> { addProduct(preview); toast.success('Added to cart'); }}>
                        <i className="fa fa-cart-plus icon"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={()=> setPreview(null)}>Close</button>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show" onClick={()=> setPreview(null)}></div>
        </div>
      )}
    </>
  );
};

export default Products;
