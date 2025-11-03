"use client";
  
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const RecentProjects: React.FC = () => {
  return (
    <>
      <section className="project-area pb-100">
        <div className="container-fluid">
          <div className="section-title">
            <h2>Seku Recent Project Case</h2>
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
            className="solutions-wrap"
          >
            <SwiperSlide>
              <div
                className="single-solutions"
                style={{
                  backgroundImage: `url(/img/projects/project1.jpg)`,
                }}
              >
                <div className="solutions-content">
                  <h3>Hacking Parotection Software</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia, obcaecati praesentium. Labore sint recusandae
                    perspiciatis laudantium, deleniti non
                  </p>

                  <Link href="/services/details" className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="single-solutions"
                style={{
                  backgroundImage: `url(/img/projects/project2.jpg)`,
                }}
              >
                <div className="solutions-content">
                  <h3>Security Awarness Training</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia, obcaecati praesentium. Labore sint recusandae
                    perspiciatis laudantium, deleniti non
                  </p>

                  <Link href="/services/details" className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="single-solutions"
                style={{
                  backgroundImage: `url(/img/projects/project3.jpg)`,
                }}
              >
                <div className="solutions-content">
                  <h3>Cyber Security Manged IT</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia, obcaecati praesentium. Labore sint recusandae
                    perspiciatis laudantium, deleniti non
                  </p>

                  <Link href="/services/details" className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="single-solutions"
                style={{
                  backgroundImage: `url(/img/projects/project2.jpg)`,
                }}
              >
                <div className="solutions-content">
                  <h3>Security Awarness Training</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officia, obcaecati praesentium. Labore sint recusandae
                    perspiciatis laudantium, deleniti non
                  </p>

                  <Link href="/services/details" className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default RecentProjects;
