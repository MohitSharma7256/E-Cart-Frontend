import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import ProductCard from './ProductCard';
export default function ProductSlider({ title, data }) {
    let options = {
        spaceBetween: 15,
        freeMode: true,
        loop: data.length > 5,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 30,
            }
        },
        modules: [FreeMode, Pagination, Autoplay],
        className: "mySwiper",
    }

    return (
        <>
            <section className="section-padding">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">{title} Products</h3>
                        <p className="mb-0 text-capitalize">Checkout Our Latest Products</p>
                    </div>
                    <div className="product-thumbs">
                        <Swiper {...options}>
                            {
                                data.map(item => {
                                    return <SwiperSlide key={item._id}>
                                        <ProductCard item={item} />
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}
