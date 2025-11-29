import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
    return (
        <div className="h-100">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden product-card position-relative bg-white dark:bg-gray-800 transition-all duration-300">
                
                {/* Image */}
                <div className="position-relative overflow-hidden">
                    <Link to={`/product/${item._id}`}>
                        <div className="ratio ratio-1x1">
                            <img
                                src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic[0]}`}
                                className="card-img-top object-fit-cover hover:scale-110 transition-transform duration-500"
                                alt={item.name}
                                loading="lazy"
                            />
                        </div>
                    </Link>

                    {/* Discount Badge - Works in both modes */}
                    {item.discount > 0 && (
                        <div className="position-absolute top-0 start-0 m-3 bg-danger text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                            {item.discount}% OFF
                        </div>
                    )}

                    {/* Top Right Wishlist - Hover pe dikhega */}
                    <button className="position-absolute top-0 end-0 m-3 btn p-2 rounded-circle bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg opacity-0 wishlist-top transition-all duration-300 hover:text-red-500">
                        <i className="far fa-heart text-xl"></i>
                    </button>
                </div>

                {/* Card Body */}
                <div className="card-body p-4 d-flex flex-column">

                    {/* Brand */}
                    <p className="text-muted dark:text-gray-400 small font-semibold tracking-wider mb-1">
                        {item.brand?.name || 'BRAND'}
                    </p>

                    {/* Product Name */}
                    <Link to={`/product/${item._id}`} className="text-decoration-none mb-3 flex-grow-1">
                        <h6 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
                            {item.name}
                        </h6>
                    </Link>

                    {/* Bottom Row - Heart → Base Price → Final Price → Cart */}
                    <div className="d-flex align-items-center justify-content-between mt-auto">

                        {/* Bottom Wishlist */}
                        <button className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-all wishlist-bottom">
                            <i className="far fa-heart text-2xl"></i>
                        </button>

                        {/* Prices */}
                        <div className="text-center">
                            {item.basePrice > item.finalPrice ? (
                                <>
                                    <div className="text-gray-500 dark:text-gray-500 text-sm line-through">
, font-medium">
                                        ₹{item.basePrice.toLocaleString()}
                                    </div>
                                    <div className="text-xl font-bold text-success dark:text-green-400">
                                        ₹{item.finalPrice.toLocaleString()}
                                    </div>
                                </>
                            ) : (
                                <div className="text-xl font-bold text-success dark:text-green-400">
                                    ₹{item.finalPrice.toLocaleString()}
                                </div>
                            )}
                        </div>

                        {/* Cart Button */}
                        <button className="bg-black dark:bg-white text-white dark:text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-all cart-btn">
                            <i className="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                </div>

                {/* Perfect Hover + Dark Mode Styles */}
                <style jsx>{`
                    .product-card {
                        transition: all 0.35s ease;
                    }
                    .product-card:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
                    }
                    .product-card:hover .wishlist-top {
                        opacity: 1 !important;
                    }
                    .wishlist-bottom:hover i,
                    .wishlist-top:hover i {
                        color: #e11d48 !important;
                        transform: scale(1.3);
                    }
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    @media (max-width: 480px) {
                        .text-xl { font-size: 1.1rem !important; }
                        .text-2xl { font-size: 1.5rem !important; }
                    }
                `}</style>
            </div>
        </div>
    );
}