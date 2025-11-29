import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import BreadCrumb from '../components/BreadCrumb';
import { getWishlist, deleteWishlist } from "../Redux/ActionCreators/WishlistActionCreators";

export default function WishlistPage() {
    const wishlist = useSelector(state => state.WishlistStateData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    const deleteRecord = (_id) => {
        if (window.confirm("Are You Sure to Remove This Item From Wishlist?")) {
            dispatch(deleteWishlist({ _id }));
            // Refresh wishlist data after deletion to update UI instantly
            setTimeout(() => {
                dispatch(getWishlist());
            }, 500);
        }
    };

    // Empty Wishlist
    if (!wishlist?.length) {
        return (
            <div className="page-content text-center py-5">
                <BreadCrumb title="Wishlist" />
                <h4>Your Wishlist is Empty</h4>
                <Link to="/shop" className="btn btn-dark btn-ecomm">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="page-content">
            <BreadCrumb title="Wishlist Section" />
            <section className="section-padding">
                <div className="container">
                    <div className="d-flex align-items-center px-3 py-2 border mb-4">
                        <div className="text-start">
                            <h4 className="mb-0 h4 fw-bold">Wishlist ({wishlist.length} Items)</h4>
                        </div>
                        <div className="ms-auto">
                            <Link to="/shop" className="btn btn-dark btn-ecomm">Continue Shopping</Link>
                        </div>
                    </div>

                    <div className="similar-products">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                            {wishlist.map(item => {
                                const product = item.product;
                                if (!product) return null;

                                return (
                                    <div className="col" key={item._id}>
                                        <div
                                            className="card rounded-0 position-relative"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            {/* Close Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteRecord(item._id);
                                                }}
                                                className="btn-close position-absolute end-0 top-0"
                                                style={{ zIndex: 10, margin: '10px' }}
                                            />

                                            {/* Image */}
                                            <img
                                                src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${product.pic?.[0]}`}
                                                className="card-img-top rounded-0"
                                                alt={product.name}
                                                style={{ height: '350px', width: '100%', objectFit: 'cover' }}
                                            />

                                            {/* Body */}
                                            <div className="card-body">
                                                <div className="product-info text-center">
                                                    <h6 className="mb-1 fw-bold product-name text-truncate" style={{ height: 40, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', whiteSpace: 'normal', overflow: 'hidden' }}>{product.name}</h6>

                                                    {/* Rating stars */}
                                                    <div className="ratings mb-1 h6">
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                        <i className="bi bi-star-fill text-warning"></i>
                                                    </div>

                                                    {/* Price section - Only Final Price */}
                                                    <div className="mb-0 h6 fw-bold product-price text-center text-success">
                                                        &#8377;{product.finalPrice}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="card-footer bg-transparent text-center">
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="btn btn-dark w-100"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Move to Bag
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}