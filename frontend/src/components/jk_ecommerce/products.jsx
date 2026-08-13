import React, { useEffect, useRef, useState } from "react";
import image1 from "../jk_ecommerce/assets/images/i1.jpg";
import image2 from "../jk_ecommerce/assets/images/i2.jpg";
import image3 from "../jk_ecommerce/assets/images/i3.jpg";
import image4 from "../jk_ecommerce/assets/images/i6.jpg";
import image5 from "../jk_ecommerce/assets/images/i5.jpg";

export default function PRODUCTS(){
    return(
        <div>
             {/* Trending Section */}
                        <section className="max-w-7xl mx-auto p-6">
                            <h2 className="text-3xl font-extrabold text-center text-emerald-900 mb-8">
                                Top Trending Jharkhand Products
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Tribal Mask", img: image1 },
                                    { title: "Bamboo Basket", img: image2 },
                                    { title: "Handmade Jewellery", img: image3 },
                                    { title: "Paitkar Painting", img: image4 },
                                    { title: "Dokra Figurine", img: image5 },
                                    { title: "Tribal Mask", img: image1 },
                                    { title: "Bamboo Basket", img: image2 },
                                    { title: "Handmade Jewellery", img: image3 },
                                    { title: "Paitkar Painting", img: image4 },
                                    { title: "Dokra Figurine", img: image5 },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 flex flex-col items-center"
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="h-48 w-full object-cover rounded-lg hover:scale-105 transition"
                                        />
                                        <h3 className="mt-4 text-lg font-semibold text-gray-800">{item.title}</h3>
                                        <button className="mt-3 bg-amber-600 text-white px-6 py-1 rounded-lg hover:bg-amber-700 transition">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
        </div>
    );
}