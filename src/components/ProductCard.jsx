import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
    return (
        <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden product-card-hover">
            <div className="position-relative">
                {/* Product Image */}
                <Link to={`/product/${item._id}`}>
                    <div className="ratio ratio-1x1">
                        <img
                            src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic[0]}`}
                            className="card-img-top object-fit-cover"
                            alt={item.name || "Product Image"}
                            loading="lazy"
                        />
                    </div>
                </Link>

                {/* Discount Badge - Top Left */}
                {item.discount > 0 && (
                    <div className="position-absolute top-0 start-0 m-3 badge bg-danger fw-bold px-3 py-2" style={{ fontSize: '14px' }}>
                        {item.discount}% OFF
                    </div>
                )}

                {/* Wishlist Heart - Top Right (on hover) */}
                <button className="position-absolute top-0 end-0 m-3 btn btn-link text-white opacity-0 heart-hover">
                    <i className="far fa-heart fs-3"></i>
                </button>
            </div>

            <div className="card-body p-4">
                {/* Brand */}
                <p className="text-muted small text-uppercase fw-bold mb-1">{item.brand?.name || 'Brand'}</p>

                {/* Product Name */}
                <Link to={`/product/${item._id}`} className="text-decoration-none">
                    <h6 className="fw-bold text-dark mb-3" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.4em',
                        height: '2.8em'
                    }}>
                        {item.name}
                    </h6>
                </Link>

                {/* Bottom Row - Heart → Base → Final → Cart */}
                <div className="d-flex align-items-center justify-content-between mt-4">

                    {/* Wishlist Heart - Bottom Left */}
                    <button className="btn btn-link text-secondary p-0 wishlist-btn">
                        <i className="far fa-heart fs-4"></i>
                    </button>

                    {/* Prices */}
                    <div className="text-center">
                        {item.basePrice > item.finalPrice ? (
                            <>
                                <span className="text-decoration-line-through text-muted me-2">₹{item.basePrice}</span>
                                <span className="h5 fw-bold text-success mb-0">₹{item.finalPrice}</span>
                            </>
                        ) : (
                            <span className="h5 fw-bold text-success">₹{item.finalPrice}</span>
                        )}
                    </div>

                    {/* Cart Button - Bottom Right */}
                    <button className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center shadow-sm cart-btn">
                        <i className="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>

            {/* Hover Styles */}
            <style jsx>{`
                .product-card-hover {
                    transition: all 0.4s ease;
                }
                .product-card-hover:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
                }
                .product-card-hover:hover .heart-hover {
                    opacity: 1 !important;
                }
                .product-card-hover:hover .heart-hover i {
                    color: white !important;
                    text-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
                .wishlist-btn:hover i {
                    color: #dc3545 !important;
                    transform: scale(1.2);
                }
                .cart-btn {
                    width: 50px;
                    height: 50px;
                    transition: all 0.3s;
                }
                .cart-btn:hover {
                    background-color: #000 !important;
                    transform: translateY(-3px);
                }
                .heart-hover {
                    transition: opacity 0.3s ease;
                }
            `}</style>
        </div>
    );
}