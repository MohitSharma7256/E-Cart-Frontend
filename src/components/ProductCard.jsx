import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ item }) {
    return (
        <div className="card h-100 border-0 shadow-sm product-card">
            <div className="position-relative overflow-hidden">
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
                {item.discount > 0 && (
                    <div className="position-absolute top-0 start-0 m-2 badge bg-danger">
                        {item.discount}% OFF
                    </div>
                )}
            </div>

            <div className="card-body p-2 p-md-3">
                <div className="product-info text-center">
                    <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">
                        <h6 className="mb-1 fw-bold product-name text-truncate-2 small-mobile"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                height: '2.5em',
                                lineHeight: '1.25em'
                            }}>
                            {item.name}
                        </h6>
                    </Link>

                    <p className="text-muted small mb-1 text-truncate">{item.brand?.name}</p>

                    {/* Rating stars - Hidden on very small screens to save space */}
                    <div className="ratings mb-1 h6 d-none d-sm-block">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill text-warning fs-6"></i>
                        ))}
                    </div>

                    <div className="mb-0 h6 fw-bold product-price text-center text-success d-flex justify-content-center align-items-center gap-2 flex-wrap">
                        <span className="price-final">&#8377;{item.finalPrice}</span>
                        {item?.basePrice > item.finalPrice && (
                            <del className="text-muted small fw-normal">&#8377;{item.basePrice}</del>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-truncate-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                @media (max-width: 576px) {
                    .small-mobile {
                        font-size: 0.9rem;
                    }
                    .price-final {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    )
}
