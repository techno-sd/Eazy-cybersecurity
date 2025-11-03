"use client";
  
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const PartnerStyle2: React.FC = () => {
  return (
    <>
      <div className="partner-style-two-area pb-100">
        <div className="container">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              922: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="partner-slides"
          >
            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner1.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner2.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner3.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner4.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner5.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item-card">
                <a href="#" target="_blank" className="d-inline-block">
                  <Image
                    src="/img/home-7-8-9/partner/partner3.svg"
                    alt="partner"
                    width={144}
                    height={22}
                  />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default PartnerStyle2;
