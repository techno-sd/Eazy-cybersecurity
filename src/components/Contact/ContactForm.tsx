"use client";

import React from "react";

const ContactForm: React.FC = () => {
  return (
    <>
      <div className="faq-contact-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-wrap">
                <div className="contact-form">
                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="number"
                            placeholder="Phone number"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <textarea
                            name="text"
                            cols={30}
                            rows={7}
                            placeholder="Write your message..."
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-sm-12">
                        <button type="submit" className="default-btn page-btn">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
