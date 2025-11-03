"use client";
  
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const Testimonials: React.FC = () => {
  return (
    <>
      <section className="client-area ptb-100">
        <div className="container">
          <div className="section-title white-title">
            <h2>What Client’s Say About Us</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus quam neque quibusdam corrupti aspernatur corporis alias
              nisi dolorum expedita veritatis voluptates minima.
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              922: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="client-wrap"
          >
            <SwiperSlide>
              <div className="single-client">
                <i className="quotes bx bxs-quote-alt-left"></i>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,do
                  eiusmod tempor incididunt ut labore et dolore.
                </p>

                <ul>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                </ul>

                <div className="client-img">
                  <Image
                    src="/img/client-img/client1.jpg"
                    alt="Image"
                    width={70}
                    height={70}
                  />
                  <h3>Alen Meair</h3>
                  <span>Developer</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-client">
                <i className="quotes bx bxs-quote-alt-left"></i>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,do
                  eiusmod tempor incididunt ut labore et dolore.
                </p>

                <ul>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                </ul>

                <div className="client-img">
                  <Image
                    src="/img/client-img/client2.jpg"
                    alt="Image"
                    width={70}
                    height={70}
                  />
                  <h3>Axon Detos</h3>
                  <span>CEO</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-client">
                <i className="quotes bx bxs-quote-alt-left"></i>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,do
                  eiusmod tempor incididunt ut labore et dolore.
                </p>

                <ul>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                </ul>

                <div className="client-img">
                  <Image
                    src="/img/client-img/client3.jpg"
                    alt="Image"
                    width={70}
                    height={70}
                  />
                  <h3>John Dona</h3>
                  <span>Designer</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-client">
                <i className="quotes bx bxs-quote-alt-left"></i>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,do
                  eiusmod tempor incididunt ut labore et dolore.
                </p>

                <ul>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                  <li>
                    <i className="bx bxs-star"></i>
                  </li>
                </ul>

                <div className="client-img">
                  <Image
                    src="/img/client-img/client4.jpg"
                    alt="Image"
                    width={70}
                    height={70}
                  />
                  <h3>Jon Smith</h3>
                  <span>Developer</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
