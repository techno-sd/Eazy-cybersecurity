"use client";
  
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const Partner: React.FC = () => {
  return (
    <>
      <div className="partner-area ptb-100">
        <div className="container">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              922: {
                slidesPerView: 5,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="partner-wrap"
          >
            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner1.png"
                  alt="Image"
                  width={114}
                  height={125}
                />

                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner1.png"
                    alt="Image"
                    width={114}
                    height={125}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner2.png"
                  alt="Image"
                  width={114}
                  height={125}
                />
                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner2.png"
                    alt="Image"
                    width={114}
                    height={125}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner3.png"
                  alt="Image"
                  width={114}
                  height={125}
                />
                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner3.png"
                    alt="Image"
                    width={114}
                    height={125}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner4.png"
                  alt="Image"
                  width={114}
                  height={125}
                />
                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner4.png"
                    alt="Image"
                    width={114}
                    height={125}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner5.png"
                  alt="Image"
                  width={114}
                  height={125}
                />
                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner5.png"
                    alt="Image"
                    width={114}
                    height={125}
                  />
                </a>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="partner-item">
                <Image
                  src="/img/partners/partner3.png"
                  alt="Image"
                  width={114}
                  height={125}
                />
                <a className="partner-overly" href="#" target="_blank">
                  <Image
                    src="/img/partners/hover-partner3.png"
                    alt="Image"
                    width={114}
                    height={125}
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

export default Partner;
