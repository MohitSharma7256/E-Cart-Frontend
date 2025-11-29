import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
    return (
        <div className="h-100">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden product-card position-relative transition-all">
                
                {/* Image Container */}
                <div className="position-relative overflow-hidden">
                    <Link to={`/product/${item._id}`}>
                        <div className="ratio ratio-1x1">
                            <img
                                src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic[0]}`}
                                className="card-img-top object-fit-cover"
                                alt={item.name}
                                loading="lazy"
                                style={{ transition: 'transform 0.4s ease' }}
                            />
                        </div>
                    </Link>

                    {/* Discount Badge */}
                    {item.discount > 0 && (
                        <div className="position-absolute top-0 start-0 m-3 bg-danger text-white px-3 py-1 rounded-pill fw-bold shadow-sm"
                             style={{ fontSize: '13px', zIndex: 10 }}>
                            {item.discount}% OFF
                        </div>
                    )}

                    {/* Top Right Wishlist (appears on hover) */}
                    <button className="position-absolute top-0 end-0 m-3 btn p-2 rounded-circle bg-white shadow-sm opacity-0 wishlist-top">
                        <i className="far fa-heart text-danger fs-5"></i>
                    </button>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column p-3 p-md-4">

                    {/* Brand */}
                    <p className="text-muted small text-uppercase fw-semibold mb-1">
                        {item.brand?.name || 'Brand'}
                    </p>

                    {/* Product Name */}
                    <Link to={`/product/${item._id}`} className="text-decoration-none text-dark mb-3 flex-grow-1">
                        <h6 className="fw-bold line-clamp-2" style={{ lineHeight: '1.4' }}>
                            {item.name}
                        </h6>
                    </Link>

                    {/* Bottom Action Row */}
                    <div className="d-flex align-items-center justify-content-between mt-auto">

                        {/* Bottom Wishlist Heart */}
                        <button className="btn btn-link p-0 text-secondary wishlist-bottom">
                            <i className="far fa-heart fs-4"></i>
                        </button>

                        {/* Price Section */}
                        <div className="text-center flex-grow-1 px-2">
                            {item.basePrice > item.finalPrice ? (
                                <>
                                    <div className="text-decoration-line-through text-muted small fw-medium">
                                        ₹{item.basePrice.toLocaleString()}
                                    </div>
                                    <div className="fw-bold text-success fs-5">
                                        ₹{item.finalPrice.toLocaleString()}
                                    </div>
                                </>
                            ) : (
                                <div className="fw-bold text-success fs-5">
                                    ₹{item.finalPrice.toLocaleString()}
                                </div>
                            )}
                        </div>

                        {/* Cart Button */}
                        <button className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center shadow-sm cart-btn">
                            <i className="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                </div>

                {/* Global Styles for This Card */}
                <style jsx>{`
                    .product-card {
                        transition: all 0.35s ease;
                        cursor: pointer;
                    }
                    .product-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
                    }
                    .product-card:hover img {
                        transform: scale(1.08);
                    }
                    .product-card:hover .wishlist-top {
                        opacity: 1 !important;
                    }
                    .wishlist-top {
                        transition: opacity 0.3s ease;
                        backdrop-filter: blur(4px);
                    }
                    .wishlist-bottom:hover i,
                    .wishlist-top:hover i {
                        color: #e11d48 !important;
                        transform: scale(1.2);
                    }
                    .cart-btn {
                        width: 48px;
                        height: 48px;
                        transition: all 0.3s ease;
                    }
                    .cart-btn:hover {
                        background-color: #000 !important;
                        transform: translateY(-3px);
                    }
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    @media (max-width: 480px) {
                        .fs-5 { font-size: 1.1rem !important; }
                        .fs-4 { font-size: 1.4rem !important; }
                        .cart-btn { width: 44px; height: 44px; }
                    }
                `}</style>
            </div>
        </div>
    );
}