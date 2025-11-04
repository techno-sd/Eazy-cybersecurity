"use client";
  
import React from "react";

const ContactInfo: React.FC = () => {
  return (
    <>
      <div className="contact-info-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="single-contact-info">
                <i className="bx bx-location-plus"></i>
                <h3>Riyadh, Saudi Arabia</h3>
                <p>Riyadh, Kingdom of Saudi Arabia</p>
                <a href="mailto:support@eazycyber.sa">Email: support@eazycyber.sa</a>
                <a href="tel:+966563664008">+966 56 366 4008</a>
              </div>
            </div>

            <div className="col-lg-6 p-0">
              <div className="single-contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462565.7588224952!2d46.345651999999996!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
