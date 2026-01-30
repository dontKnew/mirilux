"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductGallery({images}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [bgPos, setBgPos] = useState("50% 50%");
    const [showZoom, setShowZoom] = useState(false);
    const swiperRef = useRef(null);
    const thumbSwiperRef = useRef(null);
    const mobileSwiperRef = useRef(null);
    const [isThumbStart, setIsThumbStart] = useState(true);
    const [isThumbEnd, setIsThumbEnd] = useState(false);



    /* Mouse move zoom */
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setBgPos(`${x}% ${y}%`);
    };

    const activateImage = (index) => {
        setActiveIndex(index);
        swiperRef.current?.slideTo(index);
        mobileSwiperRef.current?.slideTo(index);
        thumbSwiperRef.current?.slideTo(index - 1 < 0 ? 0 : index - 1);
    };

    return (
        <div className="relative">
            <div>
                <div
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                    className="shadow rounded overflow-hidden cursor-crosshair hidden lg:block"
                >
                    <Swiper
                        onSwiper={(s) => (swiperRef.current = s)}
                        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                        slidesPerView={1}
                        allowTouchMove={false}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={`${img}-${index}`}>
                                <Image
                                    key={`${img}-${index}`}
                                    src={`/images/products/${img}`}
                                    alt="Product"
                                    width={388}
                                    height={388}
                                    className="w-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>  

                {/* MOBILE SWIPE */}
                <div className="lg:hidden border rounded-xl overflow-hidden">
                    <Swiper
                        slidesPerView={1}
                        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={`${img}-${index}`}>
                                <Image
                                    key={`${img}-${index}`}
                                    src={`/images/products/${img}`}
                                    alt="Product"
                                    width={388}
                                    height={388}
                                    className="object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* THUMBNAILS – HORIZONTAL SCROLL */}
                <div className="relative mt-4">

                    {/* LEFT ARROW */}
                    <button
                        onClick={() => !isThumbStart && thumbSwiperRef.current?.slidePrev()}
                        disabled={isThumbStart}
                        className={`md:block hidden absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-10
                        ${isThumbStart
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                                : "bg-white/80 hover:bg-white shadow-md"
                            }`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* RIGHT ARROW */}
                    <button
                        onClick={() => !isThumbEnd && thumbSwiperRef.current?.slideNext()}
                        disabled={isThumbEnd}
                        className={`md:block hidden absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-10
                        ${isThumbEnd
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                                : "bg-white/80 hover:bg-white shadow-md"
                            }`}
                    >
                        <ChevronRight size={20} />
                    </button>


                    {/* THUMB SWIPER */}
                    <Swiper
                        onSwiper={(s) => {
                            thumbSwiperRef.current = s;
                            setIsThumbStart(s.isBeginning);
                            setIsThumbEnd(s.isEnd);
                        }}
                        onSlideChange={(s) => {
                            setIsThumbStart(s.isBeginning);
                            setIsThumbEnd(s.isEnd);
                        }}
                        spaceBetween={12}
                        slidesPerView="auto"
                        freeMode
                        mousewheel
                        className="!px-1"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={`${img}-${i}`} className="!w-20">
                                <button
                                    onMouseEnter={() => {
                                        if (window.innerWidth < 768) return;
                                        activateImage(i);
                                    }}
                                    onClick={() => {
                                        activateImage(i);
                                    }}

                                    className={`w-20 h-20 rounded overflow-hidden transition ${activeIndex === i ? "border-2 border-[var(--primary)] " : "border hover:border-2 hover:border-[var(--primary)]"}`}
                                >
                                    <Image key={`${img}-${i}`} src={`/images/products/${img}`} alt="thumb" width={80} height={80} />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>





            </div>

            {/* RIGHT ABSOLUTE ZOOM */}
            {showZoom && (
                <div
                    className="absolute top-0 left-[460px] w-[520px] h-[520px] rounded-xl bg-no-repeat bg-white hidden lg:block z-100"
                    style={{
                        backgroundImage: `url(${images[activeIndex]})`,
                        backgroundPosition: bgPos,
                        backgroundSize: "200%",
                    }}
                />
            )}
        </div>
    );
}
